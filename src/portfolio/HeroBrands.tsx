import type { CSSProperties } from 'react';
import { useExperience } from './experience-context';
import './hero-brands.css';

// Text placeholders can be replaced with official logo assets.
const brands = [
  { name: 'LIVO', href: 'https://www.livo.com.br/', color: '#ffda00' },
  { name: 'Sicredi', href: 'https://www.sicredi.com.br/', color: '#65bd45' },
  { name: 'Sioux', href: 'https://sioux.ag/', color: '#ff855b' },
  { name: 'LWSA', href: 'https://lwsa.tech/', color: '#b99bff' },
  { name: 'Locaweb', href: 'https://www.locaweb.com.br/', color: '#ff7178' },
  { name: 'Rabbit', href: 'https://rabbitmkt.com.br/', color: '#bddb42' },
  { name: 'Adobe', href: 'https://www.adobe.com/br/', color: '#ff6767' },
  { name: 'AIG Seguros', href: 'https://www.aig.com.br/', color: '#70b8ff' },
];

export function HeroBrands() {
  const { t } = useExperience();
  return <div className="hero-brands" aria-label={t('Empresas da minha trajetória', 'Companies from my career', 'Empresas de mi trayectoria')}>
    <div className="hero-brands-track">{[0, 1].map(copy => <div className="hero-brands-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>
    {brands.map(brand => {
      const style = { '--brand-color': brand.color } as CSSProperties;
      return brand.href
        ? <a key={brand.name} href={brand.href} target="_blank" rel="noopener noreferrer" style={style} tabIndex={copy === 1 ? -1 : undefined}
            aria-label={t(`Visitar o site de ${brand.name} (abre em nova aba)`, `Visit ${brand.name} (opens in a new tab)`, `Visitar ${brand.name} (abre en otra pestaña)`)}>{brand.name}</a>
        : <span key={brand.name} style={style}>{brand.name}</span>;
    })}</div>)}</div>
  </div>;
}
