const taskimgback = document.getElementById("task-back-img");
//hide and show background soha
document.addEventListener("DOMContentLoaded", () => {
  const addTaskButton = document.querySelector(".add-task-button");
  const taskform = document.getElementById("task-form");
  addTaskButton.addEventListener("click", () => {
    taskform.classList.toggle("hidden");
  });
});

// document.addEventListener("DOMContentLoaded", () => {
//   const hamburgerbtn = document.getElementById("hamburger-btn");
//   const sidebar = document.getElementById("mobile-sidebar");
//   hamburgerbtn.addEventListener("click", () => {
//     sidebar.classList.toggle("hidden");
//   });
//   document.addEventListener("click", (e) => {
//     if (!sidebar.contains(e.target) && !hamburgerbtn.contains(e.target)) {
//       sidebar.classList.add("hidden");
//     }
//   });
// });

//MenuBar Soha
document.addEventListener("DOMContentLoaded", () => {
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const closeBtn = document.getElementById("mobile-close-btn");
  const queraList = document.getElementById("Quera-List");
  const headerContent = document.getElementById("header-content");
  const mobileSidebar = document.getElementById("mobile-sidebar");
  const Header = document.getElementById("header");

  let menuOpen = false;

  function openMenu() {
    mobileSidebar.classList.remove("hidden");
    hamburgerBtn.classList.add("hidden");
    // mobileSidebar.classList.add("full-screen");

    // show multiple button
    closeBtn.classList.remove("opacity-0", "pointer-events-none");
    closeBtn.classList.add("opacity-100", "pointer-events-auto");

    // queraList.classList.add("ml-auto", "mr-8", "text-right");
    queraList.classList.remove("text-center");

    // headerContent.classList.remove("justify-center");
    // headerContent.classList.add("justify-start");
    headerContent.classList.remove("justify-center");
    headerContent.classList.add("justify-start", "gap-x-30");
    queraList.classList.add("mr-2");

    // Header.classList.remove("hidden");

    menuOpen = true;
  }

  function closeMenu() {
    mobileSidebar.classList.add("hidden");
    hamburgerBtn.classList.remove("hidden");

    // being hidden multiple button
    closeBtn.classList.add("opacity-0", "pointer-events-none");
    closeBtn.classList.remove("opacity-100", "pointer-events-auto");

    queraList.classList.remove("ml-auto", "mr-8", "text-right");
    queraList.classList.add("text-center");

    // headerContent.classList.remove("justify-start");
    // headerContent.classList.add("justify-center");
    headerContent.classList.add("justify-center");
    headerContent.classList.remove("justify-start", "gap-x-30");
    queraList.classList.remove("mr-2");

    // Header.classList.add("hidden");

    menuOpen = false;
  }

  hamburgerBtn.addEventListener("click", openMenu);
  closeBtn.addEventListener("click", closeMenu);

  document.addEventListener("click", (e) => {
    if (
      menuOpen &&
      !mobileSidebar.contains(e.target) &&
      !hamburgerBtn.contains(e.target) &&
      !closeBtn.contains(e.target)
    ) {
      closeMenu();
    }
  });
});

