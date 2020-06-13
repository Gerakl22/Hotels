import { Form } from "./form";
import { ListHotels } from "./listHotels";

const formHotelNode = document.querySelector("#form");

new Form(formHotelNode);

const listHotelsNode = document.querySelector("#listHotels");

fetch("/api/data", { method: "GET" })
  .then((response) => response.json())
  .then((data) => new ListHotels(listHotelsNode, data.list))
  .catch((error) => console.error(error));
