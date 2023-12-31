// high priority task - red
// low priority task - yellow
// medium priority task - green

// local storage not to delete the tasks on refresh


// 1. get the task from the input field
// 2. set the priority of the task
// 3. add the task to the list with the colors
// 4. to set the task completed or not define the functions
// 5/ to delete the task define the function

// priorities - high, medium, low ko kaise implement krna hai
// all , completed, uncompleted ko kaise implement krna hai
// local storage implementation



// var allTasks = document.getElementById("alltask");

// // event listener - e 
// const checkTheSquare = (e) => {
//     e.preventDefault();
//     // var square = e.target;
//     console.log(e);
// }

var red_square = document.getElementById("red-square");
var yellow_square = document.getElementById("yellow-square");
var blue_square = document.getElementById("blue-square");

var empty_task_warn_message = document.getElementById("emptyTaskWarnMessage");

// add the task to the high priority list
var input_field = document.getElementById("input-field");
// get the high priority list
var all_high_task = document.getElementById("allhightask");
var all_low_task = document.getElementById("alllowtask");
var all_medium_task = document.getElementById("allmediumtask");

// Get the input field
var input = document.getElementById("myInput");


document.addEventListener('DOMContentLoaded', getAllTasks);

function createListItem(task) {
    var li = document.createElement("li");
    li.classList.add("tasks");

    // create a i tag for the checkbox icon
    const i_square = document.createElement("i");
    // add the classes to the i tag
    i_square.classList.add("fa");
    i_square.classList.add("fa-square");
    i_square.style.fontSize = "24px";

    // appned it to the list item
    li.appendChild(i_square);

    // create a span tag
    const span = document.createElement("span");
    span.classList.add("task");
    // add the task value to the span tag
    span.innerHTML = task;
    // append it to the list item
    li.appendChild(span);


    // create an i tag for the trash icon
    const i_trash = document.createElement("i");
    // add the classes to the i tag
    i_trash.style.fontSize = "24px";
    i_trash.classList.add("fa");
    i_trash.classList.add("fa-trash");
    // appned it to the list item
    li.appendChild(i_trash);


    // add the task value to the list item
    // li.span.innerHTML = task;
    console.log(li);
    return li;
}

function getAllTasks() {
    let highPriorityTasks;
    let mediumPriorityTasks;
    let lowPriorityTasks;
    if (localStorage.getItem("High_Priority") === null) {
        highPriorityTasks = [];
    } else {
        highPriorityTasks = JSON.parse(localStorage.getItem("High_Priority"));
        highPriorityTasks.forEach(task => {
            var li = createListItem(task);
            li.querySelector("i").style.color = "red";
            all_high_task.appendChild(li);
        })
    }

    if (localStorage.getItem("Medium_Priority") === null) {
        mediumPriorityTasks = [];
    } else {
        mediumPriorityTasks = JSON.parse(localStorage.getItem("Medium_Priority"));
        mediumPriorityTasks.forEach(task => {
            var li = createListItem(task);
            li.querySelector("i").style.color = "blue";
            all_medium_task.appendChild(li);
        })
    }

    if (localStorage.getItem("Low_Priority") === null) {
        lowPriorityTasks = [];
    } else {
        lowPriorityTasks = JSON.parse(localStorage.getItem("Low_Priority"));
        lowPriorityTasks.forEach(task => {
            var li = createListItem(task);
            li.querySelector("i").style.color = "rgb(222, 222, 39)";
            all_low_task.appendChild(li);
        })
    }

}


// Execute a function when the user presses a key on the keyboard
input_field.addEventListener("keypress", function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("myBtn").click();
    }
});

document.addEventListener("click", function (e) {
    // Check if the clicked element or its parent has the "tasks" class
    const tasksElement = e.target.closest(".tasks");

    if (tasksElement) {
        e.preventDefault();

        // Log the clicked element
        console.log(e.target);

        // Check if the clicked element has the class "fa-square"
        if (e.target.classList.contains("fa-square")) {
            tasksElement.querySelector('.task').classList.toggle('completed');
            e.target.classList.remove("fa-square");
            e.target.classList.add("fa-check-square");
        } else if (e.target.classList.contains("fa-check-square")) {
            tasksElement.querySelector('.task').classList.toggle('completed');
            e.target.classList.remove("fa-check-square");
            e.target.classList.add("fa-square");
        } else if (e.target.classList.contains("fa-trash")) {
            // Remove the parent element if the clicked element has the class "fa-trash"

            if (tasksElement.parentElement.id == "allhightask") {
                deleteHighTaskFromLocalStorage(tasksElement.querySelector('.task').innerHTML);
            }
            else if (tasksElement.parentElement.id == "allmediumtask") {
                deleteMediumTaskFromLocalStorage(tasksElement.querySelector('.task').innerHTML);
            }
            else if (tasksElement.parentElement.id == "alllowtask") {
                deleteLowTaskFromLocalStorage(tasksElement.querySelector('.task').innerHTML);
            }
            tasksElement.remove();
        }
    }
});


