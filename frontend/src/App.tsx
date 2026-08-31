import { type ReactNode } from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { CookieBanner } from './CookieBanner'
import { LandingPage } from './LandingPage'
import { SuccessPage } from './SuccessPage'
import { DesignHeader, DesignFooter } from './DesignChrome'
import { Seo } from './Seo'
import { PrixPage } from './pages/PrixPage'
import { TestConformiteRgpd } from './pages/TestConformiteRgpd'
import { GenerateurMentionsLegales } from './pages/GenerateurMentionsLegales'
import { BlogIndex } from './pages/blog/BlogIndex'
import { ControleCnil2026 } from './pages/blog/ControleCnil2026'
import { RgpdAutoEntrepreneur } from './pages/blog/RgpdAutoEntrepreneur'
import { RgpdEcommerce } from './pages/blog/RgpdEcommerce'
import { GuideRgpdTpe } from './pages/blog/GuideRgpdTpe'
import { RgpdObligatoirePourQui } from './pages/blog/RgpdObligatoirePourQui'
import { RgpdFormulaireContact } from './pages/blog/RgpdFormulaireContact'
import { DureeConservationDonnees } from './pages/blog/DureeConservationDonnees'
import { RgpdNewsletter } from './pages/blog/RgpdNewsletter'
import { BandeauCookiesConforme } from './pages/blog/BandeauCookiesConforme'
import { AmendeCnil } from './pages/blog/AmendeCnil'
import { MetierArticle } from './pages/blog/MetierArticle'
import { METIERS } from './pages/blog/metiers'
import './App.css'

/** Layout des pages légales : header + footer du design + contenu typographié. */
function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="rgpd-design legal-page">
      <DesignHeader />
      <main className="legal-prose">{children}</main>
      <DesignFooter />
    </div>
  )
}

