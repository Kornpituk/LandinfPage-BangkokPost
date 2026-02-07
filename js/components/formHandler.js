export function initFormHandler() {
  document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Thank you for your submission!");
      form.reset();
    });
  });
}
