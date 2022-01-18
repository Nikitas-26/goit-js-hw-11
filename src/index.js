import './sass/main.scss';
import Notiflix from 'notiflix';
import getDataFromServer from './getPhotos';
const refs = { 
    btn: document.querySelector('.btn-sub'),
    input: document.querySelector('.input-search'),
    form: document.querySelector('#search-form'),
    galleryDiv: document.querySelector('.gallery'),
    btnLoadMore: document.querySelector('.load-more')
}
let page = 1;
let iterator = 0;
let inputValue = '';
refs.form.addEventListener('submit', onBtnClick)
refs.btnLoadMore.addEventListener('click',onClickLoadMore)

function onBtnClick(e){
e.preventDefault()
refs.galleryDiv.innerHTML = '';
 inputValue = refs.form.elements.searchQuery.value;
refs.btnLoadMore.style.display = 'inline-block';

getDataFromServer(inputValue).then(data=>{
  Notiflix.Notify.success(`Hooray! We found ${data.data.totalHits} images.`)
  if(data.data.hits.length === 0){
    refs.btnLoadMore.style.display = 'none'
    return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
  }
  iterator = 40;
 refs.galleryDiv.insertAdjacentHTML('afterbegin',createMarkup(data));
}).catch(console.log);

}
function onClickLoadMore () {
  page+= 1;
  iterator+=40;
  getDataFromServer(inputValue, page).then(data =>{
    createMarkup(data)
    refs.galleryDiv.insertAdjacentHTML('beforeend',createMarkup(data));
    if(data.data.totalHits  <= iterator){
      refs.btnLoadMore.style.display = 'none'
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
    }
  });
} 

function createMarkup({data:{hits}}){
   
    return hits.map(item => `<div class="photo-card">
    <img src="${item.webformatURL}" alt="" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes</b>
        <br>${item.likes}</br>
      </p>
      <p class="info-item">
        <b>Views</b>
        <br>${item.views}</br>
      </p>
      <p class="info-item">
        <b>Comments</b>
        <br>${item.comments}</br>
      </p>
      <p class="info-item">
        <b>Downloads</b>
        <br>${item.downloads}</br>
      </p>
    </div>
  </div>`).join("")
}

