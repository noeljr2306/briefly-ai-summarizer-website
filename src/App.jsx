import Hero from "./Components/Hero";
import Navbar from "./Components/Navbar";
import "./index.css";
function App() {
  return (
    <>
      <main>
        <div className="main" />
        <div className="relative z-10 flex justify-center items-center flex-col max-w-7xl mx-auto sm:px-16 px-6">
          <Navbar />
          <Hero />
        </div>
      </main>
    </>
  );
}

export default App;
