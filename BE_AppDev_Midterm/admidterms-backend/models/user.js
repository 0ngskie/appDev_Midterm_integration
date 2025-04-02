// Honestly don't know what to do with this
class User{
    constructor(
        user_id,
        first_name,
        last_name,
        date_of_birth,
        age,
        nationality,
        contact_number,
        email,
        address,
        province,
        city,
        zipcode,
        country,
        username,
        password,
        role,
        agent_id
    ) {
        this.user_id = user_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.date_of_birth = date_of_birth;
        this.age = age;
        this.nationality = nationality;
        this.contact_number = contact_number;
        this.email = email;
        this.address = address;
        this.province = province;
        this.city = city;
        this.zipcode = zipcode;
        this.country = country;
        this.username = username;
        this.password = password;
        this.role = role;
        this.agent_id = agent_id;
    }
}

module.exports = User;