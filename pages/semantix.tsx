import Head from 'next/head'
import {
  Activity,
  ArrowDown,
  ArrowRight,
  BookOpenCheck,
  Braces,
  CheckCircle2,
  Mail,
  Scale,
  Users,
} from 'lucide-react'
import styles from '@/styles/Semantix.module.css'

const investigations = [
  {
    number: '01',
    title: 'Recover psychological safety',
    text: 'Develop the transcript-based protocol using natural team-interaction windows and theory-grounded behavioral anchors.',
  },
  {
    number: '02',
    title: 'Compare measurement approaches',
    text: 'Benchmark semantic-axis scores against direct LLM ratings and other field-relevant text and embedding methods.',
  },
  {
    number: '03',
    title: 'Test known cases',
    text: 'Evaluate whether the method recovers preregistered high, low, and within-scenario changes in enacted team interactions.',
  },
  {
    number: '04',
    title: 'Test generalization',
    text: 'Extend the framework to multimodal records and task cohesion in a validated team simulation.',
  },
]

const team = [
  ['Bryan P. Acton, Ph.D.', 'Principal Investigator'],
  ['Sadamori Kojaku, Ph.D.', 'Co-Principal Investigator'],
  ['Rory Eckardt, Ph.D.', 'Co-Investigator'],
  ['Erika Hernandez Acton, Ph.D.', 'Co-Investigator'],
  ['Roseanne J. Foti, Ph.D.', 'Senior Consultant'],
]

