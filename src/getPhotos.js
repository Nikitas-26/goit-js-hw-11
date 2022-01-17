const axios = require('axios');
const baseUrl = 'https://pixabay.com/api/';
const getDataFromServer =  function getDataFromServer(url){
 const  params = `?key=24365452-de0ed4643bffa9cf97baa21c7&q=${url}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40`
    console.log(url)
    return  axios.get(baseUrl  + params );
    
}

export default getDataFromServer;
