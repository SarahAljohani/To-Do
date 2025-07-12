const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const taskCount = document.getElementById("task-count");

function addTask() {
  if (inputBox.value === '') {
    alert("You must write something!");
  } else {
    let li = document.createElement("li");

    
    let taskText = document.createElement("span");
    taskText.classList.add("task-text");
    taskText.textContent = inputBox.value;
    li.appendChild(taskText);

    // delete 
    let deleteBtn = document.createElement("span");
    deleteBtn.innerHTML = "\u00d7";
    deleteBtn.classList.add("delete-btn");
    li.appendChild(deleteBtn);

    // edit
    let editBtn = document.createElement("span");
    editBtn.innerHTML = "✏️";
    editBtn.classList.add("edit-btn");
    li.appendChild(editBtn);

    listContainer.appendChild(li);
  }
  //Clear the input box
  inputBox.value = "";
  //Save the task list in local storage
  saveData();
  updateTaskCount();
}

listContainer.addEventListener("click", function(e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData();
  } else if (e.target.classList.contains("delete-btn")) {
    e.target.parentElement.remove();
    saveData();
    updateTaskCount();
  } else if (e.target.classList.contains("edit-btn")) {
    let li = e.target.parentElement;
    let taskText = li.querySelector(".task-text");
    let currentText = taskText.textContent;
    let newText = prompt("Edit your task:", currentText);
    if (newText !== null && newText.trim() !== "") {
      taskText.textContent = newText;
      saveData();
    }
  }
}, false);

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
  updateTaskCount();
}

function updateTaskCount() {
  const count = listContainer.getElementsByTagName("li").length;
  if (taskCount) {
    taskCount.textContent =` Total Tasks: ${count}`;
  }
}

showTask();