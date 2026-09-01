import { useState } from 'react'
import { ContentLayout } from './ContentLayout'

const STATUTS = [
  'Auto-entrepreneur / entreprise individuelle (EI)',
  'EURL',
  'SARL',
  'SAS / SASU',
  'Association loi 1901',
  'Autre',
]

const HEBERGEURS: { label: string; adresse: string }[] = [
  { label: 'Vercel', adresse: 'Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis' },
  { label: 'OVHcloud', adresse: 'OVH SAS, 2 rue Kellermann, 59100 Roubaix, France' },
  { label: 'o2switch', adresse: 'o2switch, 222-224 Boulevard Gustave Flaubert, 63000 Clermont-Ferrand, France' },
  { label: 'IONOS', adresse: 'IONOS SARL, 7 place de la Gare, BP 70109, 57200 Sarreguemines, France' },
  { label: 'Hostinger', adresse: 'Hostinger International Ltd, 61 Lordou Vironos Street, 6023 Larnaca, Chypre' },
  { label: 'Autre / je ne sais pas', adresse: '' },
]

const faq = [
  {
    q: 'Les mentions légales sont-elles obligatoires ?',
    a: "Oui. Tout site professionnel doit afficher des mentions légales (loi LCEN de 2004). Leur absence est passible d'une amende pouvant aller jusqu'à 75 000 € pour une personne physique.",
  },
  {
    q: 'Que doivent contenir les mentions légales ?',
    a: "L'identité de l'éditeur (nom, statut, SIRET, adresse, contact), le directeur de la publication, et l'identité de l'hébergeur (nom et adresse). Pour un site marchand, s'ajoutent d'autres informations.",
  },
  {
    q: 'Ce générateur suffit-il pour être en règle ?',
    a: "Il produit des mentions légales de base, utiles et gratuites. Mais la conformité complète d'un site demande aussi une politique de confidentialité, un bandeau cookies, un registre et des CGV. RGPD Simple génère l'ensemble, personnalisé, pour 24,99 €.",
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      headline: 'Générateur de mentions légales gratuit (2026)',
      description:
        "Générez gratuitement les mentions légales de votre site en 1 minute : éditeur, hébergeur, directeur de publication. Texte prêt à copier.",
      inLanguage: 'fr-FR',
      image: ['https://www.rgpdsimple.fr/logo.png'],
      author: { '@id': 'https://www.rgpdsimple.fr/#organization' },
      publisher: { '@id': 'https://www.rgpdsimple.fr/#organization' },
      datePublished: '2026-08-26',
      dateModified: '2026-08-26',
      mainEntityOfPage: 'https://www.rgpdsimple.fr/generateur-mentions-legales',
    },
    {
      '@type': 'FAQPage',
      mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ],
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
}) {
  return (
    <label className="tool-field">
      <span>{label}</span>
      <input type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
    </label>
  )
}

function Generator() {
  const [entreprise, setEntreprise] = useState('')
  const [statut, setStatut] = useState(STATUTS[0])
  const [siret, setSiret] = useState('')
  const [adresse, setAdresse] = useState('')
  const [email, setEmail] = useState('')
  const [telephone, setTelephone] = useState('')
  const [responsable, setResponsable] = useState('')
  const [site, setSite] = useState('')
  const [hebergeur, setHebergeur] = useState(HEBERGEURS[0].label)
  const [hebergeurCustom, setHebergeurCustom] = useState('')
  const [copied, setCopied] = useState(false)

  const nom = entreprise.trim() || '[Nom de votre entreprise]'
  const hebObj = HEBERGEURS.find((h) => h.label === hebergeur)!
  const hebergeurTexte = hebObj.adresse || hebergeurCustom.trim() || "[Nom et adresse de votre hébergeur]"

  const lignes = [
    'MENTIONS LÉGALES',
    '',
    'Éditeur du site',
    `${nom} — ${statut}`,
    siret.trim() ? `SIRET : ${siret.trim()}` : null,
    `Adresse : ${adresse.trim() || '[votre adresse]'}`,
    `Email : ${email.trim() || '[votre email]'}`,
    telephone.trim() ? `Téléphone : ${telephone.trim()}` : null,
    `Directeur de la publication : ${responsable.trim() || nom}`,
    site.trim() ? `Site : ${site.trim()}` : null,
    '',
    'Hébergeur',
    hebergeurTexte,
    '',
    'Propriété intellectuelle',
    `L'ensemble des contenus du site (textes, images, logo, etc.) est protégé. Toute reproduction, même partielle, sans autorisation écrite est interdite.`,
    '',
    'Données personnelles',
    `Les traitements de données réalisés via ce site sont décrits dans la politique de confidentialité, accessible sur le site.`,
  ].filter(Boolean)

  const texte = lignes.join('\n')

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(texte)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="tool-box">
      <Field label="Nom de votre entreprise" value={entreprise} onChange={setEntreprise} placeholder="Ex. Boulangerie Martin" />
      <label className="tool-field">
        <span>Statut juridique</span>
        <select value={statut} onChange={(e) => setStatut(e.target.value)}>
          {STATUTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </label>
      <Field label="SIRET (facultatif)" value={siret} onChange={setSiret} placeholder="123 456 789 00012" />
      <Field label="Adresse" value={adresse} onChange={setAdresse} placeholder="12 rue des Artisans, 75011 Paris" />
      <Field label="Email de contact" value={email} onChange={setEmail} placeholder="contact@votre-site.fr" type="email" />
      <Field label="Téléphone (facultatif)" value={telephone} onChange={setTelephone} placeholder="06 12 34 56 78" />
      <Field label="Directeur de la publication" value={responsable} onChange={setResponsable} placeholder="Prénom Nom" />
      <Field label="Adresse du site (facultatif)" value={site} onChange={setSite} placeholder="www.votre-site.fr" />
      <label className="tool-field">
        <span>Hébergeur du site</span>
        <select value={hebergeur} onChange={(e) => setHebergeur(e.target.value)}>
          {HEBERGEURS.map((h) => (
            <option key={h.label} value={h.label}>
              {h.label}
            </option>
          ))}
        </select>
      </label>
      {!hebObj.adresse && (
        <Field
          label="Nom et adresse de l'hébergeur"
          value={hebergeurCustom}
          onChange={setHebergeurCustom}
          placeholder="Nom de l'hébergeur, adresse"
        />
      )}

      <div className="tool-output">{texte}</div>
      <button type="button" className="tool-copy" onClick={copy}>
        {copied ? '✓ Copié !' : 'Copier mes mentions légales'}
      </button>
      <p className="tool-note">
        Modèle de base à publier sur votre site. Il ne remplace pas les autres documents obligatoires (politique de
        confidentialité, cookies, CGV, registre).
      </p>
    </div>
  )
}

