
export const config = {
  baseURL: `${process.env.REACT_APP_BASE_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json'
  }
};
export const endpoints = {
    getAll: (userId) => `/getAll/${userId}`,
    create: '/create',
    update: (id) => `/update/${id}`,
    delete: (id) => `/delete/${id}`,
    search : '/search'
  
};
