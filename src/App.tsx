import './App.less';
import LeftPanel  from './components/leftPanel';
import store from './store/index'

function App() {
  

  return (
    <div className="App">
      <div className="imageBg"></div>
      <LeftPanel></LeftPanel>
    </div>
  );
}

export default App;