export function GenerateurMentionsLegales() {
  return (
    <ContentLayout
      title="Générateur de mentions légales gratuit (2026)"
      description="Générez gratuitement les mentions légales de votre site en 1 minute (éditeur, hébergeur, directeur de publication). Texte prêt à copier, sans inscription."
      path="/generateur-mentions-legales"
      jsonLd={jsonLd}
    >
      <h1>Générateur de mentions légales gratuit</h1>
      <p className="lead">
        Remplissez le formulaire, copiez le texte, publiez-le sur votre site. Gratuit, sans inscription, en une minute.
      </p>

      <h2>Vos mentions légales en 1 minute</h2>
      <Generator />

      <figure className="doc-preview">
        <img
          src="/apercu-pack-rgpd.svg"
          alt="Aperçu du pack RGPD Simple : politique de confidentialité, mentions légales et CGV au format PDF, conformes CNIL et personnalisées"
          width={880}
          height={480}
          loading="lazy"
        />
        <figcaption>Au-delà des mentions légales : les 5 documents RGPD, personnalisés et conformes CNIL.</figcaption>
      </figure>

      <div className="cta-box">
        <h3>Les mentions légales, c'est la base. Il vous manque 4 documents.</h3>
        <p>
          Un site en règle a aussi besoin d'une <strong>politique de confidentialité</strong>, d'un <strong>bandeau
          cookies conforme</strong>, d'un <strong>registre des traitements</strong> et de <strong>CGV</strong>. RGPD
          Simple les génère tous, personnalisés pour votre activité et à jour 2026, livrés par email. 24,99 €, sans
          avocat.
        </p>
        <a className="cta-btn" href="/#commande">Obtenir les 5 documents — 24,99 €</a>
        <p style={{ marginTop: '12px', marginBottom: 0, fontSize: '14px' }}>
          Pas sûr d'être en règle ? Faites le <a href="/test-conformite-rgpd">test de conformité gratuit</a>.
        </p>
      </div>

      <h2>Les mentions légales sont-elles obligatoires ?</h2>
      <p>
        Oui. Depuis la loi pour la confiance dans l'économie numérique (LCEN, 2004), tout site professionnel doit
        afficher des mentions légales identifiant clairement son éditeur et son hébergeur. Leur absence est passible
        d'une amende pouvant atteindre 75 000 € pour une personne physique (375 000 € pour une société).
      </p>

      <h2>Ce que doivent contenir vos mentions légales</h2>
      <ul>
        <li>L'<strong>identité de l'éditeur</strong> : nom, statut juridique, SIRET, adresse, email.</li>
        <li>Le <strong>directeur de la publication</strong>.</li>
        <li>L'<strong>hébergeur</strong> : nom et adresse.</li>
        <li>Un renvoi vers la <a href="/politique-confidentialite">gestion des données personnelles</a>.</li>
      </ul>
      <p>
        Pour un site marchand, d'autres mentions s'ajoutent (TVA, médiation, CGV…). Voir notre{' '}
        <a href="/blog/guide-rgpd-tpe">guide RGPD complet</a>.
      </p>

      <h2>Questions fréquentes</h2>
      {faq.map((f) => (
        <div key={f.q}>
          <h3>{f.q}</h3>
          <p>{f.a}</p>
        </div>
      ))}
    </ContentLayout>
  )
}
