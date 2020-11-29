const express = require('express');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');
const router = require('./routes');
const cors = require('cors');

//const mongoose = require('mongoose');

///////////////////////////////////////////////
app.use(bodyParser.json());
app.use('/', router);
app.use(express.static('static'));
app.use(cors());

app.set('views', __dirname + '/static');
app.engine('html' , ejs.renderFile);
/////////////////////////////////////////////////
/*

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

const SignUp = mongoose.model('SignUp', SignUpSchema);

app.post('/signup', async function (req, res) {
    const signUp = new SignUp({ id: req.body.id, pw: req.body.pw});
    await signUp.save();
    console.log("Hi");
    res.status(200);
    res.send(signUp);
})

app.post('/signin', async function (req, res) {
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

*/


//////////////////////////////////////////////////
const server = app.listen(8000, () => {
    console.log("We mad a server!");
})