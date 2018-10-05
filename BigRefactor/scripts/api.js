'use strict';

const api = (function () {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/joshua/bookmarks';

  function getItems(onError, callback) {
    $.ajax({
      url: `${BASE_URL}/items`,
      method: 'GET',
      dataType: 'json',
      success: callback,
      error: onError
    });
  }
 

  function createItem(name, onError, callback) {
    const newItemString = JSON.stringify({name});
    $.ajax({
      url: `${BASE_URL}/items`,
      method: 'POST',
      contentType: 'application/json',
      data: newItemString,
      success: callback,
      error: onError
    });
  }
  
  
  function updateItem(id, updateData, onError, callback){
    $.ajax({
      url: `${BASE_URL}/items/${id}`,
      method: 'PATCH',
      contentType: 'application/json',
      data: JSON.stringify(updateData),
      success: callback,
      error: onError
    });
  }

  function deleteItem(id, onError, callback){
    $.ajax({
      url:`${BASE_URL}/items/${id}`,
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
