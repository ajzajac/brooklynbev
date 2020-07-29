import React from 'react';
import './App.css';
import MainContainer from './containers/MainContainer'
import Title from './components/Title'
import NavBar from './components/NavBar'

function App() {
  return (
    <div className="App">
      <Title />
      <NavBar />
      <MainContainer/>
    </div>
  );
}

export default App;