//Activation DarkMode Soha
document.addEventListener("DOMContentLoaded", () => {
  const darkBtn = document.getElementById("dark-btn");
  const lightBtn = document.getElementById("light-btn");
  // console.log("darkBtn:", darkBtn);
  // console.log("lightBtn:", lightBtn);

  darkBtn.addEventListener("click", () => {
    document.documentElement.classList.add("dark");
    darkBtn.classList.remove("shadow");
    lightBtn.classList.add("shadow");
  });

  lightBtn.addEventListener("click", () => {
    document.documentElement.classList.remove("dark");
    lightBtn.classList.remove("shadow");
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
const doneTasksContainer = document.getElementById("done-tasks");
const doneCount = document.getElementById("done-count");
// تعداد تسک های در حال انجام مریم
const todotasksContainer = document.getElementById("todo-tasks");
const tastcount = document.getElementById("tast-count");
//click on tags and show priorities
tagbutton.addEventListener("click", () => {
  prioritybuttonframe.classList.toggle("hidden");
});
let selectedPriority = "";
// cancel-butten maryam
const taskform = document.getElementById("task-form");
const cancelbutten = document.getElementById("cancel-butten");
cancelbutten.addEventListener("click", () => {
  taskform.classList.add("hidden");
  taskNameInput.value = "";
  taskDescInput.value = "";
  selectedPriority = "";

  priorityButtons.forEach((b) => {
    b.classList.remove("hidden");
    const eCrossBtn = b.querySelector("button");
    if (eCrossBtn) eCrossBtn.remove();
  });
  document.querySelectorAll("#priority-button-frame span").forEach((span) => {
    span.classList.remove("hidden");
  });
  tagbutton.classList.remove("hidden");
  prioritybuttonframe.classList.add("hidden");
});

// choose priority
priorityButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    selectedPriority = btn.textContent.trim();

    priorityButtons.forEach((b) => {
      b.classList.remove("hidden");
      b.style.removeProperty("display");
      // حذف گزینه ضربدر
      const eCrossBtn = b.querySelector(".priority-cross-btn");
      if (eCrossBtn) {
        eCrossBtn.remove();
      }
    });
    //for display line between buttons
    document.querySelectorAll("#priority-button-frame span").forEach((span) => {
      span.classList.remove("hidden");
    });
    // just choosed button
    priorityButtons.forEach((b) => {
      if (b !== btn) b.classList.add("hidden");
    });
    //for remove line between buttons
    document.querySelectorAll("#priority-button-frame span").forEach((span) => {
      span.classList.add("hidden");
    });
    tagbutton.classList.add("hidden");

    //maryam  for delet butten priority new task
    // حذف ضربدر قبلی (اگر وجود دارد)
    const eCrossBtn = btn.querySelector("button");
    if (eCrossBtn) {
      eCrossBtn.remove();
    }
    // ایجاد ضربدر در الویت انتخاب شده
    const crossBtn = document.createElement("button");
    crossBtn.innerHTML = "✕";
    crossBtn.className =
      "priority-cross-btn text-gray-500 hover:text-red-500 font-bold";
    crossBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      priorityButtons.forEach((b) => {
        b.classList.remove("hidden");
        const eCrossBtn = b.querySelector(".priority-cross-btn");
        if (eCrossBtn) {
          eCrossBtn.remove();
        }
      });
      document
        .querySelectorAll("#priority-button-frame span")
        .forEach((span) => {
          span.classList.remove("hidden");
        });

      selectedPriority = "";
    });
    btn.appendChild(crossBtn);
  });
});

