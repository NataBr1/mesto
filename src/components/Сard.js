export default class Card {
  constructor (data,templateSelector, handleCardClick, {deleteCard}, id) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._id = id;// мой айди
    this._cardOwnerId = data.owner._id; // айди автора карточки
    this._cardId = data._id;// айди карточки

    this._deleteCard = deleteCard;
  }

  // Метод возвращения разметки карточки
  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }

  // Публичный метод возвращающий готовую разметку карточки
  generateCard() {
    this._element = this._getTemplate();

    this._cardPhoto = this._element.querySelector('.element__photo');
    this._cardName = this._element.querySelector('.element__title');
    this._cardLike = this._element.querySelector('.element__like');
    this._cardDelete = this._element.querySelector('.element__delete');
    this._likesCounter = this._element.querySelector('.element__like-number');

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

  if (this._id === this._cardOwnerId) {
    this._cardDelete.addEventListener('click', () => {
      this._deleteCard(this._cardId);
    });
  } else {this._cardDelete.remove()};

    this._cardPhoto.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  // Метод лайка
  _handleLikeClick() {
    this._cardLike.classList.toggle('element__like_active');
  }

  // Метод удаления карточки
  handleCardDelete() {
    this._element.remove();
    this._element = null;
  }
}
