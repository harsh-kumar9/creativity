import React from "react";
import { useState, useEffect, useContext } from "react";
import { DataContext } from "../App";
import { promptsArray } from "./Prompts";
import { useNavigate } from 'react-router-dom';
import ReactTyped from "react-typed";
import { OpenAIChat } from "langchain/llms/openai";
import Game from "../Game/Game";

let nextId = 0;
let promptId = 0;

const Refine = () => {

    const [input, setInput] = useState(""); // store currently inputted idea in input form
    const [ideas, setIdeas] = useState([]); // previously entered ideas

    const [ideaEditing, setIdeaEditing] = useState(null); // id of idea we are editing
    const [editingText, setEditingText] = useState("");

    const [calling, setCalling] = useState(false);
    const [feedback, setFeedback] = useState("");

    const [promptCopy, setPromptCopy] = useState([...promptsArray]);
    const [shuffled, setShuffled] = useState(false);

    const {data, addData} = useContext(DataContext);

    const navigate = useNavigate();

    useEffect(() => {
    // Shuffle the array using the Fisher-Yates shuffle algorithm
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    // Set the randomized list in the state during component mount or refresh
    setPromptCopy(() => {
        const shuffledCopy = shuffleArray(promptCopy)
        return [
            ...shuffledCopy.slice(0, 4),
            "dummy",
            ...shuffledCopy.slice(4)
        ];
    });
    setShuffled(true);
  }, []); 

    const model = new OpenAIChat({
        temperature: 0, // determine how stochastic we want it to be, 0 for experimentation
        azureOpenAIApiKey: "ec79f9fb01954ecbaf4f727ff65ede2f",
        azureOpenAIApiVersion: "2023-07-01-preview",
        azureOpenAIApiInstanceName: "quickta-playground",
        azureOpenAIApiDeploymentName: "GPT3_16k",
      });

    async function refine(use) {
        setCalling(true);
        const rawFeedback = await model.call (
            `Give feedback on how feasible ${use} would be at being an alternative use to a ${promptCopy[promptId][0]}`
        );
        
        setFeedback(rawFeedback);
        setCalling(false);
    }

    const handleSubmit = (e) => { // e is short for event
        if (!calling) {
            e.preventDefault(); // prevents page from refreshing upon clicking submit
            setIdeas([...ideas, { id: nextId++, name: input }]);
            setInput(''); // clears the input form
            refine(input);
        } else {
            e.preventDefault(); // prevents page from refreshing upon clicking submit
            alert("Processing Feedback for inputted idea");
        }
        
    }

    function editIdea(id) {
        const updatedIdeas = [...ideas].map((idea) => {
        if (idea.id === id) {
            idea.name = editingText;
        }
        return idea;
        })
        setIdeas(updatedIdeas);

        refine(editingText);

        // reset editing hooks
        setIdeaEditing(null);
        setEditingText("");
    }

    // timer countdown in seconds
    const [time, setTime] = useState(5);

    useEffect(() => {
        let timer = setInterval(() => {
        setTime((time) => {
            if (time === 0) {
            clearInterval(timer);
            return 0;
            } else return time - 1;
        });
        }, 1000);

        // Cleanup the interval on component unmount or when time reaches 0
        return () => clearInterval(timer);
    }, [time]);

    useEffect(() => {
      if (time === 0) {
        if (!(promptId === 4)) {
          addData({
            "Prompt": promptCopy[promptId][0],
            "Response": ideas,
            "Time": 5
          })
        }
        if (promptId === 5) {navigate('/creativity/feedback')} 
        else {
          promptId += 1;
          // reset states and timer
          setTime(5);
          setInput("");
          setIdeas([]);
        }
      }
        if (promptId >= Object.keys(promptCopy).length) {
             setTime(0); 
            }
      }, [time])

      const nextItem = () => {
        if (!(promptId === 4)) {
          addData({
            "Prompt": promptCopy[promptId][0],
            "Response": ideas,
            "Time": (5 - time)
          })
        }
        if (promptId === 5) {navigate('/creativity/feedback')} 
        else {
          promptId += 1;
          // reset states and timer
          setTime(5);
          setInput("");
          setIdeas([]);
        }
      }

    return (
           (!(promptId === 4)) ?
            ( (promptId === 5) ?
            (
                <div className="h-screen w-screen items-center justify-center flex text-3xl font-semibold space-y-8 p-14 bg-amber-400">
                <div className="flex flex-col h-full w-full items-center justify-center bg-amber-500 rounded-[60px]">
                  <div className="text-2xl">
                    For the following objects, come up with alternative uses that are
                    different from it's typical intended use.
                  </div>
                  <div className="text-2xl mb-8">
                    The ideas don't have to be practical/realistic, so long as they strike
                    people as clever, original, unusual, and innovative.
                  </div>
                  
                  <div className="flex flex-row w-full justify-evenly items-center">
                      <div className="w-1/3 flex flex-col justify-center">
                          <div className="w-full rounded-[60px] bg-orange-500 flex justify-center items-center p-8">
                            {
                              (shuffled) ?
                                <img
                                className="object-contain rounded-[60px]"
                                src={promptCopy[promptId][1]}
                                alt={promptCopy[promptId][0]}/>
                              :
                                <p></p>
                            }
                          </div>
                          {
                            (shuffled) ?
                                <h1 className="mt-8 text-center text-2xl">{promptCopy[promptId][0]}</h1>
                                :
                                <p></p>
                          }
                          <button className="outline outline-offset-2 outline-2 rounded-md w-1/3 mt-4 text-xl px-2 hover:bg-orange-500" onClick={nextItem}>Next Item</button>
                      </div>
          
                    <div className="w-1/2 h-full flex flex-col space-y-4">
          
                      <form onSubmit={handleSubmit}>
                          <div className="flex flex-row justify-between">
                            <h2 className="mb-4 text-3xl">Enter Alternative Uses below</h2>
                            <p className="w-fit bg-orange-500 rounded-lg p-2 text-2xl mb-4">
                              Time: {`${Math.floor(time / 60)}`.padStart(2, 0)}:
                              {`${time % 60}`.padStart(2, 0)}
                            </p>
                          </div>
                          <div className="flex flex-row justify-between space-x-4">
                            <input 
                              type="text" 
                              value={input}
                              className="grow p-2"
                              onChange={(e) => setInput(e.target.value)}
                            />
                            <input type="submit" value="SUBMIT" className="outline outline-offset-2 outline-2 rounded-md font-bold text-xl px-2 hover:bg-orange-500"/>
                          </div>
                      </form>
          
                      <div className="flex flex-col items-center w-full h-96 bg-orange-500 p-3 rounded-lg">
                        <ul className="flex flex-col items-center w-full h-full overflow-hidden overflow-y-auto">
                            {ideas.map((idea) => (
                              <li
                                key={idea.id}
                                className="text-left text-xl flex flex-col w-full px-12 space-y-1"
                              >
                                <div className="flex flex-row w-full justify-between items-center justify-center">
                                  <div className="w-full">
                                    {ideaEditing === idea.id ? 
                                    (
                                      <form onSubmit={() => editIdea(idea.id)} className="flex flex-row">
                                      <input
                                        type="text"
                                        value={editingText}
                                        className="w-3/4 p-2 outline outline-1"
                                        onChange={(e) => setEditingText(e.target.value)}
                                      />
                                      <input input type="submit" value="✔️" />
                                      </form>
                                    ) 
                                    : 
                                    (
                                      <span className="whitespace-normal max-w-3/4">{`${idea.name}`}</span>
                                    )}
                                  </div>
          
                                  <div className="flex justify-center">
                                    <button 
                                      onClick={() => {
                                        setIdeaEditing(idea.id)
                                        setEditingText(idea.name)
                                      }}
                                    >
                                      ✏️
                                    </button>
          
                                    <button
                                      onClick={() => {
                                        setIdeas(ideas.filter((a) => a.id !== idea.id));
                                      }}
                                    >
                                      ❌
                                    </button>
                                  </div>
                                </div>
          
                                
                              
                                
                              </li>
                            ))}
                          </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
            :
            (<div className="h-screen w-screen items-center justify-center flex text-3xl font-semibold space-y-8 p-8 bg-amber-400">
            <div className="flex flex-row space-x-4 p-4 h-full w-full items-center justify-center rounded-[60px]">
                <div className="w-1/3 rounded-[60px] bg-orange-500 flex flex-col h-full text-left items-center p-8">
                    <text className="text-lg ml-4 mb-4">
                        For the following objects, come up with alternative uses that are different from its typical intended use.
                    </text>
                    <text className="text-lg mb-4 ml-4">
                        The ideas don't have to be practical/realistic, so long as they strike people as clever, original, unusual, and innovative.
                    </text>
                    <div className="w-full rounded-[60px] bg-orange-600 flex justify-center items-center p-4">
                        {
                        (shuffled) ?
                            <img
                            className="object-contain rounded-[60px]"
                            src={promptCopy[promptId][1]}
                            alt={promptCopy[promptId][0]}/>
                            :
                            <p></p>
                        }
                    </div>
                    {
                    (shuffled) ?
                    
                    <h1 className="mt-8 flex justify-between text-center text-2xl space-x-4">
                      <span className="whitespace-nowrap">{promptCopy[promptId][0]}</span>
                      <button className="outline outline-offset-2 outline-2 rounded-md w-4/5 text-xl px-2 hover:bg-orange-500" onClick={nextItem}>Next Item</button>
                    </h1>
                            :
                            <p></p>
                    }
                </div>

                <div className="w-1/3 rounded-[60px] bg-orange-500 flex flex-col items-center h-full px-4">
                        <form onSubmit={handleSubmit} className={`w-full ${calling ? 'pointer-events-none' : 'pointer-events-auto'}`}>
                            <div className="flex flex-row justify-between items-center mt-8 mb-4 px-3">
                                <h2 className="text-lg 2xl:text-2xl text-center">Enter Alternative Uses below</h2>
                                <p className="w-fit bg-orange-400 rounded-lg text-xl p-1">
                                Time: {`${Math.floor(time / 60)}`.padStart(2, 0)}:
                                {`${time % 60}`.padStart(2, 0)}
                                </p>
                            </div>
                            <div className="flex flex-row space-x-4 justify-between">
                                <input 
                                    type="text" 
                                    value={input}
                                    className={`w-2/3 p-1 text-lg  ${calling ? 'bg-slate-600' : ''}`}
                                    disabled={calling ? true : false}
                                    onChange={(e) => setInput(e.target.value)}
                                />
                                <input type="submit" value="SUBMIT" 
                                className={`outline outline-offset-2 outline-2 rounded-md font-bold text-xl px-2 hover:bg-orange-500 ${calling ? 'pointer-events-none' : 'pointer-events-auto'}`}/>
                            </div>
                        </form>

                        <div className="h-3/4 w-full rounded-b-[60px] bg-orange-600 mt-6 rounded-lg p-4 grid place-items-start">
                        <ul className="flex flex-col items-center w-full h-full overflow-hidden overflow-y-auto">
                            {ideas.map((idea) => (
                                <li
                                key={idea.id}
                                className="text-left text-xl flex flex-col w-full px-2 space-y-1"
                                >
                                <div className="flex flex-row w-full justify-between items-center justify-center">
                                    
                                    {(ideaEditing === idea.id) ? 
                                    (
                                    <form onSubmit={() => editIdea(idea.id)} className="flex flex-row">
                                    <input
                                        type="text"
                                        value={editingText}
                                        className="w-full p-1 outline outline-1 h-auto whitespace-normal"
                                        onChange={(e) => setEditingText(e.target.value)}
                                    />
                                    <input input type="submit" value="✔️" />
                                    </form>
                                    ) 
                                    : 
                                    (
                                    <span className="whitespace-normal max-w-3/4">{`${idea.name}`}</span>
                                    )}

                                    <div className="flex justify-center">
                                    <button 
                                        disabled={calling ? true : false}
                                        onClick={() => {
                                        setIdeaEditing(idea.id)
                                        setEditingText(idea.name)
                                        }}
                                    >
                                        ✏️
                                    </button>

                                    <button
                                        onClick={() => {
                                        setIdeas(ideas.filter((a) => a.id !== idea.id));
                                        }}
                                    >
                                        ❌
                                    </button>
                                    </div>
                                </div>

                                
                                
                                
                                </li>
                            ))}
                            </ul>
                        </div>
                    
                </div>

                <div className="w-1/3 rounded-[60px] bg-orange-500 flex flex-col h-full p-6">
                    <div className="flex flex-row space-x-2 items-center justify-between mt-8">
                        <h2 className="text-2xl text-center">Generative AI</h2>
                    </div>
                    <div className="text-lg mt-2">
                        Chat-GPT's Feedback
                    </div>
                    {/* pre line css property ensures same formatting is maintained */}
                    <div className="h-5/6 text-xs w-full bg-orange-600 rounded-b-[60px] rounded-lg mt-4 p-2 whitespace-pre-line" >
                        <ReactTyped key={feedback} strings={[feedback]} typeSpeed={0.1} cursorChar="⬤" showCursor={true} />
                    </div>
                </div>
            </div>
        </div>)
        )
        :
        <Game />
    );
}

export default Refine;