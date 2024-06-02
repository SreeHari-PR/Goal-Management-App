import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  adminLogout,
  reset,
  searchUser,
  getAllUsers,
} from "../../features/adminauth/adminAuthSlice";
import { FaSearch } from "react-icons/fa";
import Userlist from "../admin/Userlist";

const Admindashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [state, setstate] = useState();
  const onLogout = () => {
    dispatch(adminLogout());
    dispatch(reset());
    navigate("/admin");
  };

  const { admin, users } = useSelector((state) => state.adminAuth);

  const [searchQuery, setsearchQuery] = useState("");
  useEffect(() => {
    if (!admin) {
      navigate("/admin");
    }
    if (searchQuery) {
      dispatch(searchUser(searchQuery));
    } else {
      dispatch(getAllUsers());
    }
    return () => {
      dispatch(reset());
    };
  }, [dispatch, admin, navigate, searchQuery]);
  const handleSearchchange = (e) => {
    e.preventDefault();
    setsearchQuery(e.target.value);
  };

  const onAddUser = () => {
    navigate("/admin/adduser");
  };

  return (
    <div className="container-1" style={{ padding: "20px" }}>
    <div className="nav" style={{ marginBottom: "20px" }}>
      <h3>Admin Dashboard</h3>
      <div style={{ display: "flex", alignItems: "center" }} className="form-group">
        <input
          style={{ height: "35px", marginRight: "10px", flex: "1" }}
          className="form-control"
          placeholder="username/email"
          type="text"
          value={searchQuery}
          onChange={handleSearchchange}
        />
        <button
          style={{ height: "35px" }}
          className="btn-1"
        >
          <FaSearch /> Search
        </button>
      </div>
    </div>
  
    <div className="profile" style={{ display: "flex", alignItems: "center" }}>
      <div className="profile-image" style={{ marginRight: "20px" }}>
        <img
          src={admin?.image || "https://static.vecteezy.com/system/resources/thumbnails/002/387/693/small/user-profile-icon-free-vector.jpg"}
          alt="profile"
          style={{ width: "100px", height: "100px", borderRadius: "50%" }}
        />
      </div>
      <div className="profile-card">
        <div className="profile-info" style={{ marginBottom: "10px" }}>
          <p><strong>Name:</strong> {admin && admin.name}</p>
          <p><strong>Email:</strong> {admin && admin.email}</p>
        </div>
        <div className="profile-buttons">
          <button onClick={onAddUser} className="btn-1" style={{ marginRight: "10px" }}>
            Add User
          </button>
          <button onClick={onLogout} className="btn">
            Logout
          </button>
        </div>
      </div>
    </div>
    <Userlist />
  </div>
  
  );
};

export default Admindashboard;