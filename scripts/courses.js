

const courses = [
    {
        subject: "CSEPC",
        number: 110,
        title: "Introduction to Programming",
        credits: 2,
        certificate: "Web and Computer Programming",
        completed: true,
    },
    {
        subject: "WDD",
        number: 130,
        title: "Web Fundamentals",
        credits: 2,
        certificate: "Web and Computer Programming",
        completed: true,
    },
    {
        subject: "CSE",
        number: 111,
        title: "Programming with Functions",
        credits: 2,
        certificate: "Web and Computer Programming",
        completed: true,
    },
    {
        subject: "CSE",
        number: 210,
        title: "Programming with Classes",
        credits: 2,
        certificate: "Web and Computer Programming",
        completed: true,
    },
    {
        subject: "WDD",
        number: 131,
        title: "Dynamic Web Fundamentals",
        credits: 2,
        certificate: "Web and Computer Programming",
        completed: true,
    },
    {
        subject: "WDD",
        number: 231,
        title: "Frontend Web Development I",
        credits: 2,
        certificate: "Web and Computer Programming",
        completed: false,
    },
];

const courseList = document.getElementById("courseList");
const courseTotal = document.getElementById("courseTotal");
const filterButtons = document.querySelectorAll(".filter-btn");

function renderCourses(filter) {
    const filtered =
        filter === "all"
            ? courses
            : courses.filter((course) => course.subject === filter);

    courseList.innerHTML = filtered
        .map((course) => {
            const completedClass = course.completed ? " course-card--completed" : "";
            return `
        <div class="course-card${completedClass}">
          <div class="course-card__title">
            <span class="course-card__code">${course.subject} ${course.number}</span>
            <span class="course-card__name">${course.title}</span>
          </div>
          <span class="course-card__credits">${course.credits} cr</span>
        </div>
      `;
        })
        .join("");

    const totalCredits = filtered.reduce((sum, course) => sum + course.credits, 0);
    courseTotal.textContent = `The total credits for course listed above is ${totalCredits}`;
}

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        filterButtons.forEach((btn) => btn.classList.remove("is-active"));
        button.classList.add("is-active");
        renderCourses(button.dataset.filter);
    });
});

renderCourses("all");