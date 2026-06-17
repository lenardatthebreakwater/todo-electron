const { app, BrowserWindow, ipcMain } = require("electron")
const path = require("node:path")
const { prisma } = require("./lib/prisma")

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    })

    win.loadFile("./index.html")
}

ipcMain.handle("addTodo", async (event, todoItem) => {
    const todo = await prisma.todo.create({
        data: { todoItem:  todoItem }
    })
})

ipcMain.handle("getAllTodos", async (event) => {
    const todos = await prisma.todo.findMany()
    return todos
})

ipcMain.handle("removeTodo", async (event, todoId) => {
    const todo = await prisma.todo.delete({
        where: { id: todoId }
    })
})

app.whenReady().then(() => {
    createWindow()

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit()
    }
})