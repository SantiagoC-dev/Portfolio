import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Icon } from './UI';
export default function Footer() {
  const {
    t
  } = useTranslation();
  return <footer className="site-footer"><div className="shell footer-inner"><div><strong>Santiago Calderón</strong><p>{t('footer.line')}</p></div><small>© {new Date().getFullYear()} · {t('footer.rights')}</small><Link className="text-link" to="/#home">{t('footer.top')}<Icon name="external" /></Link></div></footer>;
}
