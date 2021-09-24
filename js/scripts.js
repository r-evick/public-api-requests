  
/*
Treehouse Techdegree:
FSJS Project 5 - Public API Requests
Code by: Ryan Evick
*/


/*
Fetches users from API
*/

fetch('https://randomuser.me/api/?results=12&nat=us')  //12 US users
    .then(response => response.json())  //parse JSON data
    .then(response => response.results)
    .then(showEmployees)
    .catch(error => (gallery.innerHTML += `<h3>There was an error fetching the data.</h3>`, error))  //displays fetch error to the user instead of to console

/*
Display users on the UI
*/

//don't have a way of associating an employee's array index specifically with that employee

const gallery = document.querySelector('.gallery');    
let employees = [];

    function showEmployees(employeeData) {
        // employees = !employees.length ? employeeData : employees; //help from slack Treehouse community, username: Brandon
        if (!employees.length) {
            employees = employeeData;
        } else {
            //employees = employees;
        }
        let employeeHTML = '';

        employeeData.forEach((employee, i) => {  //loop through employees
            let image = employee.picture;
            let name = employee.name;
            let email = employee.email;
            let city = employee.location.city;
            let state = employee.location.state; 
            
            //template literal (added data- attribute containing the index)
            employeeHTML += `
                <div class="card" data-index='${i}'>  
                    <div class="card-img-container">
                        <img class="card-img" src='${image.large}' alt="profile picture">
                    </div>
                    <div class="card-info-container">
                        <h3 id="name" class="card-name cap">${name.first} ${name.last}</h3>
                        <p class="card-text">${email}</p>
                        <p class="card-text cap">${city}, ${state}</p>
                    </div>
                </div>
            `;
        });
        gallery.insertAdjacentHTML('beforeend', employeeHTML);
}


/*
Display modal
*/

function showModal(i) {
    let {
        picture: {large},
        name: {first, last},
        email,
        cell,
        location,
        dob
    } = employees[i];
    let day = new Date(dob.date).getDay(); 
    let month = new Date(dob.date).getMonth();
    let year = new Date(dob.date).getFullYear();

//template literal    
const modalHTML = `
    <div class="modal-container">
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src='${large}' alt="profile picture">
            <h3 id="name" class="modal-name cap">${first} ${last}</h3>
            <p class="modal-text">${email}</p>
            <p class="modal-text cap">${location.city}</p>
            <hr>
            <p class="modal-text">${cell}</p>
            <p class="modal-text">${location.street.number} ${location.street.name}, ${location.city}, ${location.state}, ${location.postcode}</p>
            <p class="modal-text">Birthday: ${month}/${day}/${year}</p>
        </div>
        <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
    </div>
`;
gallery.insertAdjacentHTML('afterend', modalHTML);


/*
Event handlers 
*/

//closes modal window when X is clicked
const closeButton = document.getElementById('modal-close-btn'); 
const modalContainer = document.querySelector('.modal-container');

closeButton.addEventListener('click', () => {
    modalContainer.remove();
})

//modal next button
const nextButton = document.getElementById('modal-next');

nextButton.addEventListener('click', () => {
    modalContainer.remove();   
    if (i >= employees.length -1) {
        i = 0;
        showModal(i);
    } else {
        i++;
        showModal(i);
    }
})

//modal previous button
const previousButton = document.getElementById('modal-prev');

previousButton.addEventListener('click', () => {
    modalContainer.remove();
    if (i < 1) {
        i = employees.length - 1
        showModal(i);
    } else {
        i--;
        showModal(i);
    }
})

}


//show modal popup when clicked
gallery.addEventListener('click', (e) => {
    if (e.target !== gallery) {
        const card = e.target.closest('.card');
        const i = card.getAttribute('data-index');

        showModal(i);
    }
});


/*
Search filter
*/

const searchContainer = document.querySelector('.search-container');
searchContainer.innerHTML = `
    <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>
`;

 
function search(input) {
    const filtered = [];
    
    employees.forEach((employee) => {
        const fullName = employee.name.first + employee.name.last;

        if (fullName.toUpperCase().includes(input.toUpperCase())) {
            filtered.push(employee);
        } 

        gallery.innerHTML = '';
        showEmployees(filtered);
        
    });
    
    if (filtered.length === 0) {  //error message if no results are found
        gallery.innerHTML = '<h1>Sorry, there were no results.</h1>';
    }
}


//search event handlers
const form = document.querySelector('form');
const input = document.getElementById('search-input');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    search(input.value);
})

form.addEventListener('keyup', (e) => {  //keyup for real-time search
    e.preventDefault();
    search(input.value);
})
   

//change default background color

document.body.style.background = 'CornflowerBlue';  //suggestion from reviewer instead of getting elememnt by tag name