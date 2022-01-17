import './sass/main.scss';
import getDataFromServer from './getPhotos';
const refs = { 
    btn: document.querySelector('.btn-sub'),
    input: document.querySelector('.input-search'),
    form: document.querySelector('#search-form'),
    galleryDiv: document.querySelector('.gallery')
}
refs.form.addEventListener('submit', onBtnClick)

function onBtnClick(e){
e.preventDefault()
const inputValue = refs.input.value;
console.log(refs.input.value)
getDataFromServer(inputValue).then(data=>{
// console.log(data)
 refs.galleryDiv.insertAdjacentHTML('afterbegin',createMarkup(data));
}).catch(console.log);

}

function createMarkup(data){
   
    return data.data.hits.map(item => `<div class="photo-card">
    <img src="${item.webformatURL}" alt="" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes</b>
        ${item.likes}
      </p>
      <p class="info-item">
        <b>Views</b>
        ${item.views}
      </p>
      <p class="info-item">
        <b>Comments</b>
        ${item.comments}
      </p>
      <p class="info-item">
        <b>Downloads</b>
        ${item.downloads}
      </p>
    </div>
  </div>`).join("")
}

