const express = require('express')
const router = express.Router()

const agents = require('../data/agents')

// URI Route for AGENTS
router.get('/', (req, res)=>{
    res.json(agents)
})
// Create Route  - Post to create new agent
router.post('/', (req, res)=>{
    if (req.body.firstname && req.body.lastname && req.body.email) {
        if (agents.find((agent) => agent.firstname == req.body.firstname &&
            agent.lastname == req.body.lastname &&
            agent.email == req.body.email)) {
          res.json({ error: "Agent Already Exists" });
          return;
}
    const agent = {
        id: agents[agents.length -1].id + 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
      }
    agents.push(agent)
    res.json(agents[agents.length - 1])
    } else res.json({ error: "Insufficient Data" })
})
// Show route Get 1 agent
router.get('/:id', (req, res, next)=>{
    const agent = agents.find((agent)=> agent.id === +req.params.id)
    if (agent) res.json(agent)
        else next()
})

// UPDATE - PATCH - Update an agent (ID)
router.patch('/:id', (req, res, next)=>{
    const agent = agents.find((agent, i) => {
        if (agent.id === +req.params.id) {
          for (const key in req.body) {
            agents[i][key] = req.body[key]
          }
          return true
        }
    })
    if (agent) res.json(agent)
        else next()
})

// DELETE - Delete Agent (ID)
router.delete('/:id', (req, res, next)=>{
    const agent = agents.find((agent, i) => {
        if (agent.id === +req.params.id) {
          agents.splice(i, 1)
          return true
        }
       
    })
    if (agent) res.json(agent)
        else next()
    })

    module.exports = router