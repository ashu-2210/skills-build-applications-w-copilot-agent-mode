import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <header>
          <h1>OctoFit Tracker</h1>
          <p>Modern multi-tier fitness app for teams, activities, and workouts.</p>
          <nav>
            <NavLink to="/">Users</NavLink>
            <NavLink to="/teams">Teams</NavLink>
            <NavLink to="/activities">Activities</NavLink>
            <NavLink to="/workouts">Workouts</NavLink>
            <NavLink to="/leaderboard">Leaderboard</NavLink>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
