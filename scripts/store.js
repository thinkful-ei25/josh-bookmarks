'use strict';

const store = (function(){
  const addItem = function(item) {
    this.items.push(item);
  };

  const addingItem = false;

  const toggleAddingItem = function(){
      addingItem = !addItem;
  }

  const findById = function(id) {
    return this.items.find(item => item.id === id);
  };

  const findAndDelete = function(id) {
    this.items = this.items.filter(item => item.id !== id);
  };

  const toggleExpandedFilter = function() {
    this.hideCheckedItems = !this.hideCheckedItems;
  };

  const setSearchTerm = function(term) {
    this.searchTerm = term;
  };

  const setErrorMessage = function(errorMessage) {
    this.errorMessage = errorMessage;
  };

  return {
    items: [],
    searchTerm: '',
    errorMessage: null,
    addItem,
    addingItem,
    findById,
    // findAndUpdate,
    findAndDelete,
    toggleExpandedFilter,
    setSearchTerm,
    // setItemIsEditing,
    setErrorMessage,
    toggleAddingItem
  };

}());
