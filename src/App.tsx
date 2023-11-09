import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Loader from './components/Loader';
const Registration = lazy(() => import(/* webpackChunkName: "Registration" */ './pages/Registration'));
const AddPost = lazy(() => import(/* webpackChunkName: "AddPost" */ './pages/AddUpdatePost/AddPost'));
const UpdatePost = lazy(() => import(/* webpackChunkName: "UpdatePost" */ './pages/AddUpdatePost/UpdatePost'));
const FullPost = lazy(() => import(/* webpackChunkName: "FullPost" */ './pages/FullPost'));


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="/registration" element={
          <Suspense fallback={<Loader />}>
            <Registration />
          </Suspense>
        } />
        <Route path="/create" element={
          <Suspense fallback={<Loader />}>
            <AddPost />
          </Suspense>
        } />
        <Route path="/update/:id" element={
          <Suspense fallback={<Loader />}>
            <UpdatePost />
          </Suspense>
        } />
        <Route path="/posts/:id" element={
          <Suspense fallback={<Loader />}>
            <FullPost />
          </Suspense>
        } />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
