import './App.css';
import './resource/css/style.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Header from './layout/Header';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Board from './pages/Board';
import Footer from "./layout/Footer";
import ContactUs from "./pages/ContactUs";

function App() {
  return (
      <BrowserRouter>
        <div className="App">
            <body className="sub">
                <div id="wrap">
                  <Header />
                  <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/board" element={<Board />} />
                      <Route path="/contact-us" element={<ContactUs />} />
                  </Routes>
                  <Footer/>
                </div>
            </body>
        </div>
      </BrowserRouter>
  );
}

export default App;
