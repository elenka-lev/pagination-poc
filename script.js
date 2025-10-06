const container = document.querySelector(".pagination");
const cards = document.querySelectorAll('.cards>li');
const cardsPerPage = 14;
let currentPage;

initPagination();

function initPagination() {
  const buttons = [];
  const cardCount = cards.length;
  const pageCount = Math.ceil(cardCount / cardsPerPage);

  for (let i = 1; i <= pageCount; i++) {
    const button = document.createElement("li");
    button.append(i);
    button.dataset.index = i-1;
    buttons.push(button);
  }

  currentPage = 0;
  showCurrentPageCardsOnly();

  container.append(...buttons);
  container.onclick = handlePageSwitch;
}

function showCurrentPageCardsOnly() {
  const min = currentPage * cardsPerPage;
  const max = min + cardsPerPage;

  for (let i = 0; i < cards.length; i++) {
    cards[i].hidden = i < min || i >= max;
  }
}

function handlePageSwitch(e) {
  const btn = e.target.closest('li');
  if (!btn) return;

  currentPage = btn.dataset.index;
  showCurrentPageCardsOnly();
}