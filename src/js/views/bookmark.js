import View from './View.js';

class BookmarkView extends View {
  parentElement = document.querySelector('.bookmarks__list');

  generateMarkup() {
    return this._data.map(this.generateMarkupPreview).join('');
  }

  generateMarkupPreview(result) {
    return `
      <li class="preview">
      <a class="preview__link preview__link--active" href="#${result.id}">
        <figure class="preview__fig">
          <img src="${result.image_url}" alt="Test" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${result.title}</h4></br>
          <p class="preview__publisher">${result.publisher}</p>
         
        </div>
      </a>
    </li>
           `;
  }
}

export default new BookmarkView();
