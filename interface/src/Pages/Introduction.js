import React from "react";
import { useNavigate } from 'react-router-dom';

const Introduction = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/consent')
    }

    return (
    <div className="h-screen w-screen items-center justify-center flex text-3xl font-semibold bg-amber-400 p-14"> 
        <div className="flex flex-col h-full w-full items-center justify-center bg-amber-500 rounded-[60px] px-32">
            <h2 className="mb-4 text-3xl">INTRODUCTION</h2>
            <span className="mb-6 text-xl text-center">
                You are about to take part in an experiment to investigate the impact of using AI language
                models on our Creative thinking abilities. We will be utilizing the Alternative Uses Task 
                to measure divergent thinking capabilities. Thank you for your participation and click 
                below to proceed.
            </span>
            <button onClick={handleClick} className="text-2xl outline outline-offset-2 outline-2 rounded-md font-semibold px-4 py-2 hover:bg-orange-600">BEGIN</button>
        </div>
    </div>
    );
}

export default Introduction;