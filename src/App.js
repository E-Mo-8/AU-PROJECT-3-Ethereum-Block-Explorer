import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route ,Link, Routes} from "react-router-dom";

import Nfts from"./Components/nfts" 
import Blocks from './Components/blocks';

function App() {
  return (
    <div className="App">
    <Router>
      <div style={{paddingTop: "50px"}}>
        <Link to="/">Home</Link>&nbsp;&nbsp;&nbsp;
        <Link to="blocks">Block page</Link>&nbsp;&nbsp;&nbsp;
        <Link to="nfts">MFTs page</Link>
      </div>
      <Routes>
        <Route exact path="/" element={<div><h1>Hello AU  😎 </h1><h3>click on Block  or NFTs menu</h3></div>} />
        <Route exact path="blocks" element={<Blocks />} />
        <Route exact path="nfts" element={<Nfts />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
