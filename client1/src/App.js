import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoutes from './components/ProtectedRoutes';
import PublicRoute from './components/PublicRoute';
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import ApplyAdmin from './pages/ApplyAdmin';
import NotificationPage from './pages/NotificationPage';
import Admins from './pages/admin/Admins';
import Users from './pages/admin/Users';
import Profile from './pages/faculty/Profile';
import BookingPage from './pages/BookingPage';
import Appointments from './pages/Appointments';
import FacultyAppointments from './pages/faculty/FacultyAppointments';

function App() {
  const { loading } = useSelector((state) => state.alerts);

  return (
    <div className="">
      <Router>
      {loading ? (
          <Spinner />
        ) : (
        <Routes>
          <Route path='/' 
          
          element={
          <ProtectedRoutes>
<HomePage />
          </ProtectedRoutes>
          } />
         
           <Route path='/apply-admin' 
          
          element={
          <ProtectedRoutes>
<ApplyAdmin />
          </ProtectedRoutes>
          } />
           <Route path='/notification' 
          
          element={
          <ProtectedRoutes>
<NotificationPage />
          </ProtectedRoutes>
          } />
          

            <Route path='/admin/admins' 
          
          element={
          <ProtectedRoutes>
<Admins />
          </ProtectedRoutes>
          } />
             <Route path='/appointments' 
          
          element={
          <ProtectedRoutes>
<Appointments />
          </ProtectedRoutes>
          } />
           <Route path='/faculty-appointments' 
          
          element={
          <ProtectedRoutes>
<FacultyAppointments />
          </ProtectedRoutes>
          } />
            <Route path='/admin/users' 
          
          element={
          <ProtectedRoutes>
<Users />
          </ProtectedRoutes>
          } />
           <Route path='/faculty/profile/:id' 
          
          element ={
          <ProtectedRoutes>
<Profile />
          </ProtectedRoutes>
          } />
          
           <Route path='/faculty/book-appointment/:facultyId' 
          
          element ={
          <ProtectedRoutes>
<BookingPage />
          </ProtectedRoutes>
          } />
          <Route path='/login' element={
          <PublicRoute>
<Login/>
          </PublicRoute>
          }/>
          <Route path='/register' element={ <PublicRoute>
            <Register/>          </PublicRoute>}/>
          
        </Routes>
        
        )}
      </Router>
    </div>
  );
}

export default App;
