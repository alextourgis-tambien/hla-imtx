# HLA IMTX — code personnalisé Webflow

Base neuve pour les styles et animations du projet Webflow HLA IMTX.
Le site, le CMS, les formulaires et les styles natifs restent dans Webflow.
Ce dépôt contient uniquement le code personnalisé et ses blocs d'intégration.
Aucun code du projet dupliqué n'est repris. Les animations du hero utilisent GSAP 3.15.0, ScrollTrigger et SplitText, chargés automatiquement par `site.js`.

## Installation

1. Dans les zones de code personnalisé du site et des pages Webflow, retirer les anciennes références à `kb-sites.com/imtx/corporate/v1.0/custom.min.css`, `custom.min.js`, ainsi que les anciens imports personnalisés GSAP et ScrollTrigger.
2. Copier le contenu de `webflow/head.html` dans le Head code global.
3. Copier le contenu de `webflow/footer.html` dans le Footer code global.
4. Publier la préproduction Webflow et vérifier le chargement des deux fichiers dans l'onglet Réseau du navigateur.
5. Les mêmes blocs s'appliquent au domaine live lors de sa publication.

Conserver les ressources natives générées par Webflow. Ne pas ajouter les blocs une seconde fois au niveau des pages.

## Fichiers

- `assets/site.css` : styles de préparation du hero et proportions du SVG.
- `assets/site.js` : chargement GSAP et animations, après disponibilité du DOM, protégés contre les doublons.
- `webflow/` : blocs prêts à copier.

## Livraison et cache

Les liens HTTPS utilisent jsDelivr et la branche `main`. Ils ne dépendent d'aucun nom de domaine Webflow et restent identiques lors du passage au domaine final.
Une modification publiée sur `main` concerne tous les sites utilisant ces liens, y compris le live.
Le CDN peut conserver une ancienne version : après une livraison, purger les deux URL avec l'outil officiel https://www.jsdelivr.com/tools/purge puis vérifier le contenu servi.
Pour une mise en production figée, remplacer `@main` dans les deux blocs par le même tag de version validé ; les changements suivants nécessitent alors de mettre à jour ce tag dans Webflow.

## Vérification

Dans la console du navigateur après installation, `window.HLAIMTX` doit exposer `version: '0.2.0'` et `ready: true`.
Les orbes du hero se déplacent vers la gauche (12 vw, maximum 180 px) et le bas (22 vh, maximum 200 px), avec un scale de 1,08 lié au scroll. Le second orbe situé dans PRAME n'est pas ciblé.
Le HLA apparaît en 1,1 s ; le texte commence à 0,25 s, ligne par ligne ; la ligne commence à 0,65 s et se trace en 1,8 s.
Le SVG image identifié est remplacé par son tracé inline et son dégradé d'origine. Si l'image change, une révélation verticale sert de fallback.
Avec la préférence système de réduction des mouvements, le contenu reste statique. SplitText recalcule les lignes aux changements de largeur et de polices. Si une dépendance échoue, les éléments restent visibles.
Les futures animations devront respecter les préférences de réduction des mouvements, vérifier la présence des éléments et être vérifiées sur mobile.
Ne jamais stocker de mot de passe, de clé ou de données de formulaires dans ce dépôt public.

## Liens fixes — décision Alex

Conserver le suffixe `?v=0.2.0` dans les deux blocs Webflow, y compris après les prochaines versions du code. Ce suffixe est fixe et ne représente plus la version du JavaScript. Purger le cache CDN après chaque publication ; le cache local du navigateur peut nécessiter un rechargement forcé. Ne pas demander de remplacer les blocs à chaque livraison.

## Animations au scroll — 0.3.0

- Tracé lié au scroll (`scrub: 0.6`), de `top 85%` à `bottom 35%` : `.line__red`, `.road__line`, `.road__line-red`, `.roadmap__line`, `.prame__line`, `.test__line-top`, `.test__line-down`.
- Les SVG originaux sont intégrés au script avec des identifiants de dégradés uniques. Leur sens de tracé est déterminé par leurs extrémités pour dessiner du haut vers le bas. Les variantes desktop/mobile conservent leurs classes Webflow.
- Apparition à l'entrée dans l'écran, une fois, avec SplitText : `.heading__big`, `.p__big`, `.stats`, `.substats`, `.heading__bxl`, `.p__medium`, `.sticky__title`, `.prame__stats-title`, `.p__medium-bis`, `.test__heading`.
- `.prame__text` étant une image dans Webflow, elle apparaît en bloc avec opacité et translation légère. Pour plusieurs lignes indépendantes, remplacer cette image par du texte HTML.
- Fondu 0 → 1 : `.number__wrapper`, `.hla__logo`.
- Les textes recalculent leurs lignes au redimensionnement ; les éléments déjà révélés restent visibles. Les doublons et cibles imbriquées ne sont pas divisés deux fois.
- Contrôles effectués sur une copie locale authentifiée du HTML Webflow : états initiaux/finaux, tracés inversés, premier titre révélé, fin de page sans texte masqué, fondus terminés, adaptation à 390 px, proportions SVG et identifiants uniques. Erreurs tierces Turnstile observées sur localhost, sans erreur du code d'animation.
- Les liens et le suffixe `?v=0.2.0` restent inchangés.