function PrivacyPage() {
  return (
    <LegalLayout>
          <Seo title="Politique de confidentialité | RGPD Simple" description="Comment RGPD Simple traite vos données personnelles : finalités, bases légales, durées de conservation, transferts et vos droits (RGPD)." path="/politique-confidentialite" />
          <h1 className="mb-2 text-3xl font-bold text-slate-900">Politique de confidentialité</h1>
          <p className="mb-8 text-sm text-slate-500">Dernière mise à jour : août 2026</p>
          <p className="mb-6 text-sm text-slate-600">
            Cette politique explique comment <strong>RGPDSimple</strong> traite les données personnelles,
            conformément au RGPD et à la loi « Informatique et Libertés ».
          </p>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">1. Responsable du traitement et contact</h2>
          <p className="mb-6 text-sm text-slate-600">
            Responsable : <strong>RGPDSimple</strong>
            <br />
            Adresse : 84 rue pélident, 84300, Cavaillon
            <br />
            Email : <a href="mailto:contact@rgpdsimple.fr" className="font-medium text-blue-600 underline hover:text-blue-700">contact@rgpdsimple.fr</a>
            <br />
            DPO : non désigné. Pour l&apos;exercice de vos droits, contactez : <a href="mailto:contact@rgpdsimple.fr" className="font-medium text-blue-600 underline hover:text-blue-700">contact@rgpdsimple.fr</a>
            <br />
            Téléphone : <a href="tel:+33756966128" className="font-medium text-blue-600 underline hover:text-blue-700">07 56 96 61 28</a>
          </p>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">2. Données collectées</h2>
          <ul className="text-sm text-slate-600 mb-6 list-disc list-inside space-y-1">
            <li>Identité et coordonnées (nom, email, téléphone, adresse).</li>
            <li>Données liées aux commandes, devis, facturation et relation client.</li>
            <li>Données de navigation (IP, cookies, logs techniques).</li>
            <li>Données spécifiques métier (selon votre secteur d&apos;activité).</li>
          </ul>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">3. Finalités et bases légales</h2>
          <ul className="text-sm text-slate-600 mb-6 list-disc list-inside space-y-1">
            <li>Exécution du contrat : commandes, devis, service client.</li>
            <li>Obligation légale : comptabilité, facturation, obligations fiscales.</li>
            <li>Intérêt légitime : sécurité et prévention de la fraude.</li>
            <li>Consentement : cookies non essentiels et prospection quand requis.</li>
          </ul>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">4. Durées de conservation</h2>
          <ul className="text-sm text-slate-600 mb-6 list-disc list-inside space-y-1">
            <li>Prospects : 3 ans après le dernier contact.</li>
            <li>Facturation / comptabilité : 10 ans à compter de la clôture de l&apos;exercice.</li>
            <li>Cookies et traceurs : durée de vie 13 mois max ; données de mesure d&apos;audience 25 mois max ; conservation de votre choix (accepter/refuser) ~6 mois (recommandations CNIL).</li>
            <li>Autres données : durée strictement nécessaire à la finalité.</li>
          </ul>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">5. Destinataires et transferts hors UE</h2>
          <p className="text-sm text-slate-600 mb-2">
            Destinataires : Vercel Inc. (hébergement), Stripe Inc. (paiement), Mailtrap (email transactionnel), Google LLC
            (analytics), Meta Platforms Inc. (publicité).
          </p>
          <p className="text-sm text-slate-600 mb-6">
            Transferts hors UE : Vercel, Stripe, Google et Meta sont des prestataires américains. Ces transferts sont
            encadrés par le <strong>Data Privacy Framework</strong> (décision d&apos;adéquation UE–USA du 10 juillet 2023,
            pour les prestataires certifiés) et/ou par des <strong>Clauses Contractuelles Types</strong> (art. 46 du RGPD).
          </p>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">6. Vos droits</h2>
          <p className="text-sm text-slate-600 mb-6">
            Vous disposez des droits d&apos;accès, rectification, effacement, limitation, opposition, portabilité, directives
            post-mortem et, lorsqu&apos;un traitement repose sur votre consentement, du droit de le <strong>retirer à tout moment</strong>.
            <br />
            Nos services ne sont pas destinés aux mineurs de moins de 15 ans (consentement du titulaire de l&apos;autorité parentale requis pour un service en ligne, art. 8 RGPD).
            <br />
            Contact : <a href="mailto:contact@rgpdsimple.fr" className="font-medium text-blue-600 underline hover:text-blue-700">contact@rgpdsimple.fr</a>.
            <br />
            Nous répondrons à votre demande dans un délai d&apos;un mois.
            <br />
            Réclamation CNIL : <a href="https://www.cnil.fr/plainte" className="font-medium text-blue-600 underline hover:text-blue-700" target="_blank" rel="noreferrer">https://www.cnil.fr/plainte</a>.
          </p>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">7. Sécurité des données</h2>
          <p className="text-sm text-slate-600 mb-6">
            Mesures mises en œuvre : accès restreint, mots de passe robustes, chiffrement et sauvegardes (l&apos;authentification à deux facteurs n&apos;est pas utilisée sur les accès courants).
          </p>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">8. Cookies</h2>
          <p className="text-sm text-slate-600 mb-6">
            Le site utilise des cookies strictement nécessaires, ainsi que des cookies de mesure d&apos;audience (Google
            Analytics 4) et publicitaires (Meta Pixel), déposés uniquement après votre consentement via le bandeau
            cookies. Pour le détail des catégories et durées, consultez la page{' '}
            <Link to="/cookies" className="font-medium text-blue-600 underline hover:text-blue-700">
              Cookies
            </Link>
            .
          </p>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">9. Transparence IA (AI Act)</h2>
          <p className="text-sm text-slate-600 mb-6">
            Nous n&apos;utilisons pas d&apos;outil d&apos;IA (chatbot, décision automatisée, profilage) pour traiter vos données. Le cas échéant, la transparence requise par l&apos;article 50 du Règlement (UE) 2024/1689 (AI Act) serait assurée.
          </p>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">10. Mise à jour de la politique</h2>
          <p className="text-sm text-slate-600">
            Cette politique peut être mise à jour pour tenir compte des évolutions légales et techniques.
          </p>
    </LegalLayout>
  )
}

