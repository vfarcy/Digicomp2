# Livret pedagogique DCII

## A propos de ce livret

Ce document est base sur le manuel du DIGI-COMP II present dans le projet:

- [DCII-manual.pdf](DCII-manual.pdf)
- [DCII-manual-summary.md](DCII-manual-summary.md)
- [DCII-manual-complete.md](DCII-manual-complete.md)

L'objectif n'est pas seulement de faire des exercices abstraits, mais de comprendre le lien entre:

- le plateau de jeu,
- les billes,
- les leviers et palettes,
- les registres A, M et MQ,
- les operations binaires,
- la logique d'un veritable ordinateur numerique simplifie.

Ce livret est volontairement pedagogique. Il commence par un cours, puis propose des exemples guides, ensuite des exercices progressifs, et enfin un corrige detaille.

---

## 1. Cours d'introduction

### 1.1 Qu'est-ce que le DCII ?

Le DIGI-COMP II est un ordinateur mecanique binaire. Le manuel explique qu'il a ete concu pour montrer visiblement et lentement comment fonctionne un ordinateur numerique.

Dans un ordinateur electronique:

- les impulsions sont electriques,
- les etats logiques changent tres vite,
- les calculs sont invisibles pour l'oeil.

Dans le DCII:

- une bille joue le role d'une impulsion,
- un levier joue le role d'un element logique,
- le chemin de la bille montre la decision prise,
- les changements d'etat sont visibles.

Autrement dit, le plateau est une machine pedagogique qui transforme une idee abstraite en mecanisme observable.

### 1.2 Comment lire le plateau ?

Le plateau visible dans le simulateur peut se lire comme une carte logique.

On y trouve:

- une zone d'entree des billes,
- des elements de decision qui orientent les billes,
- des registres mecaniques qui stockent un etat,
- un systeme de retour et de collecte,
- une zone de commande pour lancer, ralentir ou reinitialiser.

Quand une bille se deplace, elle ne fait pas qu'avancer. Elle interroge un etat, prend une decision de route, et parfois modifie ce meme etat.

C'est exactement ce que fait un ordinateur avec ses circuits logiques.

### 1.3 Les trois registres principaux

Le manuel insiste sur trois registres centraux.

#### A - L'accumulateur

L'accumulateur est le registre principal de calcul.

Il sert a:

- recevoir les additions,
- contenir les resultats intermediaires,
- porter le resultat final de nombreuses operations.

Dans le manuel, il contient 7 bits.

#### M - Le registre memoire

Le registre memoire contient une valeur que l'on veut lire ou ajouter dans l'accumulateur.

Il sert surtout a:

- fournir un nombre de travail,
- conserver une petite valeur stable,
- etre lu bit par bit.

Dans le manuel, il contient 4 bits.

#### MQ - Le registre multiplicateur / quotient

Le MQ sert a piloter la multiplication et la division.

Il est utilise comme:

- compteur de repetitions en multiplication,
- compteur de quotient en division.

Dans le manuel, il contient 3 bits.

### 1.4 Pourquoi parle-t-on de binaire ?

Le DCII travaille en base 2.

Cela signifie qu'un bit ne peut prendre que deux valeurs:

- 0
- 1

Les valeurs de position sont des puissances de 2.

Pour 7 bits, on lit en general:

- 64
- 32
- 16
- 8
- 4
- 2
- 1

Exemple:

`0110101`

correspond a:

- 0 fois 64
- 1 fois 32
- 1 fois 16
- 0 fois 8
- 1 fois 4
- 0 fois 2
- 1 fois 1

Donc:

$32 + 16 + 4 + 1 = 53$

### 1.5 Comment une operation se voit sur le plateau ?

Une operation n'apparait pas comme une formule. Elle apparait comme une sequence de mouvements.

Exemple pour une addition:

1. la bille entre,
2. elle passe par des points de lecture du registre memoire,
3. si un bit est actif, elle est envoyee vers une action sur l'accumulateur,
4. l'etat de l'accumulateur change,
5. la bille sort ou relance une suite.

Exemple pour une multiplication:

1. le systeme ajoute plusieurs fois le contenu de M dans A,
2. le MQ compte le nombre de cycles,
3. le plateau rejoue physiquement une suite d'additions.

Exemple pour une division:

1. on soustrait repetitivement,
2. le quotient se construit dans MQ,
3. un depassement permet de detecter que l'on est alle trop loin,
4. on corrige pour obtenir quotient et eventuellement reste.

### 1.6 Le role des commandes visibles dans le simulateur

Le simulateur propose des commandes simples mais importantes.

#### INITIALIZE

Cette commande remet le plateau dans un etat de depart coherent.

Pedagogiquement, elle est essentielle car elle permet de comparer deux essais dans les memes conditions.

#### SPEED+ et SPEED-

