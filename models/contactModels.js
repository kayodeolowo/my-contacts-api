const mongoose = require("mongoose")

const contactSchema = mongoose.Schema({

    // user_id:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: "User"
    // },  to add a specific user id when creating the contacts

    
    name: {
        type: String,
        required: [true, "please add the contact name"]
    },

    email: {
        type: String,
        required: [true, "please add the email"]
    },

    phoneNumber: {
        type: String,
        required: [true, "please add the phone number"]
    },


    description: {
        type: String,
        required: [true, "please add the description"]
    },

   
},

{
    timestamps: true
}

);



module.exports = mongoose.model("contact", contactSchema)