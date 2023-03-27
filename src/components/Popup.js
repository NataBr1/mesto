//Класс, который отвечает за открытие и закрытие попапа
export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  //метод, который содержит логику закрытия попапа клавишей Esc
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
        this.close();
      };
    };

  //метод, который добавляет слушатель клика иконке закрытия попапа
  setEventListeners() {
    this._popupElement.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      } if (evt.target.classList.contains('popup__closed')) {
        this.close();
      }
    })
  };
}