## Correction du cache navigateur

Le CDN renvoie `max-age=604800` (sept jours). Une purge CDN ne vide pas le cache local : le site pouvait encore exécuter 0.2.0 après publication de 0.3.0. Les blocs utilisent désormais un paramètre `refresh` calculé automatiquement à chaque chargement. Le paramètre utilisateur `v=0.2.0` reste fixe. Remplacer une fois les anciens blocs et republier Webflow ; ne pas conserver les anciens imports en doublon. La purge CDN reste requise après chaque livraison.

## Ajustement 0.3.1 — animations plus précoces

Déclenchement des animations au scroll dès `top 100%` au lieu de `top 85%`. Les tracés terminent à `bottom 75%` au lieu de `bottom 35%`, avec un lissage de 0,3 s. Textes : durée 0,6 s et décalage entre lignes 0,08 s. Fondus et apparition de PRAME : 0,6 s. Animation initiale du hero conservée. Blocs Webflow et paramètre `v=0.2.0` inchangés.

## Ajustement 0.3.2 — affinage des textes

Les apparitions de texte au scroll (et PRAME image, dans le même groupe) démarrent à `top 90%` : compromis entre le réglage initial à 85% et le réglage trop précoce à 100%. Durée 0,6 s et décalage 0,08 s conservés. Tracés, fondus et introduction du hero inchangés.

## 0.4.0 — sticky et portraits

- Desktop/tablette (≥ 768 px) : `.sticky` mesure 200 vh ; `.sticky__element` reste en sticky natif sur 100 svh.
- Première étape dès l'entrée dans la vue : premiers orbes à 0,7 ; titres/paragraphe 1 à 1 ; titres/paragraphe 2 à 0,2 ; cellule à 0,5.
- À 50 % du déplacement disponible pendant le maintien sticky (`top top` → `bottom bottom`) : premiers orbes réduits à 0,45 et masqués ; orbes bis à 1 ; groupe 1 à 0,3 ; groupe 2 et cellule à 1. Décision Alex : les orbes bis commencent à 50 %, en remplacement.
- Battement continu de scale 1 à 1,07, arrêté hors écran. Changements réversibles au scroll arrière.
- Les classes de groupe explicites is--1/is--2 sont prioritaires. À défaut, les deux groupes sont identifiés par les blocs contenant `.sticky__title`. Les apparitions génériques de ces textes et numéros sont désactivées sur desktop/tablette pour éviter les opacités cumulées.
- En tablette, le visuel partagé est maintenu en colonne gauche ; les visuels mobiles séparés restent réservés au mobile. Le mobile conserve sa lecture linéaire.
- Portraits : `.red__img.is--1`, `.is--2`, `.is--3` se succèdent aux tiers du parcours `top 95%` → `bottom 30%`, fondus de 0,4 s et retour arrière. État dans `data-hla-red-frame`, avec CSS prioritaire car les interactions Webflow réécrivent les styles inline des images.
- Vérifié sur copie locale du HTML actuel : étape 1 (0,7 / 1 / 0,2 / 0,5), étape 2 (0 / 1 / 0,3 / 1 / 1), retour étape 1, portraits 2 et 3 affichés seuls, tablette 820 × 1180 avec hauteur 2360 px, nettoyage des opacités au passage à 390 px.
- Blocs Webflow et paramètre fixe v=0.2.0 inchangés.

## 0.4.1 — PRAME ancré en haut

`.prame__text` apparaît à son entrée dans la vue (`top 90%`) avec un scale 0 → 1, une opacité 0 → 1 et `transform-origin: 50% 0%` (haut-centre), durée 0,7 s. Remplace sa précédente translation verticale. Déploiement GitHub effectué ; la purge JavaScript reste en attente de la fin de la limitation CDN signalée pour 0.4.0.

## 0.4.2 — disparition des orbes de section

