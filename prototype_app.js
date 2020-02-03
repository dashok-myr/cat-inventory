//Book constructor
function Cat(breed, gender, price) {
    this.breed = breed;
    this.gender = gender;
    this.price = price;
}


//UI Constructor 
function UI() {}

//Add cat to list
UI.prototype.addCatToList = cat => {
const list = document.querySelector('#cat-list');
//Creat table row element
const row = document.createElement('tr');

//Insert cols
row.innerHTML = `
    <td>${cat.breed}</td>
    <td>${cat.gender}</td>
    <td>${cat.price}</td>
    <td><a href='#' class="delete">X</a></td>
`;

list.appendChild(row);
}

//Show Alert
UI.prototype.showAlert = (message, className) => {
    //Create div
    const div = document.createElement('div');
    //Add classes
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));

    //Get parent
    const container = document.querySelector('.container');
    //Get form
    const form = document.querySelector('#cat-form');
    //Insert alert
    container.insertBefore(div, form);

    //Timeout after 3 sec
    setTimeout(() => {
        document.querySelector('.alert').remove();
    }, 3000);
}

//Delete Cat
UI.prototype.deleteCat = target => {
    if(target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}
//Clear fields
UI.prototype.clearFields = () => {
    breed.value = '';
    gender.value = '';
    price.value = '';
}

/////////////////////////////////Event Listeners for add cat//////////////////////
document.querySelector('#cat-form').addEventListener('submit', e => {
    //Get form values
    const breed = document.querySelector('#breed').value,
          gender = document.querySelector('#gender').value,
          price = document.querySelector('#price').value;

//Instantiate cat
const cat = new Cat(breed, gender, price);
//Instantiate cat
const ui = new UI();

//Validate
if(breed === '' || gender === '' || price === '') {
    //Error alert
    ui.showAlert('Please fill in all fields', 'error');
}else {
    //Add cat to list
    ui.addCatToList(cat);
    //Show alert
    ui.showAlert('Cat Added!', 'success');
    //Clear fields
    ui.clearFields();
}
    e.preventDefault();
});

//Event listener for delete
document.getElementById('cat-list').addEventListener('click', e => {

    //Instantiate cat
    const ui = new UI();
    //Delete cat
    ui.deleteCat(e.target);
    //Show alert
    ui.showAlert('Cat Removed!', 'success');

    e.preventDefault();
});