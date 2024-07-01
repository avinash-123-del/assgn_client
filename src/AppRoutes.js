import React from 'react'
import { Route, Routes } from "react-router-dom";
import Message from "./components/Message";
import Home from "./components/Home";
import UserInfo from './components/UserInfo';
import UsersPage from './components/UsersPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/userinfo/:id" element={<UserInfo />} />
      <Route path="/message" element={<Message />} />
      <Route path="/user-policies" element={<UsersPage />} />
    </Routes>
  )
}

export default AppRoutes
