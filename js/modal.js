const body = document.querySelector("body");

const displayModal = (index) => {
  let {
    name,
    dob,
    cell,
    email,
    location: { city, street, state, postcode },
    picture,
  } = studentArr[index];

  let fullName = `${name.first} ${name.last}`;
  let fullAddress = `${street.number} ${street.name}, ${state} ${postcode}`;
  let formatDob = new Date(dob.date);
  formatDob = `${formatDob.getMonth()}/${formatDob.getDate()}/${formatDob.getYear()}`;

  body.insertAdjacentHTML(
    "beforeend",
    `
  	<div class="modal-container">
    	<div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
          <div class="modal-info-container">
            <img class="modal-img" src="${picture.large}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${fullName}</h3>
            <p class="modal-text">${email}</p>
            <p class="modal-text cap">${city}</p>
            <hr>
            <p class="modal-text">${cell}</p>
            <p class="modal-text">${fullAddress}</p>
            <p class="modal-text">Birthday: ${formatDob}</p>
            <p id="index">${index}</p>
          </div>
      </div>

		  <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
      </div>
    </div>
`
  );
};

/** When the user clicks only inside the
 * .card class the modal opens with the
 * student info */
const mainEvent = (e) => {
  if (e.target !== gallery) {
    let card = e.target.closest(".card");
    let index = card.getAttribute("data-index");
    displayModal(index);
  }
};

gallery.addEventListener("click", mainEvent);

/** When the user clicks on the "X" button
 * inside the modal or anywhere outside
 * the modal window -> the modal closes
 */
body.onclick = function (e) {
  let modalContainer = document.querySelector(".modal-container");
  let modalCloseButton = document.getElementById("modal-close-btn");
  if (
    e.target === modalCloseButton ||
    e.target.textContent === "X" ||
    e.target === modalContainer
  ) {
    body.removeChild(modalContainer);
  }
};

/* When the user clicks "PREV" or "NEXT"
the repective student is shown */
window.onclick = function (e) {
  if (e.target.classList.contains("modal-prev")) {
    let index = document.getElementById("index");
    let value = index.textContent;
    value = Number(value);
    let prev = value - 1;
    let modalContainer = document.querySelector(".modal-container");
    body.removeChild(modalContainer);
    if (prev < 0) {
      prev = studentArr.length - 1;
    }
    displayModal(prev);
  } else if (e.target.classList.contains("modal-next")) {
    let index = document.getElementById("index");
    let value = index.textContent;
    value = Number(value);
    let next = value + 1;
    let modalContainer = document.querySelector(".modal-container");
    body.removeChild(modalContainer);
    if (next > studentArr.length - 1) {
      next = 0;
    }
    displayModal(next);
  }
};
