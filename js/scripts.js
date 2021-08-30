
//public api requests


/*
Fetches users from API
*/

fetch('https://randomuser.me/api/?results=12')  //12 users
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


