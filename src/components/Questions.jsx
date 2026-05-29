import Answer from "../components/Answers";

const Questions = ({item,index}) => {
    
  return (
    <>
      <div
        key={index}
        className={item.type == "q" ? "flex justify-end" : "w-full"}
      >
        {item.type == "q" ? (
          <li
            key={index}
            className="text-right pl-4 pr-4 text-white border-2 bg-zinc-800 border-zinc-600 rounded-br-3xl rounded-bl-3xl rounded-tl-3xl ml-auto max-w-[90%] md:max-w-[70%]  p-2"
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
              className="text-left text-amber-50 max-w-[95%] md:max-w-[80%] p-2"
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
    </>
  );
};

export default Questions