function LegalPage() {
  return (
    <LegalLayout>
          <Seo title="Mentions légales | RGPD Simple" description="Mentions légales de RGPD Simple : éditeur, hébergeur, médiation, contact." path="/mentions-legales" />
          <h1 className="mb-2 text-3xl font-bold text-slate-900">Mentions légales</h1>
          <p className="mb-8 text-sm text-slate-500">Dernière mise à jour : août 2026</p>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">1. Éditeur du site</h2>
          <p className="text-sm text-slate-600 mb-6">
            En application de l&apos;article 1-1 de la loi n° 2004-575 du 21 juin 2004 (LCEN, modifiée par la loi « SREN » du 21 mai 2024), le site est édité par :
            <br />
            RGPDSimple — Pierre Vuillermet, entrepreneur individuel (EI)
            <br />
            SIRET : 92108885200022
            <br />
            TVA non applicable, art. 293 B du CGI (franchise en base de TVA)
            <br />
            Adresse : 84 rue pélident, 84300, Cavaillon
            <br />
            Email : <a href="mailto:contact@rgpdsimple.fr" className="font-medium text-blue-600 underline hover:text-blue-700">contact@rgpdsimple.fr</a>
            <br />
            Téléphone : <a href="tel:+33756966128" className="font-medium text-blue-600 underline hover:text-blue-700">07 56 96 61 28</a>
            <br />
            Site : <a href="https://www.rgpdsimple.fr" className="font-medium text-blue-600 underline hover:text-blue-700" target="_blank" rel="noreferrer">https://www.rgpdsimple.fr</a>
          </p>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">2. Directeur de la publication</h2>
          <p className="text-sm text-slate-600 mb-6">Pierre Vuillermet (Gérant)</p>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">3. Hébergeur</h2>
          <p className="text-sm text-slate-600 mb-6">
            Vercel Inc.
            <br />
            440 N Barranca Ave #4133, Covina, CA 91723, États-Unis
            <br />
            <a href="https://vercel.com" className="font-medium text-blue-600 underline hover:text-blue-700" target="_blank" rel="noreferrer">https://vercel.com</a>
          </p>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">4. Propriété intellectuelle</h2>
          <p className="text-sm text-slate-600 mb-6">
            Tous les contenus du site (textes, images, graphismes, logo, etc.) sont protégés. Toute reproduction sans
            autorisation écrite est interdite.
          </p>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">5. Données personnelles</h2>
          <p className="text-sm text-slate-600 mb-6">
            DPO : non désigné. Contact RGPD : <a href="mailto:contact@rgpdsimple.fr" className="font-medium text-blue-600 underline hover:text-blue-700">contact@rgpdsimple.fr</a>.
            <br />
            Politique de confidentialité : <a href="/politique-confidentialite" className="font-medium text-blue-600 underline hover:text-blue-700">consulter la page dédiée</a>.
          </p>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">6. Médiateur de la consommation</h2>
          <p className="text-sm text-slate-600 mb-6">
            Pour toute vente à un consommateur (B2C) et conformément aux articles L.612-1 et L.616-1 du Code de la consommation, un médiateur de la consommation peut être saisi gratuitement, après une réclamation écrite préalable restée sans réponse satisfaisante.
            <br />
            Médiateur : [nom, adresse postale et site internet du médiateur — à compléter dès l&apos;adhésion].
            <br />
            Réclamation préalable : <a href="mailto:contact@rgpdsimple.fr" className="font-medium text-blue-600 underline hover:text-blue-700">contact@rgpdsimple.fr</a>
          </p>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">7. Point de contact</h2>
          <p className="text-sm text-slate-600 mb-6">
            Le Digital Services Act (règlement (UE) 2022/2065) ne s&apos;applique pas à ce site, qui commercialise ses propres produits sans héberger de contenus de tiers. Point de contact : <a href="mailto:contact@rgpdsimple.fr" className="font-medium text-blue-600 underline hover:text-blue-700">contact@rgpdsimple.fr</a>.
          </p>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">8. Engagement environnemental</h2>
          <p className="text-sm text-slate-600 mb-6">À titre volontaire (aucune obligation légale ne s&apos;impose à une TPE au titre de la loi REEN), nous limitons l&apos;empreinte de nos services numériques : pages allégées, ressources optimisées, hébergement professionnel.</p>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">9. Accessibilité numérique</h2>
          <p className="text-sm text-slate-600 mb-6">
            En tant que micro-entreprise (moins de 10 salariés et moins de 2 M€), RGPDSimple est exemptée des obligations d&apos;accessibilité de l&apos;European Accessibility Act (directive (UE) 2019/882, applicable depuis le 28 juin 2025). Nous veillons néanmoins à une accessibilité raisonnable.
            <br />
            Contact accessibilité : <a href="mailto:contact@rgpdsimple.fr" className="font-medium text-blue-600 underline hover:text-blue-700">contact@rgpdsimple.fr</a>
          </p>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">10. Cookies</h2>
          <p className="text-sm text-slate-600">
            Détails sur la page <a href="/cookies" className="font-medium text-blue-600 underline hover:text-blue-700">Cookies</a>.
          </p>
    </LegalLayout>
  )
}

