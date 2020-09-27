import galleryItems from "./gallery-items.js";

const refs = {
  ul: document.querySelector(".gallery"),
  div: document.querySelector(".lightbox"),
  lightboxImg: document.querySelector(".lightbox__image"),
  lightbox: document.querySelector(".lightbox"),
  closeModalBtn: document.querySelector('button[data-action="close-lightbox"]'),
  lightboxContent: document.querySelector(".lightbox__content"),
  gallerySrc: galleryItems.map((item) => item.original),
};

//Создание и рендер разметки по массиву данных и предоставленному шаблону.
const galleryMarkup = galleryItems.reduce((acc, item) => {
  const itemMarkup = `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${item.original}"
  >
    <img
      class="gallery__image"
      src="${item.preview}"
      data-source="${item.original}"
      alt="${item.description}"
    />
     </a>
  </li>`;

  acc += itemMarkup;

  return acc;
}, "");

refs.ul.insertAdjacentHTML("beforeend", galleryMarkup);

//Реализация делегирования на галерее ul.js - gallery и получение url большого изображения.
//Открытие модального окна по клику на элементе галереи.
//Подмена значения атрибута src элемента img.lightbox__image.

refs.ul.addEventListener("click", handleImgClick);

function handleImgClick(evt) {
  evt.preventDefault();
  if (evt.target === evt.currentTarget) {
    return;
  }

  refs.lightboxImg.src = evt.target.dataset.source;
  refs.lightboxImg.alt = evt.target.getAttribute("alt");

  refs.div.classList.add("is-open");
  window.addEventListener("keydown", handleKeyPress);
}

// Закрытие модального окна по клику на кнопку button[data-action="close-modal"].
// Очистка значения атрибута src элемента img.lightbox__image.
// Это необходимо для того, чтобы при следующем открытии модального окна,
//пока грузится изображение, мы не видели предыдущее.
//Закрытие модального окна по клику на div.lightbox__overlay.
// Закрытие модального окна по нажатию клавиши ESC
//Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".

refs.closeModalBtn.addEventListener("click", closeModal);
refs.lightboxContent.addEventListener("click", handleOverlayClick);
window.addEventListener("keydown", nextImage);

function closeModal() {
  refs.lightbox.classList.remove("is-open");
  refs.lightboxImg.src = "";
  refs.lightboxImg.alt = "";
  window.removeEventListener("keydown", handleKeyPress);
}

function handleOverlayClick(event) {
  if (event.target !== event.currentTarget) {
    return;
  }

  closeModal();
}

function handleKeyPress(event) {
  if (event.code !== "Escape") {
    return;
  }

  closeModal();
}

function nextImage(key) {
  if (key.code === "ArrowRight") {
    for (let i = 0; i < refs.gallerySrc.length - 1; i += 1) {
      if (refs.gallerySrc[i] === refs.lightboxImg.src) {
        refs.lightboxImg.src = refs.gallerySrc[i + 1];
        break;
      }
    }
  }
  if (key.code === "ArrowLeft") {
    for (let i = 1; i < gallerySrc.length; i += 1) {
      if (refs.gallerySrc[i] === refs.lightboxImg.src) {
        refs.lightboxImg.src = refs.gallerySrc[i - 1];
        break;
      }
    }
  }
}
