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
