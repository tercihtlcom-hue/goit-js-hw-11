/* empty css                      */import{S as m,i as a}from"./assets/vendor-CTPPT4__.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function t(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=t(e);fetch(e.href,r)}})();const d="55578328-74d0884fefbae5b2a22013bde",l=document.querySelector("#search-form"),u=document.querySelector(".gallery"),c=document.querySelector("#loader"),h=new m(".gallery a",{captionsData:"alt",captionDelay:250});l.addEventListener("submit",y);function y(s){s.preventDefault();const o=s.currentTarget.elements.searchQuery.value.trim();if(o===""){a.warning({message:"Lütfen bir arama terimi girin!",position:"topRight"});return}u.innerHTML="",c.style.display="block",g(o).then(t=>{if(t.hits.length===0){a.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}b(t.hits),h.refresh()}).catch(t=>{console.error("Hata:",t),a.error({message:"Bir şeyler ters gitti!",position:"topRight"})}).finally(()=>{c.style.display="none",l.reset()})}function g(s){const o=new URLSearchParams({key:d,q:s,image_type:"photo",orientation:"horizontal",safesearch:"true"});return fetch(`https://pixabay.com/api/?${o}`).then(t=>{if(!t.ok)throw new Error(t.status);return t.json()})}function b(s){const o=s.map(({webformatURL:t,largeImageURL:n,tags:e,likes:r,views:i,comments:f,downloads:p})=>`
        <li class="gallery-item">
          <a class="gallery-link" href="${n}">
            <img class="gallery-image" src="${t}" alt="${e}" />
          </a>
          <div class="info">
            <p class="info-item"><b>Likes</b> <span>${r}</span></p>
            <p class="info-item"><b>Views</b> <span>${i}</span></p>
            <p class="info-item"><b>Comments</b> <span>${f}</span></p>
            <p class="info-item"><b>Downloads</b> <span>${p}</span></p>
          </div>
        </li>`).join("");u.insertAdjacentHTML("beforeend",o)}
//# sourceMappingURL=index.js.map
