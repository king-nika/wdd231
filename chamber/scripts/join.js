document.addEventListener("DOMContentLoaded", () => {
  const timestampInput = document.getElementById("timestamp");
  timestampInput.value = new Date().toISOString();
});

const dialogBox = document.getElementById("dialogBox");
const membershipContainer = document.getElementById("membershipLevel");
const memberships = [
  {
    name: "NP Membership",
    description:
      "Designed for non-profit organizations. This membership tier is free of charge and offers foundational benefits to help connect and engage with the business community.",
    benefits: [
      "Access to general networking events",
      "Non-profit directory listing",
      "Opportunities to participate in community service collaborations",
    ],
  },
  {
    name: "Bronze Membership",
    description:
      "Entry-level membership for small businesses looking to gain visibility and build their network within the community.",
    benefits: [
      "Basic directory listing",
      "Access to networking events",
      "Member-only newsletter",
      "Event participation discounts",
    ],
  },
  {
    name: "Silver Membership",
    description:
      "Mid-tier membership offering expanded promotional opportunities and additional resources to help your business grow.",
    benefits: [
      "Enhanced directory listing with logo",
      "Training workshops and business seminars",
      "Priority invitations to networking events",
      "Social media spotlights",
      "Event participation discounts",
    ],
  },
  {
    name: "Gold Membership",
    description:
      "Premium membership designed for businesses seeking maximum exposure and influence within the chamber and local community.",
    benefits: [
      "Homepage spotlight advertisement",
      "Featured business blog opportunity",
      "Exclusive invites to VIP events",
      "Priority booth placement at chamber expos",
      "Full access to all trainings and seminars",
      "Custom business consultation sessions",
    ],
  },
];

const displayModal = (membership) => {
  dialogBox.innerHTML = "";
  dialogBox.innerHTML = `
    <h2>${membership.name}</h2>
    <button id="closeModal">&times;</button>

    <p>${membership.description}</p>

    <h3>Benefits</h3>
    <ul>
        ${membership.benefits
          .map((benefit) => "<li>" + benefit + "</li>")
          .join("")}
    </ul>
  `;

  document
    .getElementById("closeModal")
    .addEventListener("click", () => dialogBox.close());

  dialogBox.showModal();
};

const displayMembership = (membership) => {
  const div = document.createElement("div");
  const title = document.createElement("h2");
  const button = document.createElement("button");

  title.textContent = membership.name;
  button.textContent = "Learn More";
  button.addEventListener("click", () => displayModal(membership));

  div.appendChild(title);
  div.appendChild(button);

  membershipContainer.appendChild(div);
};

memberships.forEach((membership) => {
  displayMembership(membership);
});
