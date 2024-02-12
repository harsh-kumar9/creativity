import React, { useState } from "react";
import { useEffect, useContext } from "react";
import { DataContext } from "../App";
import { mTurkContext } from "../App";

const Feedback = () => {

    const {data, addData} = useContext(DataContext);
    const {mTurk, addMTurk} = useContext(mTurkContext);

    // const [date, setDate] = useState(new Date());

    const [q1, setQ1] = useState("");
    const [q2, setQ2] = useState("");
    const [q3, setQ3] = useState("");
    const [q4, setQ4] = useState("");
    const [q5, setQ5] = useState("");

    useEffect(() => {
        addMTurk("data", data);
        addMTurk("timestamp", new Date().toISOString())
        console.log(mTurk);
    }, [])

    return (
        <div className="h-screen w-screen items-center justify-center flex text-3xl font-semibold bg-amber-400 p-14"> 
            <div className="flex flex-col text-center h-full w-full items-center justify-center bg-amber-500 rounded-[60px] px-10">
                <h1 className="mb-4"> Creativity Research Project Feedback Form</h1>
                <h2 className="text-xl">Please answer the following questions. You must complete these and click submit below to complete the HIT and get paid.</h2>  

                <h2 className="text-2xl">Question 1</h2>
                <form className="text-lg space-x-4">
                    <label>
                        <input 
                            type="radio" 
                            name="q1"
                            value="option1"
                            checked={q1 === "option1"}
                            onChange={(e) => setQ1(e.target.value)} 
                        />
                        Option 1
                    </label>
                    <label>
                        <input 
                            type="radio" 
                            name="q1"
                            value="option2"
                            checked={q1 === "option2"}
                            onChange={(e) => setQ1(e.target.value)} 
                        />
                        Option 2
                    </label>
                    <label>
                        <input 
                            type="radio" 
                            name="q1"
                            value="option3"
                            checked={q1 === "option3"}
                            onChange={(e) => setQ1(e.target.value)} 
                        />
                        Option 3
                    </label>
                </form>
                
                <h2 className="text-2xl">Question 2</h2>
                <form className="text-lg space-x-4">
                    <label>
                        <input 
                            type="radio" 
                            name="q1"
                            value="option1"
                            checked={q2 === "option1"}
                            onChange={(e) => setQ2(e.target.value)} 
                        />
                        Option 1
                    </label>
                    <label>
                        <input 
                            type="radio" 
                            name="q1"
                            value="option2"
                            checked={q2 === "option2"}
                            onChange={(e) => setQ2(e.target.value)} 
                        />
                        Option 2
                    </label>
                    <label>
                        <input 
                            type="radio" 
                            name="q1"
                            value="option3"
                            checked={q2 === "option3"}
                            onChange={(e) => setQ2(e.target.value)} 
                        />
                        Option 3
                    </label>
                </form>

                <h2 className="text-2xl">Question 3</h2>
                <form className="text-lg space-x-4">
                    <label>
                        <input 
                            type="radio" 
                            name="q1"
                            value="option1"
                            checked={q3 === "option1"}
                            onChange={(e) => setQ3(e.target.value)} 
                        />
                        Option 1
                    </label>
                    <label>
                        <input 
                            type="radio" 
                            name="q1"
                            value="option2"
                            checked={q3 === "option2"}
                            onChange={(e) => setQ3(e.target.value)} 
                        />
                        Option 2
                    </label>
                    <label>
                        <input 
                            type="radio" 
                            name="q1"
                            value="option3"
                            checked={q3 === "option3"}
                            onChange={(e) => setQ3(e.target.value)} 
                        />
                        Option 3
                    </label>
                </form>

                <h2 className="text-2xl">Question 4</h2>
                <input 
                    type="text" 
                    value={q4}
                    className="text-lg p-2 w-3/5"
                    onChange={(e) => setQ4(e.target.value)}
                  />

                <h2 className="text-2xl">Question 5</h2>
                <input 
                    type="text" 
                    value={q5}
                    className="text-lg p-2 w-3/5"
                    onChange={(e) => setQ5(e.target.value)}
                  />

            </div>
        </div>
    );
}

export default Feedback;