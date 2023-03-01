export default class Card {
  constructor (data, templateSelector, handleZoomPhoto) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleZoomPhoto = handleZoomPhoto;
  }

  // Метод получения разметки для карточки
  _getTamplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }

  // Публичный метод возвращающий готовую разметку карточки
  generateCard() {
    this._element = this._getTamplate();

    this._cardPhoto = this._element.querySelector('.element__photo');
    this._cardName = this._element.querySelector('.element__title');
    this._cardLike = this._element.querySelector('.element__like');
    this._cardDelete = this._element.querySelector('.element__delete');

    this._cardPhoto.src = this._link;
    this._cardPhoto.alt = this._name;
    this._cardName.textContent = this._name;

    this._setEventListners();

    return this._element;
  }

  // Слушатели
  _setEventListners() {
    this._cardLike.addEventListener('click', () => {
      this._handleLikeClick();
    });
    this._cardDelete.addEventListener('click', () => {
      this._handleCardDelete();
    });
    this._cardPhoto.addEventListener('click', () => {
      this._handleZoomPhoto(this._name, this._link);
    });
  }

  // Метод лайка
  _handleLikeClick() {
    this._cardLike.classList.toggle('element__like_active');
  }

  // Метод удаления карточки
  _handleCardDelete() {
    this._element.remove();
  }

}


