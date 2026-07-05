
const currentYearSpan = document.getElementById("currentYear");
currentYearSpan.textContent = new Date().getFullYear();

const lastModifiedParagraph = document.getElementById("lastModified");
lastModifiedParagraph.textContent = `Last Modification: ${document.lastModified}`;