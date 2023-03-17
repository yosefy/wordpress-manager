export default class Section {
  constructor(modalSelector) {
    this._modal = document.querySelector(modalSelector);
    this._container = this._modal.querySelector('.modal-body');
    this._title = this._modal.querySelector('#modal-label');
  }

  removeTable() {
    this._container.removeChild(this._container.querySelector('div'));
  }

  appendTable(tableElement, title) {
    this._container.appendChild(tableElement);
    this._title.textContent = title;
  }
}
