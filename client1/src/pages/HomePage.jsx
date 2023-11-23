import React, { useEffect,useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { Row } from "antd";
import FacultyList from "../components/FacultyList";
const HomePage = () => {
  const [faculty,updateFaculty]=useState([]);
  // login user data
  const getUserData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/user/getAllFaculty",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if(res.data.success){
        updateFaculty(res.data.data);
      }
      console.log(res)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
<Layout> <h1 className="text-center">Home Page</h1>
<Row>
  {faculty &&faculty.map(faculty=>(
    <FacultyList faculty={faculty}/>
  ))}
</Row>
</Layout>
  );
};

export default HomePage;