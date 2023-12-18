const form = document.querySelector("form");
const input = document.querySelector("input");
const todos = document.querySelector(".todos");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!input.value) return;

    addTodos(input.value);
    input.value = "";
});

function addTodos(data) {
    console.log(data);
    const todo = document.createElement("li");
    todo.classList.add("todo");
    todo.innerText = data;
    console.log(todo);
    const deleteTodo = document.createElement("button");
    deleteTodo.classList.add("delete");
    deleteTodo.innerText = "X";
    todo.appendChild(deleteTodo);
    todos.append(todo);

    deleteTodo.addEventListener("click", (e) => {
        todos.removeChild(todo);
    });
}
