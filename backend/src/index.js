const fastify = require("fastify")

const app = fastify()

app.register(require("@fastify/cors"), {
  origin: "*"
})

app.register(require("@fastify/mongodb"), {
  url: "mongodb+srv://user:user@cluster0.ohkevcd.mongodb.net/todos",
})

app.register(require("./todos"))

app.listen({ port: 3000 })
