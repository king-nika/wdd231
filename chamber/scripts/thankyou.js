const userInfo = new URLSearchParams(window.location.search);
const container = document.querySelector("main");

container.innerHTML = `
    <h1>Congratulations ${userInfo.get("firstName")} ${userInfo.get(
  "lastName"
)}!</h1>
    <span>You have successfully joined the Ibadan Chamber of Commerce.</span>

    <div class="info">
        <h2>Your Information</h2>
        <p><strong>First Name:</strong> ${userInfo.get("firstName")}</p>
        <p><strong>Last Name:</strong> ${userInfo.get("lastName")}</p>
        <p><strong>Email:</strong> ${userInfo.get("email")}</p>
        <p><strong>Mobile:</strong> ${userInfo.get("mobile")}</p>
        <p><strong>Organisation Name:</strong> ${userInfo.get(
          "organisationName"
        )}</p>
        <p><strong>Membership Level:</strong> ${userInfo.get(
          "membershipLevel"
        )}</p>
        <p><strong>Business Description:</strong> ${userInfo.get(
          "businessDescription"
        )}</p>
        <p><strong>Timestamp:</strong> ${userInfo.get("timestamp")}</p>
    </div>

    <span>Thank you for joining the Ibadan Chamber of Commerce.</span>
`;
