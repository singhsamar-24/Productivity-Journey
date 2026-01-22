/*************************
  TO-DO LIST (SAVED)
**************************/

const addTaskBtn = document.getElementById("addTask");
const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = "task" + (task.completed ? " completed" : "");

        li.innerHTML = `
            <span>${task.text} (📅 ${task.date})</span>
            <div>
                <button onclick="toggleTask(${index})">✔</button>
                <button onclick="deleteTask(${index})">❌</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

addTaskBtn?.addEventListener("click", () => {
    if (!taskInput.value || !dateInput.value) return;

    tasks.push({
        text: taskInput.value,
        date: dateInput.value,
        completed: false
    });

    saveTasks();
    loadTasks();

    taskInput.value = "";
    dateInput.value = "";
});

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    loadTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    loadTasks();
}

loadTasks();


/*************************
  JOURNEY & ROADMAP
**************************/

const roadmap = document.getElementById("roadmap");

function showRoadmap(title, steps, storageKey) {
    let progressStep = parseInt(localStorage.getItem(storageKey)) || 0;

    roadmap.innerHTML = `
        <h3>${title}</h3>

        <ol>
            ${steps.map(step => `<li>${step}</li>`).join("")}
        </ol>

        <div class="progress-container">
            <p>Progress</p>
            <div class="progress-bar">
                <div class="progress" id="progress"></div>
            </div>
        </div>

        <button id="nextStep">Mark Step Complete</button>
        <button id="resetProgress">Reset</button>
    `;

    const progress = document.getElementById("progress");

    function updateProgress() {
        progress.style.width = (progressStep / steps.length) * 100 + "%";
    }

    updateProgress();

    document.getElementById("nextStep").onclick = () => {
        if (progressStep < steps.length) {
            progressStep++;
            localStorage.setItem(storageKey, progressStep);
            updateProgress();
        }
    };

    document.getElementById("resetProgress").onclick = () => {
        progressStep = 0;
        localStorage.setItem(storageKey, 0);
        updateProgress();
    };
}

/* WEB DEVELOPMENT BUTTON */
document.getElementById("webBtn")?.addEventListener("click", () => {
    showRoadmap(
        "Web Development Roadmap",
        [
            "HTML",
            "CSS",
            "JavaScript",
            "Git & GitHub",
            "React",
            "Backend",
            "Projects"
        ],
        "webProgress"
    );
});

/* CODING BUTTON → LANGUAGE SELECTION */
document.getElementById("codeBtn")?.addEventListener("click", () => {
    roadmap.innerHTML = `
        <h3>Select a Programming Language</h3>
        <div class="journey-buttons">
            <button onclick="location.href='c.html'">C Language</button>
            <button onclick="location.href='python.html'">Python</button>
            <button onclick="location.href='java.html'">Java</button>
        </div>
    `;
});


/*************************
  LIVE CLOCK
**************************/

function updateClock() {
    const clock = document.getElementById("clock");
    if (!clock) return;

    const now = new Date();
    const h = String(now.getHours()).padStart(2, "0");
    const m = String(now.getMinutes()).padStart(2, "0");
    const s = String(now.getSeconds()).padStart(2, "0");

    clock.textContent = `${h}:${m}:${s}`;
}

setInterval(updateClock, 1000);
updateClock();
