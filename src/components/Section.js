//Класс, который отвечает за отрисовку элементов на странице
export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems(res) {
    res.forEach(this._renderer);
  }
}
