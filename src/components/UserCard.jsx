import React from 'react'
import { formatDate } from '../ApiHelpers'

const UserCard = ({ policy }) => {
    return (
        <div className='user-card shadow'>
            <h6 className='text-center mt-2 text-primary'>{policy?.firstname}</h6>

            <div className='user_card_details'>
                <p>user type : <span>{policy?.userType}</span></p>
                <p>phone : <span>{policy?.phone}</span></p>
                <p>email : <span>{policy?.email}</span></p>
                <p>dob : <span>{formatDate(policy?.dob)}</span></p>
                <p>address : <span>{policy?.address}</span></p>
                <p>policies :
                    <span>
                        {policy?.policyNames?.map((e, index) => (
                            <span key={index}>{e}</span>
                        ))}
                    </span></p>

                <p>premium amount : <span>{policy?.totalPremium}</span></p>
                <p>policy count : <span>{policy?.policyCount}</span></p>
            </div>
        </div>
    )
}

export default UserCard