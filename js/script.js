/**
 * query parameter includes only ->
 * Name, Location, Picture, Email, Cell, DOB
 * with a nationality of US and a result of 12 users
 */
const queryParameter =
  "?nat=us&results=12&inc=name,location,picture,email,cell,dob";

const SEARCH_URL = `https://randomuser.me/api/${queryParameter}`;

const gallery = document.getElementById("gallery");
const searchContainer = document.querySelector(".search-container");

let employeeArr = [];

retrieveEmployees(SEARCH_URL);

async function retrieveEmployees(url) {
  const response = await fetch(url);
  const employeeData = await response.json();

  appendEmployees(employeeData.results);
}

const appendEmployees = (employees) => {
  employeeArr = employees;

  employeeArr.forEach((employee, index) => {
    let { name, email, location, picture } = employee;
    let fullName = `${name.first} ${name.last}`;
    let employeeLocation = `${location.city}, ${location.state}`;
    let employeeCard = document.createElement("div");

    employeeCard.classList.add("card");
    employeeCard.setAttribute("data-index", `${index}`);

    employeeCard.insertAdjacentHTML(
      "beforeend",
      `
	  	<div class="card-img-container">
			<img class="card-img" src="${picture.large}" alt="image of ${name.first}">
		</div>
		<div class="card-info-container">
			<h3 id="name" class="card-name cap">${fullName} </h3>
			<p class="card-text">${email}</p>
			<p class="card-text cap">${employeeLocation}</p>
		</div>
	`
    );
    gallery.appendChild(employeeCard);
  });
};
