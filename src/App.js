
import './App.css';
import Explore from './pages/Explore';
import Home from './pages/Home';
import MemeVerseLanding from './pages/MemeVerseLanding';
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import Upload from './pages/Upload';
import ErrorPage from './pages/ErrorPage';
import MemeDetails from './pages/MemeDetails';
import Navbar from './component/Navbar';

function App() {
  return (
    <div className="App">
    
     <Router> 
     <Navbar />
         <Routes>
         
          <Route path="/" element={<Home />} />
          <Route path="/meme/:id" element={<MemeDetails />} />
          <Route path="/landing" element={<MemeVerseLanding />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
 
    </Router>
    </div>
  );
}

export default App;