Ces commandes modifient la vitesse apparente du systeme.

Leur interet pedagogique:

- en vitesse lente, on observe les details,
- en vitesse rapide, on comprend mieux le resultat global.

### 1.7 Le complement et la soustraction

Le manuel montre que la soustraction n'est pas realisee comme en arithmetique scolaire. Elle passe par le complement.

Idee simple:

- pour calculer $A - B$, on peut calculer $A + (complement\ de\ B)$

Cela permet d'utiliser la meme logique mecanique pour l'addition et la soustraction.

C'est une idee fondamentale en architecture des ordinateurs.

### 1.8 Pourquoi le plateau est un vrai support de cours

Le DCII permet d'apprendre en meme temps:

- la representation binaire,
- la lecture d'un registre,
- la logique des etats,
- le cout mecanique d'une operation,
- les limites d'un registre,
- la notion d'overflow,
- la programmation d'une procedure.

Le plateau n'est donc pas un simple jeu. C'est un modele concret de calcul numerique.

---

## 2. Exemples guides

### Exemple 1 - Lire un nombre sur l'accumulateur

Supposons que l'accumulateur montre `0001101`.

Lecture:

- 8 actif
- 4 actif
- 1 actif

Donc:

$8 + 4 + 1 = 13$

Ce qu'il faut observer sur le plateau:

- les leviers representent des bits,
- leur position traduit l'etat 0 ou 1,
- l'ensemble forme la valeur du registre.

### Exemple 2 - Comprendre une addition simple

On veut ajouter 13 et 9.

En binaire:

- 13 = `0001101`
- 9 = `0001001`

Addition:

$13 + 9 = 22$

En binaire:

`0010110`

Ce qu'il faut comprendre sur le plateau:

- la machine ne pense pas en decimal,
- elle lit des bits,
- elle additionne par transport et bascules,
- le resultat final peut ensuite etre relu en decimal.

### Exemple 3 - Pourquoi 5 x 9 et 9 x 5 ne coutent pas pareil sur la machine

Mathatiquement:

$5 \times 9 = 9 \times 5 = 45$

Mais sur le DCII, si MQ contient le multiplicateur, alors:

- mettre 5 dans MQ signifie 5 cycles,
- mettre 9 dans MQ signifie 9 cycles.

Conclusion pedagogique:

Le choix des registres influence le temps de calcul, meme si le resultat final est identique.

### Exemple 4 - Idee de division avec reste

On veut faire:

$50 \div 11$

Resultat decimal:

- quotient = 4
- reste = 6

Ce que montre le plateau:

- on repete une operation de retrait,
- le quotient se construit progressivement,
- le systeme depasse au cycle de trop,
- une correction permet de recuperer le reste.

---

## 3. Conseils de manipulation sur le simulateur

1. Toujours commencer un exercice par INITIALIZE si l'on veut comparer des essais.
2. Utiliser SPEED- pour comprendre, SPEED+ pour verifier la fluidite globale.
3. Noter les observations dans l'ordre des evenements.
4. Distinguer ce qui est logique de ce qui est seulement visuel.
5. Refaire deux fois une manipulation avant de conclure.

---

## 4. Exercices progressifs centres sur le plateau

## Serie A - Observer et decrire

### Exercice A1 - Cartographie du plateau

But:

Identifier les grandes zones fonctionnelles du plateau.

Consigne:

1. Lance le jeu.
2. Repere la zone d'entree des billes.
3. Repere la zone des leviers logiques.
4. Repere la zone trigger/levier en bas a droite.
5. Repere la zone de retour et de collecte.
6. Fais un schema simple avec 4 zones numerotees.

Travail attendu:

- un petit schema,
- une phrase par zone.

### Exercice A2 - Panneau de commande

But:

Comprendre le role des commandes visibles.

Consigne:

1. Clique INITIALIZE.
2. Note la valeur SPEED.
3. Clique SPEED+ trois fois.
4. Clique SPEED- deux fois.
5. Observe la difference de mouvement des billes.

Travail attendu:

- tableau a 3 colonnes: action, valeur SPEED, effet observe.

### Exercice A3 - Vitesse et lisibilite

But:

Comprendre pourquoi on ralentit une machine pedagogique.

Consigne:

1. Place une vitesse lente.
2. Lance une sequence.
3. Observe un basculement de levier.
4. Mets ensuite une vitesse plus rapide.
5. Rejoue la meme sequence.
6. Compare.

Travail attendu:

- deux avantages du mode lent,
- un avantage du mode rapide.

## Serie B - Logique du plateau

### Exercice B1 - Suivre une bille

But:

Decrire une trajectoire complete de bille.

Consigne:

1. Lance INITIALIZE.
2. Choisis une bille.
3. Suis-la de l'entree a la sortie.
4. Note au moins 3 points de decision ou de deviation.

Travail attendu:

