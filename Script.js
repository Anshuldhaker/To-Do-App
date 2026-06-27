function Todo() {
  const button = document.getElementById("btn");
  const input = document.querySelector(".text");
  const list = document.querySelector(".list");
  const totalEL = document.getElementById("total");
  const completedEL = document.getElementById("completed");
  const remainingEL = document.getElementById("remaining");
  const toggleBtn = document.getElementById("themeToggle");
  const container = document.querySelector(".container");
  const mainContainer = document.querySelector(".maincontainer");

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
  function renderTasks() {
    list.innerHTML = "";
    tasks.forEach((task) => {
      const li = createElement(task);
      list.appendChild(li);
    });
    updateStats();
  }
  renderTasks();
  changeTheme();

  function changeTheme() {
    toggleBtn.addEventListener("click", () => {
      container.classList.toggle("darkTheme");
      const isDark = mainContainer.classList.toggle("darkTheme");
      toggleBtn.textContent = isDark ? "☀️" : "🌙";
    });
  }
  
  function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.completed).length;
    const remaining = total - completed;

    totalEL.textContent = total;
    completedEL.textContent = completed;
    remainingEL.textContent = remaining;
  }

  function createElement(newTask) {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    checkbox.checked = newTask.completed;
    const span = document.createElement("span");
    span.innerText = newTask.text;
    if (newTask.completed) {
      span.classList.add("completed");
    }
    const deleteBtn = document.createElement("Button");

    deleteBtn.textContent = "Trash 🗑️";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", () => {
      let index = tasks.indexOf(newTask);
      if (index != -1) {
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }
      li.remove();
      updateStats();
    });

    checkbox.addEventListener("change", () => {
      span.classList.toggle("completed", checkbox.checked);
      newTask.completed = checkbox.checked;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      updateStats();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    return li;
  }

  function addTask() {
    let store = input.value.trim();
    if (!store) return;

    const newTask = {
      text: store,
      completed: false,
    };

    tasks.push(newTask);
    const li = createElement(newTask);
    list.appendChild(li);

    updateStats();
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
