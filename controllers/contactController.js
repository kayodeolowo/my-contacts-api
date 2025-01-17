const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Contact = require("../models/contactModels");


// Get all contacts with pagination
const getContacts = asyncHandler(async (req, res) => {
  
  // Get the page number and page size from query parameters
  let { page = 1, pageSize = 10 } = req.query;
  page = parseInt(page);
  pageSize = parseInt(pageSize);

  // Calculate the number of documents to skip
  const skip = (page - 1) * pageSize;

  // Get total number of contacts
  const totalContacts = await Contact.countDocuments();

  // Fetch contacts for the current page
  const contacts = await Contact.find()
  .select('-description') // this part excludes an option i don't need to appear
  .sort({ createdAt: -1 }) // Sort by createdAt in descending order
  .skip(skip)
      .limit(pageSize);

  // Calculate the total number of pages
  const totalPages = Math.ceil(totalContacts / pageSize);

  // Return the data with pagination info
  res.status(200).json({
      status: "success",
      message: "Data fetched successfully",
      data: {
          totalContacts,
          totalPages,
          currentPage: page,
          // pageSize,
          contacts
      }
  });
});

// Create a contact
const createContact = asyncHandler(async (req, res) => {
  // console.log(req.body);
  const { name, email, phoneNumber, description } = req.body;

  // Array to collect missing fields
  let missingFields = [];

  if (!name) missingFields.push("name");
  if (!email) missingFields.push("email");
  if (!phoneNumber) missingFields.push("phoneNumber");
  if (!description) missingFields.push("description");

  if (missingFields.length > 0) {
      res.status(400);
      throw new Error(` ${missingFields.join(", ")} is required`);
  }

  const contact = await Contact.create({
      name,
      email,
      phoneNumber,
      description,
  });
  const data = contact;
  res.status(201).json({
      status: "success",
      message: "Contact created successfully",
      data
  });
});

// Get single contact
const getContact = asyncHandler(async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400);
        throw new Error("Contact not found");
    }
    
    const contact = await Contact.findById(req.params.id);
    const data = contact;
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json({
        status: "success",
        message: "Data fetched successfully",
        data
    });
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
  const data = updatedContact;
    res.status(200).json({
      status: "success",
      message: "Contact edited successfully",
      data
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
