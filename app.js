const express=require("express");
const app=express();
const mongoose=require("mongoose");
const cors=require("cors")


const{MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_PORT, REDIS_URL, SESSION_SECRET,}=require("./config/config")
const mongoURL=`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`
mongoose.set("strictQuery", false);


const postRouter=require("./routes/postRoutes");
const userRouter=require("./routes/userRouter");
const { application } = require("express");


const connectWithRetry = () => {
    mongoose.connect(mongoURL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(()=>{
        console.log("successfully connected to DB")
    })
    .catch((err)=>{
        console.log(err);
        setTimeout(connectWithRetry,5000);
    })
}

connectWithRetry();

app.enable("trust proxy");
app.use(cors({}));
app.use(express.json());    
const PORT=process.env.PORT || 3000;

app.get("/",(req,res)=>{
    res.send("<h2>Hello there</h2>")
})

app.use("/api/v1/posts",postRouter);
app.use("/api/v1/users",userRouter);

app.listen(PORT,()=>{
    console.log("listening on port",PORT);
})
