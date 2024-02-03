const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

const TASKS_FILE = 'tasks.json';

function readTasksFromFile() {
    try {
        if (!fs.existsSync(TASKS_FILE)) {
            fs.writeFileSync(TASKS_FILE, JSON.stringify([], null, 2), 'utf8');
            return [];
        }
        const data = fs.readFileSync(TASKS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading from file:', err);
        return [];
    }
}

function writeTasksToFile(tasks) {
    fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2), 'utf8');
}

function getCurrentTimestamp() {
    return new Date().toISOString();
}

// Get all tasks
app.get('/api/tasks', (req, res) => {
    const tasks = readTasksFromFile();
    res.json(tasks);
});

// Get a single task by id
app.get('/api/tasks/:id', (req, res) => {
    const tasks = readTasksFromFile();
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).send('Task not found');
    res.json(task);
});

// Create a new task
app.post('/api/tasks', (req, res) => {
    const tasks = readTasksFromFile();
    const { title, description, dueDate, priority, labels, assignedTo, subtasks, status, attachments, comments } = req.body;

    const newTask = {
        id: tasks.length + 1,
        title,
        description,
        dueDate,
        priority,
        labels,
        assignedTo,
        creationDate: getCurrentTimestamp(),
        lastUpdated: getCurrentTimestamp(),
        subtasks,
        status,
        attachments,
        comments,
        completed: false
    };

    tasks.push(newTask);
    writeTasksToFile(tasks);
    res.status(201).send(newTask);
});

// Update a task
app.put('/api/tasks/:id', (req, res) => {
    let tasks = readTasksFromFile();
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).send('Task not found');

    const { title, description, dueDate, priority, labels, assignedTo, subtasks, status, attachments, comments, completed } = req.body;

    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.dueDate = dueDate ?? task.dueDate;
    task.priority = priority ?? task.priority;
    task.labels = labels ?? task.labels;
    task.assignedTo = assignedTo ?? task.assignedTo;
    task.subtasks = subtasks ?? task.subtasks;
    task.status = status ?? task.status;
    task.attachments = attachments ?? task.attachments;
    task.comments = comments ?? task.comments;
    if (completed !== undefined) task.completed = completed;
    task.lastUpdated = getCurrentTimestamp();

    writeTasksToFile(tasks);
    res.send(task);
});

// Delete a task
app.delete('/api/tasks/:id', (req, res) => {
    let tasks = readTasksFromFile();
    const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (taskIndex === -1) return res.status(404).send('Task not found');

    tasks.splice(taskIndex, 1);
    writeTasksToFile(tasks);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
