import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { createAgent } from '../ApiHelpers';
import { Input } from 'antd';

const AgentModal = ({ open, close }) => {
    const [err, setErr] = useState("")
    const [loader, setLoader] = useState(false)
    const [agent, setAgent] = useState("")

    const handleClick = () => {
        setLoader(true)
        if (agent.trim().length !== 0) {
            createAgent(agent).then((res) => {
                console.log("agent", agent)
                // success
                if (res.status === 201) {
                    setLoader(false)
                    close();
                }
                else if (res.status === 200) {
                    setLoader(false)
                    setErr("agent already exists")
                }
            }).catch((err) => {
                setLoader(false)
                setErr(err)
            })
        } else {
            setLoader(false)
            setErr("agent cannot be empty")
        }
    }

    const handleChange = (e) => {
        setAgent(e.target.value)
        setErr("")
    }

    return (
        <div>
            <Modal
                show={open}
                onHide={() => { close(); setErr(""); setAgent("") }}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm" className='d-block w-full'>
                        <h5 className='text-center'>Add agent</h5>
                    </Modal.Title>
                </Modal.Header>
                <div className='container mt-2'>
                    <Input className='d-block' onChange={handleChange} placeholder='Add Category' />

                </div>

                <div className='flex'>

                    <Button className='mt-2 bg-primary text-white' onClick={handleClick}>
                        {loader ? "Adding..." : "Add"}
                    </Button>
                </div>

                <small className='text-danger text-center d-block my-2'>{err}</small>

            </Modal>
        </div>
    )
}

export default AgentModal