import BaseView from "./BaseView";
import icons from '../../assets/images/icons.svg';

class DetailView extends BaseView {
  _parentElement = document.querySelector('.recipe');
  _errorMessage = '找不到该菜谱，再试试吧！';
  _message = '';

  addRenderHandler(handler) {
    ['hashchange', 'load'].forEach(event => window.addEventListener(event, handler));
  }

  addUpdateServingsHandler(handler) {
    this._parentElement.addEventListener('click', function(e) {
      const btn = e.target.closest('.btn--update-servings');
      if(!btn) return;
      const { updateTo } = btn.dataset;
      if(+updateTo > 0) handler(+updateTo);
    });
  }

  _generateMarkup() {
    return `
      <figure class="recipe__fig">
        <img
          src="${this._data.image}"
          alt="${ this._data.title }"
          class="recipe__img" 
        />
        <h1 class="recipe__title">
          <span>${this._data.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">
            ${ this._data.cookingTime }
          </span>
          <span class="recipe__info-text">分钟</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">
            ${ this._data.servings }
          </span>
          <span class="recipe__info-text">人餐</span>

          <div class="recipe__info-buttons">
            <button
              class="btn--tiny btn--update-servings"
              data-update-to="${ this._data.servings - 1}"
            >
              <svg>
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </button>
            <button
              class="btn--tiny btn--update-servings"
              data-update-to="${ this._data.servings + 1 }">
              <svg>
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>

        <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}">
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round btn--bookmark">
          <svg class="">
            <use href="${icons}#icon-bookmark${ this._data.bookmarked ? '-fill' : '' }"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">配料</h2>
        <ul class="recipe__ingredient-list">
          ${this._data.ingredients.map(this._generateMarkupIngredient).join('')}
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">制作指导</h2>
        <p class="recipe__directions-text">
          本菜谱由 <span class="recipe__publisher">${ this._data.publisher }</span> 创建，点击按钮查看做菜指导
        </p>
        <a
          class="btn--small recipe__btn"
          href="${this._data.sourceUrl}"
          target="_blank"
        >
          <span>指导</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
    `;
  }

  _generateMarkupIngredient(ing) {
    return `
    <li class="recipe__ingredient">
      <svg class="recipe__icon">
        <use href="${icons}#icon-check"></use>
      </svg>
      <div class="recipe__quantity">
      ${ ing.quantity ? ing.quantity.toFixed(1) : '' }</div>
      <div class="recipe__description">
        <span class="recipe__unit">${ing.unit}</span>
        ${ing.description}
      </div>
    </li>
  `;
  }

}

export default new DetailView();