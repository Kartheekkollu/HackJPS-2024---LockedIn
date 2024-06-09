// Get the variables
const taskName = document.querySelector(".maininput");
const dueDate = document.querySelector(".duedate");
const description = document.querySelector(".discription");
const addBtn = document.querySelector(".submit-button");
const taskList = document.querySelector(".task-items");

// Load tasks from storage when the extension is opened
chrome.storage.sync.get(['tasks'], function(result) {
    if (result.tasks) {
        taskList.innerHTML = result.tasks;
    }
});

// Function to save tasks to Chrome storage
function saveTasksToStorage() {
    chrome.storage.sync.set({ tasks: taskList.innerHTML });
}

//add a task
addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (taskName.value.trim() !== "" && dueDate.value.trim() !== "" && description.value.trim() !== "") {
        const taskText = taskName.value.trim();
        const taskDueDateValue = dueDate.value.trim();
        const taskDescriptionValue = description.value.trim();

        const newTaskHTML = `
            <li class="w-form">
                <form class="task">
                    <input class="taskinput taskmaininput w-input" maxlength="256" name="field-4" placeholder="Name for task" type="text" value="${taskText}" disabled style="background-color: #80f9ff;">
                    <button type="submit" class="edit-task w-button">Edit Task</button>
                    <input class="taskinput taskduedate w-input" maxlength="256" name="field-2" placeholder="Due Date" type="text" value="${taskDueDateValue}" disabled style="background-color: #80f9ff;">
                    <input class="taskinput taskdiscription w-input" maxlength="256" name="field-2" placeholder="Description" type="text" value="${taskDescriptionValue}" disabled style="background-color: #80f9ff;">
                    <button class="button-3 w-button"></button>
                    <button class="deletetask w-button">Delete Task</button>
                </form>
            </li>
        `;
        
        taskList.insertAdjacentHTML('beforeend', newTaskHTML);
        
        // Save tasks to storage after adding
        saveTasksToStorage();
        
        // Clear input fields
        taskName.value = "";
        dueDate.value = "";
        description.value = "";
    }
});

//deleting and editing a task
taskList.addEventListener('click', (e) => {
    e.preventDefault();
    const target = e.target;
    if (target.classList.contains('deletetask')) {
        const listItem = target.closest('.w-form');
        listItem.remove();
        
        // Save tasks to storage after deleting
        saveTasksToStorage();
    }
    if (target.classList.contains('edit-task')) {
        const listItem = target.closest('.w-form');
        const taskInput = listItem.querySelector('.taskmaininput');
        const taskDueDate = listItem.querySelector('.taskduedate');
        const taskDescription = listItem.querySelector('.taskdiscription');
        if (target.innerText === "Edit Task") {
            taskInput.disabled = false;
            taskDueDate.disabled = false;
            taskDescription.disabled = false;
            target.innerText = "Save Task";
        } else if (target.innerText === "Save Task") {
            taskInput.disabled = true;
            taskDueDate.disabled = true;
            taskDescription.disabled = true;
            target.innerText = "Edit Task";
            
            // Update task information in HTML
            taskInput.setAttribute('value', taskInput.value);
            taskDueDate.setAttribute('value', taskDueDate.value);
            taskDescription.setAttribute('value', taskDescription.value);
            
            // Save tasks to storage after editing
            saveTasksToStorage();
        }
    }
});
