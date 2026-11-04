import { useExperience } from './experience-context';
import './hero-brands.css';

interface BrandItem {
  name: string;
  logo: string;          // original color logo
  whiteLogo: string;    // white version (used for LIVO hover)
  height?: number;
  hoverWhite?: boolean; // true if hover should show white version
}

const brands: BrandItem[] = [
  {
    name: 'LIVO',
    logo: '/assets/brands/logo-livo.png',
    whiteLogo: '/assets/brands/white-livo.png',
    height: 44,
    hoverWhite: true,
  },
  {
    name: 'Sicredi',
    logo: '/assets/brands/logo-sicredi.png',
    whiteLogo: '/assets/brands/white-sicredi.png',
    height: 44,
  },
  {
    name: 'Sioux',
    logo: '/assets/brands/logo-sioux.png', // corrected original color
    whiteLogo: '/assets/brands/white-sioux.png',
    height: 38,
  },
  {
    name: 'LWSA',
    logo: '/assets/brands/logo-lwsa.png',
    whiteLogo: '/assets/brands/white-lwsa.png',
    height: 42,
  },
  {
    name: 'Locaweb',
    logo: '/assets/brands/logo-locaweb.png',
    whiteLogo: '/assets/brands/white-locaweb.png',
    height: 38,
  },
  {
    name: 'Rabbit',
    logo: '/assets/brands/logo-rabbit.png',
    whiteLogo: '/assets/brands/white-rabbit.png',
    height: 48,
  },
  {
    name: 'Adobe',
    logo: '/assets/brands/logo-adobe.png',
    whiteLogo: '/assets/brands/white-adobe.png',
    height: 40,
  },
  {
    name: 'AIG Seguros',
    logo: '/assets/brands/logo-aig.png',
    whiteLogo: '/assets/brands/white-aig.png',
    height: 44,
  },
  {
    name: 'Smartleader',
    logo: '/assets/brands/logo-smartleader.png',
    whiteLogo: '/assets/brands/white-smartleader.png',
    height: 40,
  },
];

export function HeroBrands() {
  const { t } = useExperience();
  return (
    <div className="hero-brands" aria-label={t('Empresas da minha trajetória', 'Companies from my career', 'Empresas de mi trayectoria')}>
      <div className="hero-brands-track">
        {[0, 1].map((copy) => (
          <div className="hero-brands-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>
            {brands.map((brand) => (
              <span key={brand.name} className="hero-brand-item" title={brand.name}>
                <div
                  className="hero-brand-stack"
                  style={brand.height ? { height: `${brand.height}px` } : undefined}
                >
                  {/* Idle logo – always the original color */}
                  <img
                    src={brand.logo}
                    alt=""
                    aria-hidden="true"
                    className="hero-brand-logo hero-brand-logo--idle"
                    loading="lazy"
                    draggable={false}
                  />
                  {/* Hover logo – white version only for brands with hoverWhite flag, otherwise same as original */}
                  <img
                    src={brand.hoverWhite ? brand.whiteLogo : brand.logo}
                    alt={brand.name}
                    className="hero-brand-logo hero-brand-logo--color"
                    loading="lazy"
                    draggable={false}
                  />
                </div>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
