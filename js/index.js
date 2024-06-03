document.addEventListener("DOMContentLoaded", () => {    
    let test = [];

    let USERS = [
        {id: 1, name: 'Fernando', lastName: 'Bonilla', CI: '45268136', phoneNumber: '099679788', imgSrc: '\imgs\photo-1494790108377-be9c29b29330.png',},
        {id: 2, name: 'Andrea', lastName: 'Gomez', CI: '45268138', phoneNumber: '099679755', imgSrc: '\imgs\photo-1494790108377-be9c29b29330.png',},
    ];

    listUsers(USERS);
    
    let createUserButton = document.getElementById('create-user-button');
    createUserButton.addEventListener('click', addUser);

    function addUser(){      
        let userName = document.getElementById('user-name').value;        
        let userLastName = document.getElementById('user-last-name').value;
        let userCi = document.getElementById('user-ci').value;
        let userPhoneNumber = document.getElementById('user-phone-number').value;
        let userProfilePicture = document.getElementById('user-profile-picture').value;

        let userCreated = {id: USERS.length + 1, name: userName, lastName: userLastName, CI: userCi, phoneNumber: userPhoneNumber, imgSrc: userProfilePicture}
                
        USERS.push(userCreated);        
        cleanFormAddUser();
        listUsers(USERS);
    }

    function cleanFormAddUser() {
        document.getElementById('user-name').value = "";        
        document.getElementById('user-last-name').value = "";
        document.getElementById('user-ci').value = "";
        document.getElementById('user-phone-number').value = "";
        document.getElementById('user-profile-picture').value = "";

    }

    function listUsers(usersList){        
        let tableBody = document.getElementById('table-users-listed');
        tableBody.innerHTML = "";

        for(let i = 0; i < usersList.length; i++) {
            let user = usersList[i];

            let tr = document.createElement('tr');
            tr.classList.add('user-table-row');

            let tdInput = document.createElement('td');
            let input = document.createElement('input');
            input.id = user.id;
            input.classList.add('form-check-input');
            input.type = 'radio';
            input.name = 'flexRadioDefault';
            
            let tdName = document.createElement('td');
            tdName.innerHTML = user.name;

            let tdLastName = document.createElement('td');
            tdLastName.innerHTML = user.lastName;

            let tdPhoneNumber = document.createElement('td');
            tdPhoneNumber.innerHTML = user.phoneNumber;            

            tdInput.appendChild(input);
            tr.appendChild(tdInput)            
            tr.appendChild(tdName);
            tr.appendChild(tdLastName);
            tr.appendChild(tdPhoneNumber);

            tableBody.appendChild(tr);

        }       


    }


  });