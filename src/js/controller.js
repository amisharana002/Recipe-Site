import * as model from './model.js';
import recipeView from './views/recipeView.js';
import SearchView from './views/searchView.js';
import ResultView from './views/resultView.js';
import bookmarkView from './views/bookmark.js';
import pagination from './views/pagination.js';
import bookmark from './views/bookmark.js';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    recipeView.renderSpinner();

    if (!id) return;

    await model.loadrecipe(id);
    const { recipe } = model.state;

    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError(
      `We could not find that recipe . please try another one!`
    );
  }
};

const container = document.querySelector('.container');
const image = document.querySelector('.image');

const controlsearchResults = async function (query) {
  try {
    ResultView.renderSpinner();
    const query = SearchView.getQuery();
    console.log(query);
    image.classList.add('hidden');
    container.classList.remove('hidden');
    await model.loadsearchResult(query);
    ResultView.render(model.getSearchResultsPage());
    pagination.render(model.state.search);
  } catch (err) {
    throw err;
  }
};

const controllClicks = gotopage => {
  ResultView.render(model.getSearchResultsPage(gotopage));
  pagination.render(model.state.search);
};

const controlserving = function (newServings) {
  model.updateServing(newServings);
  recipeView.render(model.state.recipe);
};

const controlBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addbookmark(model.state.recipe);
  else model.deletebookmark(model.state.recipe.id);
  recipeView.render(model.state.recipe);

  bookmarkView.render(model.state.bookmarks);
};

const init = function () {
  recipeView.addhandlerender(controlRecipe);
  SearchView.addHandlerSearch(controlsearchResults);
  pagination.addHandlerClick(controllClicks);
  recipeView.addhandlerUpdateServings(controlserving);
  recipeView.addhandlerbookmark(controlBookmark);
};

init();
