import React from "react";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

const Consent = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        if (checked) {
            navigate('/controls')
        } else {
            alert("Please give your consent to proceed");
        }
    }

    const [checked, setChecked] = React.useState(false);

    const handleChange = () => {
        setChecked(!checked);
    };

    return (
        <div className="h-screen w-screen items-center justify-center flex text-3xl font-semibold bg-amber-400 p-14"> 
            <div className="flex flex-col text-center h-full w-full items-center justify-center bg-amber-500 rounded-[60px] px-10">
                <h1 className="mb-4"> Creativity Research Project Participation Consent Form </h1>

                <h2 className="text-2xl">PRINCIPAL INVESTIGATORS</h2>
                <div className="text-xl">Harsh Kumar, Jonathan Vincentius</div>

                <h2 className="text-2xl">PURPOSE</h2>
                <div className="text-xl"></div>

                <h2 className="text-2xl">PROCEDURES</h2>
                <div className="text-xl"></div>

                <h2 className="text-2xl">PERSONAL INFORMATION</h2>
                <div className="text-xl"></div>

                <h2 className="text-2xl">CONTACT INFORMATION</h2>
                <div className="text-xl"></div>

                <h2 className="text-2xl">PURPOSE</h2>
                <div className="text-xl"></div>

                <h2 className="text-2xl">CONSENT</h2>
                <div className="text-xl">By clicking “I agree” below, you confirm that the study 
                was explained to you, you had a chance to ask questions before beginning the study, 
                and all your questions were answered satisfactorily. By clicking “I agree” below, you 
                voluntarily consent to participate, and you do not give up any legal rights you have 
                as a study participant. If you would like a copy of this consent form, please print 
                or save now. On behalf of Microsoft, thank you for your contribution and look forward
                 to your research session.</div>

                <label className="text-xl mt-2">
                    <input type="checkbox"checked={checked} onChange={handleChange}/>
                    {`  `}I agree to this consent form*
                </label>
                <button onClick={handleClick} className="mt-3 text-2xl outline outline-offset-2 outline-2 rounded-md font-semibold px-4 py-1 hover:bg-orange-600">SUBMIT</button>
            </div>
        </div>
    );
}

export default Consent;