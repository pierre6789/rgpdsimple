# RGPD Simple – Générateur de documents pour TPE / artisans

Outil local pour générer automatiquement 5 documents RGPD personnalisés après paiement Stripe :

- Politique de confidentialité
- Mentions légales
- CGV adaptées à l'activité
- Registre des traitements
- Code HTML du bandeau cookies

## Installation

Dans ce dossier :

```bash
npm install
```

Copiez ensuite le fichier `.env.example` en `.env` et complétez les valeurs (Stripe + SMTP).

## Lancement en local

```bash
npm run dev
```

Application disponible sur `http://localhost:3000`.

## Flux utilisateur

1. Landing page + formulaire (activité, coordonnées, emails/cookies…)
2. Création d'une commande en statut `pending_payment`
3. Redirection vers Stripe Checkout (97 €)
4. Retour sur `/success` après paiement
5. Génération des 5 documents, conversion en PDF et envoi par email

Les modèles de documents sont modifiables dans `src/templates/documents/`.

