import React, { useEffect, useState } from "react";
import axios from "axios";
import "../index.css";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Read() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:8000/read");
      setData(res.data);
    } catch (err) {
      console.log("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  });


  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8000/delete/${id}`);
      toast.success(res.data.message);
    
    } catch (err) {
      toast.error("Failed to delete user. Please try again.");
      console.log("Failed to delete user:", err);
    }
  };

  return (
    <div className="vishal bg-zinc-900">
      <h1 className="text-3xl text-center text-white">All Users</h1>
      <div className="text-white pl-6 pb-2">
        <Link to="/home">Add New People</Link>
      </div>

      <div className="flex flex-wrap h-full w-full pl-20">
        {data.map((user, index) => (
          <div
            className="user w-72 h-80 p-4 m-1 bg-zinc-800 rounded-lg cursor-pointer"
            key={index}
          >
            <div className="w-full h-52 rounded-lg bg-zinc-500 overflow-hidden">
              <img
                src={user.image}
                className="w-full h-full object-cover"
                alt=""
              />
            </div>
            <h3 className="text-white">{user.name}</h3>
            <h5 className="text-zinc-500">{user.email}</h5>

            <div className="flex justify-between">
              <Link to={`/edit/${user._id}`} className="p-1 text-green-500">
                Edit User
              </Link>
              <button
                className="p-1 text-red-500"
                onClick={() => handleDelete(user._id)}
              >
                Delete User
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Read;
