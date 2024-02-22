import React, { useState } from "react";
import { useEffect, useContext } from "react";
import { DataContext } from "../App";
import { mTurkContext } from "../App";
import background from "../assets/blur-background.svg";

const Thanks = () => {

    const {data, addData} = useContext(DataContext);
    const {mTurk, addMTurk} = useContext(mTurkContext);

    useEffect(() => {
        // Execute addMTurk after addData has finished
        addMTurk("data", data);
        addMTurk("timestamp", new Date().toISOString());
    }, [])

    return (
        <div style={{ backgroundImage: `url(${background})` }} className="text-white h-screen w-screen items-center justify-center space-y-8 p-14 bg-cover">
            <div className="flex flex-col h-full items-center justify-center outline outline-2 outline-white rounded-[60px] px-10 py-8 bg-slate-500" style={{ backgroundColor: 'rgba(64, 64, 64, 0.17)' }}>    
            <h1 className="text-3xl font-bold mb-4">Thank you for participating!</h1>
            
            <input type="submit" value="SUBMIT" onClick={() => {console.log(mTurk);}}
                className="outline outline-offset-2 outline-white text-white outline-2 rounded-md mt-4 font-bold text-2xl px-4 py-2 hover:bg-orange-500"/>

            </div>
        </div>
    )
}

export default Thanks;