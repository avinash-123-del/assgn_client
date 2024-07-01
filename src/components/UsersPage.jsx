import React, { useEffect, useState } from 'react'
import { getAggregatedPolicies } from '../ApiHelpers'
import UserCard from './UserCard'
import Loader from './Loader'
import { GrNext, GrPrevious } from 'react-icons/gr'

const UsersPage = () => {
    const [userPolicies, setUserPolicies] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        setLoading(true)
        getAggregatedPolicies(currentPage).then((res) => {
            setUserPolicies(res)
            setLoading(false)
        }).catch((err) => {
            setLoading(false)
        })
    }, [currentPage])
    if (loading) {
        return (
            <div className='ht-100 wd-100 flex'>
                <Loader />
            </div>
        );
    }
    return (
        <div className='container my-4'>
            <h3 className='text-center my-5'>Aggregated Policies</h3>
            <div className='row '>
                {userPolicies?.map((policy, index) => (
                    <UserCard key={index} policy={policy} />
                ))}
            </div>

            <div className='d-flex justify-content-center mt-2 mb-4'>
                <div className='d-flex gap-2 border rounded-3 bg-light' style={{ padding: ' 0px 10px', height: '30px' }}>
                    <span onClick={() => (currentPage > 1) && setCurrentPage(prev => prev - 1)} style={{ cursor: 'pointer' }}><GrPrevious /></span>
                    <span className='fw-bold border bg-white' style={{ padding: '0px 8px' }}>{currentPage}</span>
                    <span onClick={() => setCurrentPage(prev => prev + 1)} style={{ cursor: 'pointer' }}><GrNext /></span>
                </div>
            </div>
        </div>
    )
}

export default UsersPage