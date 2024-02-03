import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TasksList from './TaskList';
import TaskDetails from './TaskDetails';
import TaskAdd from './TaskAdd';
import './index.css'; // Ensure this import is here

function App() {
    const [lastUpdate, setLastUpdate] = useState(0);
    const [searchQuery, setSearchQuery] = useState(''); // State for search query

    // Function to refresh the task list
    const refreshTasks = () => {
        setLastUpdate(Date.now());
    };

    const containerStyles = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '30vh', // Changed from height to minHeight
        textAlign: 'center',
        overflowY: 'auto', // Added to enable vertical scrolling
    };

    const searchBarStyles = {
        position: 'fixed',
        top: '10px',
        right: '10px',
        padding: '10px',
        width: '250px',
        borderRadius: '4px',
        border: '1px solid #434345',
        background: '#2d2d2f',
        color: 'white',
    };
    

    const headingStyles = {
        fontSize: '2rem', // Adjust the font size as needed
    };

    return (
        <Router>
            <input 
                type="text" 
                placeholder="Search tasks..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={searchBarStyles}
            />
            <div style={containerStyles}>
                <h1 style={headingStyles}>Task Manager</h1>
                <TaskAdd onTaskAdded={refreshTasks} />
                <Routes>
                    <Route path="/" element={<TasksList lastUpdate={lastUpdate} searchQuery={searchQuery} />} />
                    <Route path="/task/:id" element={<TaskDetails />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;