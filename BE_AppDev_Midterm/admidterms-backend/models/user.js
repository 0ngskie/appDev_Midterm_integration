// Honestly don't know what to do with this
class User {
    constructor(
        user_id,
        firstName,
        lastName,
        dateOfBirth,
        age,
        nationality,
        phonenumber,
        email,
        address,
        province,
        city,
        zipcode,
        country,
        username,
        password,
        role
    ) {
        this.user_id = user_id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.age = age;
        this.nationality = nationality;
        this.phonenumber = phonenumber;
        this.email = email;
        this.address = address;
        this.province = province;
        this.city = city;
        this.zipcode = zipcode;
        this.country = country;
        this.username = username;
        this.password = password;
        this.role = role;
    }
}

module.exports = User;