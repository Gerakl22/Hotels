import { Form } from "./form";
import { ListHotels } from "./listHotels";
import { resetForm } from "./reset";
import "./regexp";

const formHotelNode = document.querySelector("#form");
new Form(formHotelNode);

const addInfoBtnNode = document.querySelector("#addInfoBtn");

addInfoBtnNode.addEventListener("click", () => {
  formHotelNode.setAttribute("data-method", "POST");
  resetForm(formHotelNode);
  $("#collapseExample").collapse("show");
});

const listHotelsContainer = document.querySelector("#listHotels");
const listHotels = new ListHotels(listHotelsContainer);

fetch("/api/data", { method: "GET" })
  .then((response) => response.json())
  .then((data) => listHotels.render(data.list))
  .catch((error) => console.error(error));
