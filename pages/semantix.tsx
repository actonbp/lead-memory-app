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

const pilotSteps = [
  {
    number: '01',
    title: 'Ground the constructs',
    text: 'Synthesize leadership research and existing measures, then use SME review to refine high, neutral, and low behavioral manifestations.',
  },
  {
    number: '02',
    title: 'Construct semantic axes',
    text: 'Embed approved behavioral anchors and fix each construct’s scoring direction, midpoint, model, and projection rule before evaluation.',
  },
  {
    number: '03',
    title: 'Interpret events in context',
    text: 'Identify events in multimodal AMI recordings and use an open-weight LLM to describe what happened with timestamped evidence.',
  },
  {
    number: '04',
    title: 'Quantify and validate',
    text: 'Project event descriptions onto task- and relational-leadership axes and compare the results with trained PhD-student coding and direct prompting.',
  },
]

const team = [
  ['Bryan P. Acton, Ph.D.', 'Leadership, psychometrics, and computational modeling'],
  ['Sadamori Kojaku, Ph.D.', 'Computational social science and artificial intelligence'],
  ['Rory Eckardt, Ph.D.', 'Team dynamics, strategy, and multilevel research'],
  ['Erika Hernandez Acton, Ph.D.', 'Behavioral coding and organizational behavior'],
  ['Roseanne J. Foti, Ph.D.', 'Leadership and team-process research'],
]

export default function Semantix() {
  return (
    <>
      <Head>
        <title>Semantix | Continuous Measurement of Leadership and Team Dynamics</title>
        <meta
          name="description"
          content="A psychometrically grounded research program for continuous measurement of leadership and team constructs from multimodal behavior."
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
              <p className={styles.kicker}>Research program · Measurement + AI</p>
              <h1 id="hero-title">Continuous measurement of leadership and team dynamics.</h1>
              <p className={styles.heroSummary}>
                Semantix connects established theory and psychometric practice to scalable,
                evidence-linked measurement from transcripts, audio, and video.
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
                Leadership and team states change during interaction. Most measures capture them
                after the fact.
              </h2>
              <p>
                Surveys provide essential evidence about members&apos; experiences, and manual coding
                can connect observed behavior to theory. Yet both are difficult to apply
                continuously and at scale. Rich transcript, audio, and video records preserve how
                leadership and team processes unfold, but raw behavioral signals do not carry
                psychological meaning on their own.
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
                continuous indicators that can be evaluated for reliability and validity. The
                framework can be adapted to different leadership and team constructs without
                separating the resulting scores from the literature that gives them meaning.
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
                <div className={styles.sectionLabel}>Current proposed pilot · SUNY AI Platform</div>
                <h2 id="research-title">Multimodal AI-based assessment of leadership.</h2>
              </div>
              <p>
                The current pilot extends Semantix from a text-based team-state demonstration to
                task- and relational-leadership skills in multimodal team recordings. It is a
                focused computing study within the broader research program, independent of the
                project&apos;s other grant proposals.
              </p>
            </div>
            <div className={styles.investigationGrid}>
              {pilotSteps.map((step) => (
                <article key={step.number}>
                  <span>{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>
            <div className={styles.pilotSpecs} aria-label="SUNY AI pilot specifications">
              <div><small>Data</small><strong>10 public AMI team samples</strong></div>
              <div><small>Primary model</small><strong>Kimi K3 on H200 GPUs</strong></div>
              <div><small>Fallback</small><strong>Qwen3-VL-235B on H100 GPUs</strong></div>
              <div><small>Benchmark</small><strong>Trained PhD-student coding</strong></div>
            </div>
          </section>

          <section className={styles.pilot} aria-labelledby="pilot-title">
            <div className={styles.sectionIntro}>
              <div>
                <div className={styles.sectionLabel}>Earlier proof of concept</div>
                <h2 id="pilot-title">A working interface for inspecting scores and evidence.</h2>
              </div>
              <p>
                A text-centered pilot applied the semantic-axis workflow to psychological safety in
                publicly available AHRQ TeamSTEPPS training clips. It displays time-varying scores,
                behavior-level patterns, and the descriptions supporting each window. The current
                SUNY pilot builds on this implementation by adding leadership constructs,
                multimodal interpretation, open-weight models, and human-coder comparison.
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
              <div className={styles.sectionLabel}>Research collaborators</div>
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
            Psychometrically grounded measurement from multimodal behavior · Ongoing research
            program and preliminary implementation.
          </p>
        </footer>
      </div>
    </>
  )
}
