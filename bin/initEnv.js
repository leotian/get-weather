global.__CLIENT__ = false
global.__SERVER__ = true
global.__DEVELOPMENT__ = 'development'
global.__TEST__ = 'test'
global.__PRODUCTION__ = 'production'
global.__IS_PRODUCTION__ = process.env.NODE_ENV === __PRODUCTION__
global.__IS_DEVELOPMENT__ = process.env.NODE_ENV !== __PRODUCTION__ && process.env.NODE_ENV !== __TEST__
global.__ENV__ =
  process.env.NODE_ENV === __PRODUCTION__ ? __PRODUCTION__
  : process.env.NODE_ENV === __TEST__ ? __TEST__
  : __DEVELOPMENT__

global.path = require('path')

require('babel-polyfill')
require('babel-register')
