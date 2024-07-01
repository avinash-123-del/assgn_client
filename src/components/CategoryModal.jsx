import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { createCategory } from '../ApiHelpers';
import { Input } from 'antd';

const CategoryModal = ({ open, close }) => {
    const [err, setErr] = useState("")
    const [loader, setLoader] = useState(false)
    const [category, setcategory] = useState("")

    const handleClick = () => {
        setLoader(true)
        if (category.trim().length !== 0) {
            createCategory(category).then((res) => {
                console.log("category", category)
                // success
                if (res.status === 201) {
                    setLoader(false)
                    close();
                }
                else if (res.status === 200) {
                    setLoader(false)
                    setErr("category already exists")
                }
            }).catch((err) => {
                setLoader(false)
                setErr(err)
            })
        } else {
            setLoader(false)
            setErr("Category cannot be empty")
        }
    }

    const handleChange = (e) => {
        setcategory(e.target.value)
        setErr("")
    }

    return (
        <div>
            <Modal
                show={open}
                onHide={() => { close(); setErr(""); setcategory("") }}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm" className='d-block w-full'>
                        <h5 className='text-center'>Add category</h5>
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

export default CategoryModal