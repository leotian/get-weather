import express from 'express'
import bodyParser from 'body-parser'
import axios from 'axios'
import server from './server/apiRoutes'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: !1 }))

app.use('/static', express.static(path.join(__dirname, './dist/static')))

app.use('/', async (req, res) => {
  if (__IS_DEVELOPMENT__) {
    const ret = await axios({
      method: 'get',
      url: 'http://localhost:8080/index.html/#/',
    })
    res.send(ret.data)
  } else {
    res.setHeader("Content-Type", "text/html")
    res.sendfile(`${__dirname}/dist/index.html`)
  }
})

app.use('/api/download', server)

module.exports = app
