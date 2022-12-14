import React from "react";
import Student from './Page/Student.js';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import AddEdit from "./Page/AddEdit.js";

export default function App() {
  return ( 
    <>
          <Router>
              <Switch>
                <Route path="/editdetails/:id"
                 component={AddEdit}/>
                <Route path="/addstudent"
                  component={AddEdit}/>
                <Route path="/"
                component={Student}/>
              </Switch>
              </Router>
        </>
   );
}
