const Blog = require('../Models/Blog')

const Blog_function ={
    createBlog:async(req,res)=>{
        try{
            //destructure
            const {title,description,image} = req.body
            //validation
            if(!title || !description || !image){
                return res.status(400).send({
                    message: "please provide required feilds"
                })
            }
            //saving the blog
            const newBlog = new Blog({
                title,
                description,
                image
            })
            await newBlog.save();

            res.status(200).json({
                message:"Blog created successfully",
                newBlog
            })
        }catch(error){
            console.log(error)
            res.status(500).send({
                message:"Error while creating a blog"})
        }
    },
    getAllBlogs:async(req,res)=>{
        try{
            const allBlogs = await Blog.find();
            if(!allBlogs) {
                return res.status(200).send({
                    message:"no Blog found"
                })
            }
            res.status(200).send({
                message:"All blogs",
                allBlogs,
                blogCount:allBlogs.length})
        }catch(error){
            res.status(500).send({
                message:"server error"})
        }
    },
    getSingleBlog:async(req,res)=>{
        try{
            const {id} = req.params;
            const singleBlog = await Blog.findById(id);
            if(!singleBlog){
                return res.status(404).json({
                    message:"no blog found"
                })
            }
            res.status(200).json({
                message:"Blog details for the given id",
                singleBlog
            })
        }catch(error){
            res.status(500).json({
                message:"error while getting the single blog"})
        }
    },
    updateBlog:async(req,res)=>{
        try{
            const {id} = req.params;
            const {title,description,image} = req.body;
            const updatedBlog = await Blog.findByIdAndUpdate(
                id,
                {title,description,image},
                {new:true}
                )
                //send createdat and updatedat in response
            res.status(200).json({
                message:"Blog updated successfully",
                updatedBlog,
                createdAt:updatedBlog.createdAt,
                updatedAt:updatedBlog.updatedAt
            })

        }catch(error){
            res.status(500).json({message:error.message})
        }
    },
    deleteBlog:async(req,res)=>{
        try{
            const {id} = req.params;
            const deletedBlog = await Blog.findByIdAndDelete(id);
            res.status(200).json({
                message:"Blog deleted successfully!!!",
            })
        }catch(error){
            res.status(500).json({message:"error while deleting this blog"})
        }
    }
}
module.exports = Blog_function;