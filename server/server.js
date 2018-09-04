require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const messagesCtrl = require('./messagesCtrl')
const session = require('express-session')

const app = express()

//destructure from process.env
let {SERVER_PORT} = process.env

//middleware
app.use(bodyParser.json())
app.use(session({
    secret: 'blahblah',
    resave: false,
    saveUninitialized: true                    
}))
app.use((req, res, next) => {
    let badWords = ['knucklehead', 'jerk', 'internet explorer'];
    if (req.body.message) {
      let badWordsExist = true;
      for (let i = 0; i < badWords.length; i++) {
        let regex = new RegExp(badWords[i], 'g');
        req.body.message = req.body.message.replace(regex, '****');
      }
      next();
    } else {
      next();
    }
  });

//endpoints
app.get('/api/messages', messagesCtrl.getAllMessages)
app.post('/api/messages', messagesCtrl.createMessages)
app.get('/api/history', messagesCtrl.history)


//listen on port
app.listen(SERVER_PORT, ()=>{
    console.log(`Mr Smith Lives on port ${SERVER_PORT}`)
})






