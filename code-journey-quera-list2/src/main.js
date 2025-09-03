document.addEventListener("DOMContentLoaded", () => {
  const addTaskBtn = document.querySelector(".add-task-button");
  const taskform = document.getElementById("task-form");
  const taskimgback = document.getElementById("task-back-img");
  addTaskBtn.addEventListener("click", () => {
    taskform.classList.toggle("hidden");
  });
});

const taskNameInput = document.getElementById("task-name");
const taskDescInput = document.getElementById("task-desc");
const addTaskBtn = document.getElementById("add-task-btn");
const tasksContainer = document.getElementById("tasks-container");
const priorityButtons = document.querySelectorAll(".priority-option");
const noTasksMsg = document.getElementById("no-tasks-msg");

let selectedPriority = "";

// choose priority
priorityButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    priorityButtons.forEach((b) =>
      b.classList.remove("ring-2", "ring-blue-500")
    );
    btn.classList.add("ring-2", "ring-blue-500");
    selectedPriority = btn.textContent;
    if (taskimgback) {
      taskimgback.style.display = "none";
    }
  });
});

// load tasks on localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// show tasks
function renderTasks() {
  tasksContainer.innerHTML = "";
  if (tasks.length === 0) {
    noTasksMsg.style.display = "block";
  } else {
    noTasksMsg.style.display = "none";
  }

  tasks.forEach((task, index) => {
    const taskFrame = document.createElement("div");
    taskFrame.className =
      "border border-gray-300 rounded-lg p-4 shadow flex flex-col gap-2 relative";

    // menu threepoints on the left
    const menucontainer = document.createElement("div");
    menucontainer.className = "absolute top-2 left-2 p-1";
    const menubtn = document.createElement("button");
    menubtn.className = "task-menu-btns mt-1"; //
    menubtn.innerHTML = `<img src="./src/assets/images/Frame 1000005552.svg" alt="menu" class="w-5 h-5"/>`;
    const menuFrame = document.createElement("div");
    menuFrame.className =
      "task-menu-frame absolute top-full left-0 mt-1 w-36 bg-white border border-gray-300 rounded shadow-md hidden flex justify-between items-center p-2 gap-2";
    menuFrame.innerHTML = `
      <button class="edit-btn flex items-center justify-center p-1 hover:bg-gray-100 rounded">
        <img src="./src/assets/images/Group.png" alt="edit" class="w-5 h-5"/>
      </button>
      <button class="delete-btn flex items-center justify-center p-1 hover:bg-gray-100 rounded">
        <img src="./src/assets/images/tabler_trash-x.png" alt="delete" class="w-5 h-5"/>
      </button>
    `;
    menubtn.addEventListener("click", () =>
      menuFrame.classList.toggle("hidden")
    );
    menucontainer.appendChild(menubtn);
    menucontainer.appendChild(menuFrame);
    taskFrame.appendChild(menucontainer);

    // first linr : checkbox + priority + name
    const line1 = document.createElement("div");
    line1.className = "flex items-center gap-2";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.className = "w-4 h-4";
    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      saveTasks();
    });

    const nameSpan = document.createElement("span");
    nameSpan.textContent = task.name;
    nameSpan.className = "font-semibold";

    const prioritySpan = document.createElement("span");
    prioritySpan.textContent = task.priority;
    prioritySpan.className =
      "ml-auto px-2 py-1 rounded text-white " +
      (task.priority === "پایین"
        ? "bg-[#C3FFF1] text-[#11A483]"
        : task.priority === "متوسط"
        ? "bg-[#FFEFD6] text-[#FFAF37]"
        : "bg-[#FFE2DB] text-[#FF5F37]");

    line1.appendChild(checkbox);
    line1.appendChild(nameSpan);
    line1.appendChild(prioritySpan);

    // second line : explains
    const line2 = document.createElement("p");
    line2.textContent = task.desc;
    line2.className = "text-gray-700";

    taskFrame.appendChild(line1);
    taskFrame.appendChild(line2);

    tasksContainer.appendChild(taskFrame);
  });
}

// add new tasks
addTaskBtn.addEventListener("click", () => {
  const name = taskNameInput.value.trim();
  const desc = taskDescInput.value.trim();

  if (!name || !selectedPriority) {
    alert("لطفاً نام تسک و اولویت را وارد کنید!");
    return;
  }

  const newTask = {
    name,
    desc,
    priority: selectedPriority,
    completed: false,
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();

  // clean forms
  taskNameInput.value = "";
  taskDescInput.value = "";
  selectedPriority = "";
  priorityButtons.forEach((b) => b.classList.remove("ring-2", "ring-blue-500"));
});

// initial render
renderTasks();
