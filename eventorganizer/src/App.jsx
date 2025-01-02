import { Outlet } from "react-router-dom";



const App = () => {
  return (
    <div>
      
      <main className="min-h-screen">
        <Outlet />
      </main>

      
    </div>
  );
};

export default App;
