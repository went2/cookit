import icons from '../../assets/images/icons.svg';

export default class BaseView {
  _data;

  render(data, render = true) {
    if(!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderError();
    }
    this._data = data;
    const markup = this._generateMarkup();

    if(!render) return markup;

    this._mount(markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDom.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    // diff
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      // update changed TEXT
      if(!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== '') {
        curEl.textContent = newEl.textContent;
      }

      // update change ATTRIBUTES
      if(!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr => 
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    })

  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;
    this._mount(markup);
  }

  renderError(msg = this._errMsg) {
    const markup = `
      <div class="error">
        <div>[ERROR]</div>
        <p>${msg}</p> 
      </div> 
    `;
    
    this._mount(markup);
  }

  renderMessage(msg = this._message) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${msg}</p>
      </div>
    `;
    
    this._mount(markup);
  }

  _mount(markup) {
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }
}