# Résumé du manuel DIGI-COMP II (DCII-manual.pdf)

## 1. Objectif du DIGI-COMP II
Le DIGI-COMP II est un ordinateur binaire mécanique éducatif. Il simule le fonctionnement d’un ordinateur numérique électronique, mais au ralenti et de manière visible (billes, leviers, guides), pour comprendre:
- la logique binaire,
- les registres,
- les opérations arithmétiques,
- la programmation de base.

Idée centrale: une bille simule une impulsion électrique, et les leviers (flip-flops) simulent des éléments logiques à deux états.

## 2. Architecture simplifiée
Le manuel décrit 3 registres principaux:
- MQ (3 bits): utilisé surtout pour multiplication/division.
- Mémoire M (4 bits): stocke l’opérande intermédiaire.
- Accumulateur A (7 bits): registre principal de calcul.

Éléments de contrôle importants:
- interrupteurs: MULTIPLY, CLEAR, COUNT, COMPLEMENT, OVERFLOW, AM (AUTO/MANUAL),
- START,
- DISTRIBUTOR (distribution cyclique des billes),
- logique de complément (CF1/CF2, modes ADD/COMPLEMENT).

## 3. Progression pédagogique du manuel
Le manuel suit une progression très structurée:
- Chapitres 1–4: prise en main + base binaire + opérations simples.
- Chapitres 5–11: approfondissement (octal, overflow, complément, division, fractions binaires).
- Chapitre 12: fiche opérationnelle complète.
- Chapitre 13: problèmes appliqués (simulation, itération, finance, etc.).
- Chapitre 14: passerelle vers FORTRAN sur ordinateurs commerciaux.

## 4. Concepts mathématiques clés

### 4.1 Binaire et conversion
- Lecture/écriture des nombres binaires.
- Conversion binaire <-> décimal.
- Usage des puissances de 2.
- Table de conversion (jusqu’à 127 en 7 bits).

### 4.2 Addition
- Règles de l’addition binaire (retenues/carry).
- Lecture mémoire vers accumulateur.
- Notions de lecture destructive vs non destructive.

### 4.3 Multiplication
- Multiplication par additions répétées.
- Importance du placement des opérandes (petit facteur dans MQ pour vitesse).
- Lien avec décalage gauche (shift) pour puissances de 2.
- Opération MULTIPLY-ADD (forme AxB+C).

### 4.4 Complément et soustraction
- Complément à 1 et complément à 2.
- Soustraction transformée en addition via complément.
- Représentation des nombres négatifs en complément.
- Cas limite discuté (bit de signe et valeur spéciale de type -64 en 7 bits).

### 4.5 Division
- Division par soustractions répétées (via complément + additions).
- Quotient via MQ.
- Procédure manuelle supplémentaire pour obtenir un reste non nul.

### 4.6 Fractions binaires
- Interprétation des fractions en base 2.
- Conversion fractions binaires -> décimales.
- Conversion décimales -> binaires (souvent périodique en binaire).
- Rôle de l’arrondi et de la précision finie.

## 5. Philosophie informatique transmise
Le manuel insiste sur des idées de fond encore actuelles:
- compromis précision/temps/coût,
- overflow et limites de capacité des registres,
- itération numérique,
- simulation pseudo-aléatoire,
- séparation entre langage humain, langage machine, et langage compilé.

## 6. Applications proposées (Chapitre 13)
Le manuel propose des exercices concrets programmables:
- géométrie (aires),
- physique (poids de l’air, poussée d’Archimède),
- itération (approximation de racines),
- séries infinies,
- croissance de population,
- génération de nombres pseudo-aléatoires,
- simulation d’un match de baseball,
- mini-problèmes comptables,
- calculs balistiques simplifiés.

Objectif: montrer qu’un même noyau d’opérations (add/sub/mult/div + logique) permet de traiter des domaines variés.

## 7. Chapitre 12 = mode opératoire condensé
Le chapitre 12 est une vraie feuille de route d’exploitation:
- initialiser correctement la machine,
- lire les registres,
- lancer COUNT/CLEAR/ADD/MULTIPLY/SUBTRACT/DIVIDE,
- traiter overflow,
- obtenir quotient et reste,
- enchaîner les commandes de manière reproductible.

C’est la partie la plus utile pour l’usage pratique quotidien de la machine.

## 8. Chapitre 14: passerelle DIGI-TRAN -> FORTRAN
Le manuel compare DIGI-TRAN à FORTRAN:
- DIGI-COMP: l’opérateur réalise manuellement des étapes.
- FORTRAN: la machine exécute automatiquement les étapes codées.
- Les expressions deviennent plus compactes (ex: A=5*13).
- Le calcul reste binaire en interne, même si l’entrée/sortie est souvent décimale.

Message principal: l’apprentissage sur DIGI-COMP II prépare aux principes de programmation des vrais ordinateurs.

## 9. En une phrase
Le PDF est un cours complet d’initiation à l’architecture et à la programmation des ordinateurs numériques, en partant d’une machine mécanique binaire didactique et en allant jusqu’aux notions de compilation et d’applications réelles.
