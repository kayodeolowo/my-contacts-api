const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Contact = require("../models/contactModels");

// Get all contacts
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
});

// Create a contact
const createContact = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { name, email, phoneNumber } = req.body;
    if (!name || !email || !phoneNumber) {
        res.status(400);
        throw new Error("All fields are required");
    }

    const contact = await Contact.create({
        name,
        email,
        phoneNumber,
    });
    res.status(201).json(contact);
});

// Get single contact
const getContact = asyncHandler(async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400);
        throw new Error("Contact not found");
    }
    
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

// Update contact
const updateContact = asyncHandler(async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400);
      throw new Error("Contact not found");
    }
  
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }
  
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
  
    res.status(200).json({
      status: "success",
      message: "Contact edited successfully",
      updatedContact
    });
  });

// Delete contact
const deleteContact = asyncHandler(async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400);
        throw new Error("Contact not found");
    }

    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    await Contact.deleteOne({ _id: req.params.id });
    res.status(200).json({ status: "success", message: "Contact Deleted" });
});

module.exports = { getContact, createContact, getContacts, updateContact, deleteContact };
