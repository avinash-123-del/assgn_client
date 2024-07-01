import { Input } from 'antd';
import React, { useState } from 'react';
import { ListGroup, Modal } from 'react-bootstrap';
import { searchCustomer } from '../ApiHelpers';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader'

const SearchComponent = ({ open, close }) => {
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();

    const handleChange = (e) => {
        const query = e.target.value.trim();

        if (query === '') {
            setUserData([]);
            return;
        }

        setLoading(true);

        searchCustomer(query)
            .then((res) => {
                const formattedData = res.map(item => ({
                    ...item,
                    policy_end_date: item.policy_end_date.split('T')[0]
                }));
                setUserData(formattedData);
            })
            .catch((error) => {
                console.error('Error searching customers:', error);
                setUserData([]);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleNav = (id) => {
        close();
        nav(`/userinfo/${id}`);
        setUserData([]);
    };

    return (
        <div>
            <Modal

                show={open}
                onHide={() => { close(); setUserData([]); }}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm" className='d-block w-full'>
                        <h5 className='text-center'>Search user</h5>
                    </Modal.Title>
                </Modal.Header>
                <div className='container mt-2'>
                    <Input className='d-block' onChange={handleChange} placeholder='search users...' />

                </div>
                <Modal.Body className='search_box'>
                    {loading ? (
                        <div className='search-loader'>
                            <Loader />
                        </div>
                    ) : (
                        <ListGroup>
                            {userData?.map((item) => (
                                <React.Fragment key={item._id}>
                                    <ListGroup.Item className='hoverable cp' onClick={() => handleNav(item._id)}>
                                        <p className='fw-bold p-0 m-0'>{item.firstname}</p>
                                        <small className='p-0 m-0'> policy end date <b className='text-info'>{item.policy_end_date}</b>  </small>
                                    </ListGroup.Item>

                                </React.Fragment>
                            ))}
                        </ListGroup>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default SearchComponent;
