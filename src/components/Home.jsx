import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { getAllData } from '../ApiHelpers';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import { GrNext, GrPrevious } from 'react-icons/gr';

const Home = () => {
  const [policyData, setPolicydata] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    setLoader(true);
    getAllData(currentPage)
      .then((res) => {
        // Assuming policy_start_date and policy_end_date are in ISO format like "YYYY-MM-DDTHH:mm:ss.SSSZ"
        const formattedData = res.customerData.map(item => ({
          ...item,
          policy_start_date: item.policy_start_date.split('T')[0], // Extracting only the date part
          policy_end_date: item.policy_end_date.split('T')[0] // Extracting only the date part
        }));
        setPolicydata(formattedData);
        setLoader(false);
      })
      .catch(() => {
        setLoader(false);
      });
  }, [currentPage]);

  if (loader) {
    return (
      <div className='ht-100 wd-100 flex'>
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className='tblData container-fluid'>
        <Table className='mt-3 border' responsive>
          <thead>
            <tr>
              <th>First name</th>
              <th>Email</th>
              <th>Phone No.</th>
              <th>Policy type</th>
              <th>Policy number</th>
              <th>Policy Start date</th>
              <th>Policy End date</th>
              <th>Company name</th>
              <th>Category name</th>
              <th>Account name</th>
            </tr>
          </thead>
          <tbody>
            {policyData.map((s, i) => (
              <tr className='cp' onClick={() => nav(`/userinfo/${s._id}`)} key={i}>
                <td>{s.firstname}</td>
                <td>{s.email}</td>
                <td>{s.phone}</td>
                <td>{s.policy_type}</td>
                <td>{s.policy_number}</td>
                <td>{s.policy_start_date}</td>
                <td>{s.policy_end_date}</td>
                <td>{s.company_name}</td>
                <td>{s.category_name}</td>
                <td>{s.account_name}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div className='d-flex justify-content-center mt-2 mb-4'>
        <div className='d-flex gap-2 border rounded-3 bg-light' style={{ padding: ' 0px 10px', height: '30px' }}>
          <span onClick={() => (currentPage > 1) && setCurrentPage(prev => prev - 1)} style={{ cursor: 'pointer' }}><GrPrevious /></span>
          <span className='fw-bold border bg-white' style={{ padding: '0px 8px' }}>{currentPage}</span>
          <span onClick={() => setCurrentPage(prev => prev + 1)} style={{ cursor: 'pointer' }}><GrNext /></span>
        </div>
      </div>
    </>
  );
};

export default Home;
