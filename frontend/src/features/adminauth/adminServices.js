import axios from "axios";

const API_URL = "http://localhost:8000/admin/";

const adminLogin = async (adminData) => {
  try {
    const response = await axios.post(API_URL, adminData);
    if (response.data) {
      console.log(response.data, "gkkhj");

      localStorage.setItem("admin", JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
  
    console.error("Error occurred during admin login:", error);
    throw error;
  }
};

//get all users
const getAllUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + "dashboard", config);
  return response.data;
};

//block user
const userBlock = async (token, userId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    API_URL + "block",
    {
      userId,
    },
    config
  );
  return response.data;
};

//edit user deatils
const editUserDeatils = async (token, userId, name, email, mobile) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + userId,
    { userId, name, email, mobile },
    config
  );
  console.log(response.data, "akasj");
  return response.data;
};

//add user
const addUser = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + "adduser", { userData }, config);
  return response.data;
};
//user search
const searchUser = async (query, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + "search", { query }, config);
  console.log(response.data, "ghhgkfhgkjfhgk");

  return response.data;
};
//user search

const adminLogout = () => {
  localStorage.removeItem("admin");
  // You might want to send a logout request to the server here to invalidate the token
};
const adminAuthService = {
  adminLogin,
  adminLogout,
  getAllUsers,
  userBlock,
  editUserDeatils,
  searchUser,
  addUser,
};

export default adminAuthService;