
const navToggle = document.getElementById("navToggle");
const primaryNav = document.getElementById("primaryNav");

navToggle.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", isOpen);
});

primaryNav.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
        primaryNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
    }
});