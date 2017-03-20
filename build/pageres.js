/*
// Wait until Pageres supports headless chrome
const PageRes = require('pageres')

const pageres = new PageRes({ delay: 20 })
  .src('hb.wopian.me/#/', [ '412x732', '1920x1080' ])
  .src('hb.wopian.me/#/@wopian', [ '412x732', '1920x1080' ])
  .dest(`${__dirname}/../screenshot`)
  .run()
  .then(() => console.log('done'))
*/

var fs = require('fs')
var screenshot = require('electron-screenshot-service')

screenshot({
  url : 'https://hb.wopian.me/#/@wopian',
  width : 1920,
  height : 1080,
  delay: 1000 * 10,
  css: 'body{ background:transparent !important;}\n::-webkit-scrollbar{opacity:0 !important;display: none !important;}'
})
.then(function(img){
  fs.writeFile('./screenshots/user.png', img.data, function(err){
    screenshot.close()
  })
})
