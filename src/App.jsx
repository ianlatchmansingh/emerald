import { useState } from "react";
import {
  SpeakerWaveIcon,
  XCircleIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

function App() {
  const [responses, setResponses] = useState([]);
  const [inputText, setInputText] = useState("");

  const handleSpeech = (phrase) => {
    if ("speechSynthesis" in window) {
      const to_speak = new SpeechSynthesisUtterance(phrase);
      speechSynthesis.cancel();
      speechSynthesis.speak(to_speak);
    } else {
      alert("Speech synthesis not supported.");
    }
  };

  const handleAdd = (phrase) => {
    let arr = responses.slice();
    arr.unshift(phrase);
    setResponses(arr);
    handleSpeech("Added: " + phrase);
    setInputText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAdd(inputText);
    }
  };

  const handleRemove = (i) => {
    let arr = responses.slice();
    arr.splice(i, 1);
    setResponses(arr);
  };

  const ResponseList = () => {
    return (
      <ul className="w-fit mx-auto">
        {responses.map((r, i) => (
          <li
            className="flex justify-between items-center mb-3 border border-slate-100 bg-white rounded shadow hover:bg-emerald-50 hover:text-emerald-600"
            key={i}
          >
            <span
              className="block p-2 w-full font-semibold text-slate-600 cursor-pointer"
              onClick={() => handleSpeech(r)}
            >
              {r}
            </span>
            <XCircleIcon
              onClick={() => handleRemove(i)}
              className="h-6 px-2 text-red-300 hover:text-red-600 cursor-pointer"
            />
          </li>
        ))}
      </ul>
    );
  };

  const Placeholder = () => {
    return (
      <div className="my-auto text-center">
        <h1 className="relative font-bold text-3xl mb-4 text-emerald-700">
          Emerald
          <SparklesIcon className="absolute inline-block pl-2 h-5 top-0" />
        </h1>
        <h2 className="text-slate-400">
          Simple Wizard-of-Oz Prototyping for VUIs
        </h2>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-between items-center w-full px-3 py-2 bg-white shadow-md">
        <div className="flex items-center">
          <input
            type="text"
            value={inputText}
            placeholder="Define an utterance, press Enter to add"
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-96 p-2 border-b border-b-slate-200 focus:ring-blue-100 focus:border-blue-100 border-transparent focus:border-transparent focus:ring-0"
          />
          <button className="icon" onClick={() => handleSpeech(inputText)}>
            <SpeakerWaveIcon className="h-8 text-emerald-500" alt="Preview" />
          </button>
        </div>
        <button onClick={() => handleAdd(inputText)}>Add</button>
      </div>
      <div className="flex flex-col grow mt-8">
        {responses.length > 0 ? <ResponseList /> : <Placeholder />}
      </div>
    </div>
  );
}

export default App;
