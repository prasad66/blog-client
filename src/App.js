import './App.css';
import Home from './pages/home/Home';
import Topbar from './components/topbar/Topbar';
import Single from './pages/single/Single';
import Write from './components/write/Write';
import Settings from './pages/settings/Settings';
import Login from './pages/login/Login';
import Register from './pages/register/Register';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Context } from './context/context';
import { useContext } from 'react';

function App() {

  const {user} = useContext(Context);

  console.log(user)
  return (
    <Router>
      <Topbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/write" element={user ? <Write /> : <Login />} />
        <Route path="/settings" element={user ? <Settings /> : <Login />} />
        <Route path="/post/:postId" element={user ? <Single /> : <Login />} />
      </Routes>
    </Router>
  );

  // return (
  //   <Router>
  //     <Topbar />
  //     <Routes>
  //       <Route path="/" element={<Home />} />
  //       <Route path="/register" element={<Register />} />
  //       <Route path="/login" element={<Login />} />
  //       <Route path="/write" element={<Write />} />
  //       <Route path="/settings" element={<Settings />} />
  //       <Route path="/post/:postId" element={<Single />} />
  //     </Routes>
  //   </Router>
  // );
}

export default App;
