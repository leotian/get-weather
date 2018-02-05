require('./initEnv')

const app = require('../app')

app.set('port', 3000)

app.listen(app.get('port'), () => {
  console.log('Express server listening on port 3000')
})
