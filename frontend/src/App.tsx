import { useEffect, type ReactNode } from 'react'
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom'
import { CookieBanner } from './CookieBanner'
import { setAffiliateCookie } from './affiliate'
import { LandingPage } from './LandingPage'
import { SuccessPage } from './SuccessPage'
import { DesignHeader, DesignFooter } from './DesignChrome'
import './App.css'

/** Capture ?via=CODE dans un cookie 30 jours (site React sur Vercel) */
function AffiliateCapture() {
  const location = useLocation()

  useEffect(() => {
    const via = new URLSearchParams(location.search).get('via')
    if (!via) return
    const safe = via.trim()
    if (!/^[A-Za-z0-9_-]+$/.test(safe) || safe.length > 64) return
    setAffiliateCookie(safe)
    console.log('[Affiliate] Code capturé (frontend):', safe)
  }, [location.search])

  return null
}

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
          <h1 className="mb-2 text-3xl font-bold text-slate-900">Politique de confidentialité</h1>
          <p className="mb-8 text-sm text-slate-500">Dernière mise à jour : 21 mai 2026</p>
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
            <li>Cookies non essentiels : 13 mois maximum.</li>
            <li>Autres données : durée strictement nécessaire à la finalité.</li>
          </ul>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">5. Destinataires et transferts hors UE</h2>
          <p className="text-sm text-slate-600 mb-2">
            Destinataires : Vercel Inc. (hébergement), Stripe Inc. (paiement), Mailtrap (email transactionnel), Google LLC
            (analytics), Meta Platforms Inc. (publicité).
          </p>
          <p className="text-sm text-slate-600 mb-6">
            Transferts hors UE : Vercel, Stripe, Google et Meta sont des prestataires américains. Ces transferts sont
            encadrés par des Clauses Contractuelles Types (CCT) approuvées par la Commission européenne, conformément à
            l&apos;article 46 du RGPD.
          </p>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">6. Vos droits</h2>
          <p className="text-sm text-slate-600 mb-6">
            Vous disposez des droits d&apos;accès, rectification, effacement, limitation, opposition, portabilité et directives
            post-mortem.
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
            Nous n&apos;utilisons pas d&apos;outils d&apos;IA pour prendre des décisions automatisées sur les personnes.
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
          <h1 className="mb-2 text-3xl font-bold text-slate-900">Mentions légales</h1>
          <p className="mb-8 text-sm text-slate-500">Dernière mise à jour : 1er avril 2026</p>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">1. Éditeur du site (LCEN)</h2>
          <p className="text-sm text-slate-600 mb-6">
            RGPDSimple, Entreprise individuelle
            <br />
            SIRET : 92108885200022
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
          <h2 className="mb-2 text-xl font-semibold text-slate-900">6. Médiateur de la consommation (B2C)</h2>
          <p className="text-sm text-slate-600 mb-6">
            En cours d&apos;adhésion.
            <br />
            En cas de réclamation : <a href="mailto:contact@rgpdsimple.fr" className="font-medium text-blue-600 underline hover:text-blue-700">contact@rgpdsimple.fr</a>
            <br />
            Les coordonnées du médiateur seront publiées dès validation de l&apos;adhésion.
          </p>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">7. Point de contact (DSA)</h2>
          <p className="text-sm text-slate-600 mb-6">
            <a href="mailto:contact@rgpdsimple.fr" className="font-medium text-blue-600 underline hover:text-blue-700">contact@rgpdsimple.fr</a>
          </p>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">8. Engagement environnemental (Loi REEN)</h2>
          <p className="text-sm text-slate-600 mb-6">Nous nous engageons à limiter l&apos;empreinte environnementale de nos services numériques en appliquant des principes d&apos;éco-conception (pages allégées, ressources optimisées, limitation des scripts non essentiels) et en nous appuyant sur un hébergement professionnel.</p>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">9. Accessibilité numérique (RGAA)</h2>
          <p className="text-sm text-slate-600 mb-6">
            Statut : Totalement conforme
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
          <h1 className="mb-2 text-3xl font-bold text-slate-900">Politique Cookies</h1>
          <p className="mb-8 text-sm text-slate-500">Dernière mise à jour : 21 mai 2026</p>
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
            Les cookies non essentiels sont conservés au maximum 13 mois.
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
          <h1 className="mb-2 text-3xl font-bold text-slate-900">Conditions générales de vente</h1>
          <p className="mb-8 text-sm text-slate-500">Dernière mise à jour : 1er avril 2026 — RGPDSimple</p>

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
            traitements, bandeau cookies, guide à compléter). Le prix TTC en vigueur est affiché sur le site avant le
            paiement. RGPDSimple se réserve le droit de modifier ses tarifs ; le prix applicable est celui affiché au
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
            Pour les consommateurs, le délai légal de rétractation est de 14 jours. Le Pack étant un contenu numérique
            fourni immédiatement après paiement et sur mesure à partir de vos réponses, vous reconnaissez qu&apos;à compter
            de la livraison par email, l&apos;exécution du contrat a commencé avec votre accord et que, sauf droit légal
            impératif, vous ne pouvez plus exercer votre droit de rétractation une fois la livraison effectuée. Pour toute
            demande avant livraison, écrivez à{' '}
            <a href="mailto:contact@rgpdsimple.fr" className="font-medium text-blue-600 underline hover:text-blue-700">contact@rgpdsimple.fr</a>.
          </p>

          <h2 className="mb-2 text-xl font-semibold text-slate-900">7. Conformité et garanties</h2>
          <p className="text-sm text-slate-600 mb-6">
            Vous bénéficiez de la garantie légale de conformité pour les biens numériques et des dispositions du Code de la
            consommation applicables. Les documents sont des modèles à compléter et à adapter ; ils ne constituent pas un
            conseil juridique personnalisé. RGPDSimple ne saurait être tenue responsable de l&apos;usage que vous faites
            des documents sur votre site ou auprès de tiers.
          </p>

          <h2 className="mb-2 text-xl font-semibold text-slate-900">8. Option installation sur site (147 €)</h2>
          <p className="text-sm text-slate-600 mb-6">
            Une prestation d&apos;installation des documents sur votre site peut être proposée séparément, sur devis ou
            par email après achat. Elle ne fait pas partie du Pack sauf commande expresse acceptée par RGPDSimple.
          </p>

          <h2 className="mb-2 text-xl font-semibold text-slate-900">9. Médiation</h2>
          <p className="text-sm text-slate-600 mb-6">
            Conformément aux articles L.612-1 et suivants du Code de la consommation, en cas de litige, le consommateur
            peut recourir gratuitement à un médiateur de la consommation. Les coordonnées du médiateur seront communiquées
            sur les mentions légales dès adhésion effective. En attendant :{' '}
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

function App() {
  return (
    <BrowserRouter>
      <AffiliateCapture />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/politique-confidentialite" element={<PrivacyPage />} />
        <Route path="/mentions-legales" element={<LegalPage />} />
        <Route path="/cookies" element={<CookiesPage />} />
        <Route path="/cgv" element={<CgvSitePage />} />
      </Routes>
      <CookieBanner />
    </BrowserRouter>
  )
}

export default App
