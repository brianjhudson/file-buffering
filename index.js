const fs = require('fs')
const path = require('path')

const files = []
fs.readdirSync(path.join(__dirname, 'images'))
   .forEach(file => {
      fs.readFile(path.join(__dirname, 'images', file), (err, data) => {
         let date = file.split('.')[0]
         files.push({date, data})
      })
      
   })
const express = require('express')
const app = express()


app.use(express.static(path.join(__dirname, 'public')))

app.get('/image', (req, res, next) => {
   const today = new Date().toLocaleString().split(' ')[0]
   const badgeFile = files.find(file => file.date === today)
   if (!badgeFile) {
      return res.status(500).json({message: "No Badge Found for today"})
   } 
   const badgeString = `data:image/jpeg;base64,${new Buffer(badgeFile.data).toString('base64')}`
   res.status(200).send(badgeString)
})

app.listen(3000, () => {
   console.log('Listening on port 3000')
})