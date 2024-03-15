import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddOrUpdate from "./pages/addOrUpdate";
import ShowData from "./pages/ShowData";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addOrUpdate/:id?" element={<AddOrUpdate />} />
          <Route path="/details/:id?" element={<ShowData />} />
          <Route path="/*" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
