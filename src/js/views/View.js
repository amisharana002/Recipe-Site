export default class View {
  parentElement = document.querySelector('.results');
  _data;

  render(data) {
    console.log(data);
    if (data.length == 0) return this.renderError();
    this._data = data;

    console.log(this._data);
    const markup = this.generateMarkup();
    this.parentElement.innerHTML = ' ';
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderSpinner() {
    const markup = `
    <div class="spinner">
    <svg>
      <use href="src/img/icons.svg#icon-loader"></use>
    </svg>
  </div>
  `;
    this.parentElement.innerHTML = ' ';
    console.log('hello');
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError() {
    const markup = `
    <div class="error">
            <div>
              <svg>
                <use href="src/img/icons.svg#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>No recipe found for your query!</br> Please try again :) </p>
          </div>
    `;
    this.parentElement.innerHTML = '';
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
