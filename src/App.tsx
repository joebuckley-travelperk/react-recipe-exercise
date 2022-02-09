import React from "react";

import { Routes, Route } from "react-router-dom";

import "./App.css";
import Navbar from "./components/NavBar";
import AddRecipe from "./pages/AddRecipe";
import ViewRecipe from "./pages/ViewRecipe";
import DetailsPage from "./pages/DetailPage";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="add" element={<AddRecipe />} />
        <Route path="/" element={<ViewRecipe />} />
        <Route path="details/:id" element={<DetailsPage />} />
      </Routes>
    </div>
  );
}

export default App;
