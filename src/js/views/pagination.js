import View from './View.js';

class pagination extends View {
  parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this.parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      console.log(btn);
      if (!btn) return;
      console.log(btn.dataset.goto);
      const gotopage = Number(btn.dataset.goto);
      console.log(gotopage);
      handler(gotopage);
    });
  }

  generateMarkup() {
    let currPage = this._data.page;
    console.log(currPage);
    const numpages = Math.ceil(
      this._data.result.length / this._data.resultsPerPage
    );
    console.log(numpages);

    if (currPage === 1 && numpages > 1) {
      return `
      <button class="btn--inline pagination__btn--next" data-goto="${
        currPage + 1
      }">
              <span>Page ${currPage + 1}</span>
              <svg class="search__icon">
                <use href="src/img/icons.svg#icon-arrow-right"></use>
              </svg>
            </button>
     `;
    }

    if (currPage == numpages && numpages > 1) {
      return `
      <button class="btn--inline pagination__btn--prev" data-goto="${
        currPage - 1
      }" >
              <svg class="search__icon">
                <use href="src/img/icons.svg#icon-arrow-left"></use>
              </svg>
              <span>Page${currPage - 1}</span>
            </button>`;
    }

    if (numpages > currPage) {
      return `
      <button class="btn--inline pagination__btn--prev" data-goto="${
        currPage - 1
      }">
              <svg class="search__icon">
                <use href="src/img/icons.svg#icon-arrow-left"></use>
              </svg>
              <span>Page ${currPage - 1}</span>
            </button>
            <button class="btn--inline pagination__btn--next" data-goto="${
              currPage + 1
            }">
                    <span>Page ${currPage + 1}</span>
                    <svg class="search__icon">
                      <use href="src/img/icons.svg#icon-arrow-right"></use>
                    </svg>
                  </button>
      `;
    }
  }
}
export default new pagination();
