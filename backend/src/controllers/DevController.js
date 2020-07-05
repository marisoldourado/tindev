const axios = require('axios')
const Dev = require('../models/Dev')

module.exports = {
   // method to get list users
    async index(req, res) {
        const { user } = req.headers

        const loggedDev = await Dev.findById(user)

        const users = await Dev.find({
            // AND condition
            $and: [
                { _id: { $ne: user} }, // all user diferent logged user
                { _id: { $nin: loggedDev.likes } }, // all user diferent like users
                { _id: { $nin: loggedDev.dislikes } } // all user diferent dislike users
            ],
        })
    
        return res.json(users)
    },
    //method to create new user
    async store(req, res) {
        const { username } = req.body

        const userExists = await Dev.findOne({ user: username })

        if (userExists) {
            return res.json(userExists)
        }

        const response = await axios.get(`https://api.github.com/users/${username}`)
        
        // sintax: destructuration
        const { name, bio, avatar_url: avatar } = response.data

       const dev =  await Dev.create({
            name, 
            user: username,
            bio, 
            avatar
        })
        
        return res.json(dev)
    }
}