import { Form } from "./form";
import { ListHotels } from "./listHotels";
import { reset } from "./reset";

const formHotelNode = document.querySelector("#form");
new Form(formHotelNode);

const addInfoBtnNode = document.querySelector("#addInfoBtn");
addInfoBtnNode.addEventListener("click", () => {
  formHotelNode.setAttribute("data-method", "POST");
  reset(formHotelNode);
  $("#collapseExample").collapse("show");
});

const listHotelsNode = document.querySelector("#listHotels");

fetch("/api/data", { method: "GET" })
  .then((response) => response.json())
  .then((data) => new ListHotels(listHotelsNode, data.list))
  .catch((error) => console.error(error));
