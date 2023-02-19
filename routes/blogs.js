const express = require('express');
const Model = require('../model/blogs');
const router = express.Router()

//Post Method
router.post('/', async (req, res) => {
    const blog = new Model({
        title: req.body.title,
        body: req.body.body,
        tags: req.body.tags
    })
    try {
        const newBlog = await blog.save() 
        res.status(201).json(newBlog) // 201 to tell something was created
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})


//Get all Method
router.get('/', async (req, res) => {
   try {
        const allBlogs = await Model.find();
        res.json(allBlogs)
    } catch (err) {
        res.status(500).json({ message: err });
    }
    
})

//FUNCTION FOR GET/UPDATE/DELETE WITH ID
const getId = async (req, res, next)=>{
    let blog
    try {
        blog = await Model.findById(req.params.id)
        if(blog == null){
            return res.status(404).json({message: 'Cannot Find Id'})
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
    res.blog = blog
    next()
}

//Get by ID Method
router.get('/:id', getId, async (req, res) => {
    try {
        const blog = await Model.findById(req.params.id);
        res.json(blog)
    } catch (err) {
        res.status(500).json({ message: err });
    }
})

//Update by ID Method
router.patch('/:id', getId, async (req, res) => {
    if(req.body.title != null){
        res.blog.title = req.body.title
    }
    if(req.body.body != null){
        res.blog.body = req.body.body
    }
    if(req.body.tags != null){
        res.blog.tags = req.body.tags
    }
    try {
        const updatedBlog = await res.blog.save()
        res.json(updatedBlog)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
    
})

//Delete by ID Method
router.delete('/:id', getId, async (req, res) => {
    try {
        await res.blog.remove()
        res.json({message:'Successfuly Deleted'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})




module.exports = router

