import React,{useEffect, useState} from "react";
import "./AddEdit.css";
import Axios from 'axios';
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { FaArrowLeft } from 'react-icons/fa';
import { useHistory, useParams } from "react-router-dom";

const initialState = {
    firstname: "",
    lastname: "",
    location: "",
    email: "",
    dob: "",
    education: "",
    about: ""

}



const AddEdit = () => {
    const [state, setState] = useState(initialState);
    const baseUrl = "http://localhost:3001";

    const history = useHistory();

    const {firstname,lastname,location,email,dob,education,about} = state;

    const {id} = useParams();

    useEffect(() => {
      Axios.get(`http://localhost:3001/students/${id}`)
      .then((resp) => setState({...resp.data[0]}));
    }, [id]);

    
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(!firstname || !lastname || !location || !email || !dob || !education || !about){
            toast.error("Please provide value into each input field");
        } else{
          if(!id) {
            Axios.post(`${baseUrl}/addstudents`,{
              firstname,
              lastname,
              location,
              email,
              dob,
              education,
              about
          }).then(() => {
              setState({firstname:"",lastname:"",location:"",email:"",dob:"",education:"",about:""})
          }).catch((err)=> toast.error(err.response.data));
          toast.success("Successfully Added")
          }else {
            Axios.put(`${baseUrl}/update/${id}`,{
              firstname,
              lastname,
              location,
              email,
              dob,
              education,
              about
          }).then(() => {
              setState({firstname:"",lastname:"",location:"",email:"",dob:"",education:"",about:""})
          }).catch((err)=> toast.error(err.response.data));
          toast.success("Successfully updated")
          }
            
            setTimeout(()=>history.push("/"),5000);
        }
    };

    const handleInputChange = (e) =>{
            const {name,value} = e.target;
            setState({...state,[name]:value});
    };

return (  
    <div className="add-student-box">
        <ToastContainer position="bottom-center" />
    <form onSubmit={handleSubmit}>
      <table className="add-student-table">
        <thead className="arrow">
        <FaArrowLeft onClick={() => history.push('/')}/>
        </thead><br/><br/>
        <tr className="add-student-table">
          <td><label>FirstName:</label></td>
          <td><input
        type="text"
        // required="true"
        name="firstname"
        value={firstname || ""}
        onChange={handleInputChange}/>
        </td>
        <td><lable>LastName:</lable></td>
        <td><input
        type="text"
        // required="true"
        name="lastname"
        value={lastname || ""}
        onChange={handleInputChange}/></td> 
        </tr><br/>
        <tr className="add-student-table">
        <td><label>Location:</label></td>
        <td><input
        type="text"
        // required="true"
        name="location"
        value={location || ""}
        onChange={handleInputChange}/></td>
        </tr><br/>
        <tr>
          <td><label>Email:</label></td>
          <td><input
        type="text"
        // required="true"
        name="email"
        value={email || ""}
        onChange={handleInputChange}/></td>
        </tr><br/>
        <tr className="add-student-table">
          <td><label>DOB:</label></td>
          <td><input
        type="date"
        // required="true"
        name="dob"
        value={dob || ""}
        onChange={handleInputChange}/>
          </td>
        </tr><br/>
        <tr className="add-student-table">
          <td><label>Education:</label></td>
          <td><input
        type="text"
        // required="true"
        name="education"
        value={education || ""}
        onChange={handleInputChange}/></td>
        </tr><br/>
        <tr>
          <td><label>About:</label></td>
          <td><input
        type="text"
        // required="true"
        name="about"
        value={about || ""}
        id="about"
        onChange={handleInputChange}/></td>
        </tr><br/>
        <tr className="add-student-table">
          <td></td>
          {/* <td><button value={id ? "Update" : "Save"}>Submit</button></td> */}
          <td><input type="submit" className="button" value={id ? "Update" : "Save"}/></td>
        </tr>
      </table>
      </form>
    </div>

);
}

export default AddEdit;