/*
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
*/

//const SignUp = mongoose.model('SignUp', SignUpSchema);
/////////////////////////////////////////////////////////
const mongoose = require('mongoose');

const SignUpSchema = new mongoose.Schema({
    id: String,
    pw: String,
});

const SignUp = new mongoose.model('SignUp', SignUpSchema);



async function loginMiddleware(req, res, next) {
    const userList = await SignUp.find({ id: req.body.id });
    const enteredPw = req.body.pw;

    if (userList.length === 0) {
        console.log("no user");
        res.status(404);
        res.send("fail to login");
    }
    else if (userList[0].pw === enteredPw) {
        next();
    }
    else {
        console.log("no user");
        res.status(404);
        res.send("fail to login");
    }
}

module.exports = loginMiddleware;