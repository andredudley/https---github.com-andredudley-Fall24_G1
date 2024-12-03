// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("study-plan-form");
    const plansList = document.getElementById("study-plans-list");
    let studyPlans = JSON.parse(localStorage.getItem("studyPlans")) || []; // Load from local storage
  
    // Render saved plans on page load
    renderPlans();
  
    // Handle form submission to add a new plan
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      // Collect form input values
      const subject = document.getElementById("subject").value.trim();
      const startDate = document.getElementById("start-date").value;
      const endDate = document.getElementById("end-date").value;
      const dailyGoal = document.getElementById("daily-goal").value.trim();
      const selectedDays = Array.from(
        document.querySelectorAll("input[name='days']:checked")
      ).map((day) => day.value);
      const startTime = document.getElementById("start-time").value;
      const endTime = document.getElementById("end-time").value;
  
      // Validate inputs
      if (
        subject &&
        startDate &&
        endDate &&
        dailyGoal &&
        selectedDays.length &&
        startTime &&
        endTime
      ) {
        // Create a new study plan object
        const newPlan = {
          subject,
          startDate,
          endDate,
          dailyGoal,
          days: selectedDays,
          time: { start: startTime, end: endTime },
          progress: 0,
        };
  
        // Save the new plan
        studyPlans.push(newPlan);
        localStorage.setItem("studyPlans", JSON.stringify(studyPlans));
        renderPlans(); // Re-render plans
        form.reset(); // Reset form
      } else {
        alert("Please complete all fields!");
      }
    });
  
    // Render all study plans
    function renderPlans() {
      plansList.innerHTML = ""; // Clear the list
      studyPlans.forEach((plan, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
          <div>
            <strong>${plan.subject}</strong> (${plan.startDate} - ${plan.endDate})<br>
            Goal: ${plan.dailyGoal}<br>
            Days: ${plan.days.join(", ")}<br>
            Time: ${plan.time.start} - ${plan.time.end}
          </div>
          <div>
            Progress: ${plan.progress}%<br>
            <button onclick="deletePlan(${index})">Delete</button>
            <button onclick="updateProgress(${index})">Update Progress</button>
          </div>
        `;
        plansList.appendChild(listItem);
      });
    }
  
    // Delete a study plan
    window.deletePlan = (index) => {
      const confirmDelete = confirm("Are you sure you want to delete this plan?");
      if (confirmDelete) {
        studyPlans.splice(index, 1); // Remove from array
        localStorage.setItem("studyPlans", JSON.stringify(studyPlans)); // Save updated plans
        renderPlans(); // Re-render plans
      }
    };
  
    // Update progress of a study plan
    window.updateProgress = (index) => {
      const newProgress = prompt("Enter new progress percentage (0-100):");
      if (
        newProgress !== null &&
        !isNaN(newProgress) &&
        newProgress >= 0 &&
        newProgress <= 100
      ) {
        studyPlans[index].progress = parseInt(newProgress);
        localStorage.setItem("studyPlans", JSON.stringify(studyPlans)); // Save updated plans
        renderPlans(); // Re-render plans
      } else {
        alert("Please enter a valid number between 0 and 100.");
      }
    };
  });
  