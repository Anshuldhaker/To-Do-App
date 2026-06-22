function Todo() {
  const button = document.getElementById("btn");
  const input = document.querySelector(".text");
  const list = document.querySelector(".list");

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  renderTasks();

  function renderTasks() {
    tasks.forEach((task) => {
      const li = createElement(task);
      list.appendChild(li);
    });
  }


  
  function createElement(task) {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const span = document.createElement("span");
    span.innerText = task;
    const label = document.createElement("label");
    const deleteBtn = document.createElement("Button");

    deleteBtn.textContent = "Trash 🗑️";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", () => {
      let index=tasks.indexOf(task);
      if(index!=-1){
        tasks.splice(index,1);
        localStorage.setItem("tasks",JSON.stringify(tasks))
      }
      li.remove();
     
    });
    
    checkbox.addEventListener("change", () => {
      span.classList.toggle("Completed", checkbox.checked);
    });

    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    return li;
  }

  function addTask() {
    let store = input.value.trim();
    if (!store) return;

    const li = createElement(store);
    list.appendChild(li);

    tasks.push(store);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    input.value = "";
    input.focus();
  }

  button.addEventListener("click", addTask);

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  });
}
Todo();
