import View from './View.js';

import icons from '../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // Page 1, and there are other pages

    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButtons(curPage, 'next');
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupButtons(curPage, 'prev');
    }
    // Other page
    if (curPage < numPages) {
      return this._generateMarkupButtons(curPage, 'both');
    }

    // Page 1, there are NO other pages
    return '';
  }

  _generateMarkupButtons(curPage, direction) {
    const next = `
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
  `;

    const prev = `
    <button data-goto="${
      curPage - 1
    }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
    </button>
  
  `;

    if (direction === 'next') return next;
    if (direction === 'prev') return prev;
    if (direction === 'both') return prev + next;
  }
}

export default new PaginationView();
