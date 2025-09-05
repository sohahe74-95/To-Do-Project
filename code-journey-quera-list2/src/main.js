const taskimgback = document.getElementById("task-back-img");

document.addEventListener("DOMContentLoaded", () => {
  const addTaskBtn = document.querySelector(".add-task-button");
  const taskform = document.getElementById("task-form");
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
const tagbutton = document.getElementById("tag-button");
const prioritybuttonframe = document.getElementById("priority-button-frame");

//click on tags and show priorities
tagbutton.addEventListener("click", () => {
  prioritybuttonframe.classList.toggle("hidden");
});

let selectedPriority = "";

// choose priority
priorityButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    selectedPriority = btn.textContent.trim();

    priorityButtons.forEach((b) => {
      b.classList.remove("hidden");
      b.style.removeProperty("display");
    });

    // just choosed button
    priorityButtons.forEach((b) => {
      if (b !== btn) b.classList.add("hidden");
    });

    tagbutton.classList.add("hidden");
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

  // کنترل نمایش عکس و پیام خالی
  if (tasks.length === 0) {
    noTasksMsg.style.display = "block";
    if (taskimgback) {
      taskimgback.style.display = "block";
    }
  } else {
    noTasksMsg.style.display = "none";
    if (taskimgback) {
      taskimgback.style.display = "none";
    }
  }

  tasks.forEach((task, index) => {
    // رنگ مرز بر اساس priority
    let borderColorClass = "";
    if (task.priority.trim() === "پایین") {
      borderColorClass = "border-r-[#11A483]";
    } else if (task.priority.trim() === "متوسط") {
      borderColorClass = "border-r-[#FFAF37]";
    } else if (task.priority.trim() === "بالا") {
      borderColorClass = "border-r-[#FF5F37]";
    }

    // کارت تسک
    const taskFrame = document.createElement("div");
    taskFrame.className = `border border-gray-300 border-r-4 ${borderColorClass} rounded-lg p-4 shadow flex flex-col gap-2 relative my-2`;

    // منوی سه نقطه
    const menucontainer = document.createElement("div");
    menucontainer.className = "absolute top-2 left-2 p-1";
    const menubtn = document.createElement("button");
    menubtn.className = "task-menu-btns mt-1";
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

    // خط اول: چک‌باکس + عنوان + اولویت
    const line1 = document.createElement("div");
    line1.className = "flex items-center gap-2";

    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.className = "w-4 h-4 cursor-pointer";
    cb.checked = task.completed;

    cb.addEventListener("change", () => {
      task.completed = cb.checked;
      saveTasks();
      renderTasks();
    });

    const nameSpan = document.createElement("span");
    nameSpan.textContent = task.name;
    nameSpan.className =
      "font-semibold" + (task.completed ? " line-through text-gray-400" : "");

    const prioritySpan = document.createElement("span");
    prioritySpan.textContent = task.priority;
    prioritySpan.className =
      "ml-auto px-2 py-1 rounded text-xs " +
      (task.priority === "پایین"
        ? "bg-[#C3FFF1] text-[#11A483]"
        : task.priority === "متوسط"
          ? "bg-[#FFEFD6] text-[#FFAF37]"
          : "bg-[#FFE2DB] text-[#FF5F37]");

    line1.appendChild(cb);
    line1.appendChild(nameSpan);
    line1.appendChild(prioritySpan);
    taskFrame.appendChild(line1);

    // توضیحات
    if (task.desc) {
      const desc = document.createElement("p");
      desc.textContent = task.desc;
      desc.className =
        "text-gray-700" + (task.completed ? " line-through text-gray-400" : "");
      taskFrame.appendChild(desc);
    }

    // بر اساس وضعیت → به لیست مربوطه اضافه کن
    (task.completed ? doneTasksContainer : tasksContainer).appendChild(taskFrame);
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

  priorityButtons.forEach((b) => {
    b.classList.remove("ring-2", "ring-blue-500", "hidden");

    b.style.removeProperty("display");
  });

  prioritybuttonframe.classList.add("hidden");
  tagbutton.classList.remove("hidden");
});

// initial render
renderTasks();
