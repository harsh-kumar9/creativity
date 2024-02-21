import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import background from "../assets/blur-background.svg";

const InstructCoach = () => {

    const navigate = useNavigate();

    const [sliderValue, setSliderValue] = useState(50); // Default slider value set to 50%
    const [q2, setQ2] = useState("");

    const handleChange = (event) => {
        setSliderValue(event.target.value);
      };

    const handleClick = () => {
        if (checked && !(q2 === "")) {
            navigate('/creativity/coach')
        } else {
            alert("Please read the instructions & answer all questions to proceed");
        }
    }

    const [checked, setChecked] = React.useState(false);

    const handleCheck = () => {
        setChecked(!checked);
    };

    return (
        <div style={{ backgroundImage: `url(${background})` }} className="text-white h-screen w-screen items-center justify-center space-y-8 p-14 bg-cover">
            <div className="flex flex-col items-center h-full justify-center outline outline-2 outline-white rounded-[60px] px-10 py-8 bg-slate-500" style={{ backgroundColor: 'rgba(64, 64, 64, 0.17)' }}>    
            <h1 className="text-3xl font-bold mb-4">Introduction</h1>

            <p className="text-xl mb-2">In this HIT you will be shown three objects in a Practice round, followed by one more object in a Test round. 
            You will be asked to come up with ways of utilizing common everyday objects outside of their intended use. </p>

            <p className="text-2xl mb-2">The goal is to come up with creative ideas, which are ideas that strike people as clever, unusual, interesting, uncommon, humorous, innovative, or different. 
            Your ideas don't have to be practical or realistic; they can be silly or strange, even, so long as they are CREATIVE uses rather than ordinary uses. You can type in as many ideas as you can, but creative quality is more important than quantity. 
            It's better to have a few really good ideas than a lot of uncreative ones. You have 60 seconds to respond to each object.</p>

            <p className="text-2xl mb-8">In the Practice round, to spark your imagination, you’ll receive guidance from AI (i.e., ChatGPT) to help you come up with creative ideas. This will be shown on the right side of the screen.</p>

            <div className='text-2xl flex items-center justify-center space-x-8 mb-4'>
            <label>
                I am more creative than <span>{sliderValue}%</span> of humans
            </label>
            <input
                type="range"
                id="creative-slider"
                name="creative-slider"
                min="0"
                max="100"
                value={sliderValue}
                onChange={handleChange}
            />
            </div>
            
            <h2 className='text-2xl'>Artificial intelligence computer programs are designed to learn tasks that humans typically do. 
            Would you say the increased use of artificial intelligence computer programs in daily life makes you feel...</h2>
            <div className="flex flex-col text-2xl">
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
            
            <label className="text-2xl mt-2">
                <input type="checkbox" checked={checked} onChange={handleCheck}/>
                {`  `}I understand the instructions above and am ready to continue*
            </label>
            <button onClick={handleClick} className="mt-3 text-2xl outline outline-offset-2 outline-2 rounded-md font-semibold px-4 py-1 hover:bg-orange-600">SUBMIT</button>
            
            </div>
        </div>
    )
}

export default InstructCoach;