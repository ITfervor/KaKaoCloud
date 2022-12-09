import { Routes, Route } from "react-router-dom";
import About from "./About";
import Home from "./Home";
import Profile from "./Profile";

import Article from "./Article";
import Articles from "./Articles";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/profile/:username" element={<Profile />} />
      {/* <Route path="/articles" element={<Articles />} />
      <Route path="/articles/:id" element={<Article />} /> */}
    </Routes>
  );
}

export default App;
