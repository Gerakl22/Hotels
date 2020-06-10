import { Hotel } from "./hotel";

export class Form {
  constructor(form) {
    this.form = form;
    this.button = document.querySelector("#btnSubmit");
    this.hotel = document.querySelector("#hotel");

    this._handleSubmitBtn = this._submit.bind(this);

    this._init();
  }

  _init() {
    this.button.addEventListener("click", this._handleSubmitBtn);
  }

  _send(data) {
    const url = "/api/data";

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => new Hotel(this.hotel, data.list))
      .catch((error) => console.error(error));
  }

  _submit(event) {
    event.preventDefault();

    if (!this.form.checkValidity()) {
      this.form.classList.add("invalid");
    } else {
      this.form.classList.remove("invalid");

      const indexDate = new Date();
      const time =
        new Date().toLocaleDateString() +
        " " +
        new Date().toLocaleTimeString().slice(0, -3);

      const formData = new FormData(this.form);
      formData.append("id", indexDate.getTime());
      formData.append("date", time);

      const data = {};

      for (let [name, value] of formData) {
        data[name] = value;
      }

      this._send(data);

      this.form.reset();
    }
  }
}
