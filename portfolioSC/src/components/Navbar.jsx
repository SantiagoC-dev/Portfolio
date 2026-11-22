import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { contact } from '../data/site';
import { Icon } from './UI';
const links = [['work', 'work'], ['services', 'services'], ['about', 'user'], ['contact', 'contact']];
export default function Navbar({
  theme,
  toggleTheme
}) {
  const {
    t,
    i18n
  } = useTranslation();
  const {
    hash,
    pathname
  } = useLocation();
  const changeLang = () => {
    const lang = i18n.resolvedLanguage === 'en' ? 'es' : 'en';
    i18n.changeLanguage(lang);
    try {
      localStorage.setItem('sc-language', lang);
    } catch {/* storage unavailable */}
  };
  const navigation = mobile => links.map(([id, icon]) => <Link key={id} to={`/#${id}`} aria-current={pathname === '/' && hash === `#${id}` ? 'location' : undefined}>{mobile && <Icon name={icon} size={21} />}<span>{t(`nav.${id}`)}</span></Link>);
  return <><a className="skip-link" href="#main">{t('nav.skip')}</a><header className="site-header"><div className="shell nav-inner"><Link className="brand" to="/" aria-label="Santiago Calderón — Home"><span className="brand-mark"><img src="/SantiLogo.svg" width="36" height="36" alt="" /></span><span>Santiago<span className="brand-last"> Calderón</span><small>software developer</small></span></Link><nav className="desktop-nav" aria-label={t('nav.home')}>{navigation(false)}</nav><div className="nav-actions"><button className="icon-btn lang-btn" onClick={changeLang} aria-label={t('nav.language')}>{i18n.resolvedLanguage === 'en' ? 'ES' : 'EN'}</button><button className="icon-btn" onClick={toggleTheme} aria-label={t('nav.theme')} aria-pressed={theme === 'dark'}><Icon name={theme === 'dark' ? 'sun' : 'moon'} /></button><a className="nav-cv" href={contact.cv} target="_blank" rel="noopener noreferrer">CV <Icon name="external" size={15} /></a></div></div></header><nav className="mobile-nav" aria-label={t('nav.home')}>{navigation(true)}</nav></>;
}
