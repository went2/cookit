import BaseView from './BaseView';
import previewView from './previewView.js';

class ResultView extends BaseView {
  _parentElement = document.querySelector('.results');
  _errorMessage = '找不到菜谱，换个词再试试吧 ;)';
  _message = '';

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultView();