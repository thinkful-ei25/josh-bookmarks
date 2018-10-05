'use strict';

const store = (function(){
  const addItem = function(item) {
    this.items.push(item);
  };

  let addingItem = false;

  const toggleAddingItem = function(){
      this.addingItem = !this.addingItem;
  }

  const findAndUpdate = function(id, newData) {
    const item = this.findById(id);
    Object.assign(item, newData);
  };

  const findById = function(id) {
    return this.items.find(item => item.id === id);
  };

  const toggleExpandedFilter = function() {
    this.hideCheckedItems = !this.hideCheckedItems;
  };


  const setErrorMessage = function(errorMessage) {
    this.errorMessage = errorMessage;
  };

  const findAndDelete = function(id) {
    this.items = this.items.filter(item => item.id !== id);
  };

  return {
    items: [],
    errorMessage: null,
    addItem,
    addingItem,
    findById,
    toggleExpandedFilter,
    setErrorMessage,
    toggleAddingItem,
    findAndUpdate,
    findAndDelete
  };

}());
