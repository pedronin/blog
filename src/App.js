import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Header from './components/Header';
import AddPost from './pages/AddPost';
import UpdatePost from './pages/AddPost/UpdatePost';
import FullPost from './pages/FullPost';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/create" element={<AddPost />} />
        <Route path="/update/:id" element={<UpdatePost />} />
        <Route path="/posts/:id" element={<FullPost />} />
      </Routes>
    </>
  );
}

export default App;
