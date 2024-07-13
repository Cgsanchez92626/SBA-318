const express = require('express')
const router = express.Router()

const properties = require('../data/properties')

// URI Route for PROPERTIES
router.get('/', (req, res)=>{
    res.json(properties)
})
// Create Route  - Post to create new property
router.post('/', (req, res)=>{
    if (req.body.address && req.body.city && req.body.state && req.body.zipcode) {
        if (properties.find((property) => property.address == req.body.address &&
        property.city == req.body.city &&
        property.state == req.body.state &&
        property.zipcode == req.body.zipcode)) {
          res.json({ error: "Property Already Exists" });
          return;
}
    const property = {
        id: properties[properties.length -1].id + 1,
        contactId: req.body.contactId,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zipcode: req.body.zipcode,
        county: req.body.county,
        parcelNumber: req.body.parcelNumber,
        yearBuilt: req.body.yearBuilt,
        propertyType: req.body.propertyType,
    }
    properties.push(property)
    res.json(properties[properties.length - 1])
    } else res.json({ error: "Insufficient Data" })
})
// Show route Get 1 property
router.get('/:id', (req, res, next)=>{
    const property = properties.find((property)=> property.id === +req.params.id)
    if (property) res.json(property)
        else next()
})

// UPDATE - PATCH - Update a property (ID)
router.patch('/:id', (req, res, next)=>{
    const property = properties.find((property, i) => {
        if (property.id === +req.params.id) {
          for (const key in req.body) {
            properties[i][key] = req.body[key]
          }
          return true
        }
    })
    if (property) res.json(property)
        else next()
})

// DELETE - Delete property (ID)
router.delete('/:id', (req, res, next)=>{
    const property = properties.find((property, i) => {
        if (property.id === +req.params.id) {
            properties.splice(i, 1)
          return true
        }
       
    })
    if (property) res.json(property)
        else next()
    })

    module.exports = router