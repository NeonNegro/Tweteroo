function hasEmpty(obj){
    for (const prop in obj) {
      if(obj[prop] === undefined || obj[prop] === null || obj[prop] === '')
        return true
    }
    return false
}



const BAD_REQUEST = 400;
const OK = 201;

const MAX_SIZE = 10;

export{
    hasEmpty,
    BAD_REQUEST,
    OK,
    MAX_SIZE
}