import TaskForm from './components/TaskForm';
import Banner from "./components/Banner";
import Menu from "./components/Menu";
import Gallery from "./components/Gallery";
import './App.css'


function App() {

  return (
      <div>
          <h1>Task manager</h1>
          <Menu />
          <Banner />
          <Gallery />
          <p>aplikacja React</p>

          <TaskForm/>
      </div>
  );
}

export default App
