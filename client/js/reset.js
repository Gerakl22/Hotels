export function reset(form) {
  form.reset();

  [...form.querySelectorAll('[type="hidden"]')].forEach((input) => {
    input.value = "";
  });
}
