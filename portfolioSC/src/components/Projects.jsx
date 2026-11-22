import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { projects } from '../data/site';
import { Icon, SectionHeading, Tags } from './UI';

function getProjectOrder(index) {
  return String(index + 1).padStart(2, '0');
}

export function ProjectVisual({ project, index }) {
  const { t } = useTranslation();
  const order = getProjectOrder(index);

  return (
    <div className={`project-visual ${project.device}`}>
      <span className="visual-label">
        {project.name} / {t('work.note')}
      </span>

      <div className="preview-images">
        {project.preview.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`${project.name} — ${
              t(`projects.${project.id}.gallery`, { returnObjects: true })[
                project.device === 'mobile' ? (i === 0 ? 1 : 4) : 0
              ]
            }`}
            loading="lazy"
            decoding="async"
          />
        ))}
      </div>

      <span className="visual-number">{order}</span>
    </div>
  );
}

export default function Projects() {
  const { t } = useTranslation();

  return (
    <section className="section shell" id="work">
      <SectionHeading
        eyebrow={t('work.eyebrow')}
        title={t('work.title')}
        intro={t('work.intro')}
      />

      <div className="project-list">
        {projects.map((project, index) => {
          const p = t(`projects.${project.id}`, { returnObjects: true });

          return (
            <article className="project-card" key={project.slug} data-reveal>
              <Link
                className="project-art-link"
                to={`/case-study/${project.slug}`}
                aria-label={`${t('work.case')}: ${project.name}`}
              >
                <ProjectVisual project={project} index={index} />
              </Link>

              <div className="project-copy">
                <p className="micro">{p.category}</p>
                <h3>
                  {project.name}
                  <span>{p.headline}</span>
                </h3>

                <dl className="project-story">
                  {['challenge', 'solution', 'impact'].map((k) => (
                    <div key={k}>
                      <dt>{t(`work.${k}`)}</dt>
                      <dd>{p[k]}</dd>
                    </div>
                  ))}
                </dl>

                <div className="metric">
                  <strong>{p.metric}</strong>
                  <span>{p.metricLabel}</span>
                </div>

                <Tags items={project.stack} />

                <Link className="text-link" to={`/case-study/${project.slug}`}>
                  {t('work.case')}
                  <Icon name="external" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
