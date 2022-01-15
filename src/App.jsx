import NavBar from "./components/navbar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="flex justify-center">
      <header className="w-full max-w-screen-2xl fixed z-10">
        <NavBar />
      </header>
      <main className="pt-16 pb-16 lg:pt-20 lg:pb-2 px-2 lg:px-4 w-full flex flex-col max-w-screen-2xl">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
