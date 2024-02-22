import React, { useEffect, useState, useContext } from "react";
import { DataContext } from "../App";
import { useNavigate } from "react-router-dom";
import { prompts, promptsArray } from "./Prompts";
import background from "../assets/blur-background.svg";
import Game from "../Game/Game";

let nextId = 0;
let promptId = 0;

const Absent = () => {
  const [input, setInput] = useState(""); // store currently inputted idea in input form
  const [ideas, setIdeas] = useState([]); // previously entered ideas

  const [ideaEditing, setIdeaEditing] = useState(null); // id of idea we are editing
  const [editingText, setEditingText] = useState("");

  const [promptCopy, setPromptCopy] = useState([...promptsArray]);
  const [shuffled, setShuffled] = useState(false);

  const {data, addData} = useContext(DataContext);

  const navigate = useNavigate();

  const preventDefaultAction = (event) => {
    event.preventDefault();
  };

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
          ...shuffledCopy.slice(0, 3),
          "dummy",
          ...shuffledCopy.slice(3)
      ];
    });
    setShuffled(true);
  }, [])

  const handleSubmit = (e) => { // e is short for event
      e.preventDefault(); // prevents page from refreshing upon clicking submit
      setIdeas([...ideas, { id: nextId++, name: input, time: new Date().toISOString()}]);
      setInput(''); // clears the input form
  }

  function editIdea(id) {
    const updatedIdeas = [...ideas].map((idea) => {
      if (idea.id === id) {
        idea.name = editingText;
        idea.time = new Date().toISOString();
      }
      return idea;
    })
    setIdeas(updatedIdeas);

    // reset editing hooks
    setIdeaEditing(null);
    setEditingText("");
  }

    // Fisher-Yates shuffle algorithm
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // timer countdown in seconds
  const [time, setTime] = useState(2);

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
        addData({
          "Prompt": promptCopy[promptId][0],
          "Response": ideas
        })
      }
      if (promptId === 4) {navigate('/creativity/feedback')} 
      else {
        promptId += 1;
        // reset states and timer
        setTime(2);

        setInput("");
        setIdeas([]);
      }
    }
    if (promptId >= Object.keys(promptCopy).length) { setTime(0); }
  }, [time])

  return (
    ( (!(promptId === 3)) ?
      (<div  style={{ backgroundImage: `url(${background})` }}
      className="h-screen w-screen items-center justify-center flex text-3xl font-semibold space-y-8 p-8 bg-cover">
     <div className="flex flex-row space-x-4 p-4 h-full w-full items-center justify-center rounded-[60px]">
         <div className="w-1/3 rounded-[60px] flex flex-col h-full text-left items-center p-8 outline outline-2 outline-white bg-slate-500" style={{ backgroundColor: 'rgba(64, 64, 64, 0.17)' }}>
             <div className="text-white text-lg ml-4 mb-4">
                 For the following object, come up with alternative uses that are different from it's typical intended use.
             </div>
             <div className="text-white text-lg mb-4 ml-4">
                 The ideas don't have to be practical/realistic, so long as they strike people as clever, original, unusual, and innovative.
             </div>
             <div className="w-full rounded-[60px] bg-orange-600 flex justify-center items-center p-4">
                 {
                     <img
                     className="object-contain rounded-[60px]"
                     src={promptCopy[promptId][1]}
                     alt={promptCopy[promptId][0]}/>
                 }
             </div>
             {
             (shuffled) ?
             
             <h1 className="mt-8 text-white  flex justify-between text-center text-2xl space-x-4">
               <span className="whitespace-nowrap">{promptCopy[promptId][0]}</span>
               {/* <button className="outline outline-offset-2 outline-2 rounded-md w-4/5 text-xl px-2 hover:bg-orange-500" onClick={nextItem}>Next Item</button> */}
             </h1>
                 :
                 <p></p>
             }
           
         </div>

         <div className="w-1/3 rounded-[60px] bg-orange-500 flex flex-col items-center h-full px-4  outline outline-2 outline-white bg-slate-500" style={{ backgroundColor: 'rgba(64, 64, 64, 0.17)' }}>
             
             <form onSubmit={handleSubmit} className="w-full">
                 <div className="flex flex-row justify-between items-center mt-8 mb-4 px-3">
                     <h2 className="text-white text-lg 2xl:text-2xl text-center">Enter Alternative Uses below</h2>
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
                     <input type="submit" value="SUBMIT" className="text-white outline outline-offset-2 outline-2 rounded-md font-bold text-xl px-2 hover:bg-orange-500"/>
                 </div>
             </form>

             <div className="h-3/4 w-full rounded-b-[60px] bg-orange-600 mt-6 rounded-lg p-4 grid place-items-start bg-slate-500" style={{ backgroundColor: 'rgba(71, 85, 105, 0.18)' }}>
             <ul className="flex flex-col items-center w-full h-full overflow-hidden overflow-y-auto">
                 {ideas.map((idea) => (
                     <li
                     key={idea.id}
                     className="text-white text-left text-xl flex flex-col w-full px-2 space-y-1"
                     >
                     <div className="flex flex-row w-full justify-between items-center justify-center">
                         
                         {ideaEditing === idea.id ? 
                         (
                         <form onSubmit={() => editIdea(idea.id)} className="flex flex-row">
                         <input
                             type="text"
                             value={editingText}
                             className="w-full p-1 outline outline-1"
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

         <div className="w-1/3 rounded-[60px] bg-orange-500 flex flex-col h-full p-6 outline outline-2 outline-white bg-slate-500" style={{ backgroundColor: 'rgba(64, 64, 64, 0.17)' }} >
             <h2 className="text-white mb-4 text-2xl text-center mt-4">Here are some ideas generated by AI</h2>
             {/* <text className="text-white  text-lg mb-4 ml-4">
                 Alternative uses generated by GPT-4
             </text> */}
             <div onCopy={preventDefaultAction} className="text-white select-none h-5/6 text-xs w-full bg-orange-600 rounded-b-[20px] rounded-lg mt-4 p-2 whitespace-pre-line overflow-auto"  style={{ backgroundColor: 'rgba(71, 85, 105, 0.18)' }}>
               No AI Aid will be provided for this item
             </div>
         </div>
     </div>
 </div>)
    :
    <Game />
    )
  );
};

export default Absent;