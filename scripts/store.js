'use strict';

const store = (function(){

    let bookmarks = [
        { id: cuid(), name: 'apples', rating: 1, 
        description: 'Lorem ipsum dolor sit amet, consectetunon pulvinar lorem felis nec erat',
        expanded: true 
        },
        { id: cuid(), name: 'oranges', rating: 4, description: 'lorem epsim', expanded: false },
        { id: cuid(), name: 'milk', rating: 2, description: 'lorem epsim', expanded: false },
        { id: cuid(), name: 'bread', rating: 5, description: 'lorem epsim', expanded: false }
      ]; 

      let adding = false;

      let findById = function(id){
          return bookmarks.find(bookmark => bookmark.id === id);
      }

      let toggleAdding = function(){
          this.adding = !this.adding;
      }

    return {
        bookmarks, adding, findById, toggleAdding
    }
}());