function addTask() {
    // the value entered in the input field by the user.
    var task = input_field.value;
    if (task == "") {
        empty_task_warn_message.innerHTML = "Please enter a task!";
        empty_task_warn_message.style.color = "red";

        empty_task_warn_message.style.display = "block";
        setTimeout(function () {
            empty_task_warn_message.style.display = "none";
        }, 3000);
        return;
    }
    // create a list item
    var li = createListItem(task);
    // appned the list item to the high priority list
    if (red_square.classList.contains("fa-check-square")) {
        li.querySelector("i").style.color = "red";
        all_high_task.appendChild(li);
        addHighPriorityTaskToLocalStorage(task);
    }
    else if (yellow_square.classList.contains("fa-check-square")) {
        li.querySelector("i").style.color = "rgb(222, 222, 39)";
        all_low_task.appendChild(li);
        addLowPriorityTaskToLocalStorage(task);
    }
    else if (blue_square.classList.contains("fa-check-square")) {
        li.querySelector("i").style.color = "blue";
        all_medium_task.appendChild(li);
        addMediumPriorityTaskToLocalStorage(task);
    }
    else {
        all_high_task.appendChild(li);
    }

    // now make the value of the list item to be empty
    input_field.value = "";
}


red_square.addEventListener("click", function (e) {
    // Print the console log high priority
    console.log("high priority");
    console.log(e.target);
    e.target.classList.remove("fa-square");
    e.target.classList.add("fa-check-square");
    yellow_square.classList.remove("fa-check-square");
    yellow_square.classList.add("fa-square");
    blue_square.classList.add("fa-square");
    blue_square.classList.remove("fa-check-square");
});

yellow_square.addEventListener("click", function (e) {
    // Print the console log high priority
    console.log("low priority");
    console.log(e.target);
    e.target.classList.remove("fa-square");
    e.target.classList.add("fa-check-square");
    red_square.classList.remove("fa-check-square");
    red_square.classList.add("fa-square");
    blue_square.classList.add("fa-square");
    blue_square.classList.remove("fa-check-square");
});

blue_square.addEventListener("click", function (e) {
    // Print the console log high priority
    console.log("medium priority");
    console.log(e.target);
    e.target.classList.remove("fa-square");
    e.target.classList.add("fa-check-square");
    red_square.classList.remove("fa-check-square");
    red_square.classList.add("fa-square");
    yellow_square.classList.add("fa-square");
    yellow_square.classList.remove("fa-check-square");
});


// function to add the task to localstorage with high, low, medium priority
// function to delete the task from localstorage
// function to get the task from localstorage

// function to add the task to localstorage with high, low, medium priority
function addHighPriorityTaskToLocalStorage(task) {
    let High_Priority;
    if (localStorage.getItem("High_Priority") === null) {
        High_Priority = [];
    }
    else {
        High_Priority = JSON.parse(localStorage.getItem("High_Priority"));
    }
    High_Priority.push(task);
    localStorage.setItem("High_Priority", JSON.stringify(High_Priority));
}

// function to add the task of medium priority to local storage
function addMediumPriorityTaskToLocalStorage(task) {
    let Medium_Priority;
    if (localStorage.getItem("Medium_Priority") === null) {
        Medium_Priority = [];
    }
    else {
        Medium_Priority = JSON.parse(localStorage.getItem("Medium_Priority"));
    }
    Medium_Priority.push(task);
    localStorage.setItem("Medium_Priority", JSON.stringify(Medium_Priority));
}

// function to add the task to local storage with low priority
function addLowPriorityTaskToLocalStorage(task) {
    let Low_Priority;
    if (localStorage.getItem("Low_Priority") === null) {
        Low_Priority = [];
    }
    else {
        Low_Priority = JSON.parse(localStorage.getItem("Low_Priority"));
    }
    Low_Priority.push(task);
    localStorage.setItem("Low_Priority", JSON.stringify(Low_Priority));
}


// function to delete the task from localstorage - high priority
function deleteHighTaskFromLocalStorage(task) {
    let High_Priority;
    if (localStorage.getItem("High_Priority") === null) {
        High_Priority = [];
    }
    else {
        High_Priority = JSON.parse(localStorage.getItem("High_Priority"));
    }
    High_Priority.splice(High_Priority.indexOf(task), 1);
    localStorage.setItem("High_Priority", JSON.stringify(High_Priority));
}

// function to delete the task from localstorage - medium priority
function deleteMediumTaskFromLocalStorage(task) {
    let Medium_Priority;
    if (localStorage.getItem("Medium_Priority") === null) {
        Medium_Priority = [];
    }
    else {
        Medium_Priority = JSON.parse(localStorage.getItem("Medium_Priority"));
    }
    Medium_Priority.splice(Medium_Priority.indexOf(task), 1);
    localStorage.setItem("Medium_Priority", JSON.stringify(Medium_Priority));
}

// function to delete the task from localstorage - low priority
function deleteLowTaskFromLocalStorage(task) {
    let Low_Priority;
    if (localStorage.getItem("Low_Priority") === null) {
        Low_Priority = [];
    }
    else {
        Low_Priority = JSON.parse(localStorage.getItem("Low_Priority"));
    }
    Low_Priority.splice(Low_Priority.indexOf(task), 1);
    localStorage.setItem("Low_Priority", JSON.stringify(Low_Priority));
}