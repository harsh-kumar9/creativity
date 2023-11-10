import React from "react";
import { useState } from "react";
import { prompts } from "./Prompts";

let nextId = 0;

const Refine = () => {
    const [input, setInput] = useState(""); // store currently inputted idea in input form
    const [ideas, setIdeas] = useState([]); // previously entered ideas

    return (
        <div className="h-screen w-screen items-center justify-center flex text-3xl font-semibold space-y-8 p-8 bg-amber-400">
        <div className="flex flex-row space-x-4 p-4 h-full w-full items-center justify-center bg-amber-500 rounded-[60px]">
            <div className="w-1/3 rounded-[60px] bg-orange-500 flex flex-col h-full text-left p-8">
                <text className="text-lg ml-4 mb-4">
                    For the following objects, come up with alternative uses that are different from it's typical intended use.
                </text>
                <text className="text-base mb-4 ml-4">
                    The ideas don't have to be practical/realistic, so long as they strike people as clever, original, unusual, and innovative.
                </text>
                <div className="w-full rounded-[60px] bg-orange-600 flex justify-center items-center p-4 mt-4">
                    <img
                        className="object-contain rounded-[60px]"
                        src={prompts["Cardboard Box"]}
                    />
                </div>
                <h1 className="mt-8 text-center text-2xl">{Object.keys(prompts)[0]}</h1>
            </div>

            <div className="w-1/3 rounded-[60px] bg-orange-500 flex flex-col items-center h-full px-4">
                <h2 className="mb-4 text-2xl text-center mt-8">Enter Alternative Uses below</h2>
                <div className="flex flex-row space-x-4 justify-between">
                    <input
                        className="grow rounded-md text-2xl p-1"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button
                        className="outline outline-offset-2 outline-3 rounded-md font-bold text-xl hover:bg-orange-600"
                        onClick={() => {
                        setIdeas([...ideas, { id: nextId++, name: input }]);
                        setInput("");
                        }}
                    >
                        SUBMIT
                    </button>
                </div>

                <div className="h-3/4 w-full rounded-b-[60px] bg-orange-600 mt-6 rounded-lg p-4 grid place-items-start">
                    <ul className="object-left flex flex-wrap">
                        {ideas.map((idea) => (
                        <li
                            key={idea.id}
                            className="text-left text-xl flex justify-between"
                        >
                            <span>{`\u2022 ${idea.name}`}</span>
                            <button
                            onClick={() => {
                                setIdeas(ideas.filter((a) => a.id !== idea.id));
                            }}
                            >
                            ❌
                            </button>
                        </li>
                        ))}
                    </ul>
                </div>
                
            </div>

            <div className="w-1/3 rounded-[60px] bg-orange-500 flex flex-col h-full p-6">
                <div className="flex flex-row space-x-2 items-center justify-between mt-8">
                    <h2 className="text-2xl text-center">Generative AI</h2>
                    <button className="outline outline-offset-2 outline-3 rounded-md font-bold text-xl px-2 hover:bg-orange-600">Refine</button>
                </div>
                <text className="text-base mt-2">
                    Click refine to have Chat-GPT process them
                </text>
                <div className="h-5/6 w-full bg-orange-600 rounded-b-[60px] rounded-lg mt-4">

                </div>
            </div>
        </div>
    </div>
    );
}

export default Refine;