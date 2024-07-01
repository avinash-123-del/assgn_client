import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Modal, Row } from 'react-bootstrap';
import { createMessage, getAllMessage } from '../ApiHelpers';
import Loader from './Loader';
import { Select } from 'antd';

const { Option } = Select;

const Message = () => {
    const [modalShow, setModalShow] = useState(false);
    const [messages, setMessages] = useState([]);
    const [err, setErr] = useState(false);
    const [noImage, setNoImage] = useState(null);
    const [loader, setLoader] = useState(false);
    const [inputData, setInputData] = useState({
        day: "",
        time: "",
        message: ""
    });

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const handleChange = (e) => {
        setErr(false);
        const { name, value } = e.target;
        setInputData({
            ...inputData,
            [name]: value
        });
    };

    const handleDayChange = (value) => {
        setInputData({
            ...inputData,
            day: value
        });
        setErr(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputData.day === "" || inputData.time === "" || inputData.message === "") {
            setErr(true);
        } else {
            createMessage(inputData).then(() => {
                setModalShow(false);
                setMessages((prev) => [inputData, ...prev]);
                setInputData({ day: "", time: "", message: "" });
            }).catch(() => {
                setModalShow(true);
            });
        }
    };

    useEffect(() => {
        setLoader(true);
        getAllMessage().then((res) => {
            if (res.status === 201) {
                setMessages(res.data);
                setLoader(false);
                console.log("msg", res.data)
            } else {
                setNoImage(res.data);
                setLoader(false);
            }
        }).catch(() => {
            setLoader(false);
        });
    }, []);

    if (loader) {
        return (
            <div className='ht-100 wd-100 flex'>
                <Loader />
            </div>
        );
    }

    return (
        <>
            <div className='d-flex justify-content-end w-100 align-items-center'>
                <Button className='m-3' onClick={() => setModalShow(true)}>Create New Message</Button>
                <Modal
                    show={modalShow}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    backdrop="static"
                    onHide={() => { setModalShow(false); setInputData({ day: "", time: "", message: "" }); setErr(false); }}
                >
                    <Modal.Header closeButton>
                        <Modal.Title className='w-100 text-center'>
                            Create New Message
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={handleSubmit}>
                            <div className='row col-12'>
                                <div className="mb-3 col-12 col-lg-6">
                                    <label htmlFor="daySelect" className="form-label">Day</label>
                                    <Select
                                        id="daySelect"
                                        onChange={(value) => handleDayChange(value)}
                                        style={{ width: '100%' }}
                                        placeholder="select day"
                                    >
                                        {days.map((day) => (
                                            <Option key={day} value={day}>
                                                {day}
                                            </Option>
                                        ))}
                                    </Select>
                                </div>
                                <div className="mb-3 col-12 col-lg-6">
                                    <label htmlFor="timeInput" className="form-label">Time</label>
                                    <input
                                        onChange={handleChange}
                                        value={inputData.time}
                                        name='time'
                                        type="time"
                                        className="form-control"
                                        id="timeInput"
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="messageTextarea" className="form-label">Message</label>
                                <textarea
                                    onChange={handleChange}
                                    value={inputData.message}
                                    name='message'
                                    className="form-control"
                                    id="messageTextarea"
                                    rows="3"
                                ></textarea>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <Button type='submit' className='m-3'>Submit</Button>
                            </div>
                        </form>
                        <div className='text-center'>
                            {err && <small className='text-danger d-block'>All input fields are required</small>}
                        </div>
                    </Modal.Body>
                </Modal>
            </div>

            {messages.length > 0 ?
                messages.map((e, i) => (
                    <div key={i} className='container'>
                        <Card className='m-3'>
                            <Card.Body>
                                <Row className='mt-2' style={{ fontSize: '15px' }}>
                                    <Col sm={6}>Day: {e.day}</Col>
                                    <Col sm={6} className='text-end text-sm-start fw-medium'>Time: {e.time}</Col>
                                </Row>
                                <Card className='mt-3'>
                                    <Card.Body>
                                        <p>{e.message}</p>
                                    </Card.Body>
                                </Card>
                            </Card.Body>
                        </Card>
                    </div>
                ))
                :

                <div>
                    <img src="" alt="" />
                    <h4 className='text-center text-primary fw-bold'>{noImage}</h4>
                </div>}

        </>
    );
};

export default Message;
