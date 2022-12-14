import React, { useEffect, useState } from "react";
import { FaUserEdit,FaSearch } from 'react-icons/fa';
import { Container,Table,Row,Col } from 'react-bootstrap';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Axios from 'axios';
import "./Student.css";
import {RiDeleteBin5Line} from 'react-icons/ri';
import { useHistory,Link } from "react-router-dom";




function Student() {
  const [studentsList, setStudentsList] = useState([]);
  const baseUrl = "http://localhost:3001";

  const history = useHistory();

  const getStudents = () => {
    Axios.get(`${baseUrl}/students`).then((response) => {
      setStudentsList(response.data);
    });
  };

  useEffect(() => {
    getStudents();
  });

  const DeleteDetails = (id) => {
    if(window.confirm("Do you really want to delete this detail?")){
    Axios.delete(`http://localhost:3001/delete/${id}`);
    toast.success("Delete successfully");
    }
  };

  const [value, setValue] = useState('');
  const [tablefilter, setTableFilter] = useState([]);

  const filterData = (e) => {
    if(e.target.value !==""){
      setValue(e.target.value);
      const filterTable = studentsList.filter(o => Object.keys(o).some(k=>
        String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
        ));
        setTableFilter([...filterTable])
    }else{
      setValue(e.target.value);
      setStudentsList([...studentsList])
    }
  }


    return ( 
        <div className="student_page">
          {/* <ToastContainer position="bottom-center" /> */}
        <Container>
            <Row>
                <Col> <h1> Student Management System </h1></Col>
            </Row><br/>
            <Row>
                <Col> <input type="text" id="search" value={value} placeholder="Search" onChange={filterData}/>
                </Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
              <Col><button id="button" onClick={() => history.push('/addstudent')}>Add</button></Col>
                
            </Row><br/>
            <Table border="2px">
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Location</th>
          <th>Email</th>
          <th>DOB</th>
          <th>Education</th>
          <th>Action</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
      {value.length > 0 ? tablefilter.map((student) => {
              return (
         <tr>
          <td>{student.id}</td>
          <td>{student.firstname} </td>
          <td>{student.lastname}</td>
          <td>{student.location}</td>
          <td>{student.email}</td>
          <td>{student.dob}</td>
          <td>{student.education}</td>
          <td><Link to ={`/editdetails/${student.id}`}><btn className="btn"><FaUserEdit/> Edit</btn></Link></td>
           <td><btn className="btn"onClick={()=>DeleteDetails(student.id)}>
      <RiDeleteBin5Line /> Delete</btn></td>

        </tr>  
         )
         })

         :

         studentsList.map((student) => {
          return (
            <tr>
             <td>{student.id}</td>
             <td>{student.firstname} </td>
             <td>{student.lastname}</td>
             <td>{student.location}</td>
             <td>{student.email}</td>
             <td>{student.dob}</td>
             <td>{student.education}</td>
             <td><Link to ={`/editdetails/${student.id}`}><btn className="btn"><FaUserEdit/> Edit</btn></Link></td>
              <td><btn className="btn"onClick={()=>DeleteDetails(student.id)}>
         <RiDeleteBin5Line /> Delete</btn></td>
   
           </tr>  
            )
         })
        }

        </tbody>

      </Table>
      </Container> 
        </div>


     );
}

export default Student;