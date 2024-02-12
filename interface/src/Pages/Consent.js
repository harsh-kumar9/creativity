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

            <div className="mb-4">
                <p>Researchers at the University of Toronto are studying how people’s usage of Artificial Intelligence impacts their creative thinking abilities. Nowadays, people are often offloading tedious cognitive tasks to various AI tools to boost productivity and save time. Our project investigates the implications this has on human creativity.</p>
                <p>You are invited to participate in this study if you are at least 18 years of age. As a participant, you will be asked to come up with alternative methods of utilizing common household items besides their intended use. You will also be asked to provide some demographic information and general thoughts on this survey. By taking part, you will help us better understand how we can guide responsible AI development and usage.</p>
                <p>There are no potential risks or preparatory requirements for completing the study. We will have mechanisms in place to ensure that information collected during the study will be kept separate from identification, and not disclosed to anyone besides those named below. No personally identifiable information will be collected.</p>
                <p>We expect the survey to take around 10 minutes to complete. If you are a Mechanical Turk worker, you will receive the monetary amount detailed on Mechanical Turk as compensation for your time. If you were recruited offline, you will be entered into a draw for 5 USD Amazon gift cards. Odds are detailed in the advertisement post, but you can expect a winning probability of at least 30%.</p>
                <p>As the results of this evaluation will be of interest to a wide number of communities, we are asking your permission to include your data in any reports that we publish, in a de-identified, aggregated format. Your participation in this research study is voluntary. If you do not give consent, you will not be asked to participate any further and your results will not be part of the de-identified data used for any published reports.</p>
                <p>You may decline to participate or withdraw at any time without penalty. If you decide to withdraw from the study after participating, you may do so any time before the results are published. If you wish to withdraw during your participation in Mechanical Turk, you may simply close the browser window with the experiment and return the HIT.</p>
                <p>Note that you will be compensated only after you have completed the activity and have successfully verified your Mechanical Turk ID. Please allow 2-3 days for this process.</p>
                <p>For an independent opinion regarding the research and the rights of research participants, you may contact the University of Toronto Research Oversight and Compliance Office - Human Research Ethics Program via email (ethics.review@utoronto.ca) or phone (416-946-3273).</p>
                <p>The research study you are participating in may be reviewed for quality assurance to make sure that the required laws and guidelines are followed. If chosen, (a) representative(s) of the Human Research Ethics Program (HREP) may access study-related data and/or consent materials as part of the review.</p>
                <p>All information accessed by the HREP will be upheld to the same level of confidentiality that has been stated by the research team.</p>
                <p>The investigator involved in this study is Ashton Anderson (ashton@cs.toronto.edu). The members of his research team responsible for the experiment interface and survey are Harsh Kumar (harsh@cs.toronto.edu) and Jonathan Vincentius (jon.vincentius@mail.utoronto.ca). If you have any questions or concerns, please contact either Harsh Kumar or Jonathan Vincentius.</p>
                <p>Name of investigator Institution Ashton Anderson University of Toronto</p>
                <p>Please print or save a copy of this form for your records.</p>
                <p>By clicking to the survey, you agree that:</p>
                <ul>
                    <li>You have read and understood the information on this sheet;</li>
                    <li>You are at least 18 years of age;</li>
                    <li>You consent to participation and data collection for the aforementioned purposes;</li>
                    <li>You may freely withdraw until the aforementioned date;</li>
                    <li>You assign to the researchers all copyright of your survey contributions for use in all current and future work stemming from this project.</li>
                </ul>
            </div>

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