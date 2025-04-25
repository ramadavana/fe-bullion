const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const apiEndpoints = {
  admin: {
    getUsersList: `${BASE_URL}/api/v1/admin?offset=5&limit=5`,
    getDetailedUser: (id) => `${BASE_URL}/api/v1/admin/${id}`,
    updateUser: (id) => `${BASE_URL}/api/v1/admin/${id}/update`,
    deleteUser: (id) => `${BASE_URL}/api/v1/admin/${id}/delete`,
  },
  auth: {
    register: `${BASE_URL}/api/v1/auth/register`,
    login: `${BASE_URL}/api/v1/auth/login`,
  },
  healthCheck: `${BASE_URL}/api/v1/check`,
};

export default apiEndpoints;
