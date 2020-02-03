class Cat {
  constructor(breed, gender, price) {
    this.id = Date.now();
    this.breed = breed;
    this.gender = gender;
    this.price = price;
  }
}

class UI {
  constructor() {
    this.form = document.querySelector("#cat-form");
  }

  addCatToList(cat) {
    const list = document.querySelector("#cat-list");
    //Creat table row element
    const row = document.createElement("tr");

    //Insert cols
    row.innerHTML = `
    <td>${cat.breed}</td>
    <td>${cat.gender}</td>
    <td>${cat.price}</td>
    <td>${cat.id}</td>
    <td><a href='#' class="delete">X</a></td>
    `;

    list.appendChild(row);
  }

  showAlert(message, className) {
    //Create div
    const divAlert = document.createElement("div");
    //Add classes
    divAlert.className = `${className}`;
    divAlert.appendChild(document.createTextNode(message));

    //Get parent
    const container = document.querySelector(".container");
    //Insert alert
    container.insertBefore(divAlert, this.form);

    //Timeout after 3 sec
    setTimeout(() => {
      divAlert.remove();
    }, 3000);
  }

  deleteCat(target) {
    if (target.className === "delete") {
      const td = target.parentElement;
      const tr = td.parentElement;

      tr.remove();
      this.showAlert("Cat Removed!", "success");

      const catId = target.parentElement.previousElementSibling.textContent;

      Store.removeCat(catId);
    }
  }

  clearFields() {
    this.form.reset();
  }
}

//Local Storage Class
class Store {
  static getCats() {
    let cats;
    if (localStorage.getItem("cats") === null) {
      cats = [];
    } else {
      cats = JSON.parse(localStorage.getItem("cats"));
    }
    return cats;
  }

  static displayCats() {
    const cats = Store.getCats();

    cats.forEach(cat => {
      const ui = new UI();

      //Add cat to UI
      ui.addCatToList(cat);
    });
  }

  static addCat(cat) {
    const cats = Store.getCats();
    cats.push(cat);
    localStorage.setItem("cats", JSON.stringify(cats));
  }

  static removeCat(catId) {
    const cats = Store.getCats();
    cats.forEach((cat, index) => {
      if (catId === cat.id.toString()) {
        cats.splice(index, 1);
      }
    });
    localStorage.setItem("cats", JSON.stringify(cats));
  }
}

//DOM Load Event
document.addEventListener("DOMContentLoaded", Store.displayCats);

////////////////////////EVENTS////////////////////////
//Event Listeners for add cat
document.querySelector("#cat-form").addEventListener("submit", e => {
  //Get form values
  const breed = document.querySelector("#breed").value,
    gender = document.querySelector("#gender").value,
    price = document.querySelector("#price").value;

  //Instantiate cat
  const cat = new Cat(breed, gender, price);
  //Instantiate cat
  const ui = new UI();

  //Validate
  if (breed === "" || gender === "" || price === "") {
    //Error alert
    ui.showAlert("Please fill in all fields", "error");
  } else {
    //Add cat to list
    ui.addCatToList(cat);
    //Add to local storage
    Store.addCat(cat);
    //Show alert
    ui.showAlert("Cat Added!", "success");
    //Clear fields
    ui.clearFields();
  }
  e.preventDefault();
});

//Event listener for delete
document.getElementById("cat-list").addEventListener("click", e => {
  //Instantiate cat
  const ui = new UI();
  //Delete cat
  ui.deleteCat(e.target);

  e.preventDefault();
});
