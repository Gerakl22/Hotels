export class InfoAboutHotel {
  constructor(container, data) {
    this.container = container;
    this.data = data;

    console.log(this.container, this.data);

    this._init();
  }

  _init() {
    this.render();
  }

  _clear() {
    this.container.innerHTML = "";
  }

  render() {
    this._clear();

    const template = `
        <h5 class='hotel-date'>${this.data.date}</h5>
        <div class='hotel-address'>Адрес: ${this.data.address}</div>
        <div class='hotel-stars'>Количество звезд: ${this.data.stars}</div>
        <div class='hotel-anotherInfo'>Дополнительная информация: ${this.data.anotherInfo}</div>
    `;

    this.container.innerHTML = this.container.innerHTML + template;
  }
}
