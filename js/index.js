import { User } from "./classUser.js";
import { usersPreload } from "./preload.js";

document.addEventListener("DOMContentLoaded", () => { 

    let USERS = JSON.parse(localStorage.getItem('usersPersistance')) || [];

    if(USERS.length == 0) {
        USERS = usersPreload;
        localStorage.setItem('usersPersistance', JSON.stringify(USERS))
    } 
    

    listUsers(USERS);
    
    let userForm = document.getElementById('userForm');
    userForm.addEventListener('submit', function(event) {       

        //Matamos el submit del formulario por defecto con el preventDafault
        event.preventDefault();       

        let hiddenInput = document.getElementById('input-with-id-user');              

        if(hiddenInput.value === ""){
            addUser();
        }else{
            modifyUser(hiddenInput.value);
        }
    });    

    function addUser(){   
        let userId = Math.max(...USERS.map(user => user.id)) + 1;   
        let userName = document.getElementById('user-name').value
        userName = userName.charAt(0).toUpperCase() + userName.slice(1); //Pongo el primer caracter en mayuscula       
        let userLastName = document.getElementById('user-last-name').value;
        userLastName = userLastName.charAt(0).toUpperCase() + userLastName.slice(1); //Pongo el primer caracter en mayuscula
        let userCi = document.getElementById('user-ci').value;
        let userPhoneNumber = document.getElementById('user-phone-number').value;        
        
        let userProfilePicture;   
        if(document.getElementById('user-profile-picture').value == "") {
            userProfilePicture = "imgs/userWithNoPicture.jpg";
        }else {
            //le agrego el .files[0].name porque me da error C:\fakepath\, vi esta solucion en inet (esto me da el nombre del archivo, y aca armo la url)
            userProfilePicture = "imgs/" + document.getElementById('user-profile-picture').files[0].name; 
        }          

        if(userName != "" && userLastName != "" && userCi != "" && userPhoneNumber != ""){
            let userCreated = new User (userId, userName, userLastName, userCi, userPhoneNumber, userProfilePicture);
            //let userCreated = {id: USERS.length + 1, name: userName, lastName: userLastName, CI: userCi, phoneNumber: userPhoneNumber, imgSrc: userProfilePicture};

            USERS.push(userCreated);
            localStorage.setItem('usersPersistance', JSON.stringify(USERS)); 
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
        document.getElementById('input-with-id-user').value = "";
    }

    //Llamamos a la funcion que captura los datos del usuario a modificar y los carga en los inputs correspondientes
    document.getElementById('modify-user').addEventListener('click', getDataAndLoadFormAddUser);

    function getDataAndLoadFormAddUser() {
        let selectedUser = document.getElementById(getInputRadioCheckedId()); // para seleccionar el input que esta checked, lo capturo por id, usando la funcion que devuelve el id del input checked       
                     
        let editingRow;        

        if (selectedUser) {
            let user = USERS.filter((user) => user.id == selectedUser.id);  
            editingRow = selectedUser.parentElement.parentElement; //aca capturamos la row entera, el input guardado en selected user, padre td, padre de td es la row
            let name = editingRow.cells[2].innerHTML;
            let lastName = editingRow.cells[3].innerHTML;   
            let ci = user[0].CI;               
            let phoneNumber = editingRow.cells[4].innerHTML;
            let id = user[0].id;                            

            document.getElementById('user-name').value = name;                 
            document.getElementById('user-last-name').value = lastName;
            document.getElementById('user-ci').value = ci;
            document.getElementById('user-phone-number').value = phoneNumber;
            //cargamos el id del usuario en este input que esta como disabled, 
            document.getElementById('input-with-id-user').value = id;            

            let title = document.getElementById('create-user-title');
            title.innerHTML = 'Modificar usuario';
            let button = document.getElementById('create-user-button');
            button.innerHTML = 'Modificar';

            //Esto hace que al hacer click en el boton modificar, la pagina haga scroll hasta arriba, que es donde esta el formulario con los datos cargados para modificar
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
            
        } else {
            alert('Por favor selecciona un juego.');
        }

    } 

    function modifyUser(id){
        let usersList = JSON.parse(localStorage.getItem('usersPersistance'));    
        
        let indexUserToBeModify = usersList.findIndex((user) => user.id == id)

        let userName = document.getElementById('user-name').value
        userName = userName.charAt(0).toUpperCase() + userName.slice(1); //Pongo el primer caracter en mayuscula       
        let userLastName = document.getElementById('user-last-name').value;
        userLastName = userLastName.charAt(0).toUpperCase() + userLastName.slice(1); //Pongo el primer caracter en mayuscula
        let userCi = document.getElementById('user-ci').value;
        let userPhoneNumber = document.getElementById('user-phone-number').value;    

        usersList[indexUserToBeModify].name = userName;
        usersList[indexUserToBeModify].lastName = userLastName;
        usersList[indexUserToBeModify].CI = userCi;
        usersList[indexUserToBeModify].phoneNumber = userPhoneNumber;        
        
        alert('Usuario modificado');
        localStorage.setItem('usersPersistance', JSON.stringify(usersList));
        listUsers(usersList);
        cleanFormAddUser();        

        let title = document.getElementById('create-user-title');
        title.innerHTML = 'Alta usuario';
        let button = document.getElementById('create-user-button');
        button.innerHTML = 'Crear Usuario';
    }    
    
    
    //Funciones para remover
    let removeUserButton = document.getElementById('remove-user-button');
    removeUserButton.addEventListener('click', () => removeUser(getInputRadioCheckedId()));    

    /*function getUserById(id){
        //Hago esta funcion así solo manoseo una sola vez la variable global USERS, cada vez que tengo un id y quiero saber que usuario es, usar esta funcion
        let userById;

        USERS.forEach((user) =>{
            
            if(id == user.id) {                
                userById = user;                
            }            
        });
        
        return userById //el usuario que tiene ese id, USERS.id == id       
       
    }*/

    function getInputRadioCheckedId() {        
        let arrayInputsCheckRadioButtons = document.querySelectorAll('.form-check-input');        
        let radioButtonCheckedId;

        arrayInputsCheckRadioButtons.forEach((radioButton) => {

            if(radioButton.checked) {                
                radioButtonCheckedId = radioButton.id;                
            }            
            
        })       
        
        return radioButtonCheckedId;
        
    }

    function removeUser(id){        
        let indexOfUser;
        USERS.forEach((user) => {                   
            if(user.id == id){
                indexOfUser = USERS.indexOf(user)
                
                if(confirm('Desea eliminar el usurio?')) {
                    USERS.splice(indexOfUser, 1)
                }
                localStorage.setItem('usersPersistance', JSON.stringify(USERS));
                 
            }
        })       

        listUsers(USERS);
    }

    //End Funciones para remover    

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
            input.addEventListener('click', checkOrUncheckInput);

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
    
    function checkOrUncheckInput(e){
        //aca agregar un checkeo, si el input esta checked y recibe un click, deschequearlo        
        //if (e.target.checked == true){
            //console.log(e.target)
           //e.target.checked = false
            //console.log('et')
        //}else{
            //e.target.checked = true
       
        //console.log(e.target.checked)
    }
    
    let searchBarUser = document.getElementById('bar-search-user')
    searchBarUser.addEventListener('keyup', searchUser);

    function searchUser(){
        //console.log("entra")                
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
    
    let buttonUserInfo = document.getElementById('button-show-user-information');
    buttonUserInfo.addEventListener('click', () => showUserInformation(getInputRadioCheckedId()));

    function showUserInformation(id) {

        let sectionUserContainer = document.getElementById('user-info-section');

        let infoUserContainer = document.createElement('div');

        //capturo los elementos con la clase info-user-container dentro del elemento sectionUserContainer
        let elements = sectionUserContainer.getElementsByClassName('info-user-container');        

        if(elements.length > 0) {
            sectionUserContainer.removeChild(elements[0]);
        }
        
        infoUserContainer.classList.add('info-user-container'); 

        USERS.forEach((user) => {
            if(user.id == id) {                
                infoUserContainer.innerHTML = 
                `<p><strong>Nombre:</strong>    ${user.name}</p>
                <p><strong>Apellido:</strong>   ${user.lastName}</p>
                <p><strong>CI:</strong>         ${user.CI}</p>
                <p><strong>Telefono:</strong>   ${user.phoneNumber}</p>
                <p><strong>Direccion:</strong> </p>`;

                sectionUserContainer.appendChild(infoUserContainer);                
            }

            //Accion que scrollea hasta el final de la pagina que es donde se muestra la informacion de usuario
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth",
            });

        });                

    }
    
    //Aca estoy haciendo que cada vez que se de click en los titulos se muestren u oculten los elementos debajo
    let userAltaFormTitle = document.getElementById('title-crud-user-form');
    let userTableAndSearchBarTitle = document.getElementById('title-users-list');

    userAltaFormTitle.addEventListener('click', () => showHideElement('.alta-usuario-form-container'));
    userTableAndSearchBarTitle.addEventListener('click', () => showHideElement('.user-table-and-search-bar-container'));  

    function showHideElement(elementClass){                     
        let elementToShowOrHide = document.querySelector(elementClass);
        
        if(elementToShowOrHide.style.display == 'block' || elementToShowOrHide.style.display === '') {           
            elementToShowOrHide.style.display = 'none';
        }else{            
            elementToShowOrHide.style.display = 'block';
        }        
    }
    //Fin haciendo que cada vez que se de click en los titulos se muestren u oculten los elementos debajo

});