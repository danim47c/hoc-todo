const { ObjectId } = require("@fastify/mongodb")

module.exports = async (app) => {
  const todosModule = await app.mongo.db.collection("todos")

  app.get("/todos", async () => {
    const result = await todosModule.find({}).toArray()

    return result
  })

  app.post("/todos", async (request) => {
    const _id = new ObjectId()

    await todosModule.insertOne({
      _id,
      ...request.body
    })

    return {
      _id,
      ...request.body,
    }
  })

  app.delete("/todos/:id", async (request) => {
    const result = await todosModule.findOneAndDelete({ _id: new ObjectId(request.params.id) })

    return result.value
  })

  app.put("/todos/:id", async (request) => {
    const result = await todosModule.findOneAndUpdate(
      { _id: new ObjectId(request.params.id) },
      {
        $set: request.body
      },
      {
        returnDocument: "after"
      }
    )

    return result.value
  })
}
