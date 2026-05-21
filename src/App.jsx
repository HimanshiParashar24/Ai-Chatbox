  import { useState } from 'react'
import './App.css'
import Answer from './components/Answers';

function App() {
const [question,setQuestion] = useState('');
const [result,setResult] = useState([])

const payload = {
  "contents":[{
    "parts":[{"text":question}]
  }]
}

const askQuestion=async()=>{

  let response = await fetch(import.meta.env.VITE_GEMINI_API_URL,{
    method:"POST",
    body:JSON.stringify(payload)
  })

  response= await response.json()


  if(!response.candidates){
    console.log("API Error");
    return;
  }


 let dataString = response.candidates[0].content.parts[0].text;
  dataString = dataString.split("*");
  //dataString = dataString.split(/\d+\./);
  dataString = dataString.map((item)=>
  //item.replace(/\n/g," ").trim()
  //item.replace(/[ \t]+/g," ").trim()
     item
   .replace(/(\d+)\.\s*\n/g, "$1. ")
   .replace(/[ \t]+/g," ")
   .trim()
      )
  
  setResult([...result,{type:'q',text:question},{type:'a',text:dataString}]);
  //setResult(response.candidates[0].content.parts[0].text);
}

  return (
    <div className='grid grid-cols-5 h-screen  bg-black'>
     <div className='col-span-1 bg-black text-white p-4 shadow-2xl border-zinc-800 border'>
      </div>
      <div className='col-span-4 w-full overflow-hidden'>
     <div className='container h-[85%] w-full overflow-scroll scrollbar-hide '>
       <div> 
       
<div className='p-4 space-y-4'>
<ul>
{
  result.map((item,index)=>(
    <div  key={index} className={item.type=='q'?'flex justify-end':'w-full'}>

    {
      item.type=='q' 
      ?
      <li 
      key={index}
      className='text-right pl-6 pr-6 text-white border-2 bg-zinc-800 border-zinc-600 rounded-2xl ml-auto max-w-[70%]  p-3'>
        <Answer ans={item.text} />
      </li> 

      :
      item.text.map((ansItem,ansIndex)=>(

        <li 
        key={`${index}-${ansIndex}`} 
        className='text-left text-white max-w-[80%]  p-2'>
          <Answer ans={ansItem} />
        </li> 
      ))
    }

    </div>
  ))
}
</ul>
{

     // <ul>
      
      //  {
      //   result&& result.map((item,index)=>(
      //    <li key={index} className='text-left list-decimal pl-6 text-white '>
      //     <Answer 
      //     ans={item} 
          // index={index} />
      //   </li> 
          
      //   ))
      //  }
      //  </ul> 
          }
        </div> 

     </div>
      <div className=' fixed bottom-5 left-[60%] -translate-x-1/2  w-2/4 text-white bg-zinc-800 m-auto 
      rounded-4xl  flex items-center h-14 outline-none '>
        <input type='text' value={question}  onChange={(event)=>setQuestion(event.target.value)}  placeholder='Ask anything' className='p-4 mx-3 flex-2 outline-none'/>
        <button onClick={askQuestion} className='cursor-pointer bg-zinc-800 rounded-full h-10 w-10 text-white text-2xl flex justify-center items-center'>↑</button>
      </div>
     </div>
    </div>
    </div>
  )
}

export default App


