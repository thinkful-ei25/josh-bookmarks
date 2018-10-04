'use strict';

function generateBookmarkELement(item) {
  let itemName = `<span class="bookmark-name">${item.name}</span>`;
  return `<li class='js-bookmark-element'><span class="title-of">${itemName}</span> 
  <span class=rating-of>${getStarWidgetFilled(item.rating)}${getStarWidgetUnfilled(item.rating)}</span>
</li>`;
}

function getStarWidgetFilled(num){
  let currentCount = 0;
  let myStarString = `<ul id='stars'>`;
  for(let i = 0; i < num; i++){
    myStarString += `<li class='star' title='Poor' data-value='1'>
      <i class='fa fa-star filled'></i>
      </li>`
      currentCount ++;
      console.log('the current count is ' + currentCount)
  }
  console.log('the final current count is ' + currentCount)
  return myStarString;
}

function getStarWidgetUnfilled(num){
  let count = 5 - num;
  let myStarString = ``;
  for(let i = 0; i < count; i++){
    myStarString += `<li class='star' title='Poor' data-value='1'>
    <i class='fa fa-star'></i>
    </li>`
  }
  myStarString += `</ul>`
  return myStarString;
}

function generateBookmarkItemsString(bookmarkList) {
  console.log("Generating shopping list element");
  const bookmarks = bookmarkList.map((item) => generateBookmarkELement(item));
  return bookmarks.join('');
}

function renderPage(){
  $('.js-bookmark-list').html(bookmarkListItemString);
}

function renderBookmarkList() {
  // render the shopping list in the DOM
  console.log('`renderShoppingList` ran');
  const bookmarkListItemString = generateBookmarkItemsString(store.bookmarks);

  // insert that HTML into the DOM
  $('.js-bookmark-list').html(bookmarkListItemString);
}


function handleNewItemSubmit() {
  // this function will be responsible for when users add a new shopping list item
  console.log('`handleNewItemSubmit` ran');
}


function handleItemCheckClicked() {
  // this function will be responsible for when users click the "check" button on
  // a shopping list item.
  console.log('`handleItemCheckClicked` ran');
}


function handleDeleteItemClicked() {
  // this function will be responsible for when users want to delete a shopping list
  // item
  console.log('`handleDeleteItemClicked` ran')
}

// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleBookmarkList() {
  renderBookmarkList();

}

// when the page loads, call `handleShoppingList`
$(handleBookmarkList);
