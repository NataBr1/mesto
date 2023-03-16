import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super (popupSelector);
    this._popupPhoto = this._popupElement.querySelector('.view__photo');
    this._popupCaption = this._popupElement.querySelector('.view__caption');
  }

  open(name,link) {
    super.open();
    this._popupCaption.textContent = name;
    this._popupPhoto.src = link;
    this._popupPhoto.alt = name;
  }
}
