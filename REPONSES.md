# Réponses

## Étape 1

**Q1.1** `TypeError: Cannot add property 8, object is not extensible`. freeze rend le tableau non modifiable, donc une modif par erreur plante direct.

**Q1.2** Pas d'erreur. La carte s'affiche comme une commune (pas de couleur, badge gris). On peut le détecter avec `parseRarity` ou TypeScript.

**Q1.3** Pour le créer une seule fois au lieu d'à chaque appel.

**Q1.4** Une expression JS. Pas de `if`, on fait un ternaire ou `&&`.

## Étape 2

**Q2.1** `type` c'est la fonction `CardTile`, `props` est vide. Pas de HTML, c'est un objet JS : un élément React.

**Q2.2** 1 composant (`CardTile`), 3 éléments `<CardTile />`, 3 instances. Composant = la fonction. Élément = l'objet qui décrit quoi afficher. Instance = un exemplaire du composant à l'écran.

**Q2.3** Rien ne s'affiche, React crée une balise HTML `<cardtile>` vide. Warning : `The tag <cardTile> is unrecognized in this browser`. La majuscule c'est ce qui dit à React que c'est un composant et pas une balise HTML.

**Q2.4** Là c'est juste un appel de fonction, React ne voit pas de composant. Pas d'instance à part, donc les hooks se retrouvent dans le parent et ça casse.

## Étape 3

**Q3.1** Ça plante à l'affichage : `Cannot read properties of undefined (reading 'rarity')`. Rien ne prévient quand on écrit le code.

**Q3.2** Si `label` est `undefined`, il prend la valeur de `rarity`. Avec `label="Légendaire"` le badge affiche Légendaire, la couleur reste celle de la rareté.

**Q3.3** Les props sont en lecture seule et un composant doit être pur. Là on modifie l'objet du parent, React ne le voit pas et l'affichage devient imprévisible.

**Q3.4** `children` c'est ce qu'on met entre les balises `<Panel>...</Panel>`. On peut mettre n'importe quel JSX dedans, comme en HTML, sans que Panel ait besoin de savoir ce que c'est.

## Étape 4

**Q4.1** `Each child in a list should have a unique "key" prop`. La key permet à React de savoir quel élément est lequel d'un rendu à l'autre.

**Q4.2** L'index change si on retire ou trie des cartes, donc React mélange les états. L'index passe si la liste ne bouge jamais.

**Q4.3** Ça affiche `0`. `0 && ...` renvoie 0 et React l'affiche. Il faut écrire `card.quantity > 0 && ...`.

**Q4.4** « Aucune carte à afficher. »

**Q4.5** `filter(isRare)`. Elle renvoie un nouveau tableau sans toucher l'original.

## Étape 5

**Q5.1** Rien ne bouge. Changer une variable ne déclenche pas de rendu, et elle repart de zéro à chaque rendu.

**Q5.2** L'ancienne. Le state ne change qu'au prochain rendu.

**Q5.3** +1 seulement, les deux appels lisent la même valeur. Avec `q => q + 1`, chaque appel part du résultat du précédent, donc +2.

**Q5.4** Erreur `rules-of-hooks` : les hooks doivent être appelés dans le même ordre à chaque rendu, sinon React mélange les states.

**Q5.5** Chaque compteur garde son state pour lui, le header n'y a pas accès.

## Étape 6

**Q6.1** Rien ne se met à jour. On renvoie le même tableau, donc React croit que rien n'a changé. freeze ne protège que le tableau, pas les objets dedans.

**Q6.2** Tout se calcule depuis `cards`. En state, on risquerait d'avoir une valeur pas à jour.

**Q6.3** QuantityControl ne connaît pas l'id de la carte, la fonction fléchée l'ajoute.

**Q6.4** Fait (`resetQuantities` dans useCards).

**Q6.5**
```
App (cards)
 ├─ Summary          ↓ cards
 └─ CardGrid         ↓ cards, ↑ onQuantityChange / onRemove
     └─ CardTile     ↓ card
         └─ QuantityControl  ↓ quantity, ↑ onChange(±1)
```

## Étape 7

