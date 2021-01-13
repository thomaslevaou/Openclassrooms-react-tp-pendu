# TP du jeu du pendu - OpenClassrooms - Formation React.js


TP du jeu de pendu proposé par OpenClassrooms dans sa formation sur React.js :
https://openclassrooms.com/fr/courses/4664381-realisez-une-application-web-avec-react-js/6734471-entrainez-vous-en-creant-un-jeu-du-pendu

A l'affichage de la page web, l'utilisateur peut saisir des lettres au clavier,
et en cas d'erreur, un pendu sera peu à peu dessiné au canvas.
Si l'utilisateur saisit une lettre déjà saisie, un message en rouge sera
affiché à l'utilisateur.
Si l'utilisateur saisit une lettre présente dans le mot sélectionné, alors celle-ci
sera affichée à l'écran à ou aux emplacements correspondants de la lettre dans le mot
(comme dans un jeu de pendu habituel).

La liste des lettres déjà entrées sera affichée et visible pour l'utilisateur.
Le nombre d'essais va être stocké et affiché à l'écran.
Seule les 26 lettres de l'alphabet latin sont utilisables dans ce jeu de pendu, et
sans signe diacritique (accent, cédille etc).

Si le nombre d'essais fait dessiner un pendu, la partie est perdue et un message correspondant
sera affiché à l'utilisateur.
Si le mot est trouvé avant le dessin du pendu, la partie est gagnée et un message
correspondant sera également affiché à l'utilisateur.

Que la partie soit gagnée ou perdue, un bouton pour recommencer la partie
sera affiché à l'utilisateur, et permettra de recommencer une partie.
