import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5037';

axios.interceptors.response.use(
  response => response,
  error => {
    console.error('Error occurred:', error.response);
    return Promise.reject(error);
  }
);

export default {
  getTasks: async () => {
    const result = await axios.get(`/items`)
    return result.data;
  },

  addTask: async (name) => {
    console.log('addTask', name)
    const result = await axios.post(`/items`, {
      name: name,
      isComplete: false
    })
  },

  setCompleted: async (id, isComplete) => {
    console.log('setCompleted', { id, isComplete })
    const item = await axios.get(`/items/${id}`)
    if (item != null) {
      item.data.isComplete = isComplete;
      const result = await axios.put(`/items/${id}`, item.data)
      // console.log("result :", result);
    }

  },

  deleteTask: async (id) => {
    console.log('deleteTask', id)
    const result = await axios.delete(`/items/${id}`)
      .then(response => {
        // console.log('Data received:', response.data);
        return result.data;
      })
      .catch(error => {
        console.error('An error occurred:', error);
      });

  }
};
