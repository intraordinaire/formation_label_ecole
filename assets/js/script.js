document.addEventListener("click", function (event) {
  if (!event.target.classList.contains("accordion-toggle")) return;

  var content = document.querySelector(event.target.hash);

  if (!content) return;
  event.preventDefault();

  if (content.classList.contains("active")) {
    content.classList.remove("active");
    return;
  }

  content.classList.toggle("active");
});
