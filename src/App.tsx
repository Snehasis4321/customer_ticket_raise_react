import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import TicketList from './components/TicketList';
import CreateTicket from './components/CreateTicket';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route 
              path="/tickets" 
              element={
                <ProtectedRoute>
                  <TicketList />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/create-ticket" 
              element={
                <ProtectedRoute>
                  <CreateTicket />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App
