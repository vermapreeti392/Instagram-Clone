import React from 'react'
import { RiCloseLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import "./Modal.css"

export default function Modal({setModal}) {
    const navigate = useNavigate()
    return (
        <div className="darkBg" onClick={()=>{setModal(false)}}>
            <div className="centered">
                <div className="modal">
                    <div className="modalHeader">
                        <h5 className='heading'>confirm</h5>
                    </div>
                    <button className="closeBtn" onClick={()=>{setModal(false)}}><RiCloseLine/></button>
                    {/* modal content */}
                    <div className="modalContent">
                        Are you sure you want to logout?
                    </div>
                    <div className="modalAction">
                        <div className="actionsContainer">
                            <button className="logoutBtn" onClick={()=>{
                                setModal(false)
                                localStorage.clear()
                                navigate('/signin')
                            }}>
                                logout
                            </button>
                            <button className="cancelBtn" onClick={()=>{setModal(false)}}>
                                cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
