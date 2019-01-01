const hapi = require('hapi')
const mongoose = require('mongoose')

// mongoose.connect('mongodb://<user>:<password>@<dsyourds>.mlab.com:port/<database-name>')
// mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds125362.mlab.com:25362/modern_api')
mongoose.connect('mongodb://testuser:test1Password@ds125362.mlab.com:25362/modern_api')

mongoose.connection.once('open', () => {
  console.log('Connected to database')
})

const server = hapi.server({
  port: 8000,
  host: 'localhost',
})

const init = async () => {
  server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
      return '<h1>My modern api</h1>'
    }
  })

  await server.start()
  console.log(`Server running at: ${server.info.uri}`)
}

init()
