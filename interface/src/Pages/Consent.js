import React from "react";
import { useNavigate } from 'react-router-dom';
// import { useState } from "react";

const Consent = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        if (checked) {
            navigate('/creativity/controls')
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
            <h1 className="mb-4">Participation Consent Form</h1>

            <h2 className="text-2xl">PRINCIPAL INVESTIGATOR</h2>
            <div className="text-xl">Ashton Anderson</div>

            <h2 className="text-2xl">PURPOSE</h2>
            <div className="text-xl">Researchers at the University of Toronto are studying how people’s usage of Artificial Intelligence impacts their creative thinking abilities. This project investigates the implications of offloading tedious cognitive tasks to AI tools on human creativity.</div>

            <h2 className="text-2xl">PROCEDURES</h2>
            <div className="text-xl">As a participant, you will be asked to come up with alternative methods of utilizing common household items besides their intended use and to provide some demographic information and general thoughts on this survey. The survey is expected to take around 10 minutes to complete.</div>

            <h2 className="text-2xl">PERSONAL INFORMATION</h2>
            <div className="text-xl">We will have mechanisms in place to ensure that information collected during the study will be kept separate from identification and not disclosed to anyone outside the research team. No personally identifiable information will be collected.</div>

            <h2 className="text-2xl">CONTACT INFORMATION</h2>
            <div className="text-xl">The investigator involved in this study is Ashton Anderson (ashton@cs.toronto.edu). Team members responsible for the experiment interface and survey are Harsh Kumar (harsh@cs.toronto.edu) and Jonathan Vincentius (jon.vincentius@mail.utoronto.ca). For questions or concerns, please contact either Harsh Kumar or Jonathan Vincentius.</div>

            <h2 className="text-2xl">CONSENT</h2>
            <div className="text-xl">By clicking “I agree” below, you confirm that the study was explained to you, you had a chance to ask questions before beginning the study, and all your questions were answered satisfactorily. By clicking “I agree,” you voluntarily consent to participate, and you do not give up any legal rights you have as a study participant. If you would like a copy of this consent form, please print or save now. On behalf of the research team, thank you for your contribution and we look forward to your participation.</div>

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