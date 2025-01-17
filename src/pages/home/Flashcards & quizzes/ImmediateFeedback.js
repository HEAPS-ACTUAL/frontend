import React, { useEffect, useState } from "react";
import gsap from "gsap";
import image from '../../../images/immediate-feedback.png'
import { RxCross2 } from "react-icons/rx";
import { BsCheckLg } from "react-icons/bs";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { TbOvalVertical } from "react-icons/tb";
import ScienceChatbot from "../../../components/Chatgpt";


function ImmediateFeedback() {
    const [showCarrot, setShowCarrot] = useState(false)
    const [showOval, setShowOval] = useState(false)
    const [queryNumber, setQueryNumber] = useState(0)

    useEffect(() => {
        const tl = gsap.timeline({ delay: 1 });

    // Animate the ticks and crosses
        tl.fromTo(
            ".cross-1",
            { opacity: 0, scale: 0 },
            { opacity: 1, scale: 1, duration: 1 }
        )
            .fromTo(
                ".btn-1",
                { opacity: 0, scale: 0 },
                { opacity: 1, scale: 1, duration: 1 },
                "<" // Sync this with the previous animation
            )
            .fromTo(
                ".tick-1",
                { opacity: 0, scale: 0 },
                { opacity: 1, scale: 1, duration: 1 }
            )
            .fromTo(
                ".cross-2",
                { opacity: 0, scale: 0 },
                { opacity: 1, scale: 1, duration: 1 }
            )
            .fromTo(
                ".btn-2",
                { opacity: 0, scale: 0 },
                { opacity: 1, scale: 1, duration: 1 },
                "<"
            );
    }, []);

    function handleCarrot(){
        setShowCarrot(!showCarrot)
    }

    function handleOval(){
        setShowOval(!showOval)
    }

    function handleTellMeMore(){
        handleCarrot()
        setQueryNumber(1)
    }
    
    function handleTellMeMore2(){
        handleOval()
        setQueryNumber(2)
    }


    return (
        <div className="container position-relative mt-2">
            <div className="row">
                <div class="col-8 text-center">
                    <img className="img-fluid" src={image} style={{ width: '80%', height: '95%' }} />

                    <div className="cross-1 text-danger position-absolute" style={{ top: '24vw', left: '37vw' }}>
                        <RxCross2 style={{ width: '50px', height: '50px' }} />
                    </div>

                    {showCarrot && (
                        <div className="text-danger fw-bold position-absolute" style={{ top: '26vw', left: '34vw', fontSize: '30px' }}>
                            ^^
                        </div>
                    )}

                    <div class="dropup position-absolute" style={{ top: '24vw', left: '49vw', }}>
                        <button onClick={handleCarrot} className="btn-1 btn shadow rounded-circle" data-bs-toggle="dropdown" style={{ width: '40px', height: '40px', backgroundColor: 'rgb(243 185 185)' }}>
                            <MdOutlineRemoveRedEye />
                        </button>
                        <div class="dropdown-menu p-3" style={{ width: '300px' }}>
                            <p>
                                <span className="text-danger fw-bold"> Feedback: </span>
                                <br></br> 
                                Missing point
                            </p>

                            <p> <span className="text-success fw-bold"> Answer: </span> 
                                <br></br>
                                Energy cannot be created nor destroyed. It can only be converted from one form to another. Total amount of energy remains the same. 
                            </p>

                            <button onClick={handleTellMeMore} className="badge bg-dark border-0 p-2"> Tell me more </button>
                        </div>
                    </div>


                    <div className="tick-1 text-success position-absolute" style={{ top: '33vw', left: '37vw' }}>
                        <BsCheckLg style={{ width: '50px', height: '50px' }} />
                    </div>

                    <div className="cross-2 text-danger position-absolute" style={{ top: '43vw', left: '23vw' }}>
                        <RxCross2 style={{ width: '50px', height: '50px' }} />
                    </div>
                    
                    {showOval && (
                        <div className="cross-2 text-danger position-absolute" style={{ top: '39.5vw', left: '13.5vw' }}>
                            <TbOvalVertical style={{ width: '60px', height: '60px' }} />
                        </div>
                    )}

                    <div class="dropup position-absolute" style={{ top: '41vw', left: '49vw' }}>
                        <button onClick={handleOval} className="btn-2 btn shadow rounded-circle" data-bs-toggle="dropdown" style={{ width: '40px', height: '40px', backgroundColor: 'rgb(243 185 185)' }}>
                            <MdOutlineRemoveRedEye />
                        </button>
                        <div class="dropdown-menu p-3" style={{ width: '300px' }}>
                            <p>
                                <span className="text-danger fw-bold"> Feedback: </span>
                                <br></br> 
                                Incorrect value
                            </p>

                            <p> 
                                <span className="text-success fw-bold"> Answer: </span> 
                                <br></br>
                                100 Joules because no energy lost to the surroundings in the form of heat or sound.
                            </p>

                            <button onClick={handleTellMeMore2} className="badge bg-dark border-0 p-2"> Tell me more </button>
                        </div>
                    </div>
                </div>

                <div className="col-4">
                    <ScienceChatbot query={queryNumber} />
                </div>
            </div>

        </div>
    )
}

export default ImmediateFeedback