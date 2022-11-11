import "./App.css";
import Categories from "./Components/Categories";

function App() {
  return (
    <div>
      <h1 className="text-slate-800 font-lato font-bold">LOGO</h1>
      <h2 className="text-slate-800 font-mulish font-bold">Header</h2>
      <div>Navbar Placeholder</div>
      <div>
        <Categories />
      </div>
      <div>Highlights Placeholder</div>
      <div>
        <div>Recent Posts Placeholder</div>
        <div>Recent Events Placeholder</div>
      </div>
    </div>
  );
}

export default App;
