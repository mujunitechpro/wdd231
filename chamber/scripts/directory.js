
const memberList = document.getElementById("memberList");
const resultCount = document.getElementById("resultCount");
const gridViewBtn = document.getElementById("gridViewBtn");
const listViewBtn = document.getElementById("listViewBtn");

const membershipInfo = {
    1: { label: "Member", modifier: "member" },
    2: { label: "Silver", modifier: "silver" },
    3: { label: "Gold", modifier: "gold" },
};

async function getMembers() {
    try {
        const response = await fetch("data/members.json");
        if (!response.ok) {
            throw new Error(`Network response was not ok (status ${response.status})`);
        }
        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        memberList.innerHTML = `<p>Sorry, member information could not be loaded right now.</p>`;
        console.error("Failed to load members.json:", error);
    }
}

function displayMembers(members) {
    resultCount.textContent = `${members.length} member businesses`;

    memberList.innerHTML = members
        .map((member) => {
            const tier = membershipInfo[member.membership] ?? membershipInfo[1];

            return `
        <article class="member-card member-card--${tier.modifier}">
          <span class="member-card__badge">${tier.label}</span>
          <img
            src="images/${member.image}"
            alt="${member.name} logo"
            class="member-card__image"
            loading="lazy"
            width="88"
            height="88"
          />
          <div class="member-card__body">
            <h2 class="member-card__name">${member.name}</h2>
            <p class="member-card__category">${member.category} &bull; est. ${member.founded}</p>
            <p class="member-card__description">${member.description}</p>
            <div class="member-card__meta">
              <span>${member.address}</span>
              <span>${member.phone}</span>
              <a href="${member.website}" target="_blank" rel="noopener">Visit website</a>
            </div>
          </div>
        </article>
      `;
        })
        .join("");
}

function setView(view) {
    const isGrid = view === "grid";
    memberList.classList.toggle("is-list-view", !isGrid);

    gridViewBtn.classList.toggle("is-active", isGrid);
    gridViewBtn.setAttribute("aria-pressed", isGrid);

    listViewBtn.classList.toggle("is-active", !isGrid);
    listViewBtn.setAttribute("aria-pressed", !isGrid);
}

gridViewBtn.addEventListener("click", () => setView("grid"));
listViewBtn.addEventListener("click", () => setView("list"));

getMembers();