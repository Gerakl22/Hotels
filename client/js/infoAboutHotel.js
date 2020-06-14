export class InfoAboutHotel {
  constructor(container, data) {
    this.container = container;
    this.data = data;

    this._init();
  }

  _init() {
    this.render();
  }

  _createEditBtn(id) {
    const btnEdit = document.createElement("button");

    btnEdit.classList.value = "btn btn-warning mt-auto";
    btnEdit.textContent = "Редактировать";
    btnEdit.setAttribute("data-id", id);
    btnEdit.addEventListener("click", this._clickEditBtn);

    return btnEdit;
  }

  _clickEditBtn(event) {
    const id = event.currentTarget.getAttribute("data-id");
    const form = document.querySelector("#form");
    const nameHotelNode = form.querySelector('[name="nameHotel"]');
    const cityNode = form.querySelector('[name="city"]');
    const addressNode = form.querySelector('[name="address"]');
    const starsNode = form.querySelector('[name="stars"]');
    const anotherInfoNode = form.querySelector('[name="anotherInfo"]');
    const gridCheckNode = form.querySelector('[name="gridCheck"]');
    const idNode = form.querySelector('[name="id"]');
    const dateNode = form.querySelector('[name="date"]');

    form.setAttribute("data-method", "PUT");

    fetch("/api/data", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        data.list.forEach((item) => {
          if (item.id == id) {
            nameHotelNode.value = item.nameHotel;
            cityNode.value = item.city;
            addressNode.value = item.address;
            starsNode.value = item.stars;
            anotherInfoNode.value = item.anotherInfo;
            gridCheckNode.value = item.gridCheckNode;
            idNode.value = item.id;
            dateNode.value = item.date;

            $("#collapseExample").collapse("show");
          }
        });
      })
      .catch((error) => console.error(error));
  }

  _clear() {
    this.container.innerHTML = "";
  }

  render() {
    const btnEdit = this._createEditBtn(this.data.id);

    const template = `
        <h5 class='hotel-date'>${this.data.date}</h5>
        <div class='hotel-address'>Адрес: ${this.data.address}</div>
        <div class='hotel-stars'>Количество звезд: ${this.data.stars}</div>
        <div class='hotel-anotherInfo'>Дополнительная информация: ${this.data.anotherInfo}</div>
    `;

    this._clear();
    this.container.innerHTML = this.container.innerHTML + template;
    this.container.append(btnEdit);
  }
}
