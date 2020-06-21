export class InfoAboutHotel {
  constructor(container) {
    this.container = container;
    this.data = {};

    this.deleteHotelItem = null;

    this._handleClickEditBtn = this._clickEditBtn.bind(this);
    this._handleClickDeleteBtn = this._clickDeleteBtn.bind(this);

    // this._init();
  }

  // _init() {

  // }

  _createEditBtn(id) {
    const btnEditNode = document.createElement("button");

    btnEditNode.classList.value = "btn btn-warning";
    btnEditNode.textContent = "Редактировать";
    btnEditNode.setAttribute("data-id", id);

    btnEditNode.addEventListener("click", this._handleClickEditBtn);

    return btnEditNode;
  }

  _createDeleteBtn(id) {
    const btnDeleteNode = document.createElement("button");

    btnDeleteNode.classList.value = "btn btn-danger";
    btnDeleteNode.textContent = "Удалить";
    btnDeleteNode.setAttribute("data-id", id);

    btnDeleteNode.addEventListener("click", this._handleClickDeleteBtn);

    return btnDeleteNode;
  }

  _createWrapBtnDiv() {
    const divWrapBtnNode = document.createElement("div");
    divWrapBtnNode.classList.value = " btn-wrap mt-auto";

    return divWrapBtnNode;
  }

  _clickEditBtn(event) {
    const idEditBtn = event.currentTarget.getAttribute("data-id");

    const form = document.querySelector("#form");
    const nameHotelNode = form.querySelector('[name="nameHotel"]');
    const cityNode = form.querySelector('[name="city"]');
    const addressNode = form.querySelector('[name="address"]');
    const starsNode = form.querySelector('[name="stars"]');
    const anotherInfoNode = form.querySelector('[name="anotherInfo"]');
    const gridCheckNode = form.querySelector('[name="gridCheck"]');
    const idFormNode = form.querySelector('[name="id"]');
    const dateFormNode = form.querySelector('[name="date"]');

    form.setAttribute("data-method", "PUT");

    fetch("/api/data", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        data.list.forEach((item) => {
          if (item.id == idEditBtn) {
            nameHotelNode.value = item.nameHotel;
            cityNode.value = item.city;
            addressNode.value = item.address;
            starsNode.value = item.stars;
            anotherInfoNode.value = item.anotherInfo;
            gridCheckNode.value = item.gridCheckNode;
            idFormNode.value = item.id;
            dateFormNode.value = item.date;

            $("#collapseExample").collapse("show");
          }
        });
      })
      .catch((error) => console.error(error));
  }

  _clickDeleteBtn(event) {
    const idDeleteBtn = event.currentTarget.getAttribute("data-id");

    fetch(`/api/data/${idDeleteBtn}`, { method: "DELETE" })
      .then((response) => response.json())
      .then((data) => {
        this._clear();

        if (this.deleteHotelItem) {
          this.deleteHotelItem(data.list);
        }
      });
  }

  _clear() {
    this.container.innerHTML = "";
  }

  render(data, deleteHotelItem) {
    this.data = data;
    this.deleteHotelItem = deleteHotelItem;

    const btnEditNode = this._createEditBtn(this.data.id);
    const btnDeleteNode = this._createDeleteBtn(this.data.id);
    const divWrapBtnNode = this._createWrapBtnDiv();

    const template = `
          <h5 class='hotel-date'>${this.data.date}</h5>
          <div class='hotel-address'>Адрес: ${this.data.address}</div>
          <div class='hotel-stars'>Количество звезд: ${this.data.stars}</div>
          <div class='hotel-anotherInfo'>Дополнительная информация: ${this.data.convertHtml}</div>
    `;

    this._clear();
    this.container.innerHTML = this.container.innerHTML + template;

    divWrapBtnNode.append(btnEditNode, btnDeleteNode);
    this.container.append(divWrapBtnNode);
  }
}
