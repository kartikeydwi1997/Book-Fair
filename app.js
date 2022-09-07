const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const errorController = require('./controllers/error');

const User=require('./models/user');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('61d69f39fe61710caa04dc3a') //built in method to find an id in mongoose
    .then(user => {
      req.user = user //since it is an mongoose obejct we can use it directly and store it in req.user
      next();
     
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect("mongodb+srv://kartikey:12345@cluster0.czzcv.mongodb.net/mongooseDB?retryWrites=true&w=majority")
.then(result=>{
  User.findOne().then(user=>{
    if(!user){

 const user = new User({  //declaring a new user
    name: 'Kartikey',
    email: 'k@d.co',
    cart: {
      items: []
    }
  });
  user.save();//user is saved in DB.
 }
});
  app.listen(8000);
}).catch(err=>{
  console.log(err);
})
