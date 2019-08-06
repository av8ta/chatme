const serve = require('browser-sync')
const proxy = require('http-proxy-middleware')
const bundler = require('./parcel.config')
const path = require('path')

// browser sync settings
serve({
  port: 8080,
  open: false,
  server: {
    baseDir: path.join(__dirname, 'dist')
  },
  middleware: [
    proxy('http://localhost:3000', {}),
    bundler.middleware(),
  ]
})

// todo investigate why messsages are doubled up and why android can send 
// but not receive - look at middleware? content blocking? 
// get adb working to investigate on the phone
// or set up a docker image to develop with as well as use in production
// for now it's fine for editing some styles
