import axios from 'axios';

export const TaskDelete = (taskId) => {
  return axios.delete(`http://localhost:3001/api/tasks/${taskId}`)
    .then(() => {
      return true;
    })
    .catch(error => {
      console.error('Error deleting task:', error);
      return false;
    });
};

export default TaskDelete;