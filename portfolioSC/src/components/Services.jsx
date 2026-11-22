import { useTranslation } from 'react-i18next';
import { Icon, SectionHeading } from './UI';
export default function Services() {
  const {
    t
  } = useTranslation();
  return <section id="services" className="services-section section"><div className="shell"><SectionHeading eyebrow={t('services.eyebrow')} title={t('services.title')} intro={t('services.intro')} /><div className="service-grid">{t('services.items', {
          returnObjects: true
        }).map((s, i) => <article key={s.title} className="service-card" data-reveal style={{
          '--delay': `${i * 75}ms`
        }}><div className="service-top"><span>0{i + 1}</span><Icon name={['globe', 'services', 'work'][i]} size={26} /></div><h3>{s.title}</h3><p>{s.body}</p><small>{s.examples}</small></article>)}</div><div className="process"><h3 data-reveal>{t('services.processTitle')}</h3><ol className="process-grid">{t('services.process', {
            returnObjects: true
          }).map((step, i) => <li key={step.title} data-reveal style={{
            '--delay': `${i * 70}ms`
          }}><span>0{i + 1}</span><h4>{step.title}</h4><p>{step.body}</p></li>)}</ol></div></div></section>;
}
