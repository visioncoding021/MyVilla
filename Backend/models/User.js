const mongoose = require('mongoose');
const {Schema} = mongoose;

// Fields : first and last name , address , Avatar , email, mobile no. , govt. id - aadhar no. etc. 

const UserSchema = new Schema({
    name: String,
    email:{type: String,
        unique: true},
    password: String
});

const UserModel = mongoose.model('User',UserSchema);

module.exports = UserModel;