`.roadmap__orbs` se déplace de 35% de sa largeur vers la droite et de 10% de sa hauteur vers le haut, en disparaissant. `.thrid__orbs` suit le déplacement opposé : gauche et bas. Progression liée au scroll, de `top 95%` à `bottom 50%`, lissage 0,6 s ; réversible au retour. Les deux classes ont été vérifiées dans le HTML Webflow publié. Liens inchangés ; diffusion JavaScript toujours en attente de la fin du quota de purge CDN.

## 0.4.3 — logo HLA

Ajout de `.hla__hla-logo` aux fondus : opacité 0 → 1 à son entrée dans la vue, durée 0,6 s, une seule fois. Liens Webflow inchangés.

## Blocs fixes — chargement direct GitHub

Les blocs canoniques sont désormais `webflow/head.html` et `webflow/footer.html` : téléchargement direct depuis raw.githubusercontent.com avec `cache: no-store` et identifiant automatique de requête, puis injection du CSS et chargement du JavaScript via une URL Blob. Cela supprime la dépendance aux purges jsDelivr pour le code du projet ; GSAP reste chargé sur son URL CDN versionnée. Le paramètre v=0.2.0 et les blocs restent fixes pour les futures livraisons. Remplacer les anciens imports une fois, sans les conserver en doublon, puis republier Webflow. Vérification réussie dans le navigateur sur une copie de la page utilisant les vrais fichiers GitHub : sticky, portraits, PRAME scale, logo, SplitText et CSS présents ; aucune erreur observée. Si une politique CSP est ajoutée ultérieurement, autoriser le domaine GitHub pour fetch, les scripts blob et les styles injectés.

## 0.4.4 — battements asynchrones et remplacement lisible

Chaque orbe utilise désormais son propre tween : amplitudes 1,14 à 1,20, demi-périodes 1 à 1,45 s et départs décalés. À la bascule, le groupe sortant atteint scale 0, opacité 0 et visibility hidden en 0,4 s ; le groupe entrant démarre ensuite. Battements sortants arrêtés avant réduction. Vérification navigateur : échelles différentes dans chaque groupe, quatre orbes sortants masqués à scale 0, quatre bis visibles à opacité 1 et échelles différentes ; aucune erreur. Blocs fixes inchangés.

## 0.4.5 — fondus des logos plus visibles

Uniquement `.hla__logo` et `.hla__hla-logo` : déclenchement à `top 75%` au lieu de `top 100%`, fondu 1,1 s avec `power1.inOut`. Les autres fondus conservent leurs réglages. Blocs fixes inchangés.

## 0.4.6 — premiers orbes de 0 à 1

Décision Alex : les premiers orbes atteignent désormais 100% d’opacité (remplace les 70% précédents) et scale 1 à l’entrée du sticky. À 50% du parcours sticky, leur battement s’arrête et ils passent à scale 0, opacité 0 et visibilité masquée avant l’entrée des bis. Hors écran, les deux groupes sont remis à zéro pour rejouer l’entrée lors d’une nouvelle visite.

## 0.4.7 — apparition des orbes réellement visible

Correction Alex : premiers orbes à 70% d’opacité, bis à 100%. Déclenchement reporté de `top bottom` à `top 25%` pour que les orbes, placés vers le milieu du visuel, soient dans l’écran pendant leur entrée. Scale 0 → 1 et opacité sur 0,85 s, easing power2.inOut. Seuil de remplacement à 50% inchangé. Test navigateur : avant le seuil, quatre opacités/échelles à zéro ; après franchissement, valeurs intermédiaires observées (opacité 0,0562, scale 0,0803), puis 0,7 et battements. Blocs fixes inchangés.

## 0.4.8 — mise en avant des cinq blocs HLA

Chaque `.hla__c-parent` possède sa propre progression `top bottom` → `bottom top` : opacité 0,2 avant 40%, 1 de 40% à 60% inclus, puis 0,2. Changements aux seuils, réversibles en remontant, recalculés au redimensionnement. Les cinq occurrences ont été vérifiées dans le HTML Webflow publié. Blocs fixes inchangés.

## 0.4.9 — fondus affinés

Transitions des `.hla__c-parent` entre 20% et 100% sur 0,35 s (power1.inOut), avec un tween réutilisé pour suivre les inversions rapides sans accumulation. Seuils 40% et 60% conservés. Les logos `.hla__logo` et `.hla__hla-logo` apparaissent désormais en 0,55 s au lieu de 1,1 s ; seuil `top 75%` conservé.

## 0.5.0 — blocs HLA alignés sur le logo

