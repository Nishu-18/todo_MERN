const express = require('express')
const app = express();
const { todo } = require('./db');
const cors = require('cors');

const { createTodo, updateTodo } = require('./types')
const zod = require('zod')


app.use(express.json());
app.use(cors())
app.post("/todo", async function(req, res) {
    const userbody = req.body;
    const parsedPayLoad = createTodo.safeParse(userbody)
    if (!parsedPayLoad.success) {
        res.status(411).json({
            msg: "You send wrong inputs"
        })
        return;
    }
    await todo.create({
        title: userbody.title,
        description: userbody.description,
        completed: false
    })
    res.json({
        msg: "added in todo List"
    })
})
app.post("/completed", async function(req, res) {
    const updatedPayload = req.body;
    const parsedPayLoad = updateTodo.safeParse(updatedPayload);
    if (!parsedPayLoad.success) {
        res.status(411).json({
            msg: "You send wrong inputs"
        })
    }
    await todo.updateOne({ _id: updatedPayload.id }, { completed: true })
    res.json({
        msg: "Todo marked as completed"
    })


})

app.get("/todo", async function(req, res) {
    const data = await todo.find({})
    res.json({
        todos: data
    })
})


app.listen(3000, function() {
    console.log("Running...");

})