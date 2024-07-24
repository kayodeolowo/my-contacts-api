// services/contactService.js

const Contact = require("../models/contactModels");

const paginate = async (page, limit) => {
    const skip = (page - 1) * limit;
    const contacts = await Contact.find().skip(skip).limit(limit);
    const totalContacts = await Contact.countDocuments();
    const totalPages = Math.ceil(totalContacts / limit);

    return {
        contacts,
        totalContacts,
        totalPages,
        currentPage: page
    };
};

module.exports = { paginate };
