const express = require('express')
const app = express()
const port = 5000
const {User} = require('./models/User')
const config = require('./config/key')

// xxx-form-urlencode 형식의 데이터 받을 수 있게 함
app.use(express.urlencoded({extended: true}));
// json 형식의 데이터 받을 수 있게 함
app.use(express.json());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err))



app.get('/', (req, res) => {
  res.send('Hello World!!!')
})

app.post('/register', (req,res)=>{
  //회원가입할 때 필요한 정보들을 클라이언트에서 가져오면 
  //그것들을 데이터베이스에 넣어준다.
  const user = new User(req.body) // 여기의 body는 위에 body-parser를 해줘서 가능
  user.save((err,userInfo)=>{
    if(err) return res.json({success: false, err})
    return res.status(200).json({success: true})
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})