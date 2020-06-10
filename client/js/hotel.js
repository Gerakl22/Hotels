import { AddInfo } from "./addInfo";

export class Hotel {
  constructor(container, data) {
    this.container = container;
    this.data = data;
    this.addInfo = document.querySelector("#addInfo");

    this._handleClickHotel = this._clickHotel.bind(this);

    this._init();
  }

  _init() {
    this.render();
    this.container.addEventListener("click", this._handleClickHotel);
  }

  _clickHotel(event) {
    const target = event.target;

    if (target.tagName == "H6") {
      const id = target.getAttribute("data-id");

      fetch("/api/data", { method: "GET" })
        .then((response) => response.json())
        .then((data) => {
          data.list.forEach((item) => {
            if (id == item.id) {
              new AddInfo(this.addInfo, item);
            }
          });
        })
        .catch((error) => console.error(error));
    }
  }

  _clear() {
    this.container.innerHTML = "";
  }

  render() {
    this._clear();

    this.data.forEach((item) => {
      const template = `
            <h6 class="hotel-item p-2" data-id="${item.id}" id="hotelItem">${item.nameHotel} в городе ${item.city}</h6>
            <h6 class='hotel-date-item'>${item.date}</h6>
       `;

      this.container.innerHTML = this.container.innerHTML + template;
    });
  }
}
