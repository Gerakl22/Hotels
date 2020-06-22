import { ListHotels } from "./listHotels";
import { resetForm } from "./reset";

export class Form {
  constructor(form) {
    this.form = form;

    this.idForm = this.form.querySelector('[name="id"]');
    this.dateForm = this.form.querySelector('[name="date"]');

    this.button = document.querySelector('[type="submit"]');

    this.listHotelsContainer = document.querySelector("#listHotels");
    this.listHotels = new ListHotels(this.listHotelsContainer);

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

  _convertStringAnotherInfoToHtml(anotherInfo) {
    const result = anotherInfo
      .replace(/(#{1})(.+)/gim, "<h1>$2</h1>")
      .replace(/(#{1,1})(.+)/gim, "<h2>$2</h2>")
      .replace(/(#{1,1})(.+)/gim, "<h3>$2</h3>")
      .replace(/(#{1,1})(.+)/gim, "<h4>$2</h4>")
      .replace(/(\*{2})(.+)(\*{2})/gim, "<strong>$2</strong>")
      .replace(/(\~{2})(.+)(\~{2})/gim, "<strike>$2</strike>")
      .replace(
        /(^(https):\/\/[a-z]+\.[a-z]+)/gim,
        '<a href="$1" target="blank" rel="noopener">$1</a>'
      )
      .replace(/-{3}/gim, "<hr>")
      .replace(/-\|/gim, "<br>")
      .replace(/(\+{2})(.+)(\+{2})/gim, '<span class="text-success">$2</span>')
      .replace(/(\-{2})(.+)(\-{2})/gim, '<span class="text-danger">$2</span>');

    return result;
  }

  _send(data, method) {
    let url = "/api/data";

    if (method == "PUT") url = url + `/${data.id}`;

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        this.listHotels.render(data.list);
      })
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

      data.convertHtml = this._convertStringAnotherInfoToHtml(data.anotherInfo);

      this._send(data, currentMethod);

      resetForm(this.form);
      $("#collapseExample").collapse("hide");
    }
  }
}