function CookiesPage() {
  return (
    <LegalLayout>
          <Seo title="Politique cookies | RGPD Simple" description="Cookies et traceurs utilisés par RGPD Simple : catégories, base légale, durées et gestion de vos choix." path="/cookies" />
          <h1 className="mb-2 text-3xl font-bold text-slate-900">Politique Cookies</h1>
          <p className="mb-8 text-sm text-slate-500">Dernière mise à jour : août 2026</p>
          <p className="text-sm text-slate-600 mb-6">
            Cette page explique comment RGPDSimple utilise les cookies et traceurs sur <a href="https://www.rgpdsimple.fr" className="font-medium text-blue-600 underline hover:text-blue-700" target="_blank" rel="noreferrer">https://www.rgpdsimple.fr</a>.
          </p>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">1. Qu&apos;est-ce qu&apos;un cookie ?</h2>
          <p className="text-sm text-slate-600 mb-6">
            Un cookie est un petit fichier texte déposé sur votre terminal lors de la visite d&apos;un site.
          </p>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">2. Catégories de cookies</h2>
          <ul className="list-inside list-disc text-sm text-slate-600 mb-6 space-y-2">
            <li>
              <strong>Cookies strictement nécessaires</strong> — fonctionnement du site (session, sécurité).
            </li>
            <li>
              <strong>Cookies de mesure d&apos;audience</strong> — Google Analytics 4 (Google LLC, USA). Déposés
              uniquement après consentement. Durée : 13 mois max.
            </li>
            <li>
              <strong>Cookies publicitaires</strong> — Meta Pixel (Meta Platforms, USA). Déposés uniquement après
              consentement. Durée : 13 mois max.
            </li>
          </ul>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">3. Base légale</h2>
          <p className="text-sm text-slate-600 mb-6">
            Cookies nécessaires : intérêt légitime. Cookies non essentiels : consentement.
          </p>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">4. Durée de conservation</h2>
          <p className="text-sm text-slate-600 mb-6">
            Durée de vie des traceurs : 13 mois maximum. Données de mesure d&apos;audience : 25 mois maximum. Conservation de votre choix (accepter/refuser) : environ 6 mois, avant nouvelle sollicitation (recommandations CNIL).
          </p>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">5. Gérer vos choix</h2>
          <p className="text-sm text-slate-600 mb-6">
            Vous pouvez accepter/refuser via le bandeau cookies, puis modifier vos choix à tout moment.
          </p>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">6. Contact</h2>
          <p className="text-sm text-slate-600">
            Pour toute question : <a href="mailto:contact@rgpdsimple.fr" className="font-medium text-blue-600 underline hover:text-blue-700">contact@rgpdsimple.fr</a>.
        </p>
    </LegalLayout>
  )
}

