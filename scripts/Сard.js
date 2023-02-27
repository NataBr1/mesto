export default class Card {
  constructor (data, zoomPhoto) {
    this._name = data.name;
    this._link = data.link;
    this._zoomPhoto = zoomPhoto;
  }

  _getTamplate() {
    const cardElement = document
    .querySelector('#cards')
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }

  // Публичный метод возвращающий готовую разметку карточки
  generateCard() {
    this._element = this._getTamplate();

    this._element.querySelector('.element__photo').src = this._link;
    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__photo').alt = this._name;

    this._setEventListners();

    return this._element;
  }

  // Слушатели
  _setEventListners() {
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._handleLikeClick();
    });
    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._element.remove();
    });
    this._element.querySelector('.element__photo').addEventListener('click', () => {
      this._zoomPhoto(this._name, this._link);
    });
  }

  // Метод лайка
  _handleLikeClick() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }
}


