// model
import * as model from './model';

// views
import resultView from './views/resultView';
import searchView from './views/searchView';
import paginationView from './views/paginationView';
import detailView from './views/detailView';

// 响应搜索框的输入，获取数据渲染结果列表
const searchListController = async function() {
  resultView.renderSpinner();
  const query = searchView.getInput();
  if(!query) return;

  try {
    // 获取数据
    await model.getSearchResults(query);

    // 渲染相关的views
    resultView.render(model.getSearchResultsPage());
    paginationView.render(model.state.search);
  } catch(err) {
    console.log(err);
    resultView.renderError(err);
  }
}

// 响应左右分页的切换
const paginationController = function(page) {
  resultView.render(model.getSearchResultsPage(page));
  paginationView.render(model.state.search);
}

// 响应地址栏url哈希字段的变化，动态渲染页面的详情部分
const detailController = async function () {
  const id = window.location.hash.slice(1);
  if(!id) return;
  
  detailView.renderSpinner();

  try {
    resultView.update(model.getSearchResultsPage());

    await model.getRecipeDetail(id);
    detailView.render(model.state.recipe);
  } catch(e) {
    detailView.renderError();
    console.error(e);
  }

}

const detailServingsController = function(newServings) {
  // 先更新model中的数据
  model.updateServings(newServings);

  // 再更新数据相应的view
  detailView.update(model.state.recipe);
}



export default function init () {
  searchView.addEventHandler(searchListController);
  paginationView.addEventHandler(paginationController);
  detailView.addRenderHandler(detailController);
  detailView.addUpdateServingsHandler(detailServingsController);
}