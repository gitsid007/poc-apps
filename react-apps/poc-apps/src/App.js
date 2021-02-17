import './App.scss';
import Todo from './components/todo/Todo';
import AutoSearch from './components/autosearch/autosearch';

function App() {
  return (
    <div className="App">
      <AutoSearch/>
      <Todo/>
    </div>
  );
}

export default App;
