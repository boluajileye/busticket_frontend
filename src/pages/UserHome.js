import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';

const UserHome = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user == null) {
      navigate("/login")
    }
  });
  return (
    <>
      <NavBar />
      <div>UserHome</div>
      <Footer />
    </>
  )
}

export default UserHome