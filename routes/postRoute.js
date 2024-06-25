const express = require('express');
const router = express.Router();
const { Post } = require('../models');

router.post('/create', async (req, res) => {
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
            industry_size
        });
        res.json(newPost);
        console.log(newPost);
    } catch (error) {
        console.error('Error creating new post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;