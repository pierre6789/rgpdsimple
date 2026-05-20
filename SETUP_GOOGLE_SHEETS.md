# Configuration Google Sheets pour l’affiliation

Ce guide permet d’enregistrer automatiquement chaque vente confirmée par Stripe dans l’onglet **💰 Ventes** de votre Google Sheets.

## Prérequis

- Un compte Google
- Un Google Sheets avec un onglet nommé exactement **💰 Ventes**
- Les colonnes A à H (dans l’ordre) : Date, Code VA, Montant, Commission VA, Semaine, Statut, Email, ID session Stripe

---

## 1. Créer un projet Google Cloud

1. Ouvrez [Google Cloud Console](https://console.cloud.google.com/).
2. Cliquez sur le sélecteur de projet → **Nouveau projet**.
3. Donnez un nom (ex. `rgpdsimple-affiliation`) → **Créer**.

---

## 2. Activer l’API Google Sheets

1. Dans le menu, allez à **API et services** → **Bibliothèque**.
2. Recherchez **Google Sheets API**.
3. Ouvrez-la et cliquez sur **Activer**.

---

## 3. Créer un compte de service

1. **API et services** → **Identifiants**.
2. **Créer des identifiants** → **Compte de service**.
3. Nommez-le (ex. `rgpdsimple-sheets`) → **Créer et continuer**.
4. Rôle : **Éditeur** (ou au minimum accès aux feuilles si vous affinez plus tard) → **Continuer** → **OK**.
5. Dans la liste des comptes de service, cliquez sur le compte créé.
6. Onglet **Clés** → **Ajouter une clé** → **Créer une clé** → **JSON**.
7. Un fichier `.json` est téléchargé — **gardez-le en lieu sûr**.

---

## 4. Renseigner les variables d’environnement (Render / local)

### `GOOGLE_SHEETS_ID`

Dans l’URL de votre tableur :

`https://docs.google.com/spreadsheets/d/XXXXXXXXXXXXXXXX/edit`

Copiez la partie `XXXXXXXXXXXXXXXX` → c’est votre `GOOGLE_SHEETS_ID`.

### `GOOGLE_SERVICE_ACCOUNT_JSON`

1. Ouvrez le fichier JSON téléchargé à l’étape 3.
2. Copiez **tout** le contenu du fichier (objet JSON complet).
3. Collez-le dans la variable d’environnement `GOOGLE_SERVICE_ACCOUNT_JSON` sur Render (ou dans votre `.env` local).

**Sur Render** : collez le JSON sur une seule ligne, ou utilisez le format multiligne supporté par votre interface.

**Important** : ne commitez jamais ce JSON dans Git.

---

## 5. Partager le Google Sheets avec le compte de service

1. Dans le fichier JSON, repérez le champ `"client_email"` (ex. `rgpdsimple-sheets@mon-projet.iam.gserviceaccount.com`).
2. Ouvrez votre Google Sheets.
3. **Partager** → ajoutez cet email → droit **Éditeur** → **Envoyer**.

Sans cette étape, l’API ne pourra pas ajouter de lignes.

---

## 6. Webhook Stripe

1. [Stripe Dashboard](https://dashboard.stripe.com/) → **Développeurs** → **Webhooks**.
2. Endpoint : `https://VOTRE-API.onrender.com/api/webhook` ou `/webhook/stripe`.
3. Événement : `checkout.session.completed`.
4. Copiez le **Signing secret** (`whsec_...`) dans `STRIPE_WEBHOOK_SECRET`.

---

## 7. Vérifier

1. Visitez `https://www.rgpdsimple.fr/?via=TEST123`.
2. Passez une commande test (mode Stripe test).
3. Une ligne doit apparaître dans **💰 Ventes** avec le code `TEST123` en colonne B.

Logs utiles côté API :

- `[Affiliate] Cookie capturé`
- `[Checkout] Code affilié pour cette commande`
- `[Sheets] Vente enregistrée`

---

## Dépannage

| Problème | Piste |
|----------|--------|
| Pas de ligne dans Sheets | Vérifier `GOOGLE_SHEETS_ID`, JSON du compte de service, partage Éditeur |
| `Permission denied` | Partager le Sheets avec l’email du compte de service |
| `Unable to parse range` | L’onglet doit s’appeler exactement **💰 Ventes** |
| Code VA = `direct` | Le visiteur n’avait pas `?via=` ou le cookie a expiré (30 jours) |
