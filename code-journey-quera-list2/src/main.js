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
//zahra
const doneTasksContainer = document.getElementById("done-tasks");

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
  doneTasksContainer.innerHTML = "";

  tasks.forEach((task, index) => {
    const card = document.createElement("div");
    card.className =
      "border border-gray-300 rounded-lg p-4 shadow flex flex-col gap-2 bg-white my-2";

    // خط اول: چک‌باکس + عنوان + اولویت
    const row = document.createElement("div");
    row.className = "flex items-center gap-2";

    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.className = "w-4 h-4 cursor-pointer";
    cb.checked = task.completed;

    // وقتی تیک می‌زنیم: فقط وضعیت رو عوض کن، ذخیره کن، دوباره رندر کن
    cb.addEventListener("change", () => {
      task.completed = cb.checked;
      saveTasks();
      renderTasks();
    });

    const title = document.createElement("span");
    title.textContent = task.name;
    title.className = "font-semibold" + (task.completed ? " line-through text-gray-400" : "");

    const pr = document.createElement("span");
    pr.textContent = task.priority;
    pr.className =
      "ml-auto px-2 py-1 rounded text-xs " +
      (task.priority === "پایین"
        ? "bg-[#C3FFF1] text-[#11A483]"
        : task.priority === "متوسط"
          ? "bg-[#FFEFD6] text-[#FFAF37]"
          : "bg-[#FFE2DB] text-[#FF5F37]");

    row.appendChild(cb);
    row.appendChild(title);
    row.appendChild(pr);
    card.appendChild(row);

    // توضیح (اختیاری)
    if (task.desc) {
      const desc = document.createElement("p");
      desc.textContent = task.desc;
      desc.className = "text-gray-700" + (task.completed ? " line-through text-gray-400 " : "");
      card.appendChild(desc);
    }

    // اگر انجام‌شده بود بفرست پایین؛ وگرنه بالا
    (task.completed ? doneTasksContainer : tasksContainer).appendChild(card);

  });

  // پیام خالی/پُر (اختیاری)
  noTasksMsg.style.display = tasks.some(t => !t.completed) ? "none" : "block";
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
