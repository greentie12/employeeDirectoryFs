/**
 * query parameter includes only ->
 * Name, Location, Picture, Email, Cell, DOB
 * with a nationality of US and a result of 12 users
 */
const queryParameter =
  "?nat=us&results=12&inc=name,location,picture,email,cell,dob";

const SEARCH_URL = `https://randomuser.me/api/${queryParameter}`;

const gallery = document.getElementById("gallery");

// console.log(SEARCH_URL);

let studentArr = [];

retrieveStudents(SEARCH_URL);

async function retrieveStudents(url) {
  const response = await fetch(url);
  const studentData = await response.json();
  console.log(studentData);

  appendStudents(studentData.results);
}

const appendStudents = (students) => {
  studentArr = students;

  studentArr.forEach((student, index) => {
    let { name, email, location, picture } = student;
    let fullName = `${name.first} ${name.last}`;
    let studentLocation = `${location.city}, ${location.state}`;
    let studentCard = document.createElement("div");

    studentCard.classList.add("card");
    studentCard.setAttribute("data-index", `${index}`);

    studentCard.insertAdjacentHTML(
      "beforeend",
      `
	  	<div class="card-img-container">
			<img class="card-img" src="${picture.large}" alt="image of ${name.first}">
		</div>
		<div class="card-info-container">
			<h3 id="name" class="card-name cap">${fullName} </h3>
			<p class="card-text">${email}</p>
			<p class="card-text cap">${studentLocation}</p>
		</div>
	`
    );
    gallery.appendChild(studentCard);
  });
};
