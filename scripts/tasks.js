// Handles the functionality for the tasks page
function addTask() {
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");
    const task = taskInput.value.trim();
  
    if (task) {
      const listItem = document.createElement("li");
      listItem.textContent = task;
  
      // Add functionality to remove task when clicked
      listItem.addEventListener("click", () => {
        listItem.remove();
      });
  
      taskList.appendChild(listItem);
      taskInput.value = ""; // Clear the input field
    } else {
      alert("Please enter a valid task.");
    }
  }
  