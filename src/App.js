import React from 'react';
import './App.css';

// Importing all the components
import Header from './components/Header';
import Hero from './components/Hero';
import TrendingVenues from './components/TrendingVenues';
import Categories from './components/Categories';
import Recommendations from './components/Recommendations';
import Footer from './components/Footer';
import AIAssistant from './components/AIAssistant';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        <TrendingVenues />
        <Categories />
        <Recommendations />
      </main>
      <Footer />
      <AIAssistant />
    </div>
  );
}

export default App;