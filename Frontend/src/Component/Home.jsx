import React, { useState } from "react";
import "../index.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    image: "",
  });

  const handleChnage = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:8000/create", data)
      .then((res) => {
        navigate("/");
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(data);
  return (
    <>
      <div className="vishal h-full w-full bg-zinc-800 ">
        <h1 className="text-white text-center text-3xl p-5">Create Users</h1>

        <div className="m-5 text-white">
          <Link to="/">Go To Home</Link>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Name"
            className="bg-zinc-200 outline-none mx-2 px-5 py-2 rounded-md border-red-200"
            name="name"
            value={data.name}
            onChange={handleChnage}
          />
          <input
            type="text"
            placeholder="Enter Email"
            className="bg-zinc-200 outline-none mx-2 px-5 py-2 rounded-md border-red-200"
            name="email"
            value={data.email}
            onChange={handleChnage}
          />
          <input
            type="text"
            placeholder="Enter Image Url"
            className="bg-zinc-200 outline-none mx-2 px-5 py-2 rounded-md border-red-200"
            name="image"
            value={data.image}
            onChange={handleChnage}
          />

          <input
            type="submit"
            value={"Create User"}
            className="text-white cursor-pointer bg-blue-600 py-2 px-3 rounded-md"
          />
        </form>
      </div>
    </>
  );
}

export default Home;
