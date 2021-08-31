
//public api requests


/*
Fetches users from API
*/

fetch('https://randomuser.me/api/?results=12&nat=us')  //12 US users
    .then(response => response.json())  //parse JSON data
    .then(response => response.results)
    .then(showEmployees)
    .catch(error => console.log('Sorry, there was a problem.', error))  //logs errors to console


/*
Display users on the UI
*/

const gallery = document.querySelector('.gallery');    
let employees = [];

    function showEmployees(employeeData) {
        employees = employeeData;
        let employeeHTML = '';
        employees.forEach((employee, i) => {  //loop through employees
            let image = employee.picture;
            let name = employee.name;
            let email = employee.email;
            let city = employee.location.city;
            let state = employee.location.state;
            
            //template literal
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

}


//show modal popup when clicked
gallery.addEventListener('click', (e) => {
    if (e.target !== gallery) {
        const card = e.target.closest('.card');
        const i = card.getAttribute('data-index');

        showModal(i);
    }
})


/*
Search filter
*/

function search() {
    const searchContainer = document.querySelector('.search-container');

    searchContainer.innerHTML = `
        <form action="#" method="get">
            <input type="search" id="search-input" class="search-input" placeholder="Search...">
            <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
        </form>
    `;
}
search();