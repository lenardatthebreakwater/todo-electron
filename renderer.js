async function main() {
    const addTodoInput = document.getElementById("addTodoInput")
    const addTodoBtn = document.getElementById("addTodoBtn")
    const todoUnorderedList = document.getElementById("todoUnorderedList")  

    const displayAllTodos = async () => {
        const allTodos = await window.todoDb.getAllTodos()
        for (let i = 0; i < allTodos.length; i++) {
            const li = document.createElement("li")
            li.setAttribute("id", allTodos[i]["id"])
            li.innerText = allTodos[i]["todoItem"]

            const button = document.createElement("button")
            button.innerText = "Remove Todo"
            button.addEventListener("click", async (event) => {
                event.preventDefault()
                const todo = await window.todoDb.removeTodo(allTodos[i]["id"])
                todoUnorderedList.replaceChildren()
                await displayAllTodos()
            })

            li.append(button)
            todoUnorderedList.append(li)
        }
    }

    await displayAllTodos()

    addTodoBtn.addEventListener("click", async (event) => {
        event.preventDefault()
        const todoItem = addTodoInput.value
        const todo = await window.todoDb.addTodo(todoItem)
        todoUnorderedList.replaceChildren()
        await displayAllTodos()
    })
}

main()