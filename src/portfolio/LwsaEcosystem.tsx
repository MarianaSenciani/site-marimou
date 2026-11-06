import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMotionPaused } from '@/components/ui/motion-context';
import { useExperience } from './experience-context';
import './lwsa-ecosystem.css';

interface BrandNode {
  id: string;
  name: string;
  logo: string;
  r: number;
  deg: number;
  x: number;
  y: number;
  left: number;
  top: number;
  category: { pt: string; en: string; es: string };
  desc: { pt: string; en: string; es: string };
}

const BRANDS: BrandNode[] = [
  // Arc 1 (r=165) — inner orbit framing LWSA
  {
    id: 'locaweb',
    name: 'Locaweb',
    logo: '/assets/cases/lwsa/ecosystem/logo-locaweb.webp',
    r: 165,
    deg: 116,
    x: 427.7,
    y: 351.7,
    left: 42.77,
    top: 62.8,
    category: {
      pt: 'Presença digital & hospedagem',
      en: 'Digital presence & web hosting',
      es: 'Presencia digital y hosting',
    },
    desc: {
      pt: 'A marca fundadora do grupo, pioneira em hospedagem e infraestrutura web no Brasil.',
      en: 'The founding brand of the group, pioneer in web hosting and online infrastructure in Brazil.',
      es: 'La marca fundadora del grupo, pionera en hosting e infraestructura web en Brasil.',
    },
  },
  {
    id: 'tray',
    name: 'Tray',
    logo: '/assets/cases/lwsa/ecosystem/logo-tray.webp',
    r: 165,
    deg: 64,
    x: 572.3,
    y: 351.7,
    left: 57.23,
    top: 62.8,
    category: {
      pt: 'Plataforma de e-commerce',
      en: 'E-commerce platform',
      es: 'Plataforma de e-commerce',
    },
    desc: {
      pt: 'Plataforma completa para criação e escala de lojas virtuais com integração a marketplaces.',
      en: 'End-to-end platform for building and scaling online stores with marketplace integrations.',
      es: 'Plataforma integral para crear y escalar tiendas online con integración a marketplaces.',
    },
  },

  // Arc 2 (r=265) — mid orbit
  {
    id: 'bling',
    name: 'Bling',
    logo: '/assets/cases/lwsa/ecosystem/logo_bling.webp',
    r: 265,
    deg: 146,
    x: 280.3,
    y: 351.8,
    left: 28.03,
    top: 62.82,
    category: {
      pt: 'Gestão & ERP em nuvem',
      en: 'Cloud management & ERP',
      es: 'Gestión y ERP en la nube',
    },
    desc: {
      pt: 'Sistema integrado de gestão para pequenas e médias empresas do comércio eletrônico.',
      en: 'Integrated cloud ERP for small and mid-sized digital commerce businesses.',
      es: 'Sistema de gestión integrado para pequeñas y medianas empresas de comercio electrónico.',
    },
  },
  {
    id: 'vindi',
    name: 'Vindi',
    logo: '/assets/cases/lwsa/ecosystem/vindi-2025.png',
    r: 265,
    deg: 90,
    x: 500.0,
    y: 235.0,
    left: 50.0,
    top: 41.96,
    category: {
      pt: 'Pagamentos recorrentes',
      en: 'Recurring payments',
      es: 'Pagos recurrentes',
    },
    desc: {
      pt: 'Plataforma financeira especializada em cobrança, assinaturas e intermediação de pagamentos.',
      en: 'Financial platform specializing in recurring billing, subscriptions, and payment processing.',
      es: 'Plataforma financiera especializada en cobros, suscripciones y procesamiento de pagos.',
    },
  },
  {
    id: 'melhor-envio',
    name: 'Melhor Envio',
    logo: '/assets/cases/lwsa/ecosystem/logo-melhor-envio-2.webp',
    r: 265,
    deg: 34,
    x: 719.7,
    y: 351.8,
    left: 71.97,
    top: 62.82,
    category: {
      pt: 'Logística & fretes',
      en: 'Shipping & logistics',
      es: 'Logística y envíos',
    },
    desc: {
      pt: 'Cotação, intermediação e gestão de envios conectando lojistas às principais transportadoras.',
      en: 'Shipping quotes and logistics management connecting merchants to major carriers.',
      es: 'Cotización y gestión logística conectando vendedores con las principales transportadoras.',
    },
  },

  // Arc 3 (r=365) — outer-mid orbit
  {
    id: 'bagy',
    name: 'Bagy',
    logo: '/assets/cases/lwsa/ecosystem/logo-bagy.webp',
    r: 365,
    deg: 126,
    x: 285.5,
    y: 204.7,
    left: 28.55,
    top: 36.56,
    category: {
      pt: 'Social commerce & mobile',
      en: 'Social commerce & mobile',
      es: 'Social commerce y móvil',
    },
    desc: {
      pt: 'Criação ágil de lojas virtuais voltadas para vendas diretas pelo Instagram e WhatsApp.',
      en: 'Fast storefront setup optimized for direct selling through Instagram and WhatsApp.',
      es: 'Creación ágil de tiendas online optimizadas para vender por Instagram y WhatsApp.',
    },
  },
  {
    id: 'octadesk',
    name: 'Octadesk',
    logo: '/assets/cases/lwsa/ecosystem/logo-octadesk.webp',
    r: 365,
    deg: 54,
    x: 714.5,
    y: 204.7,
    left: 71.45,
    top: 36.56,
    category: {
      pt: 'Atendimento & chat multicanal',
      en: 'Customer service & chat',
      es: 'Atención y chat multicanal',
    },
    desc: {
      pt: 'Gestão de conversas, help desk e suporte multicanal para equipes de vendas e retenção.',
      en: 'Omnichannel conversation management, help desk, and support for sales and retention teams.',
      es: 'Gestión de conversaciones, help desk y soporte multicanal para ventas y fidelización.',
    },
  },

  // Arc 4 (r=465) — outer boundary orbit
  {
    id: 'kinghost',
    name: 'KingHost',
    logo: '/assets/cases/lwsa/ecosystem/logo-kinghost.webp',
    r: 465,
    deg: 158,
    x: 68.9,
    y: 325.8,
    left: 6.89,
    top: 58.18,
    category: {
      pt: 'Hospedagem & cloud',
      en: 'Hosting & cloud infrastructure',
      es: 'Hosting e infraestructura cloud',
    },
    desc: {
      pt: 'Infraestrutura de servidores, domínios e suporte técnico para desenvolvedores e empresas.',
      en: 'Server infrastructure, domains, and technical support for developers and businesses.',
      es: 'Infraestructura de servidores, dominios y soporte técnico para desarrolladores y empresas.',
    },
  },
  {
    id: 'cplug',
    name: 'ConnectPlug',
    logo: '/assets/cases/lwsa/ecosystem/logo-cplug.webp',
    r: 465,
    deg: 90,
    x: 500.0,
    y: 35.0,
    left: 50.0,
    top: 6.25,
    category: {
      pt: 'PDV & automação para varejo',
      en: 'POS & retail management',
      es: 'TPV y gestión de retail',
    },
    desc: {
      pt: 'Sistemas de ponto de venda em nuvem e automação comercial para lojas físicas e híbridas.',
      en: 'Cloud-based point of sale systems and commercial automation for physical and omnichannel retail.',
      es: 'Sistemas de punto de venta en la nube y automatización comercial para retail físico e híbrido.',
    },
  },
  {
    id: 'wake',
    name: 'Wake',
    logo: '/assets/cases/lwsa/ecosystem/wake.webp',
    r: 465,
    deg: 22,
    x: 931.1,
    y: 325.8,
    left: 93.11,
    top: 58.18,
    category: {
      pt: 'Experiência & varejo digital',
      en: 'Digital retail & experience',
      es: 'Experiencia y retail digital',
    },
    desc: {
      pt: 'Plataforma integrada de comércio unificado e marketing de experiência para grandes marcas.',
      en: 'Unified commerce and experience marketing platform designed for enterprise brands.',
      es: 'Plataforma integrada de comercio unificado y marketing de experiencia para grandes marcas.',
    },
  },
];

