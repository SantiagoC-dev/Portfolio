import { useTranslation } from 'react-i18next';
import { contact, stack } from '../data/site';
import { Icon, SectionHeading, Tags } from './UI';
import certificate from '../assets/iTEPC.png';
export default function Profile() {
  const {
    t
  } = useTranslation();
  return <section id="about" className="shell section"><div className="profile-grid"><div data-reveal><SectionHeading eyebrow={t('about.eyebrow')} title={t('about.title')} /><p className="lede">{t('about.bio')}</p><a className="button secondary cv-button" href={contact.cv} download>{t('about.cv')}<Icon name="download" /></a></div><div className="education" data-reveal><h3>{t('about.education')}</h3>{t('about.studies', {
          returnObjects: true
        }).map(s => <div className="study" key={s.title}><p className="micro">{s.date}</p><h4>{s.title}</h4><p>{s.school}</p></div>)}<p className="language-note"><Icon name="globe" />{t('about.languages')}</p><a className="text-link" href={certificate} target="_blank" rel="noopener noreferrer">{t('about.certificate')}<Icon name="external" /></a></div></div><div className="stack-section" data-reveal><h3>{t('about.stackTitle')}</h3><div className="stack-grid">{stack.map(group => <div key={group.key}><h4>{t(`about.groups.${group.key}`)}</h4><Tags items={group.items} /></div>)}</div></div></section>;
}
