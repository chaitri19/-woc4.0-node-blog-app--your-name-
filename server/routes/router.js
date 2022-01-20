const express = require('express');
const route=express.Router();
const Post=require("../model/model");
const axios=require('axios');

route.get('/viewpage',(req,res)=>{
  Post.find({},(err,docs)=>{
    if(!err)
    {
      res.render("viewpage",{
        list:docs
      })
    }
    else
    {
      console.log("Error in retrieving blogs: "+ err);
    }
  })
})

route.get('/newblog',(req,res)=>{
  res.render('newblog');
})

/*route.get('/blogs',(req,res)=>{
  Post.find()
  .then(user =>{
    res.send(user)
  })
  .catch(err => {
    res.status(500).json(err)
  })
})*/

route.get('/',(req,res)=>{
  Post.find({},(err,docs)=>{
    if(!err)
    {
      res.render("list",{
        list:docs
      })
    }
    else
    {
      console.log("Error in retrieving blogs: "+ err);
    }
  })
})

/*route.post('/newblog',(req,res)=>{
  console.log(req.body)
})*/

route.post("/newblog", async(req,res) => {
  const newpost=new Post({
      title: req.body.title,
      image_url: req.body.image_url,
      content: req.body.content,
      date: req.body.date
  });
  try{
      const savedpost=await newpost.save();
      res.status(200).json(savedpost);
      //window.alert("Your Blog Post is sucessfully saved to our database");
      //console.alert("Your Blog Post is sucessfully saved to our database");
  }catch(err){
      res.status(500).json(err)
  }
});

/*route.get('/list',(req,res)=>{
  Post.find((err,docs)=>{
    if(!err)
    {
      res.render("list",{
        list:docs
      })
    }
    else
    {
      console.log("Error in retrieving blogs: "+ err);
    }
  })
})*/

/*route.get('/list',(req,res)=>{

  axios.get('http://localhost:3000/blogs')
  .then(function(response){
    console.log(response.data)
    res.render('list',{blogs:response.data})
  })
  .catch(err =>{
    res.status(500).json(err)
  })
})

route.get('/editblog',(req,res)=>{
  res.render('update');
})*/

    module.exports=route;
