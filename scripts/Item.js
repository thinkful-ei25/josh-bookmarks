
const Item = (function(){

    const validateName = function(name) {
      if (!name) throw new TypeError('Name must not be blank');
    };
  
    const create = function(name) {
      return {
        id: cuid(),
        title,
        url,
        desc,
        rating,
        expanded: false
      };
    };
  
    return {
      validateName,
      create,
    };
    
  }());
  