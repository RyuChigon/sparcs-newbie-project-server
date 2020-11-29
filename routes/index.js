const express = require('express');
const path = require('path');
const authRouter = require('./auth');
const cors = require('cors');
const router = express.Router();
//const loginMiddleware = require('../middlewares/login')

router.use(cors());
router.use('/auth', authRouter)

//router.use('/login', loginMiddleware)

router.get('/', (req,res) => {
    res.send('Hello World');
})

///////////////////////////////////////////////////////
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/chichi', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
})
.then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error(error);
});

const SignUpSchema = new mongoose.Schema({
    id: String,
    pw: String,
});

const WriteSchema = new mongoose.Schema({
    title: String,
    content: String,
})

const SignUp = mongoose.model('SignUp', SignUpSchema);
const Review = mongoose.model('Content', WriteSchema)
///////////////////////////////////////////////////////////////

router.post('/signup', async function (req, res) {
    const signUp = new SignUp({ id: req.body.id, pw: req.body.pw});
    await signUp.save();
    console.log("Hi");
    res.status(200);
    res.send(signUp);
})

router.post('/login', async function (req, res) {
    const userList = await SignUp.find({ id: req.body.id });
    const enteredPw = req.body.pw;

    if (userList.length === 0) {
        console.log("no user");
        res.status(404);
        res.send("No");
    }
    else if (userList[0].pw === enteredPw) {
            res.status(200);
            res.send("Yes");
            console.log("Hello");
    }
    else {
        console.log("no user");
        res.status(404);
        res.send("No");
    }

})

router.post('/makecontent', async function(req, res) {
    const review = new Review({ title: req.body.title, content: req.body.content });
    await review.save();
    console.log("complete to save review");
    res.status(200);
    res.send(review);
})

router.get('/contentlist', async function(req, res) {
    const contentList = await Review.find();
    console.log(contentList);

    res.status(200);
    res.send(contentList);
})

module.exports = router;