import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TaskList = ({ lastUpdate, searchQuery, onTaskDeleted }) => { // Use searchQuery as a prop
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, [lastUpdate, searchQuery]); // Dependency array includes searchQuery

  const fetchTasks = () => {
    axios.get('http://localhost:3001/api/tasks')
      .then((response) => {
        let filteredTasks = response.data;

        // Filter tasks based on the searchQuery prop
        if (searchQuery) {
          filteredTasks = filteredTasks.filter(task => 
            task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
            task.description.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }

        setTasks(filteredTasks);
      })
      .catch((error) => console.error('Error fetching tasks:', error));
  };

  const handleTaskClick = (id) => {
    navigate(`/task/${id}`);
  };

  // Function to delete a task
  const deleteTask = (id) => {
    axios
      .delete(`http://localhost:3001/api/tasks/${id}`)
      .then(() => {
        // Refresh tasks list after deletion
        fetchTasks();
        // If you want to trigger any other actions upon task deletion, you can call onTaskDeleted() here
        if (onTaskDeleted) {
          onTaskDeleted();
        }
      })
      .catch((error) => console.error('Error deleting task:', error));
  };

  const taskStyles = {
    cursor: 'pointer',
    marginBottom: '10px',
    border: '2px solid #333',
    padding: '20px',
    width: '40vh', // Default width for mobile view
    borderRadius: '8px',
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    backgroundColor: '#2d2d2f',
    color: '#f4f4f4',
  };

  const tabletMediaQuery = '@media screen and (minWidth: 768px) and (maxWidth: 1023px)';
  const desktopMediaQuery = '@media screen and (minWidth: 1024px)';
  

  taskStyles[tabletMediaQuery] = {
    width: '35vh', // Width for tablet view
  };

  taskStyles[desktopMediaQuery] = {
    width: '35vh', // Width for desktop view
  };

  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const buttonStyles = {
    background: 'var(--blue)',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    marginTop: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };

  buttonStyles[':hover'] = {
    background: 'var(--dark-blue)',
  };

  return (
    <div style={containerStyles}>
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            onClick={() => handleTaskClick(task.id)}
            style={taskStyles}
          >
            <div className="task-title">{task.title}</div>
            <div className="task-description">{task.description}</div>
            <button
              style={buttonStyles}
              onClick={(e) => {
                e.stopPropagation();
                deleteTask(task.id);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
