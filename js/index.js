document.addEventListener("DOMContentLoaded", () => {    

    let USERS = [
        {id: 1, name: 'Fernando', lastName: 'Bonilla', CI: '45268136', phoneNumber: '099679788', imgSrc: 'imgs/fernando.jpg',},
        {id: 2, name: 'Andrea', lastName: 'Gomez', CI: '45268138', phoneNumber: '099679755', imgSrc: 'imgs/andrea.jpg',},
    ];

    listUsers(USERS);
    
    let createUserButton = document.getElementById('create-user-button');
    createUserButton.addEventListener('click', addUser);

    //Aca estoy haciendo que cada vez que se de click en los titulos se muestren u oculten los elementos debajo
    let userAltaFormTitle = document.getElementById('title-crud-user-form');
    let userTableAndSearchBarTitle = document.getElementById('title-users-list');

    userAltaFormTitle.addEventListener('click', () => showHideElement('.alta-usuario-form-container'));
    userTableAndSearchBarTitle.addEventListener('click', () => showHideElement('.user-table-and-search-bar-container'));  

    function showHideElement(elementClass){                     
        let elementToShowOrHide = document.querySelector(elementClass);
        
        if(elementToShowOrHide.style.display == 'none' || elementToShowOrHide.style.display === '') {           
            elementToShowOrHide.style.display = 'block';
        }else{            
            elementToShowOrHide.style.display = 'none';
        }        
    }
    //Fin haciendo que cada vez que se de click en los titulos se muestren u oculten los elementos debajo


    function addUser(){      
        let userName = document.getElementById('user-name').value;        
        let userLastName = document.getElementById('user-last-name').value;
        let userCi = document.getElementById('user-ci').value;
        let userPhoneNumber = document.getElementById('user-phone-number').value;        
        
        let userProfilePicture;   
        if(document.getElementById('user-profile-picture').value == "") {
            userProfilePicture = "imgs/userWithNoPicture.jpg";
        }else {
            //le agrego el .files[0].name porque me da error C:\fakepath\, vi esta solucion en inet (esto me da el nombre del archivo, y aca armo la url)
            userProfilePicture = "imgs/" + document.getElementById('user-profile-picture').files[0].name; 
        }          

        if(userName == "" || userLastName == "" || userCi == "" || userPhoneNumber == ""){
            alert('Por favor complete todos los datos');
        }else {
            let userCreated = {id: USERS.length + 1, name: userName, lastName: userLastName, CI: userCi, phoneNumber: userPhoneNumber, imgSrc: userProfilePicture};
            USERS.push(userCreated);  
            alert('Usuario creado');      
            cleanFormAddUser();
            listUsers(USERS);                       
        }                
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

            let tdImg = document.createElement('td');
            let imgUser = document.createElement('img');
            imgUser.classList.add('user-profile-picture');
            imgUser.src = user.imgSrc;
            
            let tdName = document.createElement('td');
            tdName.innerHTML = user.name;

            let tdLastName = document.createElement('td');
            tdLastName.innerHTML = user.lastName;

            let tdPhoneNumber = document.createElement('td');
            tdPhoneNumber.innerHTML = user.phoneNumber;            

            tdInput.appendChild(input);
            tr.appendChild(tdInput)
            tdImg.appendChild(imgUser);
            tr.appendChild(tdImg);            
            tr.appendChild(tdName);
            tr.appendChild(tdLastName);
            tr.appendChild(tdPhoneNumber);

            tableBody.appendChild(tr);
        }  
    }    
    
    let searchBarUser = document.getElementById('bar-search-user')
    searchBarUser.addEventListener('keyup', searchUser);

    function searchUser(){
        console.log("entra")                
        let searchBarUserValue = document.getElementById('bar-search-user').value.toLowerCase();        
        
        //usar metodo filter
        if(searchBarUserValue != "") {
            let usersWithCoincidence = USERS.filter((user) => {                        
                return user.name.toLowerCase().includes(searchBarUserValue) || 
                    user.lastName.toLowerCase().includes(searchBarUserValue) || 
                    user.phoneNumber.includes(searchBarUserValue); // == searchBarUserValue;//==  || user.lastName.toLowerCase() == searchBarUserValue || user.phoneNumber == searchBarUserValue;           
                 
            });
            listUsers(usersWithCoincidence);
            
        }else {
            listUsers(USERS);
        }           
        
    }   
    

});