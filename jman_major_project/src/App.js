import './App.css';
import Login from './components/admin/Login';
import UserLogin from './components/user/UserLogin';
import ChangePassword from './components/user/ChangePassword';
import CourseCreation from './components/admin/CourseCreation';
import TrainingPlans from './components/admin/TrainingPlans';
import UserPlans from './components/user/UserPlans';
import CompletedPlans from './components/user/CompletedPlans';
import UserAssessments from './components/user/UserAssessments';
import AssessmentUpload from './components/admin/AssessmentUpload';
import UserCreation from './components/admin/UserCreation';
import Home from './components/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/changepassword' element={<ChangePassword />} />
              <Route path='/userlogin' element={<UserLogin />} />
              <Route path='/usercreation' element={<UserCreation />} />
              <Route path='/coursecreation' element={<CourseCreation />} />
              <Route path='/trainingplans' element={<TrainingPlans />} />
              <Route path='/userplans' element={<UserPlans />} />
              <Route path='/completedplans' element={<CompletedPlans />} />
              <Route path='/userassessments' element={<UserAssessments />} />
              <Route path='/assessmentupload' element={<AssessmentUpload />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
  
}
export default App;
