const hapi = require('hapi')
const mongoose = require('mongoose')
const Painting = require('./models/Painting.js')

// mongoose.connect('mongodb://<user>:<password>@<dsyourds>.mlab.com:port/<database-name>')
// mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds125362.mlab.com:25362/modern_api')
mongoose.connect('mongodb://testuser:test1Password@ds125362.mlab.com:25362/modern_api', { useNewUrlParser: true })

mongoose.connection.once('open', () => {
  console.log('Connected to database')
})

const server = hapi.server({
  port: 8000,
  host: 'localhost',
})

const init = async () => {
  server.route([
    {
      method: 'GET',
      path: '/',
      handler: (request, reply) => {
        return '<h1>My modern api</h1>'
      }
    },
    {
      method: 'GET',
      path: '/api/v1/paintings',
      handler: (req, reply) => {
        return Painting.find()
      }
    },
    {
      method: 'POST',
      path: '/api/v1/paintings',
      handler: (req, reply) => {
        const { name, url, techniques } = req.payload
        const painting = new Painting({
          name,
          url,
          techniques,
        })
        return painting.save()
      }
    },
  ])

  await server.start()
  console.log(`Server running at: ${server.info.uri}`)
}

init()
