# Digicomp 2 (Phaser)

## Aperçu
Ce projet est une version web du DIGI-COMP II (ordinateur binaire mécanique) avec:
- moteur Phaser,
- assets locaux (images, audio, JSON physiques),
- serveur local PowerShell prêt à l'emploi,
- fonctions de redimensionnement de la fenêtre de jeu.

## Prérequis
- Windows
- Node.js installé
- Navigateur moderne (Chrome, Edge, Brave, Firefox)

## Important: ne pas ouvrir en file://
Le jeu charge des ressources JSON/audio via XHR. En ouverture directe du fichier HTML (file://), le navigateur bloque ces chargements (CORS), ce qui provoque un écran noir.

Utiliser un serveur HTTP local.

## Lancer le jeu
Depuis le dossier du projet:

```powershell
powershell -ExecutionPolicy Bypass -File .\start-server.ps1
```

Par défaut, le serveur utilise le port 8080.

Ouvrir:
- http://localhost:8080/Digicomp%202.html

Si le port est déjà occupé:

```powershell
powershell -ExecutionPolicy Bypass -File .\start-server.ps1 -Port 8081
```

Ouvrir:
- http://localhost:8081/Digicomp%202.html

## Redimensionnement de la fenêtre de jeu
Des fonctions globales sont exposées dans la console du navigateur via window.Digicomp2.

Exemples:

```javascript
window.Digicomp2.resize(900, 700)   // largeur, hauteur
window.Digicomp2.fit()              // ajuste à la taille de la fenêtre
window.Digicomp2.autoResize(true)   // suit les redimensionnements navigateur
window.Digicomp2.autoResize(false)  // désactive le mode auto
```

Notes:
- Le rendu garde la base logique du jeu et adapte l'affichage.
- Une taille minimale est appliquée pour éviter une zone de jeu inutilisable.

## Fichiers principaux
- Digicomp 2.html: page d'entrée
- digicomp2.js: logique du jeu Phaser
- phaser.min.js: moteur Phaser
- assets/: ressources (images, audio, JSON)
- start-server.ps1: démarrage serveur local HTTP

## Documentation générée
- DCII-manual-summary.md: résumé structuré du manuel PDF
- DCII-manual-complete.md: transcription complète en Markdown du PDF
- DCII-manual.pdf: manuel original

## Dépannage rapide
1. Écran noir
- Vérifier que l'URL commence par http://localhost:
- Ne pas ouvrir Digicomp 2.html en double-clic (file://)

2. Port occupé
- Relancer start-server.ps1 avec un autre port (ex: 8081)

3. Page inaccessible
- Vérifier que le script serveur tourne toujours dans un terminal
- Tester l'URL avec le bon port

## Statut actuel du projet
- Assets présents localement
- Chargement via localhost validé
- Correctifs de stabilité JS appliqués (timers, comparaisons, robustesse)
- Redimensionnement à la demande disponible

## TODO
- Ajouter plus tard un panneau de programme pedagogique type DIGI-TRAN relie au plateau, avec execution visible instruction par instruction. Objectif: montrer le lien entre commande, etat logique et effet mecanique de facon plus claire qu'un compilateur purement abstrait.