- une description chronologique en 4 a 6 etapes.

### Exercice B2 - Etat d'un levier et changement de route

But:

Montrer qu'un etat memoire modifie la suite du calcul.

Consigne:

1. Clique un levier ou un element basculant.
2. Lance une sequence.
3. Observe la route prise par la bille.
4. Remets le levier dans l'etat oppose.
5. Rejoue.
6. Compare.

Travail attendu:

- une phrase du type: "quand le levier est dans tel etat, la bille va vers..."

### Exercice B3 - Trigger et causalite

But:

Relier une action manuelle a un effet logique sur le plateau.

Consigne:

1. Actionne le trigger.
2. Observe le delai.
3. Observe le mouvement induit sur un autre element.
4. Observe l'effet final sur une bille ou sur un chemin.

Travail attendu:

- une chaine de causalite en trois ou quatre maillons.

## Serie C - Registres et operations

### Exercice C1 - Lire un etat de registre

But:

Lire une valeur binaire visible sur le plateau et la convertir en decimal.

Consigne:

1. Observe un etat du registre A.
2. Ecris la suite binaire.
3. Convertis-la en decimal.
4. Verifie avec la table du manuel si besoin.

Travail attendu:

- le mot binaire,
- le calcul decimal detaille.

### Exercice C2 - Addition sur le plateau

But:

Relier addition binaire et lecture physique du plateau.

Consigne:

1. Prends l'exemple 13 + 9.
2. Ecris les deux nombres en binaire.
3. Observe comment le plateau semble lire M et affecter A.
4. Donne le resultat final en binaire et en decimal.

Travail attendu:

- nombre 1,
- nombre 2,
- resultat,
- commentaire sur la lecture des bits.

### Exercice C3 - Multiplication et temps de calcul

But:

Voir que la machine ne coute pas le meme temps selon l'organisation.

Consigne:

1. Compare 9 x 5 et 5 x 9.
2. Note quel facteur joue le role de compteur de cycles.
3. Chronometre les deux versions.
4. Explique pourquoi l'une est plus economique.

Travail attendu:

- une phrase mathematique,
- une phrase mecanique.

### Exercice C4 - Soustraction par complement

But:

Comprendre une idee majeure du manuel.

Consigne:

1. Prends l'exemple 15 - 9.
2. Explique en mots simples pourquoi on peut transformer cette soustraction en addition.
3. Observe le comportement du plateau si tu realises la procedure.
4. Donne le resultat final.

Travail attendu:

- une explication courte du complement,
- le resultat decimal attendu.

### Exercice C5 - Division avec reste

But:

Observer le moment ou la machine va trop loin.

Consigne:

1. Realise 50 / 11.
2. Observe a quel moment le systeme depasse.
3. Termine la procedure manuelle.
4. Donne quotient et reste.
5. Explique pourquoi la correction est necessaire.

Travail attendu:

- quotient,
- reste,
- phrase d'explication.

## Serie D - Analyse de comportement

### Exercice D1 - Sequence stable

But:

Verifier qu'une meme condition initiale donne un comportement repetable.

Consigne:

1. Choisis une vitesse fixe.
2. Clique INITIALIZE.
3. Lance 3 fois la meme sequence.
4. Note les evenements identiques.
5. Note les petites differences eventuelles.

Travail attendu:

- tableau: essai 1, essai 2, essai 3.

### Exercice D2 - Diagnostic d'une anomalie

But:

Apprendre a raisonner comme un technicien.

Consigne:

1. Provoque un comportement inattendu.
2. Formule deux hypotheses.
3. Teste la premiere.
4. Teste la seconde.
5. Choisis la cause la plus probable.
6. Propose un correctif.

Travail attendu:

- symptome,
- hypotheses,
- test,
- conclusion.

### Exercice D3 - Mini TP complet

But:

Faire un enchainement complet de manipulation et d'analyse.

Consigne:

1. Initialise.
2. Observe un cycle simple.
3. Fais une addition.
4. Fais une multiplication.
5. Fais une division.
6. Utilise le trigger.
7. Conclus sur le fonctionnement global du plateau.

Travail attendu:

- journal d'observation de 6 lignes minimum.

---

## 5. Corrige detaille

### Corrige A1 - Cartographie du plateau

Reponse possible:

1. Zone d'entree: en haut, c'est le point de depart des billes.
2. Zone logique centrale: les leviers y stockent des etats et orientent les trajectoires.
3. Zone trigger: en bas a droite, elle permet une action mecanique supplementaire.
4. Zone de retour/collecte: elle termine le cycle des billes.

Ce qu'il faut retenir:

Le plateau se lit comme un schema de machine, pas seulement comme un decor.

### Corrige A2 - Panneau de commande

Reponse attendue:

