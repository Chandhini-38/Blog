const Blog = require('../Models/Blog')
const User = require('../Models/user')
const mongoose = require('mongoose')

const Blog_function ={
    createBlog: async (req, res) => {
        try {
          // Destructure
          const { title, description, image, user } = req.body;
      
          // Validation
          if (!title || !description || !image || !user) {
            return res.status(400).send({
              message: "Please provide required fields",
            });
          }
      
          const exist = await User.findById(user);
      
          if (!exist) {
            return res.status(400).send({
              message: "User not found",
            });
          }
      
          // Saving the blog
          const newBlog = new Blog({
            title,
            description,
            image,
            user
          });
      
          const session = await mongoose.startSession();
          session.startTransaction();
      
          await newBlog.save({ session });
          exist.blogs.push(newBlog);
          await exist.save({ session });
          await session.commitTransaction();
      
          res.status(200).json({
            message: "Blog created successfully",
            newBlog,
          });
        } catch (error) {
          console.log(error);
          res.status(500).send({
            message: "Error while creating a blog",
          });
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
            const deletedBlog = await Blog.findByIdAndDelete(req.params.id).populate("user") //populate methos is used to change the details of other models or else to hide or show some details we can ue populate method
            await deletedBlog.user.blogs.pull(deletedBlog)  
            await deletedBlog.user.save()
            res.status(200).json({
                message:"Blog deleted successfully!!!",
            })
        }catch(error){
            res.status(500).json({message:"error while deleting this blog"})
        }
    },
    getMyBlogs:async(req,res)=>{
        try{
            const userBlog = await User.findById(req.params.id).populate("blogs")

            if(!userBlog){
                return res.status(404).json({message:"no blog found"})
            }
              //count the user's blogs
            const blogCount = userBlog.blogs.length
            return res.status(200).send({
                blogCount,
                message:"user's blogs",
                uerBlog
            })

        }catch(error){
            console.log(error)
            res.status(500).json({message:"error while getting my blogs"})
            
        }

    }
}
module.exports = Blog_function;