function CgvSitePage() {
  return (
    <LegalLayout>
          <Seo title="Conditions générales de vente (CGV) | RGPD Simple" description="CGV de RGPD Simple : commande, paiement, livraison, rétractation, garanties et médiation." path="/cgv" />
          <h1 className="mb-2 text-3xl font-bold text-slate-900">Conditions générales de vente</h1>
          <p className="mb-8 text-sm text-slate-500">Dernière mise à jour : août 2026 — RGPDSimple</p>

          <h2 className="mb-2 text-xl font-semibold text-slate-900">1. Objet</h2>
          <p className="text-sm text-slate-600 mb-6">
            Les présentes CGV régissent la vente en ligne du pack de documents RGPD personnalisés (fichiers numériques au
            format PDF et guide, ci-après le « Pack ») proposé sur le site{' '}
            <a href="https://www.rgpdsimple.fr" className="font-medium text-blue-600 underline hover:text-blue-700" target="_blank" rel="noreferrer">
              www.rgpdsimple.fr
            </a>{' '}
            par <strong>RGPDSimple</strong>, entreprise individuelle, SIRET 92108885200022, 84 rue pélident, 84300 Cavaillon,{' '}
            <a href="mailto:contact@rgpdsimple.fr" className="font-medium text-blue-600 underline hover:text-blue-700">contact@rgpdsimple.fr</a>,{' '}
            <a href="tel:+33756966128" className="font-medium text-blue-600 underline hover:text-blue-700">07 56 96 61 28</a>.
          </p>

          <h2 className="mb-2 text-xl font-semibold text-slate-900">2. Produits et prix</h2>
          <p className="text-sm text-slate-600 mb-6">
            Le Pack comprend la préparation et l&apos;envoi par email des documents indiqués sur la page d&apos;accueil au
            moment de la commande (politique de confidentialité, mentions légales, CGV modèle client, registre des
            traitements, bandeau cookies, guide à compléter). Le prix en vigueur est affiché sur le site avant le
            paiement ; il est net de taxe (« TVA non applicable, art. 293 B du CGI », franchise en base de TVA).
            RGPDSimple se réserve le droit de modifier ses tarifs ; le prix applicable est celui affiché au
            moment de la validation de la commande.
          </p>

          <h2 className="mb-2 text-xl font-semibold text-slate-900">3. Commande et paiement</h2>
          <p className="text-sm text-slate-600 mb-6">
            La commande est passée via le formulaire du site. Le paiement est réalisé par carte bancaire via le prestataire
            Stripe. La commande est définitive après confirmation du paiement par Stripe. Vous recevez un accusé de
            réception par email à l&apos;adresse indiquée lors de la commande.
          </p>

          <h2 className="mb-2 text-xl font-semibold text-slate-900">4. Livraison (contenu numérique)</h2>
          <p className="text-sm text-slate-600 mb-6">
            Le Pack est livré par envoi des fichiers à l&apos;adresse email fournie, au plus tard sous 24h ouvrées à compter
            de la confirmation du paiement. En cas de retard ou d&apos;absence de réception, contactez{' '}
            <a href="mailto:contact@rgpdsimple.fr" className="font-medium text-blue-600 underline hover:text-blue-700">contact@rgpdsimple.fr</a> en
            indiquant l&apos;email utilisé pour la commande.
          </p>

          <h2 className="mb-2 text-xl font-semibold text-slate-900">5. Licence d&apos;utilisation du Pack</h2>
          <p className="text-sm text-slate-600 mb-6">
            Les documents fournis sont destinés à un usage exclusivement lié au site ou à l&apos;activité dont les
            caractéristiques ont été renseignées lors de la commande (notamment l&apos;URL du site indiquée). Vous pouvez
            adapter et modifier ces documents pour vos besoins propres. Toute cession, revente, sous-licence ou mise à
            disposition à des tiers des fichiers livrés, même modifiés, est interdite sans accord écrit préalable de
            RGPDSimple.
          </p>

          <h2 className="mb-2 text-xl font-semibold text-slate-900">6. Droit de rétractation et exécution immédiate</h2>
          <p className="text-sm text-slate-600 mb-6">
            Pour les consommateurs, le délai légal de rétractation est de 14 jours (art. L221-18 du Code de la consommation).
            Le Pack étant un contenu numérique fourni immédiatement après paiement, le client, lors de sa commande :
            (1) <strong>demande expressément</strong> que la fourniture commence dès la validation du paiement, et
            (2) <strong>reconnaît qu&apos;il perdra son droit de rétractation</strong> dès le début de l&apos;exécution
            (art. L221-28 13° et L221-25 du Code de la consommation). Ces deux éléments sont recueillis par cases distinctes
            non pré-cochées et confirmés par email. À défaut, le client conserve son droit de rétractation de 14 jours. Pour
            toute demande, écrivez à{' '}
            <a href="mailto:contact@rgpdsimple.fr" className="font-medium text-blue-600 underline hover:text-blue-700">contact@rgpdsimple.fr</a>.
          </p>

          <h2 className="mb-2 text-xl font-semibold text-slate-900">7. Conformité et garanties</h2>
          <p className="text-sm text-slate-600 mb-6">
            Vous bénéficiez de la garantie légale de conformité des contenus numériques (art. L224-25-1 et suivants du Code
            de la consommation) : pendant 2 ans à compter de la fourniture, la mise en conformité peut être demandée et, à
            défaut, une réduction du prix ou le remboursement. Les documents sont des modèles à compléter et à adapter ; ils
            ne constituent pas un conseil juridique personnalisé. RGPDSimple ne saurait être tenue responsable de l&apos;usage
            que vous faites des documents sur votre site ou auprès de tiers.
          </p>

          <h2 className="mb-2 text-xl font-semibold text-slate-900">8. Option installation sur site (147 €)</h2>
          <p className="text-sm text-slate-600 mb-6">
            Une prestation d&apos;installation des documents sur votre site peut être proposée séparément, sur devis ou
            par email après achat. Elle ne fait pas partie du Pack sauf commande expresse acceptée par RGPDSimple.
          </p>

          <h2 className="mb-2 text-xl font-semibold text-slate-900">9. Médiation</h2>
          <p className="text-sm text-slate-600 mb-6">
            Conformément aux articles L.612-1 et L.616-1 du Code de la consommation, après une réclamation écrite préalable
            restée sans réponse satisfaisante, le consommateur peut recourir gratuitement à un médiateur de la consommation.
            Les coordonnées du médiateur figurent aux mentions légales dès l&apos;adhésion. Réclamation préalable :{' '}
            <a href="mailto:contact@rgpdsimple.fr" className="font-medium text-blue-600 underline hover:text-blue-700">contact@rgpdsimple.fr</a>.
          </p>

          <h2 className="mb-2 text-xl font-semibold text-slate-900">10. Données personnelles</h2>
          <p className="text-sm text-slate-600 mb-6">
            Le traitement des données liées à la commande est décrit dans la{' '}
            <a href="/politique-confidentialite" className="font-medium text-blue-600 underline hover:text-blue-700">Politique de confidentialité</a>.
          </p>

          <h2 className="mb-2 text-xl font-semibold text-slate-900">11. Droit applicable et litiges</h2>
          <p className="text-sm text-slate-600 mb-6">
            Les présentes CGV sont soumises au droit français. Pour les consommateurs, compétence des tribunaux conformément
            au Code de la consommation.
          </p>
    </LegalLayout>
  )
}

