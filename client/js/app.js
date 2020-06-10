import { Form } from "./form";
import { Hotel } from "./hotel";

const formHotelNode = document.querySelector("#form");

new Form(formHotelNode);

const HotelNode = document.querySelector("#hotel");

fetch("/api/data", { method: "GET" })
  .then((response) => response.json())
  .then((data) => new Hotel(HotelNode, data.list))
  .catch((error) => console.error(error));
