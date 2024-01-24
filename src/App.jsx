import Header from "./components/Header";
import Addtask from "./components/Addtask";

function App() {
  return (
    <div className="App flex flex-col items-center bg-slate-100">
      <div className="flex flex-col items-center mainblock h-screen">

        <Header />
       
          <Addtask />
          
      </div>





    </div>
  );
}

export default App;