export default function Semantix() {
  return (
    <>
      <Head>
        <title>Semantix | Continuous Measurement of Team Dynamics</title>
        <meta
          name="description"
          content="A psychometrically grounded framework for continuous measurement of team constructs from multimodal behavior."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={styles.page}>
        <header className={styles.header}>
          <a className={styles.wordmark} href="#top" aria-label="Semantix home">
            SEMANTIX
          </a>
          <nav className={styles.nav} aria-label="Project navigation">
            <a href="#framework">Framework</a>
            <a href="#research">Research</a>
            <a href="#team">Team</a>
          </nav>
          <a className={styles.contactLink} href="mailto:bacton@binghamton.edu">
            <Mail aria-hidden="true" />
            Contact
          </a>
        </header>

        <main>
          <section className={styles.hero} id="top" aria-labelledby="hero-title">
            <div className={styles.heroImage} aria-hidden="true" />
            <div className={styles.heroShade} aria-hidden="true" />
            <div className={styles.heroContent}>
              <p className={styles.kicker}>Research prototype · Submitted ARI proposal</p>
              <h1 id="hero-title">Continuous measurement of team dynamics.</h1>
              <p className={styles.heroSummary}>
                A psychometrically grounded framework that connects theory, expert judgment,
                multimodal behavioral evidence, and semantic-axis measurement.
              </p>
              <a className={styles.heroAction} href="#framework">
                Explore the framework
                <ArrowDown aria-hidden="true" />
              </a>
            </div>
          </section>

          <section className={styles.statement} aria-labelledby="problem-title">
            <div className={styles.sectionLabel}>The measurement problem</div>
            <div className={styles.statementBody}>
              <h2 id="problem-title">
                Team states change during interaction. Most measures capture them after the fact.
              </h2>
              <p>
                Surveys provide essential evidence about members&apos; experiences, but episodic
                self-reports cannot show precisely when a team state changed, which behaviors
                produced the change, or how the state unfolded across a meeting. Rich transcript,
                audio, and video records preserve that process, yet raw behavioral signals do not
                carry psychological meaning on their own.
              </p>
            </div>
          </section>

          <section className={styles.framework} id="framework" aria-labelledby="framework-title">
            <div className={styles.sectionIntro}>
              <div>
                <div className={styles.sectionLabel}>The framework</div>
                <h2 id="framework-title">Construct meaning stays attached to the score.</h2>
              </div>
              <p>
                Subject matter experts define what the construct means and review its behavioral
                anchors. An LLM produces time-stamped, evidence-linked descriptions of bounded
                interaction windows. A fixed semantic axis then converts those descriptions into
                continuous indicators that can be evaluated for reliability and validity.
              </p>
            </div>

            <figure className={styles.figure}>
              <img
                src="/semantix/measurement-framework.png"
                alt="Three-part measurement framework showing expert-reviewed construct anchors, multimodal behavioral descriptions, and projection onto a semantic axis."
              />
              <figcaption>
                The proposed measurement framework from construct specification and multimodal
                observation to a time-varying semantic-axis score.
              </figcaption>
            </figure>

            <div className={styles.principles}>
              <article>
                <BookOpenCheck aria-hidden="true" />
                <h3>Theory first</h3>
                <p>Published construct definitions and SME review determine the anchors.</p>
              </article>
              <article>
                <Braces aria-hidden="true" />
                <h3>Evidence linked</h3>
                <p>Each score remains connected to an observed window and description.</p>
              </article>
              <article>
                <Scale aria-hidden="true" />
                <h3>Psychometrically tested</h3>
                <p>Reliability, validity, uncertainty, and boundary conditions are evaluated.</p>
              </article>
            </div>
          </section>

          <section className={styles.distinction} aria-labelledby="distinction-title">
            <div className={styles.distinctionCopy}>
              <div className={styles.sectionLabel}>The central distinction</div>
              <h2 id="distinction-title">Separate interpretation from measurement.</h2>
              <p>
                A general-purpose LLM can read a team interaction and assign a number directly.
                That combines interpretation and scaling in a single judgment. Semantix uses the
                model for its qualitative strength—describing behavior in context—then applies a
                predefined scoring rule grounded in theory and expert review.
              </p>
              <ul>
                <li><CheckCircle2 aria-hidden="true" /> Versioned construct protocols</li>
                <li><CheckCircle2 aria-hidden="true" /> Fixed, interpretable scoring directions</li>
                <li><CheckCircle2 aria-hidden="true" /> Repeatability across models and prompts</li>
                <li><CheckCircle2 aria-hidden="true" /> Explicit validation against converging evidence</li>
              </ul>
            </div>
            <figure className={styles.comparisonFigure}>
              <img
                src="/semantix/direct-versus-semantix.png"
                alt="Comparison of direct LLM numeric judgment with theory-grounded semantic-axis measurement."
              />
              <figcaption>
                Direct LLM judgment is retained as an empirical comparator rather than assumed to
                be a dependable measurement model.
              </figcaption>
            </figure>
          </section>

          <section className={styles.research} id="research" aria-labelledby="research-title">
            <div className={styles.sectionIntro}>
              <div>
                <div className={styles.sectionLabel}>Research program</div>
                <h2 id="research-title">Four investigations, one cumulative validation strategy.</h2>
              </div>
              <p>
                Psychological safety is the focal validation case. The final investigation tests
                whether the same measurement-development logic transfers to task cohesion and
                multimodal interaction data.
              </p>
            </div>
            <div className={styles.investigationGrid}>
              {investigations.map((investigation) => (
                <article key={investigation.number}>
                  <span>{investigation.number}</span>
                  <h3>{investigation.title}</h3>
                  <p>{investigation.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.pilot} aria-labelledby="pilot-title">
            <div className={styles.sectionIntro}>
              <div>
                <div className={styles.sectionLabel}>Preliminary implementation</div>
                <h2 id="pilot-title">A working interface for inspecting scores and evidence.</h2>
              </div>
              <p>
                The pilot applies the semantic-axis workflow to publicly available AHRQ TeamSTEPPS
                training clips. It displays time-varying construct scores, behavior-level patterns,
                and the descriptions supporting each window. These results demonstrate workflow
                feasibility; they are not presented as validation evidence.
              </p>
            </div>
            <figure className={styles.pilotFigure}>
              <img
                src="/semantix/pilot-interface.png"
                alt="Semantix pilot interface displaying a team video, psychological-safety score over time, behavior heatmap, and evidence-linked descriptions."
              />
              <figcaption>
                Pilot interface showing a higher-safety debrief window. The interface keeps the
                score, behavioral variation, and supporting descriptions visible together.
              </figcaption>
            </figure>
            <div className={styles.pilotEvidence}>
              <figure>
                <img
                  src="/semantix/pilot-contrasts.png"
                  alt="Pilot chart showing ordered scores across three AHRQ clips and the largest behavior-level contrasts."
                />
                <figcaption>
                  Preliminary scores recover the expected ordering of the three demonstration
                  clips and expose which behavioral dimensions drive the contrast.
                </figcaption>
              </figure>
              <div className={styles.evidenceNote}>
                <Activity aria-hidden="true" />
                <h3>Designed for inspection</h3>
                <p>
                  Aggregate scores can conceal opposing behavioral signals. The pilot therefore
                  exposes construct dimensions, interaction windows, and model-generated evidence
                  rather than presenting a single opaque rating.
                </p>
              </div>
            </div>
          </section>

          <section className={styles.team} id="team" aria-labelledby="team-title">
            <div className={styles.teamLead}>
              <div className={styles.sectionLabel}>Project team</div>
              <h2 id="team-title">Behavioral science, computational methods, and team research.</h2>
              <p>
                The interdisciplinary team brings expertise in psychometrics, leadership and team
                dynamics, natural language processing, computational social science, and
                multimodal behavioral coding.
              </p>
            </div>
            <div className={styles.teamList}>
              {team.map(([name, role]) => (
                <div key={name}>
                  <Users aria-hidden="true" />
                  <span>
                    <strong>{name}</strong>
                    <small>{role}</small>
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.contact} aria-labelledby="contact-title">
            <p className={styles.kicker}>Binghamton University</p>
            <h2 id="contact-title">Interested in the measurement framework?</h2>
            <p>Contact the project team to discuss the research, pilot, or potential applications.</p>
            <a href="mailto:bacton@binghamton.edu">
              bacton@binghamton.edu
              <ArrowRight aria-hidden="true" />
            </a>
          </section>
        </main>

        <footer className={styles.footer}>
          <span>SEMANTIX</span>
          <p>
            Continuous AI Measurement of Team Psychological Constructs · Submitted research
            proposal and preliminary implementation.
          </p>
        </footer>
      </div>
    </>
  )
}
