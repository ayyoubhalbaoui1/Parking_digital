import React, { Component, useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './header'

function AdminDashboard() {

  const [data, setStudents] = useState([])
  toast.configure()

  // get Students Data :
  function getStudent() {
    fetch("http://localhost:8080/api/students/all").then(res => {
      return res.json()
    }).then(data => {
      setStudents(data)
    })
  }
  
  // delete Student :
  function deleteStudent (id) {
    fetch(`http://localhost:8080/api/students/delete/${id}`, {
      method : 'DELETE'
    }).then(res => {
      res.json()
    }).then(data => {
      getStudent()
      toast.error("Deleted Successfully !!!", {
        position : "bottom-right"
      })
    })
  }

  // edit status of Students :
  function editStudent (id, is_valid) {
    //console.log(id, is_valid)
    fetch(`http://localhost:8080/api/students/edit/${id}`, {
      method : 'PATCH',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        is_valid : !is_valid
      })
    }).then(res => {
      getStudent()
    })
  }

  useEffect(() => {
    getStudent()
  }, [])

  return (

    <div className="App">
    <Header />
    <div className="auth-wrapper">
     

      <div className="Test1">

        <table class="table">
          <thead class="thead-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Full name</th>
              <th scope="col">Phone</th>
              <th scope="col">CIN</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map(i => (
              <tr key={i.id}>
                <td>{i.id}</td>
                <td>{i.fullname}</td>
                <td>{i.phone}</td>
                <td>{i.cin}</td>
                <td>{i.is_valid == true ?
                  <button type="button" onClick={() => {editStudent(i.id, i.is_valid)}} className="btn btn-warning mr-3">Re-Validate</button>
                  :
                  <button type="button" onClick={() => {editStudent(i.id, i.is_valid)}} className="btn btn-success mr-3">Validate</button>
                  }
                  <button onClick={() => {deleteStudent(i.id)}} type="button" className="btn btn-danger">Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>

  );
}
export default AdminDashboard