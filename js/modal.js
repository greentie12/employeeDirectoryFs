const body = document.querySelector("body");

const displayModal = (index) => {
  const {
    name,
    dob,
    cell,
    email,
    location: { city, street, state, postcode },
    picture,
  } = employeeArr[index];

  const fullName = `${name.first} ${name.last}`;
  const fullAddress = `${street.number} ${street.name}, ${state} ${postcode}`;

  // formatted cell # to match (111) 111-1111
  let cellArray = cell.split("");
  cellArray[5] = " ";
  let revisedCell = cellArray.join("");

  // formatted dob to match MM/DD/YYYY
  let formatDob = dob.date;
  let monthAndDay = formatDob.substr(5, 6);
  monthAndDay = monthAndDay.substr(0, 5);
  let year = formatDob.substr(0, 4);

  formatDob = `${monthAndDay}/${year}`;
  formatDob = formatDob.split("");
  formatDob[2] = "/";
  formatDob = formatDob.join("");

  body.insertAdjacentHTML(
    "beforeend",
    `
  	<div class="modal-container">
    	<div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
          <div class="modal-info-container">
            <img class="modal-img" src="${picture.large}" alt="picture of ${fullName}">
            <h3 id="name" class="modal-name cap">${fullName}</h3>
            <p class="modal-text">${email}</p>
            <p class="modal-text cap">${city}</p>
            <hr>
            <p class="modal-text">${revisedCell}</p>
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
 * employee info */
const mainEvent = (e) => {
  if (e.target !== gallery) {
    const card = e.target.closest(".card");
    const index = card.getAttribute("data-index");
    displayModal(index);
  }
};

gallery.addEventListener("click", mainEvent);

/** When the user clicks on the "X" button
 * inside the modal or anywhere outside
 * the modal window -> the modal closes
 */
body.onclick = function (e) {
  const modalContainer = document.querySelector(".modal-container");
  const modalCloseButton = document.getElementById("modal-close-btn");
  if (
    e.target === modalCloseButton ||
    e.target.textContent === "X" ||
    e.target === modalContainer
  ) {
    body.removeChild(modalContainer);
  }
};

/* When the user clicks "PREV" or "NEXT"
the repective employee is shown */
window.onclick = function (e) {
  if (e.target.classList.contains("modal-prev")) {
    const index = document.getElementById("index");
    let value = index.textContent;
    value = Number(value);
    let prev = value - 1;
    const modalContainer = document.querySelector(".modal-container");
    body.removeChild(modalContainer);
    if (prev < 0) {
      prev = employeeArr.length - 1;
    }
    displayModal(prev);
  } else if (e.target.classList.contains("modal-next")) {
    const index = document.getElementById("index");
    let value = index.textContent;
    value = Number(value);
    let next = value + 1;
    const modalContainer = document.querySelector(".modal-container");
    body.removeChild(modalContainer);
    if (next > employeeArr.length - 1) {
      next = 0;
    }
    displayModal(next);
  }
};
