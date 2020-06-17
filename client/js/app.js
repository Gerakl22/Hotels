import { Form } from "./form";
import { ListHotels } from "./listHotels";
import { resetForm } from "./reset";

const formHotelNode = document.querySelector("#form");
new Form(formHotelNode);

const listHotelsContainer = document.querySelector("#listHotels");
const listHotels = new ListHotels(listHotelsContainer);

const addInfoBtnNode = document.querySelector("#addInfoBtn");
addInfoBtnNode.addEventListener("click", () => {
  formHotelNode.setAttribute("data-method", "POST");
  resetForm(formHotelNode);
  $("#collapseExample").collapse("show");
});

fetch("/api/data", { method: "GET" })
  .then((response) => response.json())
  .then((data) => listHotels.render(data.list))
  .catch((error) => console.error(error));
