const cards = document.querySelectorAll(".cards>li");
const pageList = document.querySelector(".pagination");
const cardsPerPage = 14;
const pageButtonsLimit = 5;
let currentPage;

initPagination();

function initPagination() {
  const buttons = [];
  const cardCount = cards.length;
  const pageCount = Math.ceil(cardCount / cardsPerPage);

  for (let i = 1; i <= pageCount; i++) {
    const button = document.createElement("li");
    button.append(i);
    button.dataset.index = i - 1;
    buttons.push(button);
  }

  currentPage = 0;

  pageList.append(...buttons);
  updatePageList();
  showCurrentPageCardsOnly();
  pageList.nextElementSibling.dataset.index = pageCount - 1;
  pageList.parentElement.onclick = handlePageSwitch;
}

function showCurrentPageCardsOnly() {
  const min = currentPage * cardsPerPage;
  const max = min + cardsPerPage;

  for (let i = 0; i < cards.length; i++) {
    cards[i].hidden = i < min || i >= max;
  }
}

function handlePageSwitch(e) {
  const btn = e.target.closest("li, button");
  if (!btn) return;

  currentPage = btn.dataset.index;
  updatePageList();
  showCurrentPageCardsOnly();
}

function updatePageList() {
  const btn = pageList.children[currentPage];
  let min = currentPage - Math.floor(pageButtonsLimit / 2);
  if (min < 0) min = 0;
  let max = min + pageButtonsLimit;
  if (max > pageList.children.length) {
    max = pageList.children.length;
    min =Math.max(0, max - pageButtonsLimit);
  }

  pageList.querySelector(".active")?.classList.remove("active");
  btn.classList.add("active");

  for (let i = 0; i < pageList.children.length; i++) {
    const btn = pageList.children[i];

    btn.hidden = i < min || i >= max;
  }

  pageList.classList.toggle('left-ellipsis', min > 0);
  pageList.classList.toggle('right-ellipsis', max < pageList.children.length);
  setTimeout(() => {
    pageList.scrollIntoView();
  }, 0);
}
