# Lecteur de Planning

Application web installable (PWA) : vue **semaine (lun→ven)**, agenda, mois, **recherche globale**, écran **« Qui voulez-vous voir ? »** et détail des interventions avec **l'équipe terrain**. Optimisée mobile et installable comme une vraie application. Fonctionne **hors-ligne** une fois installée.

L'application est **générique** : aucun nom d'entreprise ni mot de passe n'est inscrit dans le code. Chaque équipe choisit son nom et ses codes à la première ouverture.

---

## 1. Première ouverture — configuration

Au tout premier lancement, l'application affiche un écran **Configuration** qui demande :

- **Nom de l'équipe** — affiché en haut de l'application (remplace le mot « Planning »).
- **Code d'accès** *(facultatif)* — code demandé à l'ouverture pour entrer dans l'application. Laissé vide = aucun verrou, l'application s'ouvre directement.
- **Code administrateur** *(facultatif)* — protège l'« Espace administrateur » (couleurs, import/export des données, reconfiguration). Laissé vide = l'espace admin s'ouvre sans code.

Deux boutons :

- **Enregistrer** : les réglages sont **conservés automatiquement sur l'appareil**. Rien d'autre à faire pour un usage personnel.
- **Enregistrer + télécharger config.json** : enregistre **et** télécharge un fichier `config.json`. Ce fichier sert à appliquer les mêmes réglages à **toute l'équipe** (voir §3).

> Les codes ne sont jamais stockés en clair : seule une empreinte (hachage) est conservée.

Pour modifier ensuite l'équipe ou les codes : **Réglages → Espace administrateur → Reconfigurer l'équipe et les codes**.

---

## 2. Où sont sauvegardées les données ?

| Donnée | Où c'est sauvegardé | Automatique ? |
|---|---|---|
| Nom d'équipe + codes (sur **votre** téléphone) | Mémoire du navigateur de l'appareil (localStorage) | **Oui**, à l'enregistrement |
| Nom d'équipe + codes (pour **toute** l'équipe) | Fichier `config.json` déposé sur GitHub | Manuel, **une seule fois** (§3) |
| Le planning (interventions) | Fichier `planning-data.json` déposé sur GitHub | Manuel, à chaque mise à jour (§6) |
| Préférences perso (favori, thème, couleurs, rappels) | Mémoire de l'appareil | **Oui** |

**Important — à lire :** une application 100 % web hébergée sur GitHub Pages **ne peut pas, seule, réécrire dans le dépôt GitHub** (cela demanderait un mot de passe/serveur). La sauvegarde « sur GitHub » se fait donc en **déposant un fichier** (comme on l'a toujours fait pour le planning) :

- Sur **votre appareil**, tout est sauvegardé automatiquement.
- Pour **partager** la configuration à toute l'équipe (ou pour qu'elle s'applique sur tous les téléphones), on dépose le fichier `config.json` sur GitHub **une fois**. Au démarrage, l'application lit ce fichier en priorité.

---

## 3. Appliquer la configuration à toute l'équipe (config.json)

1. Sur un appareil, faites la configuration et cliquez **Enregistrer + télécharger config.json** (ou, plus tard, **Réglages → Espace administrateur → Télécharger config.json**).
2. Sur GitHub, dans votre dépôt : **Add file → Upload files**, déposez `config.json`, puis **Commit changes**.
3. Désormais, **tous** les téléphones qui ouvrent l'application reçoivent automatiquement le nom d'équipe et les codes. L'écran de configuration n'apparaît plus.

> Pour changer les codes de toute l'équipe : reconfigurez, retéléchargez `config.json` et redéposez-le sur GitHub (il remplace l'ancien).

---

## 4. Mise en ligne sur GitHub Pages (procédure complète, une seule fois)

1. Allez sur **github.com**, connectez-vous, puis **New repository** (bouton vert).
2. Donnez un nom (ex. `planning`), laissez **Public**, puis **Create repository**.
3. Sur la page du dépôt : **Add file → Upload files**.
4. Déposez **tout le contenu du dossier** :
   - `index.html`
   - `manifest.webmanifest`
   - `service-worker.js`
   - `planning-data.json`
   - le dossier **`icons`** (avec `icon-192.png`, `icon-512.png`, `icon-512-maskable.png`)
   - *(optionnel)* `config.json` si vous l'avez déjà préparé (§3)
