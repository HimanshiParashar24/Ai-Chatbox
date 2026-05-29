  import { useState } from "react";
  
  function RecentSearch (){
    
      const [recentHistory, setRecentHistory] = useState(
        JSON.parse(localStorage.getItem("history")),
      );
      
  const [selectedHistory, setSelectedHistory] = useState("");
    
  const clearHistory = () => {
    localStorage.clear();c
    setRecentHistory([]);
  };

  const clearSelectedHistory =(selectedItem)=>{
    let history = JSON.parse(localStorage.getItem('history'));
    console.log(history);
    history = history.filter((item) => {
      if(item!= selectedItem){
        return item
      } 
    })
    setRecentHistory(history)
    localStorage.setItem('history',JSON.stringify(history));
    console.log(history);
  }

    return(
    <>
     <div className="col-span-1 bg-black text-white p-4 shadow-2xl border-zinc-800 border">
        <h1 className="flex justify-center ">
          <span className="pr-2">Recent Search</span>
          <button onClick={clearHistory} className="cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e3e3e3"><path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z" /></svg>
          </button>
        </h1>
        <ul className="overflow-y-auto h-[90vh] text-sm">
          {recentHistory && recentHistory.map((item, index) => (
             <div className="flex justify-between" key={index} >
               <li
                key={index}
                onClick={() => setSelectedHistory(item)}
                className="truncate w-55 p-1 cursor-pointer hover:bg-zinc-500 overflow-hidden"
                >{item}
              </li>
              <button onClick={()=>clearSelectedHistory(item)} className="cursor-pointer hover:bg-zinc-800">
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e3e3e3"><path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z" /></svg>
          </button>
                </div>
            ))}
        </ul>
      </div>
    </>
    )
}

export default RecentSearch