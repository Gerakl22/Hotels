import { ListHotels } from "./listHotels";
import { InfoAboutHotel } from "./infoAboutHotel";
import { reset } from "./reset";

export class Form {
  constructor(form) {
    this.form = form;

    this.idForm = this.form.querySelector('[name="id"]');
    this.dateForm = this.form.querySelector('[name="date"]');
    this.button = document.querySelector('[type="submit"]');
    this.listHotels = document.querySelector("#listHotels");
    this.infoAboutHotel = document.querySelector("#infoAboutHotel");

    this._handleSubmitBtn = this._submit.bind(this);

    this._init();
  }

  _init() {
    this.button.addEventListener("click", this._handleSubmitBtn);
  }

  _createIndexDate() {
    const index = new Date().getTime();

    return index;
  }

  _createLocalDate() {
    const date = new Date();

    return (
      date.toLocaleDateString() + " " + date.toLocaleTimeString().slice(0, -3)
    );
  }

  _send(data, method) {
    let url = "/api/data";

    if (method == "PUT") url = url + `/${data.id}`;

    // Применение метода PUT для изменения Списка отелей при редактировании
    fetch(url, {
      method,
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => new ListHotels(this.listHotels, data.list))
      .catch((error) => console.error(error));

    // Применение метода PUT для изменения Информации отеля при редактировании
    const infoHotelNode = document.querySelector(".info-about-hotel");
    const id = infoHotelNode.getAttribute("data-index");

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) =>
        data.list.forEach((item) => {
          if (id == item.id) {
            new InfoAboutHotel(this.infoAboutHotel, item);
          }
        })
      )
      .catch((error) => console.error(error));
  }

  _setMetaData(id, date) {
    if (this.idForm.value && this.dateForm.value) return;

    this.idForm.value = id;
    this.dateForm.value = date;
  }

  _submit(event) {
    event.preventDefault();

    if (!this.form.checkValidity()) {
      this.form.classList.add("invalid");
    } else {
      this.form.classList.remove("invalid");

      this._setMetaData(this._createIndexDate(), this._createLocalDate());
      const currentMethod = this.form.getAttribute("data-method");

      const formData = new FormData(this.form);
      const data = {};

      for (const [name, value] of formData) {
        data[name] = value;
      }

      console.log(currentMethod);
      this._send(data, currentMethod);

      reset(this.form);
      $("#collapseExample").collapse("hide");
    }
  }
}
