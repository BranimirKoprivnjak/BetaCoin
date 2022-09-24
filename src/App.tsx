import Dashboard from './components/Dashboard/Dashboard';
import Sidebar from './components/Sidebar/Sidebar';
import Portfolio from './components/Portfolio/Portfolio';
import * as classes from './App.module.css';

const App = () => {
  return (
    <>
      <div className={classes.container}>
        <Sidebar />
        <Dashboard />
        <Portfolio />
      </div>
    </>
  );
};

export default App;
