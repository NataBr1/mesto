export default class Card {
  constructor (data,templateSelector, handleCardClick, {deleteCard, handleLikeClick}, id) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._id = id;// мой айди
    this._cardOwnerId = data.owner._id; // айди автора карточки
    this._cardId = data._id;// айди карточки
    this._deleteCard = deleteCard;
    this._likes = data.likes;
    this._handleLikeClick = handleLikeClick;
    this.getCardId = this.getCardId.bind(this);
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

    this._likesCounter.textContent = this._likes.length;
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

  // Метод удаления карточки
  handleCardDelete() {
    this._element.remove();
    this._element = null;
  }

// Метод лайка
  _handleLikeClick() {
    this._cardLike.classList.toggle('element__like_active');

  }

  toggleLikeState(calc) {
    this.checkOwnerLike() ? this.addLike() : this.deleteLike();
    this._likesCounter.textContent = calc;
  }

  checkOwnerLike() {
    return this._likes.some((user) => user._id === this._id);
  }

  addLike() {
    this._cardLike.classList.add('element__like_active');
  }

  deleteLike() {
    this._cardLike.classList.remove('element__like_active');
  }

  getCardId() {
    console.log(this._cardId);
    return this._cardId;
  }
}



// _showCounterLike() {
//   if (this._likes.length >= 1) {
//     this._likesCounter.textContent = this._likes.length;
//   } else {this._likesCounter.remove()};
// }
