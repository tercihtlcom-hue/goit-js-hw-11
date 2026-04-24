import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const API_KEY = '55578328-74d0884fefbae5b2a22013bde';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('#loader'); // HTML'de id="loader" olduğundan emin ol

// 1. Lightbox'ı bir kez dışarıda tanımlıyoruz
const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
});

form.addEventListener('submit', handleSearch);

function handleSearch(event) {
    event.preventDefault();
    const query = event.currentTarget.elements.searchQuery.value.trim();

    if (query === "") {
        iziToast.warning({ message: "Lütfen bir arama terimi girin!", position: 'topRight' });
        return;
    }

    // Arama başlamadan önce ekranı temizle ve loader'ı aç
    gallery.innerHTML = '';
    loader.style.display = 'block'; // Loader'ı görünür yap

    fetchImages(query)
        .then(data => {
            if (data.hits.length === 0) {
                iziToast.error({
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                    position: 'topRight',
                });
                return;
            }
            
            renderGallery(data.hits);
            // 2. Resimler DOM'a eklendikten sonra yenile
            lightbox.refresh(); 
        })
        .catch(error => {
            console.error("Hata:", error);
            iziToast.error({ message: "Bir şeyler ters gitti!", position: 'topRight' });
        })
        .finally(() => {
            // 3. İstek bittiğinde (başarılı veya başarısız) loader'ı gizle
            loader.style.display = 'none'; 
            form.reset();
        });
}

function fetchImages(query) {
    const searchParams = new URLSearchParams({
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true'
    });

    return fetch(`https://pixabay.com/api/?${searchParams}`)
        .then(response => {
            if (!response.ok) throw new Error(response.status);
            return response.json();
        });
}

function renderGallery(images) {
    const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `
        <li class="gallery-item">
          <a class="gallery-link" href="${largeImageURL}">
            <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
          </a>
          <div class="info">
            <p class="info-item"><b>Likes</b> <span>${likes}</span></p>
            <p class="info-item"><b>Views</b> <span>${views}</span></p>
            <p class="info-item"><b>Comments</b> <span>${comments}</span></p>
            <p class="info-item"><b>Downloads</b> <span>${downloads}</span></p>
          </div>
        </li>`;
    }).join('');

    gallery.insertAdjacentHTML('beforeend', markup);
}