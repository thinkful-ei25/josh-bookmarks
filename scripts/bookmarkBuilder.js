'use strict';
/* global store, api, $ */
let rater = 0;
// eslint-disable-next-line no-unused-vars


const bookmarkList = (function(){


    $.fn.extend({
      serializeJson: function() {
        const formData = new FormData(this[0]);
        const o = {};
        formData.forEach((val, name) => {
          if(name === "rating"){
            val = parseInt(val, 10);
          }
          o[name] = val});
        return JSON.stringify(o);
      }
    });

    function render() {
        let bookmarks = store.items;
        console.log(rater);
        console.log('`render` ran');
        const bookmarkListItemsString = generateBookmarkItemsString(bookmarks);
        $('#js-bookmark-list').html(bookmarkListItemsString);
        $('#error').html(store.errorMessage);
        if(store.addingItem){
            $('.adding').html(generateForm());
        }
        else{
          $('#reused_form').hide();
        }
    }

  function generateBookmarkElement(item) {

    if(item.rating >= rater || rater === 8){
      let itemName = `<span class="bookmark-name">${item.title}</span>`;
      if(item.expanded){
        return `<li class='js-bookmark-element' data-id="${item.id}"><span class="title-of">${itemName}</span>
        <br>
        <div class="js-description">${item.desc}</div>
          <span class=rating-of>${getStarWidgetFilled(item.rating)}${getStarWidgetUnfilled(item.rating)}</span>
          <br>
          </li>
          <div class="visit-and-delete">
          <a href="${item.url}">Visit Site!</a>
              <button class="js-delete" data-id="${item.id}" >Delete</button>
          </div>
          `
      }
          return `<li class='js-bookmark-element' data-id="${item.id}"><span class="title-of">${itemName}</span>
          <span class=rating-of>${getStarWidgetFilled(item.rating)}${getStarWidgetUnfilled(item.rating)}</span>
        </li>`;
      }
    }

    function handleDelete(){
      $('.container').on('click', '.js-delete', e => {
        console.log('clicked delete');
        const id = $(e.currentTarget).data('id');
        console.log(id)
        api.deleteItem(id, handleApiError, () => {
          console.log('trying findAndDelete');
          store.findAndDelete(id);
          render();
        })
      });
    }

    function handleFocus(){
      $('#js-bookmark-list').on('click', 'li', e =>{
        const id = getIdFromElement(e.currentTarget);
        const item = store.findById(id);
        item.expanded = !item.expanded;
        render();
      });
    }

  function generateBookmarkItemsString(bookmarkList) {
    console.log("Generating bookmark element");
    const bookmarks = bookmarkList.map((item) => generateBookmarkElement(item));
    return bookmarks.join('');
  }

  function getStarWidgetFilled(num){
    let currentCount = 0;
    let myStarString = `<ul id='stars'>`;
    for(let i = 0; i < num; i++){
      myStarString += `<li class='star' title='Poor' data-value='1'>
        <i class='fa fa-star filled'></i>
        </li>`
        currentCount ++;
    }
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
function generateForm(){
    return `
    <div id="form-div">
      <form id="reused_form">
        <input name="title" type="text" placeholder="Website Name" id="name" />
        <input name="url" type="text" placeholder="http://" id="url" />
        <select name="rating" class="rating">
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
          <option value="2">2 Stars</option>
          <option value="1">1 Stars</option>
        </select>
        <textarea name="desc" id="comment" placeholder="Describe in your own words"></textarea>
        <input id="js-submit" class="js-submitButton" type="submit" value="SUBMIT" />
      </form>
    </div>`;
}





  function handleApiError(error){
    store.setErrorMessage(error.responseJSON.message);
    console.log(error);
    render();
    store.setErrorMessage(null);
  }


  function handleNewItemSubmit() {
    $('.container').on('submit', '#reused_form', function(event) {
      event.preventDefault();
      store.toggleAddingItem();
      const url = $('#url').val();
      if(url.startsWith('http') || url.startsWith('https')){
        const newItemName = $(event.target).serializeJson();
        console.log(newItemName);
        api.createItem(newItemName, handleApiError,(item) => {
          store.addItem(item);
          console.log(store.addingItem);
          render();
        });
      }
      else{
        alert('must start with http or https');
        render();
      }
 
    });
  }











  function handleRatingFilter() {
    $('#js-rating-filter').change( e => {
      let value = $('#js-rating-filter option:selected').val();
      rater = parseInt(value, 10);
      console.log(rater);
      console.log(`you moved the dropdown to ${value}`);
      render();
    });
  }



  function fetchInitialItems() {
    api.getItems( handleApiError, (items) => {
      console.log(items);
      items.forEach((item) => {
       store.addItem(item);
      });
    bookmarkList.render();
    });
  }

  function handleAddingItem(){
    $('.addButton').on('click', function(){
      store.addingItem = true;
      console.log('you clicked add item');
     render();
    });
}

function getIdFromElement(item){
  return $(item)
  .closest('.js-bookmark-element')
  .data('id');
}

 

  function bindEventListeners() {
    handleAddingItem();
    handleNewItemSubmit();
    handleFocus();
    handleDelete();
    handleRatingFilter();
  }

  // This object contains the only exposed methods from this module:
  return {
    render: render,
    bindEventListeners: bindEventListeners,
    fetchInitialItems
  };
}());
