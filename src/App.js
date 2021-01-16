import React, { Component } from 'react'
import './App.css';
import pendu1 from './images/pendu_1.png'
import pendu2 from './images/pendu_2.png'
import pendu3 from './images/pendu_3.png'
import pendu4 from './images/pendu_4.png'
import pendu5 from './images/pendu_5.png'
import pendu6 from './images/pendu_6.png'
import pendu7 from './images/pendu_7.png'
import pendu8 from './images/pendu_8.png'
import pendu9 from './images/pendu_9.png'
import pendu10 from './images/pendu_10.png'

const WORDS = ['TELEPHONE', 'CASQUE', 'ORDINATEUR', 'SOURIS', 'CHAT', 'CHIEN', 'GALETTE', 'SPAGHETTI']

/** @author TLV 27/12/2020
* @brief Réalisation du jeu du pendu, proposé en TP par OpenClassrooms dans le cadre
*       de la formation sur React.js
* @details Voir le Readme pour la spec détaillée
*/

const MAX_ATTEMPT_BEFORE_LOST = 10;

const IMG_LIST = {
  1 : pendu1,
  2 : pendu2,
  3 : pendu3,
  4 : pendu4,
  5 : pendu5,
  6 : pendu6,
  7 : pendu7,
  8 : pendu8,
  9 : pendu9,
  10 : pendu10
}

class App extends Component {

  /** @brief state par défaut de notre jeu de pendu
  * @param word phrase est en state, car il peut changer si l'utilisateur décide
  *        de relancer une partie.
  * @param usedLetters est un Set (càd un tableau où chaque valeur doit être unique)
  *        contenant la liste des lettres entrées par l'utilisateur. */
  state = {
    usedLetters: new Set([]),
    word: this.pickRandomWord(),
    letterValue: '',
    attemptsNumber: 0,
    failedAttemptsNumber: 0
  }

  hiddenWord = this.computeDisplay(this.state.word, this.state.usedLetters)

  constructor () {
    super();
    this.letterInput = React.createRef();
  }

  // Arrow function for binding with props in the JSX
  resetGame = () => {
    let randomWord = this.pickRandomWord()
    let usedLetters = new Set([])
    this.setState(() => ({ usedLetters: usedLetters,
        word: randomWord,
        letterValue: '',
        attemptsNumber: 0,
        failedAttemptsNumber: 0 }))
    this.hiddenWord = this.computeDisplay(randomWord, usedLetters)
  }

  // Sélection d'un mot aléatoire dans la liste
  pickRandomWord () {
    return WORDS[Math.floor(Math.random() * WORDS.length)]
  }

  /* Fonction fournie dans l'énoncé pour afficher les underscores ou les lettres trouvées
  *  Rappel: g permet de rechercher plusieurs fois dans une chaîne */
  computeDisplay (phrase, usedLetters) {
    return phrase.replace(/\w/g, (letter) => (usedLetters.has(letter) ? ' ' + letter + ' ' : ' _ '))
  }

  // Arrow function for binding with props in the JSX
  checkIfLetterInName = event => {
    if (!this.isWon() && !this.isLost()) {
      let { word, usedLetters, attemptsNumber, failedAttemptsNumber } = this.state
      let letter = event.target.value.replace(/[^a-zA-Z]/, '').toUpperCase()

      const newAttemptNumber = attemptsNumber + 1
      const newFailedAttemptsNumber = failedAttemptsNumber + 1
      this.setState({ attemptsNumber: newAttemptNumber })
      if (!usedLetters.has(letter)) {
        usedLetters.add(letter)
        this.setState({ usedLetters: usedLetters })
        if (word.includes(letter)) {
          this.hiddenWord = this.computeDisplay(word, usedLetters)
        } else {
          this.setState({ failedAttemptsNumber: newFailedAttemptsNumber })
        }
      } else {
        alert('Cette lettre a déjà été utilisée. Veuillez en saisir une autre')
        this.setState({ failedAttemptsNumber: newFailedAttemptsNumber })
      }
    }
  }

  isWon () {
    return this.hiddenWord.replace(/\s/g, '') === this.state.word
  }

  isLost () {
    return this.state.failedAttemptsNumber === MAX_ATTEMPT_BEFORE_LOST
  }

  // Pour garder le focus même si l'utilisateur clique sur la page
  // Arrow function for binding with props in the JSX
  keepFocus = () => {
    this.letterInput.current.focus()
  }

  render () {
    // Cast from Set to Array mandatory for showing through map in JSX
    const {usedLetters, attemptsNumber, failedAttemptsNumber} = this.state
    const usedLettersArray = Array.from(usedLetters)
    const won = this.isWon()
    const lost = this.isLost()
    return (
      <div className="mainContent" onClick={this.keepFocus}>
        <div className="gameTitle">
          Jeu du Pendu
        </div>
        <div className="rules">
          Tapez une lettre au clavier pour vérifier si elle fait partie du mot caché ci-dessous. <br/>
          En cas d'erreur, un pendu va peu à peu être dessiné !
        </div>
        <div className="lettersToGuess">
          { this.hiddenWord }
        </div>
        {usedLettersArray.length > 0 &&
          <div className="usedLetters">Lettres déjà utilisées :
          {usedLettersArray.map(letter => (
            <span key={letter}> {letter}</span>
          ))}
          </div>}
          <br/>
        <div>Nombre d'entrées utilisateur pour ce mot : { attemptsNumber }</div>
        <br/>
        { won && <div>Bravo ! Vous avez gagné. </div>}
        { lost && <div>Oh non ! Vous avez perdu. </div>}
        { (won || lost) && <div><br/> Cliquez sur le bouton suivant pour recommencer une partie : <br/>
          <button type="submit" className="btn btn-lg formButton" onClick={this.resetGame}>Recommencer une partie</button></div>}
        { (failedAttemptsNumber > 0) && <div><img src={IMG_LIST[failedAttemptsNumber]} alt="Illustration du pendu"
                                                height="200px" width="200px" /></div>}
        <input type="text" className="invisibleTextInput" value={this.state.letterValue}
               ref={this.letterInput} onChange={this.checkIfLetterInName} autoFocus />
      </div>
    )
  }
}

export default App;
