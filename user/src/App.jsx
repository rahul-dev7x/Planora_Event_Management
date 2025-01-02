import { Outlet } from "react-router-dom";
import Navbar from "./components/shared/Navbar";


const App = () => {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>

      
    </div>
  );
};

export default App;
