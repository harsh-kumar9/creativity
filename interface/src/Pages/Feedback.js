import React, { useState } from "react";
import { useContext } from "react";
import { DataContext } from "../App";
import { mTurkContext } from "../App";
import { useNavigate } from 'react-router-dom';
import background from "../assets/blur-background.svg";

const Feedback = () => {

    const navigate = useNavigate();
    const {data, addData} = useContext(DataContext);
    const {mTurk, addMTurk} = useContext(mTurkContext);

    const [sliderValue, setSliderValue] = useState(null); 
    // console.log(mTurk.assignmentId);
    // console.log(mTurk.workerId);

    // const [date, setDate] = useState(new Date());

    const [q1, setQ1] = useState("");
    const [q2, setQ2] = useState("");
    const [q3, setQ3] = useState("");
    const [q4, setQ4] = useState(null); 
    const [q5, setQ5] = useState("");
    const [q6, setQ6] = useState("");

    const handleSliderChange = (e) => {
        const newValue = e.target.value;
        setSliderValue(newValue);
        setQ4(newValue); // Keep slider value and q4 in sync
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission

        // Data validation
        if (!(q1==="") && !(q2==="") && !(q3==="") && !(q4===null) && !(q5==="") && !(q6==="")) {
            // Prepare feedback responses for submission
            const feedbackData = {
                q1, q2, q3, q4, q5, q6
            };

            // Optionally, update your application state with new feedback data
            addData(feedbackData);

            // Construct the data object for MTurk submission
            const submissionData = {
                ...data, // Spread existing data into the submission object
                feedback: feedbackData, // Add new feedback data
                assignmentId: mTurk.assignmentId,
                hitId: mTurk.hitId,
                workerId: mTurk.workerId,
                ts_submitted_: new Date().toISOString(),  
            };

            // For MTurk submission: Set the value of a hidden input to include all necessary data
            const dataInput = document.createElement("input");
            dataInput.type = "hidden";
            dataInput.name = "data";
            dataInput.value = JSON.stringify(submissionData);
            event.target.appendChild(dataInput);

            // Submit the form
            event.target.submit();
        }
        else if (!(q1==="") && !(q2==="") && !(q3==="") && (q4===null) && !(q5==="") && !(q6==="")) {
            alert("Please select a value for Question 4 (Slider)");
            return;
        }
        else {
            alert("Please read the instructions & answer all questions to proceed");
            return;
        }

    };

    return (
        <div style={{ backgroundImage: `url(${background})` }}
             className="h-auto w-screen items-center justify-center flex text-white text-3xl font-semibold bg-amber-400 p-14 bg-cover"> 
            <form className="flex flex-col text-center h-full w-full items-center justify-center outline outline-2 outline-white rounded-[60px] py-10 px-10 bg-slate-500"
                  style={{ backgroundColor: 'rgba(64, 64, 64, 0.17)' }}
                  action={`${mTurk.turkSubmitTo}/mturk/externalSubmit`}
                  method="POST"
                  onSubmit={handleSubmit}>
                <h2 className="text-3xl mb-8">Please answer the following questions. You must complete these and click submit below to complete the HIT and get paid.</h2>  
    
                {/* Question 1 */}
                <div className="text-2xl flex flex-col mb-4">
                    <h2>1. How difficult was it to come up with uses for the last object?</h2>
                    {/* Options for Question 1 */}
                    <label>
                        <input type="radio" name="q1" value="Very easy" checked={q1 === "Very easy"} onChange={(e) => setQ1(e.target.value)} className="mr-2"/>
                        Very easy
                    </label>
                    <label>
                        <input type="radio" name="q1" value="Somewhat easy" checked={q1 === "Somewhat easy"} onChange={(e) => setQ1(e.target.value)} className="mr-2"/>
                        Somewhat easy
                    </label>
                    <label>
                        <input type="radio" name="q1" value="Somewhat difficult" checked={q1 === "Somewhat difficult"} onChange={(e) => setQ1(e.target.value)} className="mr-2"/>
                        Somewhat difficult
                    </label>
                    <label>
                        <input type="radio" name="q1" value="Very difficult" checked={q1 === "Very difficult"} onChange={(e) => setQ1(e.target.value)} className="mr-2"/>
                        Very difficult
                    </label>
                </div>
    
                {/* Additional questions follow a similar pattern to Question 1 */}
                {/* Example for Question 2 */}
                <div className="text-2xl flex flex-col mb-4">
                    <h2>2. Artificial intelligence computer programs are designed to learn tasks that humans typically do. Would you say the increased use of artificial intelligence computer programs in daily life makes you feel</h2>
                    {/* Options for Question 2 */}
                    <label>
                            <input 
                                type="radio" 
                                name="q2"
                                value="More concerned than excited"
                                checked={q2 === "More concerned than excited"}
                                className="mr-2"
                                onChange={(e) => setQ2(e.target.value)} 
                            />
                            More concerned than excited
                        </label>
                        <label>
                            <input 
                                type="radio" 
                                name="q2"
                                value="More excited than concerned"
                                checked={q2 === "More excited than concerned"}
                                className="mr-2"
                                onChange={(e) => setQ2(e.target.value)} 
                            />
                            More excited than concerned
                        </label>
                        <label>
                            <input 
                                type="radio" 
                                name="q2"
                                value="Equally excited and concerned"
                                checked={q2 === "Equally excited and concerned"}
                                className="mr-2"
                                onChange={(e) => setQ2(e.target.value)} 
                            />
                            Equally excited and concerned
                        </label>
                </div>
                
                {/* Question 3 */}
                <div className="text-2xl flex flex-col mb-4">
                    <h2>3. How many objects in total did you encounter in this HIT?</h2>
                    {/* Options for Question 3 */}
                    <label>
                            <input 
                                type="radio" 
                                name="q3"
                                value="3"
                                checked={q3 === "3"}
                                className="mr-2"
                                onChange={(e) => setQ3(e.target.value)} 
                            />
                            3
                        </label>
                        <label>
                            <input 
                                type="radio" 
                                name="q3"
                                value="4"
                                checked={q3 === "4"}
                                className="mr-2"
                                onChange={(e) => setQ3(e.target.value)} 
                            />
                            4
                        </label>
                        <label>
                            <input 
                                type="radio" 
                                name="q3"
                                value="5"
                                checked={q3 === "5"}
                                className="mr-2"
                                onChange={(e) => setQ3(e.target.value)} 
                            />
                            5
                        </label>
                </div>
    
                {/* Slider for Self-creativity */}
                <div className="mb-4">
                    <h2 className="text-2xl mb-2">4. Adjust the slider below: <i>I am more creative than <b><span>{sliderValue}%</span></b> of humans.</i></h2>
                    <input type="range" id="creative-slider" name="creative-slider" min="0" max="100" value={sliderValue} onChange={handleSliderChange} className="w-full"/>
                </div>

                {/* New question */}
                <div className="mb-4">
                    <h2 className="text-2xl mb-2">5. What was your strategy for coming up with ideas for the last object?</h2>
                    <textarea 
                        name="q5" 
                        value={q5} 
                        onChange={(e) => setQ5(e.target.value)} 
                        className="text-lg p-2 w-full h-32 text-black" // Adjust width (w-full for full width) and height (h-32 for height) as needed
                        style={{ resize: "none" }} // Optional: prevents the user from resizing the textarea
                    ></textarea>
                </div>
    
                {/* Technical issues question */}
                <div className="mb-4">
                    <h2 className="text-2xl mb-2">6. Did you have any technical issues during the HIT?</h2>
                    <textarea 
                        name="q6" 
                        value={q6} 
                        onChange={(e) => setQ6(e.target.value)} 
                        className="text-lg p-2 w-full h-32 text-black" // Adjust width (w-full for full width) and height (h-32 for height) as needed
                        style={{ resize: "none" }} // Optional: prevents the user from resizing the textarea
                    ></textarea>
                </div>

    
                {/* Hidden inputs for MTurk */}
                <input type="hidden" name="assignmentId" value={mTurk.assignmentId} />
                <input type="hidden" name="hitId" value={mTurk.hitId} />
                <input type="hidden" name="workerId" value={mTurk.workerId} />
    
                {/* Submit button */}
                <input type="submit" value="SUBMIT" 
                       className="outline outline-offset-2 outline-white text-white outline-2 rounded-md mt-4 font-bold text-2xl px-4 py-2 hover:bg-orange-500"/>
            </form>
        </div>
    );
}

export default Feedback;
