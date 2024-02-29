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

    const [sliderValue, setSliderValue] = useState(50); // Default slider value set to 50%

    // Event handler for changing the slider value
    const handleSliderChange = (e) => {
        // Update the sliderValue state with the new value
        setSliderValue(e.target.value);
    };


    // const [date, setDate] = useState(new Date());

    const [q1, setQ1] = useState("");
    const [q2, setQ2] = useState("");
    const [q3, setQ3] = useState("");
    const [q4, setQ4] = useState("");
    const [q5, setQ5] = useState("");

    const handleClick = async () => {
        if (!(q1 === "" || q2 === "" || q3 === "" || q4 === "" || q5 === "")) {
            // Assume addData is asynchronous and returns a promise
            await addData({
                "Test Object difficulty": q1,
                "Use of AI in daily life makes you feel": q2,
                "Attention Check": q3,
                "How else could AI help": q4,
                "How do you use ChatGPT daily": q5
            });
    
            navigate('/creativity/thanks');
        }
    };

    return (
        <div style={{ backgroundImage: `url(${background})` }}
        className="h-screen w-screen items-center justify-center flex text-white text-3xl font-semibold bg-amber-400 p-14 bg-cover"> 
            <div className="flex flex-col text-center h-full w-full items-center justify-center  outline outline-2 outline-white rounded-[60px] px-10 bg-slate-500" style={{ backgroundColor: 'rgba(64, 64, 64, 0.17)' }}>
                {/* <h1> Creativity Research Project Feedback Form</h1> */}
                <h2 className="text-2xl mb-2">Please answer the following questions. You must complete these and click submit below to complete the HIT and get paid.</h2>  

                <div className="overflow-auto text-left">
                <h2 className="text-2xl">1. How difficult was it to come up with uses for the last object?</h2>
                <form 
                className="text-lg space-x-4"
                // action={`${turkSubmitTo}/mturk/externalSubmit`} 
                // method="POST"
                // onSubmit={handleSubmit} 
                >
                    <div className="flex flex-col">
                    <label>
                        <input 
                            type="radio" 
                            name="q1"
                            value="Very easy"
                            checked={q1 === "Very easy"}
                            className="mr-2"
                            onChange={(e) => setQ1(e.target.value)} 
                        />
                        Very easy
                    </label>
                    <label>
                        <input 
                            type="radio" 
                            name="q1"
                            value="Somewhat easy"
                            checked={q1 === "Somewhat easy"}
                            className="mr-2"
                            onChange={(e) => setQ1(e.target.value)} 
                        />
                        Somewhat easy
                    </label>
                    <label>
                        <input 
                            type="radio" 
                            name="q1"
                            value="Somewhat difficult"
                            checked={q1 === "Somewhat difficult"}
                            className="mr-2"
                            onChange={(e) => setQ1(e.target.value)} 
                        />
                        Somewhat difficult
                    </label>
                    <label>
                        <input 
                            type="radio" 
                            name="q1"
                            value="Very difficult"
                            checked={q1 === "Very difficult"}
                            className="mr-2"
                            onChange={(e) => setQ1(e.target.value)} 
                        />
                        Very difficult
                    </label>
                    </div>
                </form>
                
                <h2 className="text-2xl">2. Artificial intelligence computer programs are designed to learn tasks that humans typically do. Would you say the increased use of artificial intelligence computer programs in daily life makes you feel...</h2>
                <form className="text-lg space-x-4">
                    <div className="flex flex-col">
                    <label>
                        <input 
                            type="radio" 
                            name="q1"
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
                            name="q1"
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
                            name="q1"
                            value="Equally excited and concerned"
                            checked={q2 === "Equally excited and concerned"}
                            className="mr-2"
                            onChange={(e) => setQ2(e.target.value)} 
                        />
                        Equally excited and concerned
                    </label>
                    </div>
                </form>

                <h2 className="text-2xl">3. How many objects in total did you encounter in this HIT?</h2>
                <form className="text-lg space-x-4">
                    <div className="flex flex-col">
                    <label>
                        <input 
                            type="radio" 
                            name="q1"
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
                            name="q1"
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
                            name="q1"
                            value="5"
                            checked={q3 === "5"}
                            className="mr-2"
                            onChange={(e) => setQ3(e.target.value)} 
                        />
                        5
                    </label>
                    </div>
                </form>

                {/* <h2 className="text-2xl mb-2">How else would the AI have been helpful?</h2>
                <input 
                    type="text" 
                    value={q4}
                    className="text-lg p-2 w-3/5 mb-2 text-black"
                    onChange={(e) => setQ4(e.target.value)}
                  /> */}
                
                <h2 className="text-2xl mb-2">4. Adjust the slider below: <i>I am more creative than <b><span>{sliderValue}%</span></b> of humans</i></h2>
                <input
                    type="range"
                    id="creative-slider"
                    name="creative-slider"
                    min="0"
                    max="100"
                    value={sliderValue}
                    onChange={handleSliderChange}
                />

                <h2 className="text-2xl mb-2">5. Did you have any technical issues during the HIT?</h2>
                <input 
                    type="text" 
                    value={q5}
                    className="text-lg p-2 w-3/5 text-black"
                    onChange={(e) => setQ5(e.target.value)}
                  />
                </div>

                <input type="submit" value="SUBMIT" onClick={handleClick}
                className="outline outline-offset-2 outline-white text-white outline-2 rounded-md mt-4 font-bold text-2xl px-4 py-2 hover:bg-orange-500"/>

            </div>
        </div>
    );
}

export default Feedback;