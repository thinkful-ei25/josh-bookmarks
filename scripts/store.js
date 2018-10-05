'use strict';

const store = (function(){
  const addItem = function(item) {
    this.items.push(item);
  };

  let addingItem = false;

  const toggleAddingItem = function(){
      this.addingItem = !this.addingItem;
  }

  const findById = function(id) {
    return this.items.find(item => item.id === id);
  };

  const toggleExpandedFilter = function() {
    this.hideCheckedItems = !this.hideCheckedItems;
  };


  const setErrorMessage = function(errorMessage) {
    this.errorMessage = errorMessage;
  };

  return {
    items: [],
    errorMessage: null,
    addItem,
    addingItem,
    findById,
    toggleExpandedFilter,
    setErrorMessage,
    toggleAddingItem
  };

}());
