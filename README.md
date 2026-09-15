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
