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

  function updateItem(id, data, callback) {
    $.ajax({
      method: 'PATCH',
      url: `${BASE_URL}/${id}`,
      data: JSON.stringify(data),
      success: callback,
      contentType: "application/json"
    });
  }

  function deleteItem(id, onError, callback) {
    $.ajax({
      url: `${BASE_URL}/${id}`,
      method: 'DELETE',
      contentType: 'application/json',
      success: callback,
      error: onError
    });
  }



  return {
    getItems,
    createItem,
    updateItem,
    deleteItem
  };
})();
