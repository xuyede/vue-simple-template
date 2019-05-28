const express = require('express')
const app =express()

app.use( express.static('./dist/') )

app.listen(12305, () => {
  console.log('服务器开启, 监听端口12305, http://127.0.0.1:12305')
})