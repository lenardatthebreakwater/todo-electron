const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("todoDb", {
    addTodo: (todoItem) => ipcRenderer.invoke("addTodo", todoItem),
    getAllTodos: () => ipcRenderer.invoke("getAllTodos"),
    removeTodo: (todoId) => ipcRenderer.invoke("removeTodo", todoId)
})
