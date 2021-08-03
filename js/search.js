const appendSearch = () => {
  let form = document.createElement("form");
  form.action = "#";
  form.method = "get";
  form.insertAdjacentHTML(
    "beforeend",
    `
	  <input type="search" id="search-input" class="search-input" placeholder="Search...">
	  <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
	`
  );
  searchContainer.appendChild(form);
};

appendSearch();

const searchInput = document.querySelector(".search-input");
const searchSubmit = document.querySelector(".search-submit");

function searchEmployees() {
  let data, txtValue;
  let filter = searchInput.value.toLowerCase();
  let cards = document.querySelectorAll(".card");
  let name = document.querySelectorAll(".card-name");

  for (let i = 0; i < cards.length; i++) {
    data = cards[i];
    if (data) {
      txtValue = name[i].textContent.toLowerCase();
      if (txtValue.indexOf(filter) > -1) {
        data.style.display = "";
      } else {
        data.style.display = "none";
      }
    }
  }
}

searchSubmit.addEventListener("click", searchEmployees);
