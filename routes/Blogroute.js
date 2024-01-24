const express = require('express')

const {createBlog,getAllBlogs,updateBlog,deleteBlog,getSingleBlog,getMyBlogs} = require('../Controller/Blogcontroller')

//router object
const router = express.Router()

//routes
router.get('/AllBlogs', getAllBlogs)
router.post('/createBlog', createBlog)
router.put('/updateBlog/:id', updateBlog)
router.delete('/deleteBlog/:id', deleteBlog)
router.get('/getBlog/:id', getSingleBlog)

//user's blog
router.get('/myBlogs/:id', getMyBlogs)

module.exports = router