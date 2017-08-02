const fs = require('fs')
const path = require('path')

const files = []
fs.readdirSync(path.join(__dirname, 'images'))
   .forEach(file => {
      fs.readFile(path.join(__dirname, 'images', file), (err, data) => {
         let fileInfo = file.split('.')
         let date = fileInfo[0]
         let type = fileInfo[1]
         let dataString = `data:image/${type};base64,${new Buffer(data).toString('base64')}`
         files.push({date, dataString})
      })
      
   })
const express = require('express')
const {json} = require('body-parser')
const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.use(json())
app.get('/image', (req, res, next) => {
   const today = new Date()
   const month = today.getMonth() + 1
   const day = today.getDate()
   const year = today.getFullYear()
   const dateString = `${year}-${month}-${day}`
   const badgeFile = files.find(file => file.date === dateString)
   if (!badgeFile) {
      return res.status(500).json({message: "No Badge Found for today"})
   } 
   res.status(200).send(badgeFile.dataString)
})

app.post('/image', (req, res, next) => {
   console.log(req.body)
})

app.listen(3000, () => {
   console.log('Listening on port 3000')
})