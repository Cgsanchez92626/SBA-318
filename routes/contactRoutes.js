const express = require('express')
const router = express.Router()

const contacts = require('../data/contacts')

// URI Route for CONTACTS
router.get('/', (req, res)=>{
    res.json(contacts)
})
// Create Route  - Post to create new contact
router.post('/', (req, res)=>{
    if (req.body.firstname && req.body.lastname && req.body.email) {
        if (contacts.find((contact) => contact.firstname == req.body.firstname &&
        contact.lastname == req.body.lastname &&
        contact.email == req.body.email)) {
          res.json({ error: "Contact Already Exists" });
          return;
}
    const contact = {
        id: contacts[contacts.length -1].id + 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        contact_type: req.body.contact_type,
        email: req.body.email,
        phone: req.body.phone,
        last_contact_dt: req.body.last_contact_dt,
    }
    contacts.push(contact)
    res.json(contacts[contacts.length - 1])
    } else res.json({ error: "Insufficient Data" })
})
// Show route Get 1 contact by ID
router.get('/:id', (req, res, next)=>{
    const contact = contacts.find((contact)=> contact.id === +req.params.id)
    if (contact) res.json(contact)
        else next()
})

// UPDATE - PATCH - Update a contact (ID)
router.patch('/:id', (req, res, next)=>{
    const contact = contacts.find((contact, i) => {
        if (contact.id === +req.params.id) {
          for (const key in req.body) {
            contacts[i][key] = req.body[key]
          }
          return true
        }
    })
    if (contact) res.json(contact)
        else next()
})

// DELETE - Delete contact (ID)
router.delete('/:id', (req, res, next)=>{
    const contact = contacts.find((contact, i) => {
        if (contact.id === +req.params.id) {
            contacts.splice(i, 1)
          return true
        }
       
    })
    if (contact) res.json(contact)
        else next()
    })

    module.exports = router