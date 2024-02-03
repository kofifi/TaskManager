import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function TaskDetails() {
    const [task, setTask] = useState(null);
    const [completed, setCompleted] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3001/api/tasks/${id}`)
            .then(response => {
                const formattedTask = {
                    ...response.data,
                    creationDate: formatDateTime(response.data.creationDate),
                    lastUpdated: formatDateTime(response.data.lastUpdated),
                };
                setTask(formattedTask);
                setCompleted(formattedTask.completed);
            })
            .catch(error => console.error('Error fetching task:', error));
    }, [id]);

    const formatDateTime = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleString();
    };

    const updateCompletionStatus = () => {
        axios.put(`http://localhost:3001/api/tasks/${id}`, { completed: !completed })
            .then(response => {
                setCompleted(response.data.completed);
            })
            .catch(error => console.error('Error updating task status:', error));
    };

    const goBack = () => {
        navigate(-1);
    };

    if (!task) return <div>Loading...</div>;

    return (
        <>
            <div className="task-details" style={{textAlign:'left'}}>
                <h2>Task Details</h2>
                {task.title && <p><strong className="inline-title">Title:</strong> {task.title}</p>} {/* Special class for Title */}
                {task.description && <p><strong>Description:</strong> {task.description}</p>}
                {task.dueDate && <p><strong>Due Date:</strong> {task.dueDate}</p>}
                {task.priority && <p><strong>Priority:</strong> {task.priority}</p>}
                {task.labels && <p><strong>Labels:</strong> {task.labels.join(', ')}</p>}
                {task.assignedTo && <p><strong>Assigned To:</strong> {task.assignedTo.join(', ')}</p>}
                <p><strong>Creation Date:</strong> {task.creationDate}</p>
                <p><strong>Last Updated:</strong> {task.lastUpdated}</p>
                {task.status && <p><strong>Status:</strong> {task.status}</p>}
                <p>
                    <strong  className="inline-title">Completed:</strong>
                    <input
                        type="checkbox"
                        checked={completed}
                        onChange={updateCompletionStatus}
                    />
                </p>
                {task.subtasks && task.subtasks.length > 0 && (
                    <>
                        <h3>Subtasks</h3>
                        <ul>
                            {task.subtasks.map(subtask => (
                                <li key={subtask.id}>{subtask.title} - {subtask.completed ? 'Completed' : 'Incomplete'}</li>
                            ))}
                        </ul>
                    </>
                )}
                {task.attachments && task.attachments.length > 0 && (
                    <>
                        <h3>Attachments</h3>
                        <ul>
                            {task.attachments.map((attachment, index) => (
                                <li key={index}><a href={attachment} target="_blank" rel="noreferrer">{attachment}</a></li>
                            ))}
                        </ul>
                    </>
                )}
                {task.comments && task.comments.length > 0 && (
                    <>
                        <h3>Comments</h3>
                        <ul>
                            {task.comments.map((comment, index) => (
                                <li key={index}>{comment.user}: {comment.comment} on {comment.date}</li>
                            ))}
                        </ul>
                    </>
                )}
            </div>

            {/* Osobny kontener dla przycisku Powrót */}
            <button onClick={goBack} className="back-button-container">←</button>

        </>
    );
}

export default TaskDetails;
