const express = require("express");
const router = express.Router()
const {getContact, createContact, deleteContact, updateContact,getContacts} = require("../controllers/contactController")

router.route("/").get(getContacts);
router.route("/:id").get(getContact)

router.route("/createContact").post(createContact);
router.route("/updateContact/:id").put(updateContact);

router.route("/deleteContact/:id").delete(deleteContact);






module.exports = router; 