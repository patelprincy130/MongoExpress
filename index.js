const express=require("express");
const app=express();
const port=3000;
const path=require("path");
const {v4:uuidv4}=require("uuid");structuring assignment: -->It extracts only the v4 function from the module.
const methodOverride=require("method-override");

app.listen(port,(req,res)=>{
    console.log(`Listening on port ${port}`);
});

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

app.use(express.urlencoded({extended:true}));

app.use(methodOverride("_method"));


let posts=[ 
    {
        id:uuidv4(), //id must be unique for all posts
        username:"apnacollege",
        content:"i love coding"
    },
    {
        id:uuidv4(),
        username:"princyy",
        content:"hardwork pays off"
    },
    {
        id:uuidv4(),
        username:"sonu",
        content:"do coding"
    }
];

//creating first api,,index route
//index.ejs is main html file to display all posts
app.get("/posts",(req,res)=>{
    // res.send("srver working well");
    res.render("index.ejs",{posts});
});

//second api-->to add new post--->create route
//2 routes-->1.to serve the form-->GET--->/posts/new
        //   2.add new post---->POST-->/posts
//to create form --->send api req (GET) -->/posts/new
//to add new post---->send api req (POST) -->/posts

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs"); //to render form
});
app.post("/posts",(req,res)=>{ 
    console.log(req.body);
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content}); 
    res.redirect("/posts"); 
});


app.get("/posts/:id",(req,res)=>{
    let {id}=req.params; //url params are string bydefault
    //console.log(id); 
    let post=posts.find((p)=>id===p.id);
    res.render("show.ejs",{post});
});

//fourth api: PATCH--->/posts/:id--->to update specific post(content change)
app.patch("/posts/:id",(req,res)=>{ 
    let {id}=req.params;
    let newContent=req.body.content; 
    let post=posts.find((p)=>id===p.id);
    post.content=newContent;
    console.log(post);
    console.log(id);
    res.redirect("/posts");
});

//fifth api--->Edit Route--->GET-->/posts/:id/edit----->serves the edit form
app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("edit",{post});
});


//sixth api--->Destroy Route-->DELETE---->/posts/:id---to delete specific post
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=>id!==p.id);
    res.redirect("/posts");
    //res.send("delete success");
});


/**
 * The name="content" ensures that the textarea’s value is included in the request body.
express.urlencoded({ extended: true }) parses form data correctly.
methodOverride("_method") allows you to send a PATCH request using a form.

 */