5. Cliquez **Commit changes**.
6. Allez dans **Settings → Pages**.
7. Section **Source** : choisissez **Deploy from a branch**, puis **Branch : main** et **dossier : / (root)**, puis **Save**.
8. Au bout d'1 à 2 minutes, un lien apparaît :
   `https://VOTRE-PSEUDO.github.io/NOM-DU-DEPOT/`
9. Ouvrez ce lien : l'application démarre sur l'écran **Configuration** (§1).

---

## 5. Installer l'application pour une NOUVELLE équipe (chez eux)

Chaque équipe a son propre site et sa propre configuration. Deux façons de créer leur copie :

**A. La plus simple (copier les fichiers)**
1. La nouvelle équipe crée son propre dépôt GitHub (§4, étapes 1-2).
2. Elle y dépose les mêmes fichiers (`index.html`, `manifest.webmanifest`, `service-worker.js`, le dossier `icons`, et un `planning-data.json` — au besoin celui d'exemple, il sera remplacé à la première mise à jour).
3. Elle active **Settings → Pages** (§4, étapes 6-8).
4. À la première ouverture, elle saisit **son** nom d'équipe et **ses** codes (§1).

**B. Avec « Fork » (si la copie d'origine est sur GitHub)**
1. Sur le dépôt d'origine, cliquez **Fork** (en haut à droite) → cela crée une copie dans le compte de la nouvelle équipe.
2. Dans le dépôt copié : **Settings → Pages** → **Deploy from a branch** → **main / (root)** → **Save**.
3. Première ouverture → configuration (§1).

> Chaque équipe gère ensuite **son** planning (§6) et **sa** configuration (§3) indépendamment.

---

## 6. Mettre à jour le planning (méthode simple, recommandée)

Toute la conversion se fait dans le navigateur ; vous ne manipulez que `planning-data.json`.

1. Ouvrez l'application (votre lien GitHub Pages).
2. **Réglages → Mettre à jour les données → Importer (Excel / JSON)** et choisissez votre nouvel export **Excel**. Vérifiez que le planning s'affiche.
3. Cliquez **Exporter pour le web** → un fichier **`planning-data.json`** se télécharge.
4. Sur GitHub, dans le dépôt : **Add file → Upload files**, déposez le nouveau `planning-data.json` (il remplace l'ancien) → **Commit changes**.
5. Au bout d'1 minute, le site et l'application mobile affichent les nouvelles données. Sur le téléphone, **tirez la page vers le bas** pour rafraîchir.

> L'application accepte aussi l'import direct d'un `.json`, pratique pour vérifier un fichier avant de l'envoyer.

---

## 7. Installer comme une application sur le téléphone

Ouvrez d'abord le lien GitHub Pages dans le **navigateur** du téléphone.

**iPhone / iPad (Safari)**
1. Ouvrez le lien dans **Safari** (obligatoire, pas Chrome).
2. Touchez le bouton **Partager** (le carré avec une flèche vers le haut, en bas de l'écran).
3. Faites défiler et touchez **« Sur l'écran d'accueil »**.
4. Touchez **Ajouter** (en haut à droite). L'icône calendrier apparaît sur l'écran d'accueil.
5. Ouvrez-la : elle s'affiche en plein écran, comme une vraie application.

**Android (Chrome)**
1. Ouvrez le lien dans **Chrome**.
2. Touchez le menu **⋮** (trois points, en haut à droite).
3. Touchez **« Installer l'application »** (ou **« Ajouter à l'écran d'accueil »**).
4. Confirmez avec **Installer / Ajouter**.
5. L'icône apparaît dans la liste des applications ; ouvrez-la en plein écran.

Une fois installée, l'application fonctionne **hors-ligne** (dernières données mises en cache).

---

## 8. Sécurité — à savoir (honnête)

- Les codes d'accès servent à **éviter une ouverture par mégarde**, pas à protéger des données sensibles : sur un dépôt **public**, le fichier `planning-data.json` reste lisible par toute personne qui connaît l'adresse du dépôt.
- Pour une vraie confidentialité, il faut un dépôt **privé** ; mais GitHub Pages sur dépôt privé nécessite un abonnement payant.
- Aucune donnée n'est envoyée vers un serveur tiers : tout le traitement se fait **dans le navigateur**.

---

## 9. (Optionnel) Mise à jour automatique par robot

Si le dossier contient un robot GitHub Actions (`.github/workflows/…` + `convert.py`), il convertit un Excel en `planning-data.json` automatiquement. Pour l'utiliser : **Settings → Actions → General → Workflow permissions → Read and write permissions**. Sinon, la méthode du §6 suffit et ne dépend d'aucun robot.
