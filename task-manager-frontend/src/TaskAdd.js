import React, { useState } from 'react';
import axios from 'axios';

function TaskAdd({ onTaskAdded }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3001/api/tasks', { title, description })
            .then(response => {
                // Handle the response
                console.log(response.data);
                setShowModal(false); // Close the modal on success
                // Reset form fields after successful submission
                setTitle('');
                setDescription('');
                // Call the callback function to trigger task list refresh
                if (onTaskAdded) {
                    onTaskAdded();
                }
            })
            .catch(error => {
                console.error('Error adding task:', error);
            });
    };
    
    return (
        <>
            <button
                style={{
                    position: 'fixed',
                    bottom: '10px',
                    right: '10px',
                    width: '64px',
                    height: '64px',
                    borderRadius: '100%',
                    background: '#4a90e2', // Lighter blue for button in dark mode
                    color: 'white',
                    fontSize: '16px',
                    border: 'none',
                    cursor: 'pointer',
                    zIndex: 1000,
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Shadow for depth
                    transition: 'transform 0.1s ease, box-shadow 0.1s ease', // Smooth transition for button press and hover
                }}
                onClick={() => setShowModal(true)}
                onMouseDown={(e) => e.currentTarget.style.transform = 'translateY(2px)'} // Button press effect
                onMouseUp={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'; // Resetting button state on mouse out
                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)'; // Resetting shadow on mouse out
                }}
                onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.3)'} // Shadow effect on hover
            >
                Add
            </button>

            {showModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    background: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                }}>
                    <div style={{
                        background: '#2c2c2e', // Dark background for modal
                        padding: '20px',
                        borderRadius: '5px',
                        boxShadow: '0 4px 8px rgba(255, 255, 255, 0.05)', // Subtle shadow for depth
                        color: '#d1d1d1', // Light text color for details
                    }}>
                        <form onSubmit={handleSubmit} style={{ maxWidth: '300px', padding: '10px' }}>
                            <div style={{ marginBottom: '10px' }}>
                                
                                <input
                                    type="text"
                                    placeholder="Enter title"
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    style={{
                                        padding: '10px',
                                        border: '1px solid #333',
                                        borderRadius: '4px',
                                        width: '280px', // Full width within modal
                                        background: 'white', // Dark background for inputs
                                        color: 'black', // Light text color for inputs
                                    }}
                                />
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                
                                <input
                                    type="text"
                                    placeholder="Enter description"
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                    style={{
                                        padding: '10px',
                                        border: '1px solid #333',
                                        borderRadius: '4px',
                                        width: '280px', // Full width within modal
                                        background: 'white', // Dark background for inputs
                                        color: 'black', // Light text color for inputs
                                    }}
                                />
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    style={{
                                        background: '#4a90e2',
                                        color: 'white',
                                        padding: '10px 15px',
                                        border: 'none',
                                        borderRadius: '4px',
                                        marginRight: '5px',
                                        marginTop: '15px',
                                    }}
                                >
                                    Submit Task
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    style={{
                                        background: '#686868',
                                        color: 'white',
                                        padding: '10px 15px',
                                        border: 'none',
                                        borderRadius: '4px',
                                        marginTop: '15px',
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default TaskAdd;
