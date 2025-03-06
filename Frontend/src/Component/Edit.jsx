import React, { useEffect, useState } from "react";
import "../index.css";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({
    name: "",
    email: "",
    image: "",
  });

  const fetchData = async() => {
    await axios.get(`http://localhost:8000/findone/${id}`)
    .then((res) => {
      setUser(res.data.user);
    })
    .catch((error) => {
      console.log(error);
      toast.error("Failed to fetch user details");
    });
  }
  useEffect(() => {
    fetchData();
  }, [id]);


  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };



  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8000/edit/${id}`, user)
      .then((res) => {
        toast.success("User updated successfully");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to update user");
      });
  };



  return (
    <>
      <div className="vishal h-full w-full bg-zinc-800">
        <h1 className="text-white text-center text-3xl p-5">Update Users</h1>

        <div className="m-5 text-white">
          <a href="/">Go To Home</a>
        </div>

        <form onSubmit={handleUpdate}>
          <input
            type="text"
            placeholder="Enter Name"
            className="text-black bg-zinc-200 outline-none mx-2 px-5 py-2 rounded-md border-red-200"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Enter Email"
            className="text-black bg-zinc-200 outline-none mx-2 px-5 py-2 rounded-md border-red-200"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Enter Image Url"
            className="text-black bg-zinc-200 outline-none mx-2 px-5 py-2 rounded-md border-red-200"
            name="image"
            value={user.image}
            onChange={handleChange}
          />

          <input
            type="submit"
            value={"Update User"}
            className="text-white cursor-pointer bg-yellow-600 py-2 px-3 rounded-md"
          />
        </form>
      </div>
    </>
  );
}

export default Home;
