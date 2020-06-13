import { InfoAboutHotel } from "./infoAboutHotel";

export class ListHotels {
  constructor(container, data) {
    this.container = container;
    this.data = data;
    this.infoAboutHotel = document.querySelector("#infoAboutHotel");
    this.activeListHotels = null;

    this._handleClickListHotels = this._clickListHotels.bind(this);

    this._init();
  }

  _init() {
    this.render();
    this.container.addEventListener("click", this._handleClickListHotels);
  }

  _removeActive() {
    if (!this.activeListHotels) return;

    this.activeListHotels.classList.remove("active");
  }

  _clickListHotels(event) {
    const target = event.target;

    if (target.classList.value.includes("hotel-item")) {
      const id = target.getAttribute("data-id");

      target.classList.add("active");
      this._removeActive();
      this.activeListHotels = target;

      fetch("/api/data", { method: "GET" })
        .then((response) => response.json())
        .then((data) => {
          data.list.forEach((item) => {
            if (id == item.id) {
              new InfoAboutHotel(this.infoAboutHotel, item);
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
            <div class="hotel-item p-2" data-id="${item.id}"> 
              <h6 id="hotelItem">${item.nameHotel} в городе ${item.city}</h6>
              <h7 class='hotel-date-item'>${item.date}</h7>
            </div>  
       `;

      this.container.innerHTML = this.container.innerHTML + template;
    });
  }
}
