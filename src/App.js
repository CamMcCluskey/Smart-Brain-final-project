import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation.js';
import Signin from './components/Signin/Signin.js';
import Register from './components/Register/Register.js';
import Logo from './components/Logo/Logo.js';
import Rank from './components/Rank/Rank.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import ParticlesBg from 'particles-bg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: 'false',
    };
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

  displayFaceBox = (box) => {
    this.setState({box});
    return box;
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    const raw = JSON.stringify({
      "user_app_id": {
      "user_id": "clarifai",
      "app_id": "main"
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": this.state.input
                }
            }
        }
    ]
  });

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + 'ccebc73580ab45c994bc710eee9dc5c1'
    },
    body: raw
  };

  fetch(`https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs`, requestOptions)
    .then(response => response.json())
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .then(response => console.log(response))
    .catch(error => console.log('error', error));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    return (
      <div className="App">
        <ParticlesBg type="cobweb" bg={true} num={150} className='particles' />
        <Navigation isSignedIn={ this.state.isSignedIn } onRouteChange={this.onRouteChange} />
        { this.state.route === 'home'
          ?<div>
            <Logo />
            <Rank />
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
            <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
          </div>
          : (this.state.route === 'signin'
            ?<div>
              <Signin onRouteChange={this.onRouteChange}/>
            </div>
            :<div>
              <Register onRouteChange={this.onRouteChange} />
            </div>)
      }
      </div>
    );
  }
}

export default App;
