import "./App.css";
import Menu from "./components/Menu";
import MainPage from "./components/MainPage";
import FavouritesPage from "./components/FavouritesPage";
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  return (
    <>
      <BrowserRouter>
        <Menu />

        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/favourites" element={<FavouritesPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
