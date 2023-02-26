const Post=require("../models/postModel");

exports.getAllPosts = async (req,res) =>{
    try {
        const posts=await Post.find();

        res.status(200).json({
            status: "success",
            results:posts.length,
            data:{
                posts
            }
        })

    } catch (err) {
       res.status(400).json({error: err}); 
    }
}

exports.getOnePost = async (req,res) =>{
    try {
        const posts=await Post.findById(req.params.id);

        res.status(200).json({
            status: "success",
            data:{
                posts
            }
        })

    } catch (err) {
       res.status(400).json({error: err}); 
    }
}

exports.createPost = async (req,res) =>{
    try {
        const posts=await Post.create(req.body);
        res.status(200).json({
            status: "success",
            data:{
                posts
            }
        })

    } catch (err) {
       res.status(400).json({error: err}); 
    }
}

exports.updatePost = async (req,res) =>{
    try {
        const posts=await Post.findByIdAndUpdate(req.params.id,req.body,{
            new: true,
            runValidators:true,
        })

        res.status(200).json({
            status: "success",
            data:{
                posts
            }
        })

    } catch (err) {
       res.status(400).json({error: err}); 
    }
}

exports.deletePost = async (req,res) =>{
    try {
        const posts=await Post.findByIdAndDelete(req.params.id);

        res.status(200).json({
            status: "success",
        })

    } catch (err) {
       res.status(400).json({error: err}); 
    }
}
