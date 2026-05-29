import { useEffect, useState } from "react";
//import { replaceHeadingStarts } from "./helper";
import { replaceHeadingStarts, checkHeading } from "./helper";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
//import Markdown from 'https://esm.sh/react-markdown@10'

import ReactMarkdown from 'react-markdown'


const Answer=({ans,index,totalResult,type})=>{

   const [heading , setHeading] = useState(false)
   const [answer , setAnswer] = useState(ans);
   //console.log(index)

   useEffect(()=>{
     
     if(checkHeading(ans)){
      setHeading(true);
      setAnswer(replaceHeadingStarts(ans))
     }

   },[])

   const render = {
    code({node, inline, className, children, ...props}){
      const match = /language-(\w+)/.exec(className || '' );
        return !inline && match?(
          <SyntaxHighlighter 
          {...props}
          children={String(children).replace(/\n$/,'')}
          language= {match[1]}
          style={dark}
          PreTag="div"
      
          />
        ):(
          <code {...props}className={className} >
            {children}
          </code>
        )
      
    }
   }
    
    return(
      <>

      {
        index ===0? <span className="pt-2 text-xl block pl-3 pr-3">{answer}</span>
        :heading
        ? <span className=" text-3xl block" >{answer}</span>
        : <div className={`${type=='q'?'pl-1':'pl-5'} leading-5 text-sm md:text-base wrap-break-words`}>
          <ReactMarkdown components={render} > 
             {String(answer || '')}
             </ReactMarkdown>
          </div>}

      
      </>  
    )
}

export default Answer