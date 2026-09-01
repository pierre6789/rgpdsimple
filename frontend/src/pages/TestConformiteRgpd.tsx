import { useState } from 'react'
import { ContentLayout } from './ContentLayout'

type Q = { id: number; q: string; doc: string }

const QUESTIONS: Q[] = [
  { id: 1, q: 'Une politique de confidentialité est-elle publiée et accessible sur votre site ?', doc: 'Politique de confidentialité' },
  { id: 2, q: 'Vos mentions légales sont-elles complètes et à jour (éditeur, hébergeur, contact) ?', doc: 'Mentions légales' },
  { id: 3, q: 'Votre bandeau cookies permet-il de refuser aussi simplement que d’accepter, sans dépôt avant consentement ?', doc: 'Bandeau cookies conforme' },
  { id: 4, q: 'Tenez-vous un registre des traitements de données (même simplifié) ?', doc: 'Registre des traitements' },
  { id: 5, q: 'Si vous vendez en ligne, vos CGV sont-elles publiées et à jour ?', doc: 'CGV adaptées' },
  { id: 6, q: 'Informez-vous les personnes au moment où vous collectez leurs données (mention sur vos formulaires) ?', doc: 'Mentions d’information' },
]

const faq = [
  {
    q: 'Ce test de conformité RGPD est-il vraiment gratuit ?',
    a: "Oui, le test et son résultat sont 100 % gratuits et sans inscription. Il vous indique où vous en êtes et ce qu'il vous manque pour être en règle.",
  },
  {
    q: 'Le test suffit-il à me rendre conforme ?',
    a: "Non : le test est un diagnostic. Pour être en règle, il faut mettre en place les documents manquants. RGPD Simple les génère personnalisés pour votre activité pour 24,99 €.",
  },
  {
    q: 'Combien de temps prend le test ?',
    a: "Moins de deux minutes. Six questions simples, une réponse immédiate avec votre score et la liste de ce qui vous manque.",
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      headline: 'Test de conformité RGPD gratuit : êtes-vous en règle ? (2026)',
      description:
        "Test de conformité RGPD gratuit en 2 minutes pour les TPE : évaluez votre conformité et découvrez les documents qu'il vous manque.",
      inLanguage: 'fr-FR',
      image: ['https://www.rgpdsimple.fr/logo.png'],
      author: { '@id': 'https://www.rgpdsimple.fr/#organization' },
      publisher: { '@id': 'https://www.rgpdsimple.fr/#organization' },
      datePublished: '2026-08-26',
      dateModified: '2026-08-26',
      mainEntityOfPage: 'https://www.rgpdsimple.fr/test-conformite-rgpd',
    },
    {
      '@type': 'FAQPage',
      mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ],
}

function Quiz() {
  const [answers, setAnswers] = useState<Record<number, 'yes' | 'no'>>({})
  const [show, setShow] = useState(false)

  const set = (id: number, v: 'yes' | 'no') => {
    setAnswers((a) => ({ ...a, [id]: v }))
    setShow(false)
  }

  const gaps = QUESTIONS.filter((q) => answers[q.id] !== 'yes')
  const score = QUESTIONS.length - gaps.length
  const allAnswered = QUESTIONS.every((q) => answers[q.id])

  const verdict =
    score === QUESTIONS.length
      ? "L'essentiel est en place. Vérifiez toutefois que vos documents sont à jour des règles 2026."
      : score >= QUESTIONS.length - 2
        ? 'Vous n’êtes pas loin, mais il manque des éléments qui peuvent vous exposer en cas de contrôle.'
        : 'Votre conformité est incomplète : c’est exactement ce que la CNIL vérifie en priorité.'

  return (
    <div className="tool-box">
      {QUESTIONS.map((question) => (
        <div className="quiz-q" key={question.id}>
          <p className="quiz-label">
            {question.id}. {question.q}
          </p>
          <div className="quiz-opts">
            <button
              type="button"
              className={'quiz-opt' + (answers[question.id] === 'yes' ? ' is-active' : '')}
              onClick={() => set(question.id, 'yes')}
            >
              Oui
            </button>
            <button
              type="button"
              className={'quiz-opt' + (answers[question.id] === 'no' ? ' is-active is-no' : '')}
              onClick={() => set(question.id, 'no')}
            >
              Non
            </button>
          </div>
        </div>
      ))}

      <button type="button" className="cta-btn" style={{ marginTop: '8px' }} onClick={() => setShow(true)}>
        Voir mon résultat
      </button>

      {show && (
        <div className="quiz-result">
          <div className="quiz-score">
            Votre conformité : <strong>{score}/{QUESTIONS.length}</strong>
          </div>
          <p style={{ marginTop: '6px' }}>{verdict}</p>
          {!allAnswered && (
            <p className="tool-note">Astuce : répondez aux 6 questions pour un résultat complet.</p>
          )}
          {gaps.length > 0 ? (
            <>
              <p style={{ marginTop: '14px', marginBottom: '6px', fontWeight: 600 }}>Ce qu’il vous manque :</p>
              <ul style={{ marginTop: 0 }}>
                {gaps.map((g) => (
                  <li key={g.id}>{g.doc}</li>
                ))}
              </ul>
            </>
          ) : (
            <p style={{ marginTop: '12px' }}>Aucun manquement majeur détecté 👍</p>
          )}
        </div>
      )}
    </div>
  )
}

