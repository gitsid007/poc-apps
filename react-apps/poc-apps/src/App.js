import logo from './logo.svg';
import './App.scss';
import Todo from './components/todo/Todo';
import AutoSearch from './components/auto-search/autosearch';

function App() {
  return (
    <div className="App">
      <AutoSearch/>
      <Todo/>
    </div>
  );
}

export default App;
