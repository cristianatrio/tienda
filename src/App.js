import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Rutas from './routes/Rutas.jsx';
import GlobalProvider from './context/GlobalProvider.jsx';

const App = () => {
  return (
    <div className="App">
      <GlobalProvider>
          <Rutas/>
      </GlobalProvider>
    </div>
  );
}

export default App;
