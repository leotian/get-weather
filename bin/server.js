require('./initEnv')

const app = require('../app')

app.set('port', 3001)

app.listen(app.get('port'), () => {
  console.log('Express server listening on port 3001');
})