**Q7.1** App a besoin de la recherche pour filtrer la grille, donc il faut qu'elle soit dans App.

**Q7.2** C'est calculé depuis cards + filtres. En state, ça ne suivrait pas un changement de quantité ou une suppression.

**Q7.3** `setQuery` est déjà une fonction qui prend le nouveau texte.

**Q7.4** Fait (recherche sur `card.set` aussi).

**Q7.5** Oui, il est juste : tout est recalculé à chaque rendu.

## Étape 8

**Q8.1** C'est le StrictMode en dev qui monte, démonte et remonte pour tester le cleanup. Ça n'arrive pas en prod.

**Q8.2** 2 fois, il reste un écouteur en trop. Le cleanup évite d'empiler les écouteurs.

**Q8.3** Le titre reste figé. Le linter râle sur une dépendance manquante. Sans tableau, l'effet tourne à chaque rendu.

**Q8.4** Ça fait un rendu en plus, et pendant un rendu la valeur est fausse. Un simple calcul suffit.

**Q8.5** Le rendu doit être pur, et toucher au DOM c'est un effet de bord.

## Étape 9

**Q9.1** Une fonction async renvoie une promesse, et React attend une fonction de cleanup.

**Q9.2** `HTTP 404`. Sans le test, on parserait la réponse d'erreur comme si c'était la liste.

**Q9.3** 2, à cause du StrictMode. `ignore` fait qu'on ignore la réponse du premier montage.

**Q9.4** On demande l'id 1, puis l'id 2. Si la réponse de 1 arrive après celle de 2, elle écrase les bonnes données. `ignore` jette la réponse périmée.

**Q9.5** `rules-of-hooks` : un hook après un return n'est pas appelé à chaque rendu.

**Q9.6** On ne peut pas avoir d'état incohérent, par exemple `isLoading` à true en même temps qu'une erreur.

## Étape 10

**Q10.1** Il n'y a pas de JSX dedans.

**Q10.2** 2 requêtes (4 en dev), et les grilles sont indépendantes. Un hook partage la logique, pas les données.

**Q10.3** Le linter ne le verrait plus comme un hook et ne vérifierait plus les règles.

**Q10.4** Il fait un effet de bord (le titre), il n'a rien besoin de renvoyer.

## Étape 11

**Q11.1** `favoriteIds` et `toggleFavorite` dans App, CardGrid et CardTile, juste pour les faire passer.

**Q11.2** Ça plante avec l'erreur du hook. Au moins on voit tout de suite le problème.

**Q11.3** Non, ils vivent dans le state de FavoritesProvider. Le Context ne fait que les transmettre.

**Q11.4** Tous les composants qui lisent le contexte. Si ça change souvent, ça fait beaucoup de rendus.

## Étape 12

**Q12.1** La page se recharge avec les champs dans l'URL, et la carte disparaît.

**Q12.2** Il y a un champ `nme` en plus dans le brouillon. JS ne vérifie pas les noms de champs.

**Q12.3** Elles se calculent depuis le brouillon, pas besoin de les stocker.

**Q12.4** Fait, `type="button"`, sinon il soumet le formulaire.

**Q12.5** Non, c'est un petit formulaire, c'est rapide.

**Q12.6** Ça vérifie que la valeur est bien une rareté valide.

## Étape 13

**Q13.1** `null` au premier rendu, le nœud dans `handleClear`. La ref est remplie après le rendu.

**Q13.2** Changer une ref ne relance pas de rendu, et on n'en a pas besoin pour un nœud DOM.

**Q13.3** Avec un state ça boucle à l'infini. +2 parce que le StrictMode rend deux fois.

**Q13.4** Ref : survit, ne déclenche pas. Variable : ne survit pas, ne déclenche pas. State : survit, déclenche.

## Étape 14

**Q14.1** La note reste. Même type et même position, donc React garde la même instance et son state. La key force une nouvelle instance.

**Q14.2** L'objet stocké serait une vieille copie, la quantité ne serait pas à jour.

**Q14.3** `find` ne trouve plus la carte, donc `selectedCard` est `undefined` et le panneau ne s'affiche pas.
