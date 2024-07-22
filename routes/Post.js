const express = require('express');
const router = express.Router();
const { Post, User } = require('../models');
const { validateToken } = require('../middlewares/AuthMiddleware');
const jwt = require('jsonwebtoken');
const { Sequelize, Transaction } = require('sequelize');
const db = require("../models/index");
const { Op } = require('sequelize');


router.post("/create/:newLogin", validateToken, async (req, res) => {
    const newLogin  = req.params;
    console.log(req.params);
    console.log("0")
    const t = await db.sequelize.transaction();
    try {
        const {
            budget_l,
            budget_h,
            duration_l,
            duration_h,
            exp,
            skill,
            project_desc,
            location,
            sector_p,
            project_size } = req.body;
        console.log(newLogin);

        const { id } = req.user;
        const user = await User.findOne({ where: { uid: id } });
        const newPost = await Post.create(
            {
                budget_l,
                budget_h,
                duration_l,
                duration_h,
                exp,
                skill,
                project_desc,
                location,
                sector_p,
                project_size,
                email: user.email
            },
            //transaction if new user 
            () => {
                if (newLogin == 'true') {
                    return '{ transaction: t}';
                }
                return;
            }
        );
        console.log(newLogin);
        if (newLogin == 'true') {
            await t.commit();
        }
        console.log(t.finished);
        //user will be redirected to post
        res.json(await newPost.pid);

    } catch (error) {
        if (newLogin == 'true') {
            await t.rollback();
        }
        console.log(error)
        res.status(500).json({ error: "An error occurred while creating the post!" });

    }
});

// ../post/update/1
router.put("/update/:pid", validateToken, async (req, res) => {
    console.log(req.params.pid);
    try {
        const {
            budget_l,
            budget_h,
            duration_l,
            duration_h,
            exp,
            skill,
            project_desc,
            location,
            sector_p,
            project_size } = req.body;
        // console.log(req.user)

        const { id } = req.user;
        const user = await User.findOne({ where: { uid: id } });
        const newPost = await Post.update(
            {
                budget_l,
                budget_h,
                duration_l,
                duration_h,
                exp,
                skill,
                project_desc,
                location,
                sector_p,
                project_size,
                email: user.email
            },
            { where: { pid: req.params.pid } }
        );
        console.log(newPost)
        //user will be redirected to post
        res.json("UPDATED");

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "An error occurred while updating the post!" });

    }
});

// Route for filtering and sorting list
router.get('/list', validateToken, async (req, res) => {
    const {
        location,
        sector_p,
        budget_l,
        budget_h,
        duration_l,
        duration_h,
        exp,
        skill,
        project_desc,
        project_size,
        sort
    } = req.query;
    console.log("hi")
    console.log(req.query);
    console.log("hi")

    // Build the filtering conditions
    const conditions = {};
    const order = [];

    try {

        if (location) {
            if (Array.isArray(location)) {
                conditions.location = { [Op.in]: location };
            } else {
                conditions.location = location;
            }
        }
        if (sector_p) {
            if (Array.isArray(sector_p)) {
                conditions.sector_p = { [Op.in]: sector_p };
            } else {
                conditions.sector_p = sector_p;
            }
        }
        if (budget_l) {
            conditions.budget_l = { ...conditions.budget_l, [Op.gte]: budget_l };
        }
        if (budget_h) {
            conditions.budget_h = { ...conditions.budget_h, [Op.lte]: budget_h };
        }
        if (duration_l) {
            conditions.duration_l = { ...conditions.duration_l, [Op.gte]: duration_l };
        }
        if (duration_h) {
            conditions.duration_h = { ...conditions.duration_h, [Op.lte]: duration_h };
        }
        if (exp) {
            if (Array.isArray(exp)) {
                conditions.exp = { [Op.in]: exp };
            } else {
                conditions.exp = exp;
            }
        }
        if (skill) {
            try {
                const skillSet = skill;
                console.log(typeof skillSet)
                const skillConditions = skillSet.map(s => Sequelize.literal(`skill::jsonb @> '"${s}"'`));
                conditions[Op.and] = skillConditions;
                console.log(skillConditions);
            } catch (e) {
                console.error(e)
                return res.status(400).json({ error: 'Invalid skill format' });
            }
        }
        if (project_desc) {
            if (Array.isArray(project_desc)) {
                conditions.project_desc = { [Op.or]: project_desc.map(desc => ({ [Op.like]: `%${desc}%` })) };
            } else {
                conditions.project_desc = { [Op.like]: `%${project_desc}%` };
            }
        }
        if (project_size) {
            if (Array.isArray(project_size)) {
                conditions.project_size = { [Op.in]: project_size };
            } else {
                conditions.project_size = project_size;
            }
        }
    
        // Build the sorting criteria

        if (sort) {
            const sortCriteria = Array.isArray(sort) ? sort : [sort];
            sortCriteria.forEach(criteria => {
                const [field, direction] = criteria.split(':');
                if (['exp', 'skill', 'project_size'].includes(field)) {
                    order.push([field, direction === 'desc' ? 'DESC' : 'ASC']);
                }
            });
        }
    
        
    } catch (error) {
        console.error(error)
        
    }

    try {
        const post = await Post.findAll({
            where: conditions,
            order: order
        });
        console.log("1")
        console.log(post);
        res.json(post);
    } catch (error) {
        console.log("2")
        console.log(error);
        res.status(500).json({ error: 'An error occurred while fetching projects' });
    }
});

router.get("/list_all", validateToken, async (req, res) => {

    const list = await User.findAll({
        attributes: { exclude: ['password'] }
    });

    res.json(list);
});

//../post/1 view post
router.get("/:id", validateToken, async (req, res) => {
    const postId = req.params.id;

    try {
        const user = await User.findOne({ where: { uid: req.user.id } });
        // Find the post by id
        const post = await Post.findOne({ where: { pid: postId, email: user.email } });

        if (!post) {
            return res.status(404).json({ error: "Post not found!" });
        }

        // Delete the post
        res.json(post);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "An error occurred while retrieving" });
    }
});

router.delete("/deletepost/:id", validateToken, async (req, res) => {
    const pid = req.params.id;
    const uid = req.user.id;
    console.log(pid, uid)

    try {
        // Find the post by id
        const user = await User.findOne({ where: { uid: uid } });

        if (!user) {
            return res.status(404).json({ error: "Post not found!" });
        }

        // Delete the post
        await Post.destroy({ where: { pid: pid, email: user.email } });
        res.json("Post deleted successfully!");
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "An error occurred while deleting the post!" });
    }
});

module.exports = router;
