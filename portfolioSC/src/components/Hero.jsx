import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import portrait from '../assets/yo.webp';
import { Icon } from './UI';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="shell hero" id="home">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="tiny-line" />
          {t('hero.eyebrow')}
        </p>

        <h1>
          {t('hero.title')}
          <br />
          <em>{t('hero.accent')}</em>
        </h1>

        <p className="hero-intro">{t('hero.intro')}</p>

        <div className="hero-actions">
          <Link className="button primary" to="/#contact">
            {t('hero.primary')}
            <Icon name="external" />
          </Link>
          <Link className="button secondary" to="/#work">
            {t('hero.secondary')}
            <Icon name="down" />
          </Link>
        </div>

        <p className="availability">
          <span />
          {t('hero.status')}
        </p>
      </div>

      <figure className="portrait">
        <div className="portrait-image">
          <img
            src={portrait}
            alt={t('hero.portrait')}
            width="768"
            height="1024"
            fetchPriority="high"
          />
        </div>
        <figcaption>
          <span>Santiago Calderón</span>
          <span>{t('hero.location')}</span>
        </figcaption>
      </figure>
    </section>
  );
}
