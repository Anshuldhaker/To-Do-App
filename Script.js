

function Todo() {
  const button = document.getElementById("btn");
  const input = document.querySelector(".text");
  const list = document.querySelector(".list");     


  function addTask() {
    let store = input.value.trim();
    if (!store) return;

    const li = document.createElement("li");

    const createRemoveBtn = document.createElement("button");
    createRemoveBtn.textContent = "Trash 🗑️";
    createRemoveBtn.classList.add("delete-btn");

    const createSpan = document.createElement("span");
    createSpan.innerText = store;

    const createLabel = document.createElement("label");

    const Checkbox = document.createElement("input");
    Checkbox.type = "checkbox";

    list.appendChild(li);
    createLabel.appendChild(Checkbox);
    createLabel.appendChild(createSpan);
    li.appendChild(createLabel);
    li.appendChild(createRemoveBtn);

    createLabel.classList.add("label-group");

    createRemoveBtn.addEventListener("click", () => {
      li.remove();
    });

    Checkbox.addEventListener("change", () => {
      createSpan.classList.toggle("Completed", Checkbox.checked);
    });

    input.value = "";
    input.focus();
  }   


    button.addEventListener("click", addTask);


  // ✅ only here events

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  });
}
Todo();