- INITIALIZE remet la machine dans un etat de depart.
- SPEED+ augmente la vitesse apparente du systeme.
- SPEED- la diminue.
- L'affichage SPEED donne une mesure pratique du rythme d'execution.

Pedagogie:

Le panneau sert a ajuster le niveau d'observation de la machine.

### Corrige A3 - Vitesse et lisibilite

Exemple de reponse:

- En lent, on voit mieux les bascules et les changements d'etat.
- En lent, on suit mieux une seule bille.
- En rapide, on comprend plus vite le resultat final d'une operation.

Conclusion:

Le mode lent sert a apprendre. Le mode rapide sert a verifier.

### Corrige B1 - Suivre une bille

Reponse attendue:

Une bonne reponse decrit une suite du type:

1. la bille entre par le haut,
2. elle rencontre un premier element de decision,
3. elle est detournee vers une autre zone,
4. elle provoque ou non une bascule,
5. elle finit en bas ou dans une zone de retour.

L'important est l'ordre logique des evenements.

### Corrige B2 - Etat d'un levier et changement de route

Reponse attendue:

Si un levier change d'etat, le chemin de la bille suivante peut changer. Cela montre qu'on a bien une memoire mecanique.

Conclusion attendue:

"L'etat courant du levier influence la decision suivante du systeme."

### Corrige B3 - Trigger et causalite

Reponse attendue:

- Action utilisateur sur le trigger
- mouvement du mecanisme associe
- modification d'un angle, d'une collision ou d'un passage
- effet final sur la trajectoire d'une bille

C'est une bonne reponse si la chaine de cause a effet est clairement decrite.

### Corrige C1 - Lire un etat de registre

Exemple:

Si l'on lit `0001101`, alors:

$8 + 4 + 1 = 13$

Ce qu'on attend:

- une lecture correcte des bits actifs,
- une conversion vers le decimal.

### Corrige C2 - Addition sur le plateau

Pour 13 + 9:

- 13 = `0001101`
- 9 = `0001001`
- resultat = `0010110`
- valeur decimale = 22

Interpretation mecanique attendue:

Le registre memoire est lu bit par bit, puis le plateau transfere les effets utiles vers l'accumulateur.

### Corrige C3 - Multiplication et temps de calcul

Reponse attendue:

- 9 x 5 et 5 x 9 donnent 45.
- Mais si MQ contient 9, la machine doit compter davantage de cycles que si MQ contient 5.
- Le plus petit facteur doit etre place dans MQ pour reduire le cout mecanique.

Conclusion:

La machine montre concretement qu'un meme calcul peut etre plus ou moins couteux.

### Corrige C4 - Soustraction par complement

Pour 15 - 9:

- le resultat correct est 6.
- le principe attendu est: remplacer une soustraction par une addition du complement.

Phrase pedagogique attendue:

"Le complement permet d'utiliser la meme logique materielle que l'addition pour faire une soustraction."

### Corrige C5 - Division avec reste

Pour 50 / 11:

- quotient = 4
- reste = 6

Explication attendue:

La machine repete une operation jusqu'au premier depassement. Ce depassement montre que le cycle precedent etait le dernier complet valide. Une correction permet ensuite d'extraire le reste exact.

### Corrige D1 - Sequence stable

Bonne conclusion attendue:

Si l'etat initial est le meme, les grands evenements doivent etre globalement repetables. Si la sequence change fortement, il faut verifier les conditions initiales ou une action manuelle precedente.

### Corrige D2 - Diagnostic d'une anomalie

Exemple de reponse:

- Symptome: la bille ne prend pas le chemin attendu.
- Hypothese 1: un levier n'est pas dans l'etat initial.
- Hypothese 2: la vitesse est trop elevee pour observer correctement.
- Test 1: INITIALIZE puis relancer.
- Test 2: ralentir avec SPEED-.
- Conclusion: la cause la plus probable est l'etat initial ou la mauvaise lisibilite.

### Corrige D3 - Mini TP complet

Ce qu'on attend:

Une synthese montrant que l'eleve a compris:

- comment lancer proprement une sequence,
- comment observer les interactions du plateau,
- comment relier ces interactions a une operation logique,
- comment conclure sur le fonctionnement general du DCII.

---

## 6. Grille d'evaluation

### Critere 1 - Observation du plateau

- localisation correcte des zones
- description correcte des trajectoires
- usage pertinent du panneau de commande

### Critere 2 - Comprendre la logique

- lien entre leviers et etats memoire
- lecture correcte des registres
- lien entre cycles mecaniques et operations binaires

### Critere 3 - Methode

- observations ordonnees
- hypotheses claires
- conclusions justifiees

### Critere 4 - Expression

- vocabulaire clair
- phrases courtes et precises
- capacite a decrire un phenomene mecanique et logique

Bareme conseille:

- Observation: 6 points
- Logique: 6 points
- Methode: 4 points
- Expression: 4 points

Total conseille: /20
