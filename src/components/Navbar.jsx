import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import SearchComponent from "./SearchComponent";
import UploadModal from "./UploadModal";
import CategoryModal from "./CategoryModal";
import AgentModal from "./AgentModal";



const Navbar = () => {
  const [searchModal, setSearchModal] = useState(false)
  const [uploadModal, setUploadModal] = useState(false)
  const [cateModal, setCateModal] = useState(false)
  const [agentModal, setAgentModal] = useState(false)
  const nav = useNavigate();

  console.log("categ", cateModal);
  return (
    <>
      <UploadModal open={uploadModal} close={() => setUploadModal(false)} />
      <SearchComponent open={searchModal} close={() => setSearchModal(false)} />
      <CategoryModal open={cateModal} close={() => setCateModal(false)} />
      <AgentModal open={agentModal} close={() => setAgentModal(false)} />

      <nav className="navbar navbar-expand-lg navbar-light bg-light px-lg-5">
        <div className='d-flex justify-content-between w-100 align-items-center'>
          <Link to={'/'} style={{ textDecoration: 'none' }}>
            <div style={{ width: "163px" }}>
              <img src="/logo192.png" alt="" width="100%" />
            </div>
          </Link>
          <div className="d-flex align-items-center gap-2 me-2">

            <ul className="ul-none">

              <li onClick={() => setUploadModal(true)}>
                <img src="/icons/upload_file.svg" alt="" />
                <span className="d-none d-lg-inline ">upload xlsx</span>
              </li>
              <li onClick={() => setCateModal(true)}>
                <img src="/icons/category.svg" alt="" />
                <span className="d-none d-lg-inline ">Add category</span>
              </li>
              <li onClick={() => nav('/user-policies')}>
                <img src="/icons/insurance.svg" alt="" />
                <span className="d-none d-lg-inline ">user policies</span>
              </li>
              <li onClick={() => setAgentModal(true)}>
                <img src="/icons/add_agent.svg" alt="" />
                <span className="d-none d-lg-inline ">Add Agent</span>
              </li>
              <li onClick={() => nav('/message')}>
                <img src="/icons/message.svg" alt="" />
                <span className="d-none d-lg-inline ">message</span>
              </li>
              <li onClick={() => setSearchModal(true)}>
                <img src="/icons/search.svg" alt="" />
                <span className="d-none d-lg-inline ">search</span>
              </li>
            </ul>


          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
