const hapi = require('hapi')

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
