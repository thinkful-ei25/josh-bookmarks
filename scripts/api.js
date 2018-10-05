'use strict';

const api = (function () {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/joshua/bookmarks';

  function getItems(onError, callback) {
    $.ajax({
      url: `${BASE_URL}`,
      method: 'GET',
      dataType: 'json',
      success: callback,
      error: onError
    });
  }


  function createItem(data, onError, callback) {
    const newItemString = JSON.stringify({name});
    $.ajax({
      url: `${BASE_URL}`,
      method: 'POST',
      contentType: 'application/json',
      data: data,
      success: callback,
      error: onError
    });
  }



  return {
    getItems,
    createItem
  };
})();
