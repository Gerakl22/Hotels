import { InfoAboutHotel } from "./infoAboutHotel";

export class ListHotels {
  constructor(container) {
    this.container = container;
    this.data = [];

    this.idActiveHotelItem = null;

    this.infoAboutHotelContainer = document.querySelector("#infoAboutHotel");
    this.infoAboutHotel = new InfoAboutHotel(this.infoAboutHotelContainer);

    this._handleClickListHotels = this._clickListHotels.bind(this);

    this._init();
  }

  _init() {
    this.container.addEventListener("click", this._handleClickListHotels);
  }

  _removeActive() {
    const target = this.container.querySelector(
      `[data-id="${this.idActiveHotelItem}"]`
    );

    if (target) {
      target.classList.remove("active");
    } else {
      this.idActiveHotelItem = null;
    }
  }

  _selectListHotels(idHotelItem) {
    const target = this.container.querySelector(`[data-id="${idHotelItem}"]`);

    if (target) {
      this._removeActive();
      this.idActiveHotelItem = idHotelItem;
      target.classList.add("active");
    } else {
      this.idActiveHotelItem = null;
    }

    this.data.forEach((item) => {
      if (idHotelItem == item.id) {
        this.infoAboutHotel.render(item, this.render.bind(this));
      }
    });
  }

  _clickListHotels(event) {
    const target = event.target;

    if (target.classList.value.includes("hotel-item")) {
      const idHotelItem = target.getAttribute("data-id");

      this._selectListHotels(idHotelItem);
    }
  }

  _clear() {
    this.container.innerHTML = "";
  }

  render(data) {
    this.data = data;
    this._clear();

    this.data.forEach((item) => {
      const template = `
            <div class="hotel-item p-2" data-id="${item.id}"> 
              <h6>${item.nameHotel} в городе ${item.city}</h6>
              <h6 class='hotel-date-item'>${item.date}</h6>
            </div>  
       `;

      this.container.innerHTML = this.container.innerHTML + template;
    });

    if (this.idActiveHotelItem) {
      this._selectListHotels(this.idActiveHotelItem);
    }
  }
}