const ARCS = [
  { r: 165, path: 'M 335.0 500.0 A 165 165 0 0 1 665.0 500.0' },
  { r: 265, path: 'M 235.0 500.0 A 265 265 0 0 1 765.0 500.0' },
  { r: 365, path: 'M 135.0 500.0 A 365 365 0 0 1 865.0 500.0' },
  { r: 465, path: 'M 35.0 500.0 A 465 465 0 0 1 965.0 500.0' },
];

export function LwsaEcosystem() {
  const { lang, t } = useExperience();
  const paused = useMotionPaused();

  const [selectedBrand, setSelectedBrand] = useState<BrandNode | null>(null);
  const [hoveredBrand, setHoveredBrand] = useState<BrandNode | null>(null);
  const [centerSelected, setCenterSelected] = useState(false);
  const [centerHovered, setCenterHovered] = useState(false);

  const active = hoveredBrand ?? selectedBrand;
  const isCenterActive = !active && (centerHovered || centerSelected);

  return (
    <figure
      className="lwsa-ecosystem-stage"
      aria-label={t(
        'Mapa interativo do ecossistema de marcas da LWSA',
        'Interactive map of the LWSA brand ecosystem',
        'Mapa interactivo del ecosistema de marcas de LWSA'
      )}
    >
      {/* Header with live dynamic description */}
      <header className="lwsa-ecosystem-header">
        <span className="lwsa-ecosystem-kicker">
          <i aria-hidden="true">✳</i>
          {t('Ecossistema de marcas', 'Brand ecosystem', 'Ecosistema de marcas')}
        </span>
        <div className="lwsa-ecosystem-live-title">
          <AnimatePresence mode="wait">
            {active ? (
              <motion.div
                key={active.id}
                initial={paused ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={paused ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="lwsa-active-detail"
              >
                <div className="lwsa-active-row">
                  <h3 className="lwsa-active-name">{active.name}</h3>
                  <span className="lwsa-active-category">{active.category[lang]}</span>
                </div>
                <p className="lwsa-active-desc">{active.desc[lang]}</p>
              </motion.div>
            ) : isCenterActive ? (
              <motion.div
                key="center-hover"
                initial={paused ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={paused ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="lwsa-active-detail"
              >
                <div className="lwsa-active-row">
                  <h3 className="lwsa-active-name">LWSA</h3>
                  <span className="lwsa-active-category">
                    {t('Marca institucional', 'Institutional brand', 'Marca institucional')}
                  </span>
                </div>
                <p className="lwsa-active-desc">
                  {t(
                    'A marca que unifica e dá sustentação a 10 plataformas líderes de tecnologia e comércio.',
                    'The brand that unifies and powers 10 leading technology and commerce platforms.',
                    'La marca que unifica y respalda a 10 plataformas líderes de tecnología y comercio.'
                  )}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="default"
                initial={paused ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={paused ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="lwsa-active-detail"
              >
                <div className="lwsa-active-row">
                  <h3 className="lwsa-active-name">
                    {t(
                      'O ecossistema em torno da LWSA',
                      'The ecosystem around LWSA',
                      'El ecosistema alrededor de LWSA'
                    )}
                  </h3>
                  <span className="lwsa-active-badge-count">
                    {t('10 marcas conectadas', '10 connected brands', '10 marcas conectadas')}
                  </span>
                </div>
                <p className="lwsa-active-desc">
                  {t(
                    'Passe o mouse ou toque sobre as marcas para conhecer o papel de cada frente na expansão do grupo.',
                    'Hover or tap on any brand to explore its role in the group’s expansion.',
                    'Pasa el cursor o toca las marcas para explorar el rol de cada frente en la expansión del grupo.'
                  )}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* SVG Canvas for radar arcs, glow fills, and connection rays */}
      <div className="lwsa-radar-wrap">
        <svg
          className="lwsa-radar-svg"
          viewBox="0 0 1000 560"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <defs>
            {/* Atmospheric radial gradient behind the arcs */}
            <radialGradient id="lwsa-radar-glow" cx="500" cy="500" r="480" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="var(--lwsa-glow-color, rgba(186, 170, 210, 0.18))" />
              <stop offset="45%" stopColor="var(--lwsa-glow-color, rgba(186, 170, 210, 0.06))" />
              <stop offset="85%" stopColor="transparent" />
            </radialGradient>
            {/* Ray gradient */}
            <linearGradient id="lwsa-ray-active" x1="500" y1="500" x2="500" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#bddb42" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#baaad2" stopOpacity="1" />
            </linearGradient>
          </defs>

          {/* Atmospheric background aura */}
          <path d="M 35.0 500.0 A 465 465 0 0 1 965.0 500.0 Z" fill="url(#lwsa-radar-glow)" />

          {/* Concentric orbital arcs */}
          {ARCS.map((arc, idx) => (
            <path
              key={arc.r}
              d={arc.path}
              className={`lwsa-arc-line lwsa-arc-${idx}`}
            />
          ))}

          {/* Dynamic connection rays from LWSA center to satellites */}
          {BRANDS.map(brand => {
            const isHovered = active?.id === brand.id;
            const isConnected = isHovered || isCenterActive;
            return (
              <line
                key={`ray-${brand.id}`}
                x1="500"
                y1="500"
                x2={brand.x}
                y2={brand.y}
                className={`lwsa-ray ${isConnected ? 'is-active' : ''} ${isHovered ? 'is-hovered' : ''}`}
              />
            );
          })}
        </svg>

        {/* Satellite brand cards overlaid on the radar */}
        <div className="lwsa-satellites-layer">
          {BRANDS.map((brand, i) => {
            const isHovered = active?.id === brand.id;
            const isDimmed = active !== null && !isHovered;

            return (
              <motion.button
                key={brand.id}
                type="button"
                className={`lwsa-satellite-badge ${isHovered ? 'is-hovered' : ''} ${
                  isDimmed ? 'is-dimmed' : ''
                }`}
                style={{
                  left: `${brand.left}%`,
                  top: `${brand.top}%`,
                }}
                animate={
                  paused
                    ? {}
                    : {
                        y: isHovered ? -4 : [0, Math.sin(brand.deg) * -5, 0],
                      }
                }
                transition={
                  paused
                    ? { duration: 0 }
                    : {
                        y: {
                          duration: 3.4 + (i % 3) * 0.6,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: (i * 0.22) % 1.2,
                        },
                      }
                }
                onClick={() => {
                  setCenterSelected(false);
                  setSelectedBrand(prev => (prev?.id === brand.id ? null : brand));
                }}
                onPointerEnter={() => setHoveredBrand(brand)}
                onPointerLeave={() => setHoveredBrand(null)}
                onFocus={() => setHoveredBrand(brand)}
                onBlur={() => setHoveredBrand(null)}
                aria-label={`${brand.name}: ${brand.category[lang]}`}
              >
                <div className="lwsa-badge-inner">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className={`lwsa-brand-img lwsa-img-${brand.id}`}
                    loading="lazy"
                  />
                </div>
                <span className="lwsa-badge-mini-label">{brand.name}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Central Prominent LWSA Brand Anchor */}
        <div className="lwsa-center-anchor">
          <motion.button
            type="button"
            className={`lwsa-center-card ${isCenterActive ? 'is-hovered' : ''}`}
            onClick={() => {
              setSelectedBrand(null);
              setCenterSelected(prev => !prev);
            }}
            onPointerEnter={() => setCenterHovered(true)}
            onPointerLeave={() => setCenterHovered(false)}
            onFocus={() => setCenterHovered(true)}
            onBlur={() => setCenterHovered(false)}
            aria-label={t(
              'LWSA — Centro do ecossistema institucional',
              'LWSA — Center of the institutional ecosystem',
              'LWSA — Centro del ecosistema institucional'
            )}
            animate={
              paused
                ? {}
                : {
                    boxShadow: isCenterActive
                      ? '0 0 45px rgba(186, 170, 210, 0.6), 0 14px 32px rgba(0,0,0,0.7)'
                      : [
                          '0 0 20px rgba(186, 170, 210, 0.25), 0 10px 25px rgba(0,0,0,0.6)',
                          '0 0 35px rgba(186, 170, 210, 0.45), 0 12px 30px rgba(0,0,0,0.65)',
                          '0 0 20px rgba(186, 170, 210, 0.25), 0 10px 25px rgba(0,0,0,0.6)',
                        ],
                  }
            }
            transition={
              paused
                ? { duration: 0 }
                : {
                    boxShadow: {
                      duration: 3.2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                  }
            }
          >
            <div className="lwsa-center-core">
              <span className="lwsa-center-aura" aria-hidden="true" />
              <img
                src="/assets/brands/white-lwsa.png"
                alt="LWSA"
                className="lwsa-center-logo"
              />
              <span className="lwsa-center-caption">
                {t('Ecossistema', 'Ecosystem', 'Ecosistema')}
              </span>
            </div>
          </motion.button>
        </div>
      </div>

      {/* Quick brand chips bar (especially convenient on touch screens and mobile) */}
      <nav
        className="lwsa-brand-chips-bar"
        aria-label={t(
          'Lista rápida de marcas do ecossistema',
          'Quick list of ecosystem brands',
          'Lista rápida de marcas del ecosistema'
        )}
      >
        <button
          type="button"
          className={`lwsa-brand-chip ${isCenterActive ? 'is-active' : ''}`}
          onClick={() => {
            setSelectedBrand(null);
            setCenterSelected(prev => !prev);
          }}
          onPointerEnter={() => setCenterHovered(true)}
          onPointerLeave={() => setCenterHovered(false)}
        >
          LWSA
        </button>
        {BRANDS.map(brand => {
          const isSelected = active?.id === brand.id;
          return (
            <button
              key={`chip-${brand.id}`}
              type="button"
              className={`lwsa-brand-chip ${isSelected ? 'is-active' : ''}`}
              onClick={() => {
                setCenterSelected(false);
                setSelectedBrand(prev => (prev?.id === brand.id ? null : brand));
              }}
              onPointerEnter={() => setHoveredBrand(brand)}
              onPointerLeave={() => setHoveredBrand(null)}
            >
              {brand.name}
            </button>
          );
        })}
      </nav>

      <figcaption className="lwsa-ecosystem-caption">
        {t(
          'Composição visual do ecossistema de marcas reunidas durante a expansão de Locaweb Company para LWSA.',
          'Visual composition of the brand ecosystem assembled during the expansion of Locaweb Company to LWSA.',
          'Composición visual del ecosistema de marcas reunidas durante la expansión de Locaweb Company a LWSA.'
        )}
      </figcaption>
    </figure>
  );
}
