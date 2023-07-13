import './App.css';
// import { useState } from 'react';
import Container from './Components/Container';
import io from "socket.io-client"


function App() {
  return (
    <div className="App">
      <Container/>
    </div>
  );
}

export default App;
