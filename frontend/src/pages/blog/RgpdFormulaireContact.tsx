import { useState } from 'react'
import { ContentLayout } from '../ContentLayout'

const FINALITES = [
  'répondre à votre demande',
  'vous recontacter au sujet de votre demande',
  'gérer notre relation commerciale',
]

const faq = [
  {
    q: 'Une mention RGPD est-elle obligatoire sur un formulaire de contact ?',
    a: "Oui. Au moment où vous collectez des données via un formulaire, vous devez informer la personne : qui traite ses données, pour quelle finalité, combien de temps, et comment exercer ses droits. Un lien vers la politique de confidentialité complète cette information.",
  },
  {
    q: 'Que doit contenir la mention ?',
    a: "Le responsable du traitement, la finalité, la durée de conservation, les droits (accès, rectification, effacement, opposition), un contact pour les exercer et un lien vers la politique de confidentialité.",
  },
  {
    q: 'Faut-il une case à cocher de consentement ?',
    a: "Pour un simple formulaire de contact, l'information suffit généralement (base : mesures précontractuelles ou intérêt légitime). Une case de consentement distincte est nécessaire si vous inscrivez la personne à une newsletter ou à de la prospection.",
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      headline: 'Mention RGPD pour formulaire de contact : le texte à copier-coller',
      description:
        "Générez gratuitement la mention RGPD à mettre sous votre formulaire de contact, et découvrez ce qu'elle doit contenir.",
      inLanguage: 'fr-FR',
      author: { '@type': 'Organization', name: 'RGPD Simple' },
      publisher: { '@type': 'Organization', name: 'RGPD Simple', logo: { '@type': 'ImageObject', url: 'https://www.rgpdsimple.fr/logo.png' } },
      datePublished: '2026-08-23',
      dateModified: '2026-08-23',
      mainEntityOfPage: 'https://www.rgpdsimple.fr/blog/rgpd-formulaire-contact',
    },
    {
      '@type': 'FAQPage',
      mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ],
}

function MentionGenerator() {
  const [entreprise, setEntreprise] = useState('')
  const [finalite, setFinalite] = useState(FINALITES[0])
  const [email, setEmail] = useState('')
  const [copied, setCopied] = useState(false)

  const nom = entreprise.trim() || '[votre entreprise]'
  const mail = email.trim() || '[votre email de contact]'
  const mention = `Les informations recueillies sur ce formulaire sont enregistrées par ${nom} afin de ${finalite}. Elles sont destinées uniquement à ${nom} et conservées pendant la durée nécessaire au traitement de votre demande. Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement et d'opposition sur vos données : pour l'exercer, contactez ${mail}. Pour en savoir plus, consultez notre politique de confidentialité.`

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(mention)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="tool-box">
      <label className="tool-field">
        <span>Nom de votre entreprise</span>
        <input type="text" value={entreprise} onChange={(e) => setEntreprise(e.target.value)} placeholder="Ex. Boulangerie Martin" />
      </label>
      <label className="tool-field">
        <span>Finalité de la collecte</span>
        <select value={finalite} onChange={(e) => setFinalite(e.target.value)}>
          {FINALITES.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </label>
      <label className="tool-field">
        <span>Email de contact (droits RGPD)</span>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="contact@votre-site.fr" />
      </label>

      <div className="tool-output">{mention}</div>
      <button type="button" className="tool-copy" onClick={copy}>
        {copied ? '✓ Copié !' : 'Copier le texte'}
      </button>
      <p className="tool-note">
        Texte indicatif à placer sous votre formulaire. Il ne remplace pas une politique de confidentialité complète.
      </p>
    </div>
  )
}

export function RgpdFormulaireContact() {
  return (
    <ContentLayout
      title="Mention RGPD formulaire de contact : texte à copier-coller"
      description="Générez gratuitement la mention RGPD à placer sous votre formulaire de contact (texte prêt à copier) et découvrez ce qu'elle doit obligatoirement contenir."
      path="/blog/rgpd-formulaire-contact"
      jsonLd={jsonLd}
    >
      <h1>Mention RGPD pour formulaire de contact : le texte à copier-coller</h1>
      <p className="lead">
        Un formulaire de contact collecte des données personnelles : vous devez donc informer vos visiteurs. Voici un
        générateur gratuit pour obtenir la mention à placer juste sous votre formulaire, et le détail de ce qu'elle
        doit contenir.
      </p>
      <p className="meta">Mis à jour : août 2026 · Lecture 4 min</p>

      <h2>Générateur de mention RGPD (gratuit)</h2>
      <p>Renseignez vos informations, copiez le texte, et collez-le sous votre formulaire :</p>
      <MentionGenerator />

      <h2>Pourquoi cette mention est obligatoire</h2>
      <p>
        Le RGPD impose d'informer les personnes <strong>au moment où vous collectez</strong> leurs données. Sur un
        formulaire de contact, cela passe par une courte mention (qui, pourquoi, combien de temps, quels droits) et un
        lien vers votre <a href="/politique-confidentialite">politique de confidentialité</a>.
      </p>

      <h2>Ce que la mention doit contenir</h2>
      <ul>
        <li>Le <strong>responsable</strong> du traitement (votre entreprise).</li>
        <li>La <strong>finalité</strong> (répondre à la demande, recontacter…).</li>
        <li>La <strong>durée de conservation</strong> des données.</li>
        <li>Les <strong>droits</strong> : accès, rectification, effacement, opposition.</li>
        <li>Un <strong>contact</strong> pour exercer ces droits.</li>
        <li>Un <strong>lien</strong> vers la politique de confidentialité.</li>
      </ul>

      <h2>Faut-il une case de consentement ?</h2>
      <p>
        Pour un simple contact, l'information suffit généralement. En revanche, si vous en profitez pour inscrire la
        personne à une <a href="/blog/rgpd-newsletter">newsletter</a> ou à de la prospection, il faut une{' '}
        <strong>case de consentement distincte et non pré-cochée</strong>.
      </p>

      <div className="cta-box">
        <h3>La mention, c'est un début. Le pack complet, c'est la conformité.</h3>
        <p>
          Cette mention informe vos visiteurs, mais la conformité RGPD repose sur 5 documents. RGPD Simple les génère
          personnalisés pour votre activité, livrés par email. 24,99 €, sans avocat.
        </p>
        <a className="cta-btn" href="/#commande">Obtenir mes 5 documents — 24,99 €</a>
        <p style={{ marginTop: '12px', marginBottom: 0, fontSize: '14px' }}>
          Voir aussi le <a href="/blog/guide-rgpd-tpe">guide RGPD complet</a> et le <a href="/prix">comparatif des prix</a>.
        </p>
      </div>

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
