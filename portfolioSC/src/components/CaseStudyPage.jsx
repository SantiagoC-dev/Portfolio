import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { projects } from '../data/site';
import { Icon, Tags } from './UI';

export default function CaseStudyPage() {
  const { id } = useParams();
  const { t } = useTranslation();
  const projectIndex = projects.findIndex((p) => p.id === id || p.slug === id);
  const project = projectIndex >= 0 ? projects[projectIndex] : null;

  if (!project) {
    return (
      <section className="shell section">
        <h1>{t('case.notFound')}</h1>
        <Link className="button primary" to="/#work">
          {t('case.back')}
        </Link>
      </section>
    );
  }

  const p = t(`projects.${project.id}`, { returnObjects: true });
  const next = projects.length > 1 ? projects[(projectIndex + 1) % projects.length] : null;
  const order = String(projectIndex + 1).padStart(2, '0');

  return (
    <article className="shell case-page">
      <Link className="back-link" to="/#work">
        <Icon name="arrow" />
        {t('case.back')}
      </Link>

      <header className="case-header">
        <p className="eyebrow">
          {t('case.label')} / {order}
        </p>
        <h1>
          {project.name}
          <em>{p.headline}</em>
        </h1>
        <p className="lede">{p.detail}</p>

        <dl className="case-meta">
          {['role', 'client', 'period'].map((key) => (
            <div key={key}>
              <dt>{t(`case.${key}`)}</dt>
              <dd>{p[key]}</dd>
            </div>
          ))}
          <div>
            <dt>{t('case.stack')}</dt>
            <dd>
              <Tags items={project.stack} />
            </dd>
          </div>
        </dl>
      </header>

      <img className="case-cover" src={project.cover} alt={project.name} width="1440" height="837" />

      <section className="case-block" data-reveal>
        <h2>{t('case.challenge')}</h2>
        <p>{p.challenge}</p>
      </section>

      <section className="case-block" data-reveal>
        <h2>{t('case.solution')}</h2>
        <div>
          <p>{p.solution}</p>
          <p>{p.architecture}</p>
        </div>
      </section>

      <section className="case-gallery-section" data-reveal>
        <h2>{t('case.gallery')}</h2>
        <p className="micro">{t('work.note')}</p>
        <div className={`case-gallery ${project.device}`}>
          {project.gallery.map((src, i) => (
            <figure key={src}>
              <a href={src} target="_blank" rel="noopener noreferrer" aria-label={p.gallery[i]}>
                <img src={src} loading="lazy" decoding="async" alt={`${project.name} — ${p.gallery[i]}`} />
              </a>
              <figcaption>
                {String(i + 1).padStart(2, '0')} / {p.gallery[i]}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="case-block impact-block" data-reveal>
        <h2>{t('case.impact')}</h2>
        <div>
          <div className="metric">
            <strong>{p.metric}</strong>
            <span>{p.metricLabel}</span>
          </div>
          <p>{p.impact}</p>
          <ul>
            {p.outcomes.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
          <p className="micro">{t('case.note')}</p>
        </div>
      </section>

      <div className="case-end">
        <Link className="button primary" to="/#contact">
          {t('case.cta')}
          <Icon name="external" />
        </Link>
        {next ? (
          <Link className="text-link" to={`/case-study/${next.slug}`}>
            {t('case.next')}: {next.name}
            <Icon name="arrow" />
          </Link>
        ) : null}
      </div>
    </article>
  );
}
