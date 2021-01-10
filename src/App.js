import React, { Component } from 'react'
import './App.css';

const WORDS = ['TELEPHONE', 'CASQUE', 'ORDINATEUR', 'SOURIS', 'CHAT', 'CHIEN', 'GALETTE', 'SPAGHETTI']

/** @author TLV 27/12/2020
* @brief Réalisation du jeu du pendu, proposé en TP par OpenClassrooms dans le cadre
*       de la formation sur React.js
* @details Voir le Readme pour la spec détaillée
*/
class App extends Component {

  /** @brief state de notre jeu de pendu
  * @param word phrase est en state, car il peut changer si l'utilisateur décide
  *        de relancer une partie.
  * @param usedLetters est un Set (càd un tableau où chaque valeur doit être unique)
  *        contenant la liste des lettres entrées par l'utilisateur. */
  state = {
    word: this.pickRandomWord(),
    usedLetters: new Set([])
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

  render () {
    const {word, usedLetters} = this.state
    return (
      <div className="mainContent">
        <div className="gameTitle">
          Jeu du Pendu
        </div>
        <div className="rules">
          Tapez une lettre au clavier pour vérifier si elle fait partie du mot caché ci-dessous. <br/>
          En cas d'erreur, un pendu va peu à peu être dessiné !
        </div>
        <div className="lettersToGuess">
          { this.computeDisplay(word, usedLetters) }
        </div>
        {usedLetters.size > 0 && <div className="usedLetters">Lettres déjà utilisées : </div>}
      </div>
    )
  }
}

export default App;
