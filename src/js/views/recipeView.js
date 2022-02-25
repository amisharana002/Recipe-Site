class RecipeView {
  #parentElement = document.querySelector('.recipe');
  #data;

  render(data) {
    this.#data = data;
    const markup = this.generateMarkup();
    this.#parentElement.innerHTML = ' ';
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderSpinner() {
    const markup = `
    <div class="spinner">
    <svg>
      <use href="src/img/icons.svg#icon-loader"></use>
    </svg>
  </div>
  `;
    this.#parentElement.innerHTML = '';
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(Error) {
    const markup = `
    <div class="error">
            <div>
              <svg>
                <use href="src/img/icons.svg#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${Error}</p>
          </div>
    `;
    this.#parentElement.innerHTML = '';
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  addhandlerender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  addhandlerUpdateServings(handler) {
    this.#parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--update-servings');
      console.log(btn);
      const updateTo = +btn.dataset.updateTo;
      handler(updateTo);
    });
  }

  addhandlerbookmark(handler) {
    this.#parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--bookmark');
      if (!btn) return;
      handler();
    });
  }
  generateMarkup() {
    return `
    <figure class="recipe__fig">
          <img src="${this.#data.image}" alt="Tomato" class="recipe__img" />
          <div class="recipe-title">
          <h1>
          <span>${this.#data.title}</span>
        </h1>
          </div>
          
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="src/img/icons.svg#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              this.#data.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="src/img/icons.svg#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              this.#data.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--update-servings" data-update-To="${
                this.#data.servings - 1
              }" >
                <svg>
                  <use href="src/img/icons.svg#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--update-servings"  data-update-To="${
                this.#data.servings + 1
              }">
                <svg>
                  <use href="src/img/icons.svg#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          
          <button class="btn--round btn--bookmark">
            <svg class="">
              <use href="src/img/icons.svg#icon-bookmark${
                this.#data.bookmarked ? '-fill' : ' '
              }"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          ${this.#data.ingredients
            .map(ing => {
              return `
            <li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="src/img/icons.svg#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${ing.quantity}</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ing.unit}</span>
                ${ing.description}
              </div>
            </li>`;
            })
            .join('')}
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              this.#data.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${this.#data.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
          </a>
        </div>

    
    `;
  }
}

export default new RecipeView();
