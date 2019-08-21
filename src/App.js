import React from 'react';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentGuess: '',
      masterWord: 'jaguar',
      progress: {},
      guessesLeft: 6,
      incorrectGuesses: [],
    }
  }

  componentDidMount() {
    const initialProgress = {};
    const { masterWord } = this.state;
    const masterWordLength = masterWord.length;
    masterWord.split('').forEach((letter, i) => {
      initialProgress[i] = {};
      initialProgress[i][letter] = false;
    });
    this.setState({progress: initialProgress, lettersRemaining: masterWordLength});
  }

  saveGuess = (event) => {
    this.setState({currentGuess: event.target.value});
  }

  evaluateGuess = (e) => {
    e.preventDefault();
    const { currentGuess, masterWord, guessesLeft, incorrectGuesses } = this.state;
    if (masterWord.indexOf(currentGuess) !== -1) {
      this.executeCorrectGuess();
    } else {
      incorrectGuesses.push(currentGuess);
      this.setState({guessesLeft: guessesLeft - 1, incorrectGuesses, currentGuess: '' });
    }
  }

  executeCorrectGuess = () => {
    const { progress, lettersRemaining, currentGuess } = this.state;
    let lettersLeft = lettersRemaining;
    for (var index in progress) {
      const letterValue = Object.keys(progress[index]).join();
      if (letterValue === currentGuess) {
        progress[index][letterValue] = true;
        lettersLeft = lettersLeft - 1;
      }
    }
    this.setState({ progress, currentGuess: '', lettersRemaining: lettersLeft });
  }

  render() {
    const { progress, guessesLeft, incorrectGuesses, lettersRemaining } = this.state;
    const wrongGuesses = incorrectGuesses.join(' ');
    let displayProgress = [];
    for (var letter in progress) {
      const letterValue = Object.keys(progress[letter]).join();
      const letterDisplay = progress[letter][letterValue] ? letterValue : "_";
      displayProgress.push(letterDisplay);
    }
    const winStatus = lettersRemaining === 0 ? <div>YOU WIN!</div> : null;
    const loseStatus = guessesLeft === 0 ? <div>you lose :(</div> : null;
    return (
      <div className="App">
        <form onSubmit={this.evaluateGuess}>
          <input type='text' value={this.state.currentGuess} onChange={this.saveGuess} />
          <input type="submit" value="GUESS" />
        </form>
        <div>{displayProgress.join(' ')}</div>
        <div>Guesses Left: {guessesLeft}</div>
        <div>Incorrect Guesses: {wrongGuesses}</div>
        {winStatus}
        {loseStatus}
      </div>
    );
  }
}

export default App;
