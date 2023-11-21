import React, { useEffect, useState } from "react";
import { prompts } from "./Prompts";

let nextId = 0;

const Absent = () => {
  const [input, setInput] = useState(""); // store currently inputted idea in input form
  const [ideas, setIdeas] = useState([]); // previously entered ideas
  const [ideaEditing, setIdeaEditing] = useState(null); // id of idea we are editing
  const [editingText, setEditingText] = useState("");

  const handleSubmit = (e) => { // e is short for event
      e.preventDefault(); // prevents page from refreshing upon clicking submit
      setIdeas([...ideas, { id: nextId++, name: input }]);
      setInput(''); // clears the input form
  }

  function editIdea(id) {
    const updatedIdeas = [...ideas].map((idea) => {
      if (idea.id === id) {
        idea.name = editingText;
      }
      return idea;
    })
    setIdeas(updatedIdeas);

    // reset editing hooks
    setIdeaEditing(null);
    setEditingText("");
  }

  const [time, setTime] = useState(300);

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

  return (
    <div className="h-screen w-screen items-center justify-center flex text-3xl font-semibold space-y-8 p-14 bg-amber-400">
      <div className="flex flex-col h-full w-full items-center justify-center bg-amber-500 rounded-[60px]">
        <text className="text-2xl">
          For the following objects, come up with alternative uses that are
          different from it's typical intended use.
        </text>
        <text className="text-2xl mb-8">
          The ideas don't have to be practical/realistic, so long as they strike
          people as clever, original, unusual, and innovative.
        </text>
        
        <div className="flex flex-row w-full justify-evenly">
            <div className="w-1/3 flex flex-col justify-center">
                <div className="w-full rounded-[60px] bg-orange-500 flex justify-center items-center p-8">
                <img
                    className="object-contain rounded-[60px]"
                    src={prompts["Cardboard Box"]}
                />
                </div>
                <h1 className="mt-4 text-center">{Object.keys(prompts)[0]}</h1>
            </div>

          <div className="w-1/2 h-full flex flex-col space-y-4">

            <p className="w-fit bg-orange-500 rounded-lg p-2 text-2xl">
              Time: {`${Math.floor(time / 60)}`.padStart(2, 0)}:
              {`${time % 60}`.padStart(2, 0)}
            </p>

            <form onSubmit={handleSubmit}>
                <h2 className="mb-4 text-3xl">Enter Alternative Uses below</h2>
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
            {/* <h2 className="mb-4 text-3xl">Enter Alternative Uses below</h2>

            <div className="flex flex-row space-x-4 justify-between">
              <input
                className="grow p-2 rounded-md text-2xl"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                className="outline outline-offset-2 outline-3 rounded-md font-bold text-xl px-2 hover:bg-orange-500"
                onClick={() => {
                  setIdeas([...ideas, { id: nextId++, name: input }]);
                  setInput("");
                }}
              >
                SUBMIT
              </button>
            </div> */}

            {/* <div className="h-3/4 bg-orange-500 mt-4 rounded-lg p-4 grid place-items-start">
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
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Absent;
