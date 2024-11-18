import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import TabletList from './components/TabletList';
import TopTablets from './components/TopTablets';
import CheapestTablets from './components/CheapestTablets';  // Import CheapestTablets
import NavigationBar from './NavigationBar';

const App: React.FC = () => {
  return (
    <>
      <NavigationBar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tabletek-lista" element={<TabletList />} />
          <Route path="/toptablets" element={<TopTablets />} />  {/* TopTablets route */}
          <Route path="/cheapesttablets" element={<CheapestTablets />} />  {/* CheapestTablets route */}
        </Routes>
      </Router>
    </>
  );
};

export default App;