export function TestConformiteRgpd() {
  return (
    <ContentLayout
      title="Test de conformité RGPD gratuit : êtes-vous en règle ?"
      description="Test de conformité RGPD gratuit en 2 minutes pour TPE et indépendants : évaluez votre conformité et découvrez les documents qu'il vous manque pour être en règle."
      path="/test-conformite-rgpd"
      jsonLd={jsonLd}
    >
      <h1>Test de conformité RGPD : êtes-vous vraiment en règle ?</h1>
      <p className="lead">
        Six questions, deux minutes, une réponse claire. Évaluez gratuitement votre conformité RGPD et découvrez
        exactement ce qu’il vous manque — sans inscription.
      </p>

      <h2>Faites le test (gratuit)</h2>
      <Quiz />

      <div className="cta-box">
        <h3>Il vous manque des documents ? On les génère pour vous.</h3>
        <p>
          RGPD Simple crée les 5 documents conformes CNIL (politique, mentions, CGV, registre, bandeau cookies),
          personnalisés pour votre activité et livrés par email. 24,99 €, sans avocat.
        </p>
        <a className="cta-btn" href="/#commande">Obtenir mes documents — 24,99 €</a>
        <p style={{ marginTop: '12px', marginBottom: 0, fontSize: '14px' }}>
          Voir aussi le <a href="/blog/guide-rgpd-tpe">guide RGPD complet</a> et le <a href="/prix">comparatif des prix</a>.
        </p>
      </div>

      <h2>Pourquoi tester votre conformité ?</h2>
      <p>
        Le RGPD s’applique à toute entreprise qui traite des données personnelles, sans seuil de taille — un simple
        formulaire de contact ou des cookies suffisent. Depuis 2022, une <a href="/blog/controle-cnil-2026">procédure
        de sanction simplifiée</a> permet à la CNIL de viser aussi les TPE, avec une amende pouvant atteindre 20 000 €.
        Faire le point régulièrement est le meilleur moyen d’éviter les mauvaises surprises.
      </p>

      <h2>Les 6 piliers vérifiés par ce test</h2>
      <ul>
        <li><strong>Politique de confidentialité</strong> — informer les personnes sur l’usage de leurs données.</li>
        <li><strong>Mentions légales</strong> — obligatoires sur tout site professionnel.</li>
        <li><strong>Bandeau cookies conforme</strong> — refuser aussi simple qu’accepter, rien avant consentement.</li>
        <li><strong>Registre des traitements</strong> — la liste de vos traitements de données.</li>
        <li><strong>CGV</strong> — obligatoires si vous vendez à des consommateurs.</li>
        <li><strong>Information à la collecte</strong> — une mention claire sur vos formulaires.</li>
      </ul>
      <p>
        Ces six éléments sont précisément ceux que couvre le pack RGPD Simple, personnalisés pour votre secteur. Pour
        aller plus loin, consultez notre <a href="/blog/guide-rgpd-tpe">guide RGPD pour les TPE</a>.
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
