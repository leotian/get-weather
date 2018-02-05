import express from 'express'
import bodyParser from 'body-parser'
import server from './server/apiRoutes'
import templateRoutes from './server/templateRoutes'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: !1 }))

app.use('/static', express.static(path.join(__dirname, './dist/static')))

app.use('/', templateRoutes)

app.use('/api', server)

module.exports = app
