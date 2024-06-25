const express = require('express');
const router = express.Router();
const { Post, User } = require('../models');
const { validateToken } = require('../middlewares/AuthMiddleware');
const jwt = require('jsonwebtoken');

router.post('/create', validateToken, async (req, res) => {
    const {
        Post_Id,
        Post_name,
        business_type,
        location,
        maxBudget,
        minBudget,
        Duration,
        YearsOfExperience,
        skills,
        project_Description,
        req_list,
        category_chosen,
        industry_size
    } = req.body;

    try {
        
        const accessToken = req.header('accessToken');
        console.log(accessToken);
        
        const decodedToken = jwt.decode(accessToken);
        console.log('Decoded Token:', decodedToken); 
        const { id, name } = decodedToken; 
        console.log('ID:', id);
        console.log(' Name:', name); 

   
        const user = await User.findOne({ where: { UserID: id, name: name } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        console.log('User Email:', user.email);
        console.log('Type of User Email:', typeof user.email);

        
        const newPost = await Post.create({
            Post_Id,
            Post_name,
            business_type,
            location,
            maxBudget,
            minBudget,
            Duration,
            YearsOfExperience,
            skills,
            project_Description,
            req_list,
            category_chosen,
            industry_size,
            email:user.email
        });
      
        res.json(newPost);
        console.log(newPost);
    } catch (error) {
        console.error('Error creating new post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
