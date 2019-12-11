import React from 'react';
import './App.scss';
import firebase from 'firebase/app';
import firebaseConnection from '../helpers/data/connection';
import Auth from '../components/Auth/Auth';

firebaseConnection();

class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;

    return (
      <div className="App">
          {
            (authed) ? (<div>You logged in</div>) : (<Auth />)

          }
      </div>
    );
  }
}

export default App;
