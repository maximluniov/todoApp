import React  from 'react'

function Option() {

  // const [isChanged,setIsChanged]=useState(false);

  // function handleIsChanged(){
  //   setIsChanged((previous)=>!previous)
  // }

  // const option = useRef();
  
  
  // useEffect(()=>{
  //   console.log(option.current.value);
  // },[isChanged]);


  return (
    
        <select  className='w-32 h-10 bg-slate-300 rounded-md pl-2' id='select'>
            <option value="all">All</option>
            <option value="complete">Complete</option>
            <option value="incomplete">Incomplete</option>
        </select>
   
  )
}

export default Option