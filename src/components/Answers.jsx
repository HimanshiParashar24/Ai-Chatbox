import { useEffect, useState } from "react";
//import { replaceHeadingStarts } from "./helper";
import { replaceHeadingStarts, checkHeading } from "./helper";

const Answer=({ans,index})=>{

   const [heading , setHeading] = useState(false)
   const [answer , setAnswer] = useState(ans);
   //console.log(index)

   useEffect(()=>{
     
     if(checkHeading(ans)){
      setHeading(true);
      setAnswer(replaceHeadingStarts(ans))
     }

   },[])

    
    return(
      <>

      {
        index ===0? <span className="pt-2 text-xl block pl-3 pr-3">{answer}</span>
        :heading
        ? <span className=" text-3xl block" >{answer}</span>
        : <span className="text-lg pl-3">{answer}</span>}

      
      </>  
    )
}

export default Answer