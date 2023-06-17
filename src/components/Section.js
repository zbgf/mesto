export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  };

  renderElements (item) {
    item.forEach(element => {
      this._renderer(element)
    })
  };

  addItem (element) {
    this._containerSelector.prepend(element);
  };
}