import './App.css';
import Navbar from './component/navbar';
import Blockchain from './page/blockchain/blockchain';
import SendTransaction from './page/blockchain/send_transaction';

function App() {
  return (
    <div className="App">
      <Navbar />

      <Blockchain />
      <SendTransaction />
    </div>
  );
}

export default App;
