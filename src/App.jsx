import "./App.css";
import Menu from "./components/Menu";
import MainPage from "./components/MainPage";
import FavouritesPage from "./components/FavouritesPage";
import { BrowserRouter, Routes, Route } from "react-router";
import { FavouritesProvider } from "./FavouritesContext";

function App() {
  return (
    <FavouritesProvider>
      <BrowserRouter>
        <Menu />

        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/favourites" element={<FavouritesPage />} />
        </Routes>
      </BrowserRouter>
    </FavouritesProvider>
  );
}

export default App;
