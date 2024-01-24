import React, { useState, useRef, useEffect } from 'react'
import Modal from './Modal'
import Button from './Button';
import Editbutton from './Editbutton';

import index from '../assets/index'

function Addtask() {



  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);

  const [title, setTitle] = useState("")
  const [status, setStatus] = useState("incomplete")

  const [tasks, setTasks] = useState(
    localStorage.tasks ? JSON.parse(localStorage.tasks) : []
  )


  const [currentId, setCurrentId] = useState();

  function handleStatus(event) {
    setStatus(event.target.value)
  }

  function handleTitle(event) {
    setTitle(event.target.value)
  }



  function toggleModal() {
    setIsModalOpen((previous) => !previous);
    setTitle("");
    setStatus("incomplete");
  }

  function toggleSecondModal(id) {
    setCurrentId(id);
    setIsSecondModalOpen((previous) => !previous);

    tasks.forEach(function (task) {
      if (task.id === id) {
        setTitle(task.title);
        setStatus(task.status);
      }
    })
  }


  function updateTask() {

    tasks.forEach(function (task, index, taskArr) {
      if (task.id === currentId) {

        taskArr[index].title = title;
        taskArr[index].status = status;

        localStorage.tasks = JSON.stringify(taskArr);
        setTasks(JSON.parse(localStorage.tasks));

      }
    })

    toggleSecondModal();
  }


  function addTask() {

    let tasksForLocalStorage = [];

    localStorage.id ? localStorage.id++ : localStorage.id = 1;
    localStorage.tasks ? tasksForLocalStorage = JSON.parse(localStorage.tasks) : console.log();

    let date = new Date();
    const task = {
      title: title,
      status: status,
      date: date.toLocaleDateString(),
      id: localStorage.id
    };
    console.log(task);
    setTasks((current) => [...current, task])

    tasksForLocalStorage.push(task);
    localStorage.tasks = JSON.stringify(tasksForLocalStorage);
    setIsModalOpen(false);
  }


  function handleStatusChange(id) {
    tasks.forEach(function (task, index, taskArr) {
      if (task.id === id) {


        let info = taskArr;

        console.log(taskArr);

        info[index].status === "incomplete" ? info[index].status = "complete" : info[index].status = "incomplete";

        console.log(info);

        localStorage.tasks = JSON.stringify(info);
        setTasks(JSON.parse(localStorage.tasks));


      }
    })
  }

  function handleTasks(id) {
    tasks.forEach(function (task, index, taskArr) {
      if (task.id === id) {
        let info = taskArr.toSpliced(index, 1)
        localStorage.tasks = JSON.stringify(info);
        setTasks(info);
      }
    })
  }
  const [isChanged, setIsChanged] = useState(false);
  const [flag, setFlag] = useState(false);

  function handleIsChanged() {
    setIsChanged((previous) => !previous)
  }

  useEffect(() => {
    setFlag(true);
  }, [])
  const option = useRef("");



  return (
    <div>
      <div className="flex justify-between mainblock">
        <Button onClick={toggleModal} >Add Task</Button>

        <select ref={option} onChange={handleIsChanged}  className='button outline-none w-32 h-10 bg-slate-300 rounded-md pl-2' id='select'>
          <option value="all">All</option>
          <option value="complete">Complete</option>
          <option value="incomplete">Incomplete</option>
        </select>

      </div>

      {
        (option.current.value === "all" || flag === false) ?


          <div className='bg-slate-200 mainblock  rounded-xl my-4 p-4'>
            {tasks.length > 0 ? tasks.map(task =>


              <div className='flex flex-row justify-between items-center mb-2 bg-white p-1 rounded-md' key={task.id}>


                <div className='flex items-center'>

                  {task.status === "complete" ?
                    <Editbutton onClick={() => handleStatusChange(task.id)} style={{ margin: "0 8px 0 3px" }} >✓</Editbutton>
                    : <Editbutton onClick={() => handleStatusChange(task.id)} style={{ margin: "0 8px 0 3px" }} >-</Editbutton>}


                  <div className='flex flex-col '>

                    {task.status === "incomplete" ? <p >
                      {task.title}
                    </p> :
                      <strike> {task.title}</strike>
                    }
                    <p>
                      {task.date}
                    </p>
                  </div></div>


                <div>
                  <Editbutton onClick={() => toggleSecondModal(task.id)} style={{ marginRight: "6px" }} >🖊</Editbutton>
                  <Editbutton onClick={() => handleTasks(task.id)} style={{ marginRight: "4px" }}  >🗑</Editbutton>
                </div>
              </div>) : <div className='mainblock flex items-center justify-center'>
              <p className='  bg-slate-300 p-2 rounded-md'>No TODOS</p>
            </div>}
          </div> :
          <div className='bg-slate-200 mainblock  rounded-xl my-4 p-4'>
            {tasks.length > 0 ? tasks.filter(task => task.status === option.current?.value).map(task =>


              <div className='flex flex-row justify-between items-center mb-2 bg-white p-1 rounded-md' key={task.id}>


                <div className='flex items-center'>

                  {task.status === "complete" ?
                    <Editbutton onClick={() => handleStatusChange(task.id)} style={{ margin: "0 8px 0 3px" }} >✓</Editbutton>
                    : <Editbutton onClick={() => handleStatusChange(task.id)} style={{ margin: "0 8px 0 3px", }} >-</Editbutton>}


                  <div className='flex flex-col '>

                    {task.status === "incomplete" ? <p >
                      {task.title}
                    </p> :
                      <strike> {task.title}</strike>
                    }
                    <p>
                      {task.date}
                    </p>
                  </div></div>


                <div>
                  <Editbutton onClick={() => toggleSecondModal(task.id)} style={{ marginRight: "6px" }} >🖊</Editbutton>
                  <Editbutton onClick={() => handleTasks(task.id)} style={{ marginRight: "4px" }}   >🗑</Editbutton>
                </div>
              </div>) : <div className='mainblock flex items-center justify-center'>
              <p className='  bg-slate-300 p-2 rounded-md'>No TODOS</p>
            </div>}
          </div>}







      <Modal open={isModalOpen}>
        <div className='flex justify-end'> <img className='bg-white my-2 mr-2 rounded crossbutton' src={index.cross} width={30} alt="" onClick={toggleModal} /></div>
        <div className='rounded-xl flex flex-col bg-slate-200 p-8 ' style={{ width: "33rem", height: "22rem" }}>
          <h1 className='font-bold text-zinc-600'>Add TODO</h1>
          <br />

          <label htmlFor="title">Title</label>
          <input onChange={handleTitle} value={title} style={{ width: "29rem", height: "3rem", outline: "none" }} type="text" id='title' />
          <br />

          <label htmlFor="status">Status</label>
          <select value={status} onChange={handleStatus} style={{ width: "29rem", height: "3rem" }} id='status' className='w-32 h-10 pl-2'>
            <option value="complete">Complete</option>
            <option value="incomplete">Incomplete</option>
          </select>
          <br />
          <div>
            <Button onClick={addTask} >Add Task</Button>
            <button onClick={toggleModal} className='ml-2 w-24 h-10 bg-slate-300 rounded-md text-zinc-500 text-xl'>Close</button>
          </div>
        </div>
      </Modal>

      <Modal open={isSecondModalOpen}>
        <div className='flex justify-end'> <img className='bg-white my-2 mr-2 rounded crossbutton' src={index.cross} width={30} alt="" onClick={toggleSecondModal} /></div>
        <div className='flex flex-col bg-slate-200 p-8 rounded-xl' style={{ width: "33rem", height: "22rem" }}>
          <h1 className='font-bold text-zinc-600'>Update TODO</h1>
          <br />

          <label htmlFor="title2">Title</label>
          <input onChange={handleTitle} value={title} style={{ width: "29rem", height: "3rem", outline: "none" }} type="text" id='title2' />
          <br />

          <label htmlFor="status2">Status</label>
          <select value={status} onChange={handleStatus} style={{ width: "29rem", height: "3rem",outline: "none" }} id='status2' className='w-32 h-10 pl-2'>
            <option value="complete">Complete</option>
            <option value="incomplete">Incomplete</option>
          </select>
          <br />
          <div>
            <Button onClick={updateTask} >Update Task</Button>
            <button onClick={toggleSecondModal} className='ml-2 w-24 h-10 bg-slate-300 rounded-md text-zinc-500 text-xl'>Close</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Addtask