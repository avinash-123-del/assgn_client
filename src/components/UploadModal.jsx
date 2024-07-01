import { Button } from 'antd';
import React, { useRef, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { uploadFile } from '../ApiHelpers';

const UploadModal = ({ open, close }) => {
    const inputRef = useRef(null);
    const [file, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState('/icons/upload-big.svg');
    const [fileName, setFileName] = useState('select file');
    const [loader, setLoader] = useState(false)

    const selectFile = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setFileName(selectedFile?.name)
            const reader = new FileReader();
            reader.onload = (event) => {
                setFilePreview('/icons/excel_file.svg');
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleUpload = () => {
        if (file) {
            setLoader(true)
            const formdata = new FormData();
            formdata.append("file", file)
            uploadFile(formdata).then((res) => {
                close()
                setLoader(false)
                window.location.href = "/"
            }).catch((err) => {
                setLoader(false)
            })
        }
    };

    const handleImageClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    return (
        <Modal
            show={open}
            onHide={() => { close(); setFile(null); }}
            aria-labelledby="example-modal-sizes-title-sm"
            backdrop="static"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm" className='d-block w-full'>
                    <h5 className='text-center'>Upload xlsx file</h5>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='search_box'>
                <div className='flex'>
                    <input
                        className='d-none'
                        onChange={selectFile}
                        ref={inputRef}
                        type='file'
                        accept='.csv'
                    />
                    <img width={300}
                        src={filePreview}
                        alt="File preview"
                        onClick={handleImageClick}
                        style={{ cursor: 'pointer' }}
                    />
                </div>
                <small className='d-block text-center'>{fileName}</small>
                <div className='flex'>

                    <Button className='bg-primary text-white mt-3' onClick={handleUpload}>
                        {loader ? <div className='flex gap-2'>
                            <div className='spinner'></div>
                            <span>uploading...</span>
                        </div>
                            : "upload"}
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default UploadModal;
