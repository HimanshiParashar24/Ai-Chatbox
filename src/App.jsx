import { useEffect, useRef, useState } from "react";
import "./App.css";
import Answer from "./components/Answers";

function App() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState([]);
  const [selectedHistory, setSelectedHistory] = useState("");
  const scrollToAns = useRef();
  const [recentHistory, setRecentHistory] = useState(
    JSON.parse(localStorage.getItem("history")),
  );
  const [loader,setLoader] = useState(false);

  const askQuestion = async () => {
    if (!question && !selectedHistory) {
      return false;
    }

    if (question) {
      if (localStorage.getItem("history")) {
        let history = JSON.parse(localStorage.getItem("history"));
        history = [question, ...history];
        localStorage.setItem("history", JSON.stringify(history));
        setRecentHistory(history);
      } else {
        localStorage.setItem("history", JSON.stringify([question]));
        setRecentHistory([question]);
      }
    }

    const payloadData = question?question: selectedHistory;
    const payload = {
      contents: [
        {
          parts: [{ text: payloadData }],
        },
      ],
    };
     setLoader(true);
    let response = await fetch(import.meta.env.VITE_GEMINI_API_URL, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    response = await response.json();

    if (!response.candidates) {
      console.log("API Error");
      return;
    }

    let dataString = response.candidates[0].content.parts[0].text;
    dataString = dataString.split("*");
    //dataString = dataString.split(/\d+\./);
    dataString = dataString.map((item) =>
      item
        .replace(/(\d+)\.\s*\n/g, "$1. ")
        .replace(/[ \t]+/g, " ")
        .trim(),
    );

    setResult([
      ...result,
      { type: "q", text: question ? question : selectedHistory },
      { type: "a", text: dataString },
    ]);
    setQuestion("");

    setTimeout(() => {
      scrollToAns.current.scrollTop = scrollToAns.current.scrollHeight;
    }, 500);
    setLoader(false);
  };

  const clearHistory = () => {
    localStorage.clear();
    setRecentHistory([]);
  };

  const isEnter = (e) => {
    console.log(e.key);
    if (e.key == "Enter") {
      askQuestion();
    }
  };

  useEffect(() => {
    console.log(selectedHistory);
    askQuestion();
  }, [selectedHistory]);

  return (
    <div className="grid grid-cols-5 h-screen  bg-black">
      <div className="col-span-1 bg-black text-white p-4 shadow-2xl border-zinc-800 border">
        <h1 className="flex justify-center ">
          <span className="pr-2">Recent Search</span>
          <button onClick={clearHistory} className="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#e3e3e3"
            >
              <path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z" />
            </svg>
          </button>
        </h1>
        <ul className="overflow-auto text-sm">
          {recentHistory &&
            recentHistory.map((item, index) => (
              <li
                key={index}
                onClick={() => setSelectedHistory(item)}
                className="truncate w-55 p-1 cursor-pointer hover:bg-zinc-500 overflow-hidden"
              >
                {item}
              </li>
            ))}
        </ul>
      </div>
      <div className="col-span-4 w-full overflow-hidden">
        <h1 className="text-4xl bg-clip-text text-transparent bg-linear-to-r from-pink-700  to-violet-700 flex justify-center items-center m-5 h-14"
        >Hello User, Ask me Anything</h1>
        {
          loader ? (
            <div role="status" className="flex justify-center mt-10">
              <svg
                aria-hidden="true"
                className="inline w-8 h-8 text-white animate-spin fill-blue-500"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
        
              <span className="sr-only">Loading...</span>
            </div>
          ) : null
        }
        <div ref={scrollToAns} className="container h-[75%] w-full overflow-scroll scrollbar-hide ">
          <div>
            <div className="p-10 space-y-4 ">
              <ul>
                {result.map((item, index) => (
                  <div
                    key={index}
                    className={item.type == "q" ? "flex justify-end" : "w-full"}
                  >
                    {item.type == "q" ? (
                      <li
                        key={index}
                        className="text-right pl-6 pr-6 text-white border-2 bg-zinc-800 border-zinc-600 rounded-br-3xl rounded-bl-3xl rounded-tl-3xl ml-auto max-w-[70%]  p-2"
                      >
                        <Answer
                          ans={item.text}
                          totalResult={1}
                          index={index}
                          type={item.type}
                        />
                      </li>
                    ) : (
                      item.text.map((ansItem, ansIndex) => (
                        <li
                          key={`${index}-${ansIndex}`}
                          className="text-left text-amber-50 max-w-[80%]  p-2"
                        >
                          <Answer
                            ans={ansItem}
                            totalResult={item.length}
                            type={item.type}
                            index={ansIndex}
                          />
                        </li>
                      ))
                    )}
                  </div>
                ))}
              </ul>
            </div>
          </div>
          <div
            className=" fixed bottom-5 left-[60%] -translate-x-1/2  w-2/4 text-white bg-zinc-800 m-auto 
      rounded-4xl  flex items-center h-14 outline-none "
          >
            <input
              onKeyDown={isEnter}
              type="text"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Ask anything"
              className="p-4 mx-3 flex-2 outline-none"
            />
            <button
              onClick={askQuestion}
              className="cursor-pointer bg-zinc-800 rounded-full h-10 w-10 text-white text-2xl flex justify-center items-center"
            >
              ↑
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;        