// load tasks on localStorage soha
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// show tasks
function renderTasks() {
  tasksContainer.innerHTML = "";
  doneTasksContainer.innerHTML = "";
  if (tasks.length === 0) {
    // noTasksMsg.style.display = "block";برای نمایش تعداد تسک (مریم)
    if (taskimgback) {
      taskimgback.style.display = "block";
    }
  } else {
    // noTasksMsg.style.display = "none";
    if (taskimgback) {
      taskimgback.style.display = "none";
    }
  }

  // soha for ordering task
  const priorityOrder = ["بالا", "متوسط", "پایین"];
  tasks.sort((a, b) => {
    return (
      priorityOrder.indexOf(a.priority.trim()) -
      priorityOrder.indexOf(b.priority.trim())
    );
  });
  // created task soha
  tasks.forEach((task, index) => {
    let borderColorClass = "";
    if (task.priority.trim() === "پایین") {
      borderColorClass = "border-r-[#11A483] dark:border-r-[#11A483]";
    } else if (task.priority.trim() === "متوسط") {
      borderColorClass = "border-r-[#FFAF37] dark:border-r-[#FFAF37]";
    } else if (task.priority.trim() === "بالا") {
      borderColorClass = "border-r-[#FF5F37] dark:border-r-[#FF5F37]";
    }
    const taskFrame = document.createElement("div");
    taskFrame.className = `border border-gray-300 dark:border-slate-900 border-r-4 ${borderColorClass}
     rounded-lg p-4 shadow flex flex-col gap-2 relative mt-3
     bg-white dark:bg-slate-900`;

    // menu threepoints on the left soha
    const menucontainer = document.createElement("div");
    menucontainer.className = "absolute top-2 left-2 p-1";
    const menubtn = document.createElement("button");
    menubtn.className = "task-menu-btns mt-1";
    menubtn.innerHTML = `<img src="./src/assets/images/Frame 1000005552.svg" alt="menu" class="w-5 h-5"/>`;
    // butten edit and delet soha
    const menuFrame = document.createElement("div");
    menuFrame.className = `task-menu-frame  absolute left-0 mt-1 ${
      !task.completed ? `w-20` : `w-10`
    }   bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded shadow-md hidden flex justify-center items-center p-1 gap-3`;

    menuFrame.innerHTML = `
    ${
      !task.completed
        ? `
      <button class="edit-btn flex items-center justify-center p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded">
        <img src="./src/assets/images/Group.png" alt="edit" class="w-5 h-5"/>
      </button>`
        : ""
    }
      <button class="delete-btn flex items-center justify-center p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded">
        <img src="./src/assets/images/tabler_trash-x.png" alt="delete" class="w-6 h-6"/>
      </button>
    `;
    menubtn.addEventListener("click", () =>
      menuFrame.classList.toggle("hidden")
    );
    menucontainer.appendChild(menubtn);
    menucontainer.appendChild(menuFrame);
    taskFrame.appendChild(menucontainer);
    // delete task maryam
    const deletetask = menuFrame.querySelector(".delete-btn");
    deletetask.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    // edit task maryam
    const editBtn = menuFrame.querySelector(".edit-btn");
    if (editBtn) {
      editBtn.addEventListener("click", () => {
        if (taskFrame.querySelector(".edit-form-inline")) return;
        const editForm = document.createElement("div");
        editForm.className =
          "edit-form-inline flex flex-col gap-1 mt-1 bg-gray-50 p-3 rounded border border-gray-300 dark:border-slate-900";

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
        hr.className = "border-gray-400";

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
    }

    // first line : checkbox + priority + name soha
    const line1 = document.createElement("div");
    line1.className = "flex items-center gap-2";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.className =
      "w-4 h-4 rounded-sm border border-[#CCCCCC] dark:border-[#6B7280] dark:bg-transparent ";
    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      saveTasks();
      renderTasks(); //  دوباره رندر بشه تا استایل آپدیت بشه
    });
    //zahra for Done tasks
    const nameSpan = document.createElement("span");
    nameSpan.textContent = task.name;
    nameSpan.className =
      "font-semibold text-slate-800 dark:text-slate-100" +
      (task.completed ? " line-through text-gray-400 dark:text-white" : ""); //یرای تسک انجام شده

    const prioritySpan = document.createElement("span");
    prioritySpan.textContent = task.priority;
    prioritySpan.className =
      "ml-auto px-2 py-1 rounded " +
      (task.priority.trim() === "پایین"
        ? "bg-[#C3FFF1] text-[#11A483] dark:text-white dark:bg-[#233332]"
        : task.priority.trim() === "متوسط"
        ? "bg-[#FFEFD6] text-[#FFAF37] dark:text-white dark:bg-[#302F2D]"
        : "bg-[#FFE2DB] text-[#FF5F37] dark:bg-[#3D2327] dark:text-white");

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

    // second line : explains (only for active tasks)
    const line2 = document.createElement("p");
    line2.textContent = task.desc;
    line2.className =
      "text-gray-700 dark:text-slate-300 text-gray-400 dark:text-[#848890]";

    taskFrame.appendChild(line1);

    taskFrame.appendChild(line2);

    // show description only when task is NOT completed
    if (!task.completed) {
      taskFrame.appendChild(line2);
    }

    (task.completed ? doneTasksContainer : tasksContainer).appendChild(
      taskFrame
    );
  });
  //count
  const completedCount = tasks.filter((t) => t.completed).length;
  if (doneCount) {
    doneCount.textContent =
      completedCount > 0
        ? `${completedCount} تسک انجام شده`
        : "فعلاً هیچ تسکی انجام نشده";
  }

  // تعداد تسک های در حال انجام مریم
  const progresstaskCount = tasks.filter((t) => !t.completed).length;
  if (tastcount) {
    tastcount.textContent =
      progresstaskCount > 0
        ? `${progresstaskCount} تسک را باید انجام دهید.`
        : "تسکی برای امروز نداری";
  }
}

// add new tasks soha
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

    // حذف ضربدر الویت تسک
    const eCrossBtn = b.querySelector(".priority-cross-btn");
    if (eCrossBtn) eCrossBtn.remove();
  });

  prioritybuttonframe.classList.add("hidden");
  tagbutton.classList.remove("hidden");
});

// time section saman
document.addEventListener("DOMContentLoaded", function () {
  const updatePersianDate = (id, includeToday = false) => {
    const dateElement = document.getElementById(id);
    if (!dateElement) return;

    const now = new Date();
    const options = { day: "numeric", month: "long", year: "numeric" };
    const persianDate = new Intl.DateTimeFormat("fa-IR", options).format(now);

    const weekDays = [
      "شنبه",
      "یکشنبه",
      "دوشنبه",
      "سه‌شنبه",
      "چهارشنبه",
      "پنجشنبه",
      "جمعه",
    ];
    const dayIndex = now.getDay();
    const persianWeekDay = weekDays[(dayIndex + 1) % 7];

    dateElement.textContent = includeToday
      ? `امروز، ${persianWeekDay}، ${persianDate}`
      : `${persianWeekDay}، ${persianDate}`;
  };

  updatePersianDate("sidebar-date2", true);
  updatePersianDate("sidebar-date");
});

// initial render
renderTasks();
