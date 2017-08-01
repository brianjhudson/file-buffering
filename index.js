const fs = require('fs')
const path = require('path')

const files = []
fs.readdirSync(path.join(__dirname, 'images'))
   .forEach(file => {
      fs.readFile(path.join(__dirname, 'images', file), (err, data) => {
         console.log(data)
         files.push(data)
      })
      
   })
const express = require('express')
const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.get('/image', (req, res, next) => {
   console.log(files[0])
   const file = `data:image/jpeg;base64,${new Buffer(files[0]).toString('base64')}`
   res.status(200).send(file)
})

app.listen(3000, () => {
   console.log('Listening on port 3000')
})