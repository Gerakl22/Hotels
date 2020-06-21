import { InfoAboutHotel } from "./infoAboutHotel";

export class ListHotels {
  constructor(container) {
    this.container = container;
    this.data = [];

    this.idActiveHotelItem = null;
    this.idDeleteHotelItem = null;

    this.infoAboutHotelContainer = document.querySelector("#infoAboutHotel");
    this.infoAboutHotel = new InfoAboutHotel(this.infoAboutHotelContainer);

    this._handleClickListHotels = this._clickListHotels.bind(this);
    this._handleClickDeleteBtn = this._clickDeleteBtn.bind(this);

    this._init();
  }

  _init() {
    this.container.addEventListener("click", this._handleClickListHotels);
    this.container.addEventListener("click", this._handleClickDeleteBtn);
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

  _selectDeleteBtn(idBtnDelete) {
    const target = this.container.querySelector(`[data-id="${idBtnDelete}"]`);

    if (target) {
      this.idDeleteHotelItem = idBtnDelete;

      fetch(`/api/data/${idBtnDelete}`, { method: "DELETE" })
        .then((response) => response.json())
        .then((data) => this.render(data.list))
        .catch((error) => console.error(error));
    } else {
      this.idBtnDelete = null;
    }
  }

  _clickDeleteBtn(event) {
    const target = event.target;

    if (target.classList.value.includes("btn-delete-hotel-item")) {
      const idBtnDelete = target.getAttribute("data-id");

      this._selectDeleteBtn(idBtnDelete);
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
              <button class='btn btn-danger btn-delete-hotel-item ml-auto' data-id="${item.id}">Удалить</button>
            </div>  
       `;

      this.container.innerHTML = this.container.innerHTML + template;
    });

    if (this.idActiveHotelItem) {
      this._selectListHotels(this.idActiveHotelItem);
    }

    if (this.idDeleteHotelItem) {
      this._selectDeleteBtn(this.idDeleteHotelItem);
    }
  }
}
