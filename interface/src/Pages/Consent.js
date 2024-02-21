import React from "react";
import { useNavigate } from 'react-router-dom';
import background from "../assets/blur-background.svg";

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
        <div style={{ backgroundImage: `url(${background})` }} className="text-white h-auto w-screen items-center justify-center space-y-8 p-14 bg-cover">
            <div className="flex flex-col items-center justify-center outline outline-2 outline-white rounded-[60px] px-10 py-8 bg-slate-500" style={{ backgroundColor: 'rgba(64, 64, 64, 0.17)' }}>    
            <h1 className="text-3xl font-bold mb-4">University of Toronto Research Project Participation Consent Form</h1>
    
            <div className="consent-form text-lg">
                <p className="text-main mb-2">Researchers at the <strong>University of Toronto</strong> are studying how people’s usage of <em>Artificial Intelligence</em> impacts their creative thinking abilities. Nowadays, people are often offloading tedious cognitive tasks to various AI tools to boost productivity and save time. Our project investigates the implications this has on human creativity.</p>
                <p className="text-main mb-2">You are invited to participate in this study if you are at least <strong>18 years of age</strong>. As a participant, you will be asked to come up with alternative methods of utilizing common household items besides their intended use. You will also be asked to provide some demographic information and general thoughts on this survey. By taking part, you will help us better understand how we can guide responsible AI development and usage.</p>
                <p className="text-main mb-2">There are no potential risks or preparatory requirements for completing the study. We will have mechanisms in place to ensure that information collected during the study will be kept separate from identification, and not disclosed to anyone besides those named below. <strong>No personally identifiable information will be collected.</strong></p>
                <p className="text-main mb-2">We expect the survey to take around <strong>10 minutes</strong> to complete. If you are a <em>Mechanical Turk worker</em>, you will receive the monetary amount detailed on Mechanical Turk as compensation for your time. If you were recruited offline, you will be entered into a draw for <strong>5 USD Amazon gift cards</strong>. Odds are detailed in the advertisement post, but you can expect a winning probability of at least 30%.</p>
                <p className="text-main mb-2">As the results of this evaluation will be of interest to a wide number of communities, we are asking your permission to include your data in any reports that we publish, in a <u>de-identified, aggregated format</u>. Your participation in this research study is voluntary. If you do not give consent, you will not be asked to participate any further and your results will not be part of the de-identified data used for any published reports.</p>
                <p className="text-main mb-2">You may decline to participate or withdraw at any time without penalty. If you decide to withdraw from the study after participating, you may do so any time before the results are published. If you wish to withdraw during your participation in Mechanical Turk, you may simply close the browser window with the experiment and return the HIT.</p>
                <p className="text-main mb-2">Note that you will be compensated only after you have completed the activity and have successfully verified your <strong>Mechanical Turk ID</strong>. Please allow <strong>2-3 days</strong> for this process.</p>
                <p className="text-main mb-2">For an independent opinion regarding the research and the rights of research participants, you may contact the <strong>University of Toronto Research Oversight and Compliance Office - Human Research Ethics Program</strong> via email (<u>ethics.review@utoronto.ca</u>) or phone (<u>416-946-3273</u>).</p>
                <p className="text-main mb-2">The research study you are participating in may be reviewed for quality assurance to make sure that the required laws and guidelines are followed. If chosen, (a) representative(s) of the Human Research Ethics Program (HREP) may access study-related data and/or consent materials as part of the review.</p>
                <p className="text-main mb-2">All information accessed by the HREP will be upheld to the same level of confidentiality that has been stated by the research team.</p>
                <p className="text-main mb-4">The investigator involved in this study is <strong>Ashton Anderson</strong> (<u>ashton@cs.toronto.edu</u>). The members of his research team responsible for the experiment interface and survey are <strong>Harsh Kumar</strong> (<u>harsh@cs.toronto.edu</u>) and <strong>Jonathan Vincentius</strong> (<u>jon.vincentius@mail.utoronto.ca</u>). If you have any questions or concerns, please contact either Harsh Kumar or Jonathan Vincentius.</p>
                <p className="text-main mb-2">Please print or save a copy of this form for your records.</p>
                <p className="text-main mb-2">By clicking to the survey, you agree that:</p>
                <ul className="list-consent mb-4 pl-4">
                    <li>You have read and understood the information on this sheet;</li>
                    <li>You are at least 18 years of age;</li>
                    <li>You consent to participation and data collection for the aforementioned purposes;</li>
                    <li>You may freely withdraw until the aforementioned date;</li>
                    <li>You assign to the researchers all copyright of your survey contributions for use in all current and future work stemming from this project.</li>
                </ul>
            </div>
    
            <label className="text-xl mt-2">
                <input type="checkbox" checked={checked} onChange={handleChange}/>
                {`  `}I agree to this consent form*
            </label>
            <button onClick={handleClick} className="mt-3 text-2xl outline outline-offset-2 outline-2 rounded-md font-semibold px-4 py-1 hover:bg-orange-600">SUBMIT</button>
            </div>
        </div>
    );
    
}

export default Consent;