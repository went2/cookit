// model
import * as model from './model';

// views
import resultView from './views/resultView';
import searchView from './views/searchView';
import paginationView from './views/paginationView';

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

export default function init () {
  searchView.addEventHandler(searchListController);
}