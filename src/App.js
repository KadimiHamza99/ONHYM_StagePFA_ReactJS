import './App.css';
import { LoginContextProvider } from './context/LoginContext';
import Main from './MainComponent';

function App() {
  return (
    
    <LoginContextProvider>
    <div className="App">
        <Main/>
    </div>
    </LoginContextProvider>
  );
}

export default App;
