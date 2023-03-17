import React from 'react';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import Rank from './components/Rank/Rank.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import ParticlesBg from 'particles-bg';
import './App.css';

function App() {
  return (
    <div className="App">
      <ParticlesBg type="cobweb" bg={true} num={150} className='particles' />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
      {/*<FaceRocognition />*/}
    </div>
  );
}

export default App;
