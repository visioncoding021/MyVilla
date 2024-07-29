const mongoose = require('mongoose');
const { schema } = require('./User');
const {Schema} = mongoose;

// Feild : Payment id, timestamp , cancel Booking

const bookingSchema = new Schema({
    place: {type:mongoose.Schema.Types.ObjectId, required:true,ref:'Place'},
    user: {type:mongoose.Schema.Types.ObjectId, required:true},
    checkIn: {type:Date, required:true},
    checkOut: {type:Date, required:true},
    name: {type:String, required:true},
    mobile: {type:String, required:true},
    guests: {type:String, required:true},
    price:Number
});

const BookingModel = mongoose.model('Booking',bookingSchema);
module.exports = BookingModel; 




// Payment Model 
// Fields - paymentid , razorpay signature , razorpay id , owner id , place id , buyer id   


// Review Model 
// Fields : place id , user id , Rating , content 