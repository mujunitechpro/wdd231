

const spotlightList = document.getElementById("spotlightList");

const membershipInfo = {
    2: { label: "Silver Member", modifier: "silver" },
    3: { label: "Gold Member", modifier: "gold" },
};

function pickRandomSpotlights(members, count) {
    const shuffled = [...members].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

async function loadSpotlights() {
    try {
        const response = await fetch("data/members.json");
        if (!response.ok) {
            throw new Error(`Network response was not ok (status ${response.status})`);
        }
        const members = await response.json();

        const eligible = members.filter((member) => member.membership === 2 || member.membership === 3);

      
        const spotlightCount = eligible.length >= 3 ? 3 : Math.min(2, eligible.length);
        const spotlights = pickRandomSpotlights(eligible, spotlightCount);

        displaySpotlights(spotlights);
    } catch (error) {
        spotlightList.innerHTML = `<p>Member spotlights are temporarily unavailable.</p>`;
        console.error("Failed to load spotlights:", error);
    }
}

function displaySpotlights(members) {
    spotlightList.innerHTML = members
        .map((member) => {
            const tier = membershipInfo[member.membership];

            return `
        <article class="spotlight-card">
          <span class="spotlight-card__badge spotlight-card__badge--${tier.modifier}">${tier.label}</span>
          <img
            src="images/${member.image}"
            alt="${member.name} logo"
            class="spotlight-card__image"
            loading="lazy"
            width="80"
            height="80"
          />
          <h3 class="spotlight-card__name">${member.name}</h3>
          <p class="spotlight-card__meta">${member.phone}</p>
          <p class="spotlight-card__meta">${member.address}</p>
          <a href="${member.website}" target="_blank" rel="noopener" class="spotlight-card__link">Visit website</a>
        </article>
      `;
        })
        .join("");
}

loadSpotlights();