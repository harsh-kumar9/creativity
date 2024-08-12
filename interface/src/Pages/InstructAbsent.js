import React, { useState, useContext } from 'react';
import { DataContext } from "../App";
import { useNavigate } from 'react-router-dom';
import background from "../assets/blur-background.png";
import cheat from "../assets/cheat-icon.png"

const InstructAbsent = () => {

    const navigate = useNavigate();
    const {data, addData} = useContext(DataContext);

    const [sliderValue, setSliderValue] = useState(null);
    const [q2, setQ2] = useState("");

    const handleChange = (event) => {
        setSliderValue(event.target.value);
      };

    const handleClick = () => {
        if (checked && checkedTwo && !(q2 === "") && !(sliderValue === null)) {
            addData({
                "How Creative?": sliderValue,
                "Increased AI use makes you feel": q2
              });
            navigate('/creativity/absent')
        } 
        else if (checked && !(q2 === "") && sliderValue === null) {
            alert("Please select a value for Question 1 (Slider)");
        }
        else {
            alert("Please read the instructions & answer all questions to proceed");
        }
    }

    const [checked, setChecked] = React.useState(false);
    const [checkedTwo, setCheckedTwo] = React.useState(false);

    const handleCheck = () => {
        setChecked(!checked);
    };

    const handleCheckTwo = () => {
        setCheckedTwo(!checkedTwo);
    };

    return (
        <div style={{ backgroundImage: `url(${background})` }} className="text-white h-auto w-screen items-center justify-center space-y-8 p-14 bg-cover ">
            <div className="flex flex-col items-center justify-center outline outline-2 outline-white rounded-[60px] px-10 py-8 bg-slate-500" style={{ backgroundColor: 'rgba(64, 64, 64, 0.17)' }}>    
            <h1 className="text-3xl font-bold mb-4">Introduction</h1>

            <p className="text-2xl mb-2">In this task, you will shown an object and asked to come up with original and creative uses for the object. You will see 3 objects in a Practice round, followed by one more object in a Test round. </p>

            <p className="text-2xl mb-4">The goal is to come up with creative ideas, anything that strike people as clever, unusual, interesting, uncommon, humorous, innovative, or different. 
            Your ideas don't have to be practical or realistic; they can be silly or strange. You can type in as many ideas as you can, but creative quality is more important than quantity. 
            You have 2 minutes to respond to each object.</p>

            <b><p className="text-2xl mb-8">Please answer the following questions:</p></b>

            <div className='text-2xl flex items-center justify-center space-x-8 mb-4'>
            <label>
                1. Adjust the slider: <i>I am more creative than <b><span>{sliderValue}%</span></b> of humans</i>
            </label>
            <input
                type="range"
                id="creative-slider"
                name="creative-slider"
                min="0"
                max="100"
                // Conditionally render the value only if sliderValue is not null
                value={sliderValue ?? ''}
                onChange={handleChange}
            />
            </div>
            
            <h2 className='text-2xl'>2. Artificial intelligence computer programs are designed to learn tasks that humans typically do. 
            Would you say the increased use of artificial intelligence computer programs in daily life makes you feel:</h2>
            <div className="flex flex-col text-2xl mb-4">
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

            <p className='text-2xl mb-4'><p className='text-red-700 font-bold'>Important: Please do not take screenshots, copy any text, or consult external tools (e.g., ChatGPT).</p>We're just interested in your best effort and what you learn.
            The experiment will be ruined if you take screenshots or use external tools to do this task. So please do not do so! In fact, you have no reason to do so because you are not paid based on performance.
            </p>
            
            <p className='text-2xl text-red-700 font-bold mb-8'>Please do not refresh the page. Refreshing the page will lose any progress you have made and you may not receive any compensation</p>

            <div><img src={cheat} alt="No screenshots or external tools allowed" style={{maxWidth: "40%", height: "auto", display: "block", margin: "0px auto"}}/></div>
            
            <hr style={{ marginTop: '20px', marginBottom: '20px' }} />
            
            <label className="text-2xl mt-2 text-center">
                <input type="checkbox" checked={checked} onChange={handleCheck}/>
                <b>{`  `}I promise not to take screenshots, pictures, or use external tools to do this study. I understand that I will not be paid more if I do so and it will only ruin the experiment*</b>
            </label>
            <label className="text-2xl mt-2">
                <input type="checkbox" checked={checkedTwo} onChange={handleCheckTwo}/>
                <b>{`  `}I understand the instructions above and am ready to continue*</b>
            </label>
            <button onClick={handleClick} className="mt-6 text-2xl outline outline-offset-2 outline-2 rounded-md font-semibold px-4 py-1 hover:bg-orange-600">SUBMIT</button>
            
            </div>
        </div>
    )
}

export default InstructAbsent;