/** Table des routes, partagée par le rendu client (BrowserRouter) et le
 *  prérendu serveur SSG (StaticRouter dans entry-server.tsx). */
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/politique-confidentialite" element={<PrivacyPage />} />
      <Route path="/mentions-legales" element={<LegalPage />} />
      <Route path="/cookies" element={<CookiesPage />} />
      <Route path="/cgv" element={<CgvSitePage />} />
      <Route path="/prix" element={<PrixPage />} />
      <Route path="/test-conformite-rgpd" element={<TestConformiteRgpd />} />
      <Route path="/generateur-mentions-legales" element={<GenerateurMentionsLegales />} />
      <Route path="/blog" element={<BlogIndex />} />
      <Route path="/blog/guide-rgpd-tpe" element={<GuideRgpdTpe />} />
      <Route path="/blog/controle-cnil-2026" element={<ControleCnil2026 />} />
      <Route path="/blog/rgpd-obligatoire-pour-qui" element={<RgpdObligatoirePourQui />} />
      <Route path="/blog/rgpd-auto-entrepreneur" element={<RgpdAutoEntrepreneur />} />
      <Route path="/blog/rgpd-ecommerce" element={<RgpdEcommerce />} />
      <Route path="/blog/rgpd-formulaire-contact" element={<RgpdFormulaireContact />} />
      <Route path="/blog/duree-conservation-donnees" element={<DureeConservationDonnees />} />
      <Route path="/blog/rgpd-newsletter" element={<RgpdNewsletter />} />
      <Route path="/blog/bandeau-cookies-conforme" element={<BandeauCookiesConforme />} />
      <Route path="/blog/amende-cnil" element={<AmendeCnil />} />
      {METIERS.map((m) => (
        <Route key={m.slug} path={`/blog/${m.slug}`} element={<MetierArticle metier={m} />} />
      ))}
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <CookieBanner />
    </BrowserRouter>
  )
}

export default App
