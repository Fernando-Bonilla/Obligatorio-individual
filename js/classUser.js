export class User {
    constructor(id, name, lastName, CI, phoneNumber, imgSrc, streetName, streetNumber){
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.CI = CI;
        this.phoneNumber = phoneNumber;
        this.imgSrc = imgSrc;
        this.address = {
            street: streetName,
            number: streetNumber,
        }
    }
};

