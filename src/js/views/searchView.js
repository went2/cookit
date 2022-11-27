class SearchView {
  _parentElment = document.querySelector('.search');
  _searchFieldEl = document.querySelector('.search').querySelector('.search__field');

  // 对外暴露获取输入框的值的方法，什么时候调用由外界决定
  getInput() {
    const input = this._searchFieldEl.value;
    this._clearInput();
    return input;
  }

  // 清除表单输入框内容
  _clearInput() {
    this._searchFieldEl.value = '';
  }

  addEventHandler(handler) {
    this._parentElment.addEventListener('submit', function(e) {
      // 表单提交事件阻止默认行为，防止页面刷新
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();