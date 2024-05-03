import React from "react";
import { useState, useEffect, useRef, useContext } from "react";
import { DataContext } from "../App";
import { useNavigate } from "react-router-dom";
import ReactTyped from "react-typed";
import { promptsArray } from "./Prompts";
import { gptAid } from "./Aid";
import background from "../assets/blur-background.svg";
import Game from "../Game/Game";

let nextId = 0;
let promptId = 0;
let itemId = 0;
let ideasCount = 0;

const Generate = () => {
  const [input, setInput] = useState(""); // store currently inputted idea in input form
  const [ideas, setIdeas] = useState([]); // previously entered ideas

  const [ideaEditing, setIdeaEditing] = useState(null); // id of idea we are editing
  const [editingText, setEditingText] = useState("");

  const [promptCopy, setPromptCopy] = useState([...promptsArray]);
  const [shuffled, setShuffled] = useState(false);

  const outOfFocusStart = useRef(0);
  const [outOfFocusTime, setOutOfFocusTime] = useState(0);

  const { data, addData } = useContext(DataContext);

  const navigate = useNavigate();

  useEffect(() => {
    // log page load time
    addData({ PageLoad: new Date().toISOString() });
  }, []);

  useEffect(() => {
    // Start tracking when the tab goes out of focus and stop when it comes back into focus
    const handleVisibilityChange = () => {
      if (document.hidden) {
        outOfFocusStart.current = Date.now();
        // console.log(`Went out of focus at: ${outOfFocusStart.current}`);
      } else {
        if (outOfFocusStart.current !== 0) {
          const currentFocusTime =
            (Date.now() - outOfFocusStart.current) / 1000;
          // console.log(`Came back into focus, was out for: ${currentFocusTime} seconds`);
          setOutOfFocusTime((prevTime) => prevTime + currentFocusTime);
          outOfFocusStart.current = 0;
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup function to remove the event listener
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  useEffect(() => {
    const logInterval = setInterval(() => {
      console.log(`Out of Focus Time: ${outOfFocusTime} seconds`);
    }, 5000);

    // Cleanup function to clear the interval when the component unmounts
    // or when outOfFocusTime changes to prevent memory leaks.
    return () => clearInterval(logInterval);
  }, [outOfFocusTime]);

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
      const shuffledCopy = shuffleArray(promptCopy);
      return [
        ...shuffledCopy.slice(0, 3),
        "Placeholder",
        ...shuffledCopy.slice(3),
      ];
    });
    setShuffled(true);
  }, []);

  const handleSubmit = (e) => {
    // e is short for event
    e.preventDefault(); // prevents page from refreshing upon clicking submit
    setIdeas([
      ...ideas,
      { id: nextId++, name: input, time: new Date().toISOString() },
    ]);
    setInput(""); // clears the input form
  };

  function editIdea(id) {
    const updatedIdeas = [...ideas].map((idea) => {
      if (idea.id === id) {
        idea.name = editingText;
        idea.time = new Date().toISOString();
      }
      return idea;
    });
    setIdeas(updatedIdeas);

    // reset editing hooks
    setIdeaEditing(null);
    setEditingText("");
  }

  // timer countdown in seconds
  const [time, setTime] = useState(120);

  const deleteIdea = (id) => {
    setIdeas(ideas.filter((idea) => idea.id !== id));
  };

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
      if (!(promptId === 3)) {
        // reorder id and iid properly
        for (let i = 0; i < ideas.length; i++) {
          ideas[i].id = ideasCount + i;
        }
        for (let i = 0; i < ideas.length; i++) {
          ideas[i].iid = i;
        }
        ideasCount += ideas.length;

        addData({
          Prompt: promptCopy[promptId][0],
          Response: ideas,
        });
      }

      if (promptId === 4) {
        addData({ HideTime: outOfFocusTime });
        navigate("/creativity/feedback");
      } else {
        promptId += 1;
        // reset states and timer
        if (promptId === 3) {
          setTime(60);
        } else {
          setTime(120);
        }

        itemId = 0;
        setInput("");
        setIdeas([]);
      }
    }
    if (promptId >= Object.keys(promptCopy).length) {
      setTime(0);
    }
  }, [time]);

  const preventDefaultAction = (event) => {
    event.preventDefault();
  };

  return !(promptId === 3) ? (
    promptId === 4 ? (
      <div
        style={{ backgroundImage: `url(${background})` }}
        className="h-screen w-screen items-center justify-center flex text-3xl font-semibold space-y-8 p-8 bg-cover"
      >
        <div className="flex flex-row space-x-4 p-4 h-full w-full items-center justify-center rounded-[60px]">
          <div
            className="w-1/3 rounded-[60px] flex flex-col h-full text-left items-center p-8 outline outline-2 outline-white bg-slate-500"
            style={{ backgroundColor: "rgba(64, 64, 64, 0.17)" }}
          >
            <div className="text-white text-lg ml-4 mb-4">
              For the following object, come up with alternative uses that are
              different from its typical intended use.
            </div>
            <div className="text-white text-lg mb-4 ml-4">
              The ideas don't have to be practical/realistic, so long as they
              strike people as clever, original, unusual, and innovative.
            </div>
            <div className="w-full rounded-[60px] bg-orange-600 flex justify-center items-center p-4">
              {
                <img
                  className="object-contain rounded-[60px]"
                  src={promptCopy[promptId][1]}
                  alt={promptCopy[promptId][0]}
                />
              }
            </div>
            {shuffled ? (
              <h1 className="mt-4 text-white  flex justify-between text-center text-2xl space-x-4">
                <span className="whitespace-nowrap">
                  {promptCopy[promptId][0]}
                </span>
                {/* <button className="outline outline-offset-2 outline-2 rounded-md w-4/5 text-xl px-2 hover:bg-orange-500" onClick={nextItem}>Next Item</button> */}
              </h1>
            ) : (
              <p></p>
            )}
          </div>

          <div
            className="w-1/3 rounded-[60px] bg-orange-500 flex flex-col items-center h-full px-4  outline outline-2 outline-white bg-slate-500"
            style={{ backgroundColor: "rgba(64, 64, 64, 0.17)" }}
          >
            <form onSubmit={handleSubmit} className="w-full">
              <div className="flex flex-row justify-between items-center mb-4 mt-8 px-3">
                <h2 className="text-white text-lg 2xl:text-2xl text-center">
                  Enter Alternative Uses below
                </h2>
                <p className="text-white w-fit  outline outline-1  rounded-lg text-xl p-1">
                  Time: {`${Math.floor(time / 60)}`.padStart(2, 0)}:
                  {`${time % 60}`.padStart(2, 0)}
                </p>
              </div>

              <div className="flex flex-row space-x-4 justify-between">
                <input
                  type="text"
                  value={input}
                  className="w-2/3 p-1 text-lg"
                  onPaste={preventDefaultAction}
                  onChange={(e) => setInput(e.target.value)}
                />
                <input
                  type="submit"
                  value="SUBMIT"
                  className="text-white outline outline-offset-2 outline-2 rounded-md font-bold text-xl px-2 hover:bg-orange-500"
                />
              </div>
            </form>

            <div
              className="h-3/4 w-full rounded-b-[60px] bg-orange-600 mt-6 rounded-lg p-4 grid place-items-start bg-slate-500"
              style={{ backgroundColor: "rgba(71, 85, 105, 0.18)" }}
            >
              <ul className="flex flex-col items-center w-full h-full overflow-hidden overflow-y-auto">
                {ideas.map((idea) => (
                  <li
                    key={idea.id}
                    className="text-white text-left text-xl flex flex-col w-full px-2 space-y-1"
                  >
                    <div className="flex flex-row w-full justify-between items-center justify-center mt-2">
                      {ideaEditing === idea.id ? (
                        <form
                          onSubmit={() => editIdea(idea.id)}
                          className="flex flex-row"
                        >
                          <input
                            type="text"
                            value={editingText}
                            className="w-full p-1 outline outline-1 bg-transparent"
                            onChange={(e) => setEditingText(e.target.value)}
                          />
                          <input input type="submit" value="✔️" />
                        </form>
                      ) : (
                        <span className="whitespace-normal max-w-3/4">{`${idea.name}`}</span>
                      )}

                      <div className="flex justify-center">
                        <button
                          onClick={() => {
                            setIdeaEditing(idea.id);
                            setEditingText(idea.name);
                          }}
                        >
                          ✏️
                        </button>

                        <button onClick={() => deleteIdea(idea.id)}>❌</button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className="w-1/3 rounded-[60px] bg-orange-500 flex flex-col h-full p-6 outline outline-2 outline-white bg-slate-500"
            style={{ backgroundColor: "rgba(64, 64, 64, 0.17)" }}
          >
            <h2 className="text-white mb-4 text-2xl text-center mt-4">
              No AI support in this round
            </h2>
            {/* <text className="text-white  text-lg mb-4 ml-4">
                         Alternative uses generated by GPT-4
                     </text> */}
            {/* <div onCopy={preventDefaultAction} className="text-white select-none h-5/6 text-xs w-full bg-orange-600 rounded-b-[20px] rounded-lg mt-4 p-2 whitespace-pre-line overflow-auto"  style={{ backgroundColor: 'rgba(71, 85, 105, 0.18)' }}>
                       No AI Aid will be provided for this item
                     </div> */}
          </div>
        </div>
      </div>
    ) : (
      <div
        style={{ backgroundImage: `url(${background})` }}
        className="h-screen w-screen items-center justify-center flex text-3xl font-semibold space-y-8 p-8 bg-cover"
      >
        <div className="flex flex-row space-x-4 p-4 h-full w-full items-center justify-center rounded-[60px]">
          <div
            className="w-1/3 rounded-[60px] flex flex-col h-full text-left items-center p-8 outline outline-2 outline-white bg-slate-500"
            style={{ backgroundColor: "rgba(64, 64, 64, 0.17)" }}
          >
            <div className="text-white text-lg ml-4 mb-4">
              For the following object, come up with alternative uses that are
              different from it's typical intended use.
            </div>
            <div className="text-white text-lg mb-4 ml-4">
              The ideas don't have to be practical/realistic, so long as they
              strike people as clever, original, unusual, and innovative.
            </div>
            <div className="w-full rounded-[60px] bg-orange-600 flex justify-center items-center p-4">
              {shuffled ? (
                <img
                  className="object-contain rounded-[60px]"
                  src={promptCopy[promptId][1]}
                  alt={promptCopy[promptId][0]}
                />
              ) : (
                <p></p>
              )}
            </div>
            {shuffled ? (
              <h1 className="mt-8 text-white  flex justify-between text-center text-2xl space-x-4">
                <span className="whitespace-nowrap">
                  {promptCopy[promptId][0]}
                </span>
                {/* <button className="outline outline-offset-2 outline-2 rounded-md w-4/5 text-xl px-2 hover:bg-orange-500" onClick={nextItem}>Next Item</button> */}
              </h1>
            ) : (
              <p></p>
            )}
          </div>

          <div
            className="w-1/3 rounded-[60px] bg-orange-500 flex flex-col items-center h-full px-4  outline outline-2 outline-white bg-slate-500"
            style={{ backgroundColor: "rgba(64, 64, 64, 0.17)" }}
          >
            <form onSubmit={handleSubmit} className="w-full">
              <div className="flex flex-row justify-between items-center mb-4 mt-8 px-3 ">
                <h2 className="text-white text-lg 2xl:text-2xl text-center">
                  Enter Alternative Uses one by one
                </h2>
                <p className="text-white w-fit  outline outline-1  rounded-lg text-xl p-1">
                  Time: {`${Math.floor(time / 60)}`.padStart(2, 0)}:
                  {`${time % 60}`.padStart(2, 0)}
                </p>
              </div>
              
              <div className="flex flex-row space-x-4 justify-between">
                <input
                  type="text"
                  value={input}
                  className="w-2/3 p-1 text-lg"
                  onPaste={preventDefaultAction}
                  onChange={(e) => setInput(e.target.value)}
                />
                <input
                  type="submit"
                  value="SUBMIT"
                  className="text-white outline outline-offset-2 outline-2 rounded-md font-bold text-xl px-2 hover:bg-orange-500"
                />
              </div>
            </form>

            <div
              className="h-3/4 w-full rounded-b-[60px] bg-orange-600 mt-6 rounded-lg p-4 grid place-items-start bg-slate-500"
              style={{ backgroundColor: "rgba(71, 85, 105, 0.18)" }}
            >
              <ul className="flex flex-col items-center w-full h-full overflow-hidden overflow-y-auto">
                {ideas.map((idea) => (
                  <li
                    key={idea.id}
                    className="text-white text-left text-xl flex flex-col w-full px-2 space-y-1"
                  >
                    <div className="flex flex-row w-full justify-between items-center justify-center mt-2">
                      {ideaEditing === idea.id ? (
                        <form
                          onSubmit={() => editIdea(idea.id)}
                          className="flex flex-row"
                        >
                          <input
                            type="text"
                            value={editingText}
                            className="w-full p-1 outline outline-1 bg-transparent"
                            onChange={(e) => setEditingText(e.target.value)}
                          />
                          <input input type="submit" value="✔️" />
                        </form>
                      ) : (
                        <span className="whitespace-normal max-w-3/4">{`${idea.name}`}</span>
                      )}

                      <div className="flex justify-center">
                        <button
                          onClick={() => {
                            setIdeaEditing(idea.id);
                            setEditingText(idea.name);
                          }}
                        >
                          ✏️
                        </button>

                        <button onClick={() => deleteIdea(idea.id)}>❌</button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className="w-1/3 rounded-[60px] bg-orange-500 flex flex-col h-full p-6 outline outline-2 outline-white bg-slate-500"
            style={{ backgroundColor: "rgba(64, 64, 64, 0.17)" }}
          >
            <h2 className="text-white mb-4 text-2xl text-center mt-4">
              Here are some ideas generated by AI
            </h2>
            {/* <text className="text-white  text-lg mb-4 ml-4">
                        Alternative uses generated by GPT-4
                    </text> */}
            <div
              onCopy={preventDefaultAction}
              className="text-white select-none h-5/6 text-xs w-full bg-orange-600 rounded-b-[20px] rounded-lg mt-4 p-2 whitespace-pre-line overflow-auto"
              style={{ backgroundColor: "rgba(71, 85, 105, 0.18)" }}
            >
              <ReactTyped
                key={gptAid[promptCopy[promptId][0]]}
                strings={[gptAid[promptCopy[promptId][0]]]}
                typeSpeed={0.1}
                cursorChar="⬤"
                showCursor={true}
                startDelay={5000}
              />
            </div>
          </div>
        </div>
      </div>
    )
  ) : (
    <Game />
  );
};

export default Generate;
