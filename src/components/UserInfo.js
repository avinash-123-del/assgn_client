import React, { useEffect, useState } from 'react'
import { ListGroup } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { getOneCustomer } from '../ApiHelpers'
import Loader from './Loader'

const UserInfo = () => {

  const { id } = useParams()
  const [loader, setLoader] = useState(false)
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    setLoader(true)
    getOneCustomer(id).then((res) => {
      const formattedUserData = {
        ...res,
        policy_start_date: res.policy_start_date.split('T')[0], // Extracting only the date part
        policy_end_date: res.policy_end_date.split('T')[0] // Extracting only the date part
      };
      setUserData(formattedUserData);
      // setUserData(res)
      setLoader(false)
    }).catch((err) => {
      setLoader(false)
    })
  }, [id])

  if (loader) {
    return (
      <div className='ht-100 wd-100 flex'>
        <Loader />
      </div>
    )
  }

  // user data ka info 
  console.log("userData", userData)

  return (
    <>
      <h4 className='ms-2 mt-3 mb-3'>User Info</h4>
      <div>
       
         {userData &&<>
         
      
         
          <ListGroup className='border '>
            <ListGroup.Item className='userInfoList' >
              <div class="row">
                <div class="col-sm-6">
                FirstName :
                  </div>
                  <div class="col-sm-6 text-end text-sm-start fw-medium">
                  {userData.firstname}
                  </div>
            </div>
            </ListGroup.Item>
              <ListGroup.Item className='userInfoList' >
              <div class="row">
                <div class="col-sm-6">
                Email:
                  </div>
                  <div class="col-sm-6 text-end text-sm-start fw-medium">
                  {userData.email}
                  </div>
            </div>
            </ListGroup.Item>
            <ListGroup.Item className='userInfoList' >
              <div class="row">
                <div class="col-sm-6">
                Phone No:
                  </div>
                  <div class="col-sm-6 text-end text-sm-start fw-medium">
                  {userData.phone}
                  </div>
            </div>
            </ListGroup.Item>
              <ListGroup.Item className='userInfoList' >
              <div class="row">
                <div class="col-sm-6">
                Policy type:
                  </div>
                  <div class="col-sm-6 text-end text-sm-start fw-medium">
                  {userData.policy_type}
                  </div>
            </div>
            </ListGroup.Item>
            <ListGroup.Item className='userInfoList' >
              <div class="row">
                <div class="col-sm-6">
                Policy number:
                  </div>
                  <div class="col-sm-6 text-end text-sm-start fw-medium">
                  {userData.policy_number}
                  </div>
            </div>
            </ListGroup.Item>
            <ListGroup.Item className='userInfoList' >
              <div class="row">
                <div class="col-sm-6">
                Policy Start date:
                  </div>
                  <div class="col-sm-6 text-end text-sm-start fw-medium">
                  {userData.policy_start_date}
                  </div>
            </div>
            </ListGroup.Item>
            <ListGroup.Item className='userInfoList' >
              <div class="row">
                <div class="col-sm-6">
                Policy End date:
                  </div>
                  <div class="col-sm-6 text-end text-sm-start fw-medium">
                  {userData.policy_end_date}
                  </div>
            </div>
            </ListGroup.Item>
            <ListGroup.Item className='userInfoList' >
              <div class="row">
                <div class="col-sm-6">
                Company name:
                  </div>
                  <div class="col-sm-6 text-end text-sm-start fw-medium">
                  {userData.company_name}
                  </div>
            </div>
            </ListGroup.Item>
            <ListGroup.Item className='userInfoList' >
              <div class="row">
                <div class="col-sm-6">
                Category name:
                  </div>
                  <div class="col-sm-6 text-end text-sm-start fw-medium">
                  {userData.category_name}
                  </div>
            </div>
            </ListGroup.Item>
            <ListGroup.Item className='userInfoList' >
              <div class="row">
                <div class="col-sm-6">
                Account name:
                  </div>
                  <div class="col-sm-6 text-end text-sm-start fw-medium">
                  {userData.account_name}
                  </div>
            </div>
            </ListGroup.Item>
    </ListGroup>
    </>
          }
      </div>

    </>
  )
}

export default UserInfo
