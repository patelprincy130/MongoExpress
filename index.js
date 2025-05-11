/**
 * npm init -y
 * npm i express
 * npm i ejs
 * create views and public folder
 * creating first api
 * our resource is posts--->becaue all the opertions will be implemented on posts
 * api noun hovi joiye, verb nahi
 */

const express=require("express");
const app=express();
const port=3000;
const path=require("path");
const {v4:uuidv4}=require("uuid"); //uuid mathi v4(version) ne use kariye che pachi tene destruct karine new name(uuidv4) aapiye che
//uuidv4() --->jyare aa funtn excute thase tyare ek unique string type nu id generate thase.
//wihtout destructing--->const uuid=require("uuid"); const id=uuid.v4(); console.log(id);
//The uuid module exports multiple functions (e.g., v1, v3, v4, v5).--->{ v4: uuidv4 } is destructuring assignment: -->It extracts only the v4 function from the module.
const methodOverride=require("method-override");

app.listen(port,(req,res)=>{
    console.log(`Listening on port ${port}`);
});

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));
//server ma je new data aave tene parse karva mate middleware use karvu pade
app.use(express.urlencoded({extended:true}));

//override with POST having __method---->_method ni jagya ae biju pan lakhay pn by convention aaj
app.use(methodOverride("_method"));
//express ne kahiye che k jyare query string ma _method aavu aave tyare jove
//pachi html form ma change karyo--->method toh post j pan action ma methodOverride thi change

let posts=[ //database
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
//usr and content--->use form to take ths info and send it to backend--->then send post req to add new post in our databse(arrya)
//1 btn hase-->jene click karvathi form khule tema username nd content--->pachi form ne submit karta POST req jay
//to create form --->send api req (GET) -->/posts/new
//to add new post---->send api req (POST) -->/posts

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs"); //to render form
});
//jevu submit btn pr click thay tyare aa post req jay je new post array(dbase) ma add kare
app.post("/posts",(req,res)=>{ //form ma method=post karvi pade nd action=/post route lakhvo pade--->bydefault get method hoy
    console.log(req.body);//get req ma req na parameters ma query ni ander req ni info aave pan POST ma req ni body ma aave
    //it will print this --{ username: 'dsdsad', content: 'fdfd' } have aa data ne post array ma add karvano che
    let {username,content}=req.body;
    let id=uuidv4();//ahi new post create karti vakhte pan id gnerate karvu
    posts.push({id,username,content}); //pachi tene pass karvu
    // res.send("new post added");
    res.redirect("/posts"); //path pass kariye-->bydefault get req j mokle
});

//third api--->GET--> /posts/:id --> to see specific post with id-->post arr ma id nakhvi pdse
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params; //url params are string bydefault
    //console.log(id); 
    let post=posts.find((p)=>id===p.id);
    //console.log(post); //jo id khotu hoy toh undefined print thay
    //res.send("request working"); //khotu id moklisu url ma toh b aa print thase pan posts nai dekhai ae id mate
    res.render("show.ejs",{post});
});
//index.ejs ma jyare showpost ni link add kariye che tyare ae link new add kareli post ma apply nathi thati..kem k new add kareli post ma aapde manually id assign karyu nathi
//etle automatic id generate karva-->uuid package use karvu-->universally unique identifiers--->je dar vakhate string type na unique ids generate kare

//fourth api: PATCH--->/posts/:id--->to update specific post(content change)
app.patch("/posts/:id",(req,res)=>{ //aa ekli patch req hopscotch mathi try kari hati pehla
    let {id}=req.params;
    let newContent=req.body.content; //change karva mate parameter ma content nd eni value ma new updated content--->ae ahi store kariye che
    let post=posts.find((p)=>id===p.id);
    post.content=newContent;
    // console.log(newContent);
    console.log(post);
    console.log(id);
    // res.send("patch working");
    res.redirect("/posts");
});

//fifth api--->Edit Route--->GET-->/posts/:id/edit----->serves the edit form
app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("edit",{post});
});
//html form 2 type ni j req moklay che post, get--->patch,delete,put req moklati nathi teni mate npm nu ek package use karvu pade-->method-oerride
//etle k form ma jya post/get hoy tya patch/put/delete mokli sakiye

//sixth api--->Destroy Route-->DELETE---->/posts/:id---to delete specific post
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=>id!==p.id); //jeni id url ma given hoy te j post khali naa aave posts arr ma
    res.redirect("/posts");
    //res.send("delete success");
});


/**
 * The name="content" ensures that the textarea’s value is included in the request body.
express.urlencoded({ extended: true }) parses form data correctly.
methodOverride("_method") allows you to send a PATCH request using a form.

 */



