import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import ArticlePage from "./pages/ArticlePage";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/article/:id" element={<ArticlePage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;