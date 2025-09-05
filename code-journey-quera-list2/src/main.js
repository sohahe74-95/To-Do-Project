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
    let borderColorClass = "";
    if (task.priority.trim() === "پایین") {
      borderColorClass = "border-r-[#11A483]";
    } else if (task.priority.trim() === "متوسط") {
      borderColorClass = "border-r-[#FFAF37]";
    } else if (task.priority.trim() === "بالا") {
      borderColorClass = "border-r-[#FF5F37]";
    }
    const taskFrame = document.createElement("div");
    taskFrame.className = `border border-gray-300 border-r-4 ${borderColorClass} rounded-lg p-4 shadow flex flex-col gap-2 relative`;

    // menu threepoints on the left
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

    //start code maryam
    // delete task
    const deletetask = menuFrame.querySelector(".delete-btn");
    deletetask.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    // edit task
    const editBtn = menuFrame.querySelector(".edit-btn");
    editBtn.addEventListener("click", () => {
      if (taskFrame.querySelector(".edit-form-inline")) return;
      const editForm = document.createElement("div");
      editForm.className =
        "edit-form-inline flex flex-col gap-2 mt-2 bg-gray-50 p-3 rounded border";

      const editname = document.createElement("input");
      editname.type = "text";
      editname.value = task.name;
      editname.className =
        "font-semibold  p-1 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm";

      const descedit = document.createElement("textarea");
      descedit.value = task.desc;
      descedit.className =
        "text-gray-700 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm resize-none";

      // الویت
      let currentPriority = task.priority;
      const priorityWrapper = document.createElement("div");
      priorityWrapper.className = "flex items-center gap-2";
      const editpriority = document.createElement("span");
      editpriority.textContent = currentPriority;
      editpriority.className =
        "px-2 py-1 rounded text-sm " +
        (currentPriority === "پایین"
          ? "bg-[#C3FFF1] text-[#11A483]"
          : currentPriority === "متوسط"
          ? "bg-[#FFEFD6] text-[#FFAF37]"
          : "bg-[#FFE2DB] text-[#FF5F37]");

      const removePriorityBtn = document.createElement("button");
      removePriorityBtn.innerHTML = "✕";
      removePriorityBtn.className =
        "text-gray-500 hover:text-red-500 text-xl font-bold";

      priorityWrapper.appendChild(editpriority);
      priorityWrapper.appendChild(removePriorityBtn);

      const priorityOptionsWrapper = document.createElement("div");
      priorityOptionsWrapper.className = "flex gap-3 hidden";

      ["پایین", "متوسط", "بالا"].forEach((p) => {
        const btn = document.createElement("button");
        btn.textContent = p;
        btn.className =
          "priority-option px-3 py-1 rounded text-sm border " +
          (p === "پایین"
            ? "bg-[#C3FFF1] text-[#11A483]"
            : p === "متوسط"
            ? "bg-[#FFEFD6] text-[#FFAF37]"
            : "bg-[#FFE2DB] text-[#FF5F37]");

        btn.addEventListener("click", () => {
          currentPriority = p;
          editpriority.textContent = p;
          editpriority.className =
            "px-2 py-1 rounded text-sm " +
            (p === "پایین"
              ? "bg-[#C3FFF1] text-[#11A483]"
              : p === "متوسط"
              ? "bg-[#FFEFD6] text-[#FFAF37]"
              : "bg-[#FFE2DB] text-[#FF5F37]");
          priorityOptionsWrapper.classList.add("hidden");
          priorityWrapper.classList.remove("hidden");
        });

        priorityOptionsWrapper.appendChild(btn);
      });

      removePriorityBtn.addEventListener("click", () => {
        priorityWrapper.classList.add("hidden");
        priorityOptionsWrapper.classList.remove("hidden");
      });

      const hr = document.createElement("hr");

      const editBtnform = document.createElement("button");
      editBtnform.textContent = "ویرایش تسک";
      editBtnform.className =
        "bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-fit self-end text-sm";

      editForm.appendChild(editname);
      editForm.appendChild(descedit);
      editForm.appendChild(priorityWrapper);
      editForm.appendChild(priorityOptionsWrapper);
      editForm.appendChild(hr);
      editForm.appendChild(editBtnform);

      taskFrame.appendChild(editForm);

      editBtnform.addEventListener("click", () => {
        const newName = editname.value.trim();
        const newDesc = descedit.value.trim();

        tasks[index].name = newName;
        tasks[index].desc = newDesc;
        tasks[index].priority = currentPriority;

        saveTasks();
        renderTasks();
      });
    });
    // end code maryam

    // first line : checkbox + priority + name
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
      (task.priority.trim() === "پایین"
        ? "bg-[#C3FFF1] text-[#11A483]"
        : task.priority.trim() === "متوسط"
        ? "bg-[#FFEFD6] text-[#FFAF37]"
        : "bg-[#FFE2DB] text-[#FF5F37]");

    const priorityOrder = ["بالا", "متوسط", "پایین"];
    tasks.sort((a, b) => {
      return (
        priorityOrder.indexOf(a.priority.trim()) -
        priorityOrder.indexOf(b.priority.trim())
      );
    });

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

  priorityButtons.forEach((b) => {
    b.classList.remove("ring-2", "ring-blue-500", "hidden");

    b.style.removeProperty("display");
  });

  prioritybuttonframe.classList.add("hidden");
  tagbutton.classList.remove("hidden");
});

// initial render
renderTasks();