Remplace les seuils 40/60% : sur desktop/tablette (≥768px) uniquement, un bloc est à 100% lorsque son rectangle traverse la ligne horizontale passant par le centre réel de `.hla__hla-logo`. Sinon 20%. Transition 0,35 s. Position du logo relue au scroll pour suivre son sticky et sa libération. Sur mobile, aucun effet d’atténuation sur les blocs ; nettoyage assuré lors du changement de breakpoint.

## 0.5.1 — maintien prolongé et cases visibles

La zone de focus des blocs HLA est élargie de chaque côté du centre du logo : marge de 15% de la hauteur d’écran, plafonnée à 160 px. Les blocs s’éclairent donc plus tôt et restent éclairés plus longtemps après le passage. Desktop/tablette uniquement, transition 0,35 s conservée.

Diagnostic checkbox : les inputs natifs `.checkbox` passaient bien à checked=true, mais `appearance:none` et l’absence de style :checked les laissaient visuellement blancs. Ajout d’un fond rouge et d’une coche blanche pour :checked, ainsi que d’un contour focus-visible. Aucun changement de consentement, de validation, de nom de champ ni de soumission. Tests de clic et touche Espace réussis sur copie locale, deux cases visuellement cochées et contour clavier confirmé. La case testée sur la préproduction a été remise à son état initial ; aucun formulaire soumis.

## 0.5.2 — bascule sticky à 40%

Le remplacement des orbes et le changement des opacités des textes et de la cellule démarrent désormais à 40% du parcours sticky au lieu de 50%, y compris au retour et après recalcul. Timings et amplitudes inchangés.

## 0.5.3 — bascule sticky à 30%

Décision Alex : remplacement du seuil 40% par 30% du parcours sticky, pour avancer le deuxième volet. Toutes les branches (scroll, retour, refresh, chargement) utilisent ce seuil. Timings et blocs fixes inchangés.

## 0.5.4 — arrivée du bouton au formulaire

Les liens `.button__main` vers `#form` s’arrêtent 10 rem au-dessus du formulaire. La valeur se règle dans `#form { scroll-margin-top: 10rem; }`. Défilement sur 0,9 s, position de layout recalculée pendant le trajet, interruption par défilement manuel, arrivée immédiate si mouvement réduit. Le gestionnaire évite que le smooth scroll Webflow écrase le décalage. Test navigateur sur copie du HTML publié avec scripts Webflow conservés : arrivée à 215,625 px du haut pour une marge calculée de 215,9 px (10 rem). Embeds inchangés.

## 0.5.5 — apparitions mobile

Sous 768 px uniquement : chaque `.hla__c-parent` apparaît de 0 à 100% en 0,55 s à `top 90%`. Chaque orb des deux groupes apparaît indépendamment à `top 90%`, de scale 0 à 1 sur 0,85 s ; opacité finale 0,7 pour les premiers et 1 pour les bis. Apparitions uniques, gérées par le contexte matchMedia pour restauration au changement de breakpoint. `.road__line-red` démarre à `top 90%` sur mobile au lieu de `top 100%`, fin et scrub conservés. Desktop/tablette et embeds inchangés. Vérification navigateur à 390×844 sur HTML Webflow avec scripts conservés : états initiaux à zéro, premiers orbes à 0,7/scale 1, bis à 1/scale 1, cinq blocs HLA à 1 après leur entrée. Syntaxe JS et diff vérifiés.

## 0.5.6 — chargement du hero sans masquage tardif

Le header contient désormais un garde synchrone de visibilité avant le premier affichage ; il doit être ajouté dans Webflow (voir `webflow/intro-guard.html`, ou header complet). Les URLs, suffixe et footer ne changent pas. Le JS prépare GSAP avant de libérer ce garde. Si le garde n’est pas installé ou a déjà expiré, aucune animation d’introduction ne remasque les éléments déjà affichés. Le contenu est libéré en cas d’erreur et au bout de 12 s, même si le JS ne charge pas ; mouvement réduit respecté. Test navigateur sur copie Webflow : hero initialement masqué, puis trois éléments visibles à opacité 1 après initialisation. Syntaxe et diff vérifiés. L’ajout du garde dans le header Webflow reste nécessaire pour réactiver l’introduction sans flash.

## Références éditables

Coller les 27 références en HTML formaté dans un élément Rich Text Webflow de classe `references__richtext`. Les paragraphes, interligne et italiques sont stylés par le CSS existant, sans modification des embeds. Le texte reste directement éditable dans Webflow. Numéros explicites conservés pour ne pas renuméroter automatiquement les citations. Le fichier d’import local `references-hla.html` fournit un bouton de copie HTML avec sélection manuelle en secours. Bibliographie fournie, non vérifiée.
