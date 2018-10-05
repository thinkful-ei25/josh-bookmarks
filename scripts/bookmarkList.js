'use strict';

const bookmarkList = (function(){

    function render(){
        // render the shopping list in the DOM
        console.log('`renderBookarkList` ran');
        const bookmarkListItemString = generateBookmarkItemsString(store.bookmarks);
        // insert that HTML into the DOM
        $('.js-bookmark-list').html(bookmarkListItemString);
        if(store.adding){
            // $('.adding').html(generateForm());
        }
    }

    function handleExpand(){
        $('.js-bookmark-list').on('click', 'js-bookmark-element', function(){
            console.log('clicking an element');
        });
    }

    function generateBookmarkItemsString(bookmarkList) {
        console.log("Generating shopping list element");
        const bookmarks = bookmarkList.map((item) => generateBookmarkElement(item));
        return bookmarks.join('');
    }

    function generateBookmarkElement(item) {
        let itemName = `<span class="bookmark-name">${item.title}</span>`;
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

    // function handleNewItemSubmit() {
    //     // this function will be responsible for when users add a new shopping list item
    //     $('#js_submit').submit( event => {
    //       console.log('event', event);
    //       event.preventDefault();
    //       const newItemName = $('#name').val();
    //       const rating = $('.rating').val();
    //       const description = $('#comment').val();
    //       createNewItem(newItemName, rating, description);
    //       console.log('submited new item');
    //       return false;
    //     });
    //     console.log('`handleNewItemSubmit` ran');
    // }

    function handleNewItemSubmit() {
      alert('kio');
      $('#reused_form').submit(function(event) {
        event.preventDefault();
      //   const newItemName = $('.js-shopping-list-entry').val();
      //   $('.js-shopping-list-entry').val('');
        api.createItem(newItemName, handleApiError,(item) => {
          store.addItem(item);
          render();
        });
      });
    }

    function createNewItem(name, rating, description){
        store.bookmarks.push({id: cuid(), title: title, url: irl, desc:, desc, rating: rating});
    }

    function generateForm(){
        return `
        <div id="form-div">
          <form id="reused_form"  >
            <input name="name" type="text" placeholder="Website Name" id="name" />
            <select class="rating">
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Stars</option>
            </select>
            <textarea name="message" id="comment" placeholder="Describe in your own words"></textarea>
            <button id="js-submit" class="js-submitButton">SUBMIT</button>
          </form>
        </div>`;
    }

    function handleAddItem(){
        $('.addButton').on('click', function(){
          store.adding = true;
          console.log('you clicked add item');
         render();
        });
    }

    function fetchInitialItems() {
        api.getItems( handleApiError, (items) => {
          items.forEach((item) => {
           store.addItem(item);
          });
        bookmarkList.render();
        });
      }

    function bindEventListeners(){
        handleAddItem();
        handleExpand();
        render();

    }

    return {
        render: render,
        bindEventListeners: bindEventListeners,
        fetchInitialItems
    };

})();
