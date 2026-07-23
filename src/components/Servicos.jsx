import imgWebdesign from '../assets/service-webdesign.jpg';
import imgProdutosDigitais from '../assets/service-produtos-digitais.jpg';
import imgDirecaoArte from '../assets/service-direcao-arte.jpg';

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-lime">
      <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" />
    </svg>
  );
}

const services = [
  {
    number: '01',
    name: 'WEBDESIGN',
    image: imgWebdesign,
    items: ['Websites', 'Design Responsivo', 'Landing Pages', 'UI Visual'],
    description:
      'Sites modernos, rápidos e pensados para converter. Do conceito ao pixel, cada projeto é desenvolvido com foco em resultado e usabilidade extrema.',
  },
  {
    number: '02',
    name: 'PRODUTOS DIGITAIS',
    image: imgProdutosDigitais,
    // TODO: confirmar com Mari
    items: ['Apps Mobile', 'Design de Interface', 'Design de Experiência', 'Prototipagem'],
    // TODO: confirmar com Mari
    description:
      'Produtos digitais pensados do zero ao lançamento, unindo estratégia e design para criar experiências que os usuários realmente querem usar.',
  },
  {
    number: '03',
    name: 'DIREÇÃO DE ARTE',
    image: imgDirecaoArte,
    // TODO: confirmar com Mari
    items: ['Identidade Visual', 'Direção de Arte', 'Social Media', 'Materiais Gráficos'],
    // TODO: confirmar com Mari
    description:
      'Direção criativa e design gráfico para marcas que querem se destacar, do conceito visual à aplicação em qualquer formato.',
  },
];

// Cada linha do conteúdo revelado sobe/aparece em sequência (stagger) no hover.
const lineBase =
  'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all duration-300 ease-out-custom';

function ServiceCard({ service }) {
  return (
    <div
      tabIndex={0}
      className="group relative w-full min-w-0 h-[380px] rounded-card border-[3px] border-lime overflow-hidden outline-none transition-[transform,box-shadow] duration-500 ease-out-custom hover:scale-[1.02] hover:z-20 hover:shadow-[0_20px_60px_-15px_rgba(185,212,64,0.35)] focus-within:scale-[1.02] focus-within:z-20 focus-within:shadow-[0_20px_60px_-15px_rgba(185,212,64,0.35)]"
    >
      <img
        src={service.image}
        alt={`Imagem representando o serviço de ${service.name.toLowerCase()}`}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-out-custom group-hover:scale-110 group-focus-within:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-near-black/90 via-near-black/40 to-near-black/10 transition-all duration-500 ease-out-custom group-hover:from-near-black/95 group-hover:via-near-black/65 group-focus-within:from-near-black/95 group-focus-within:via-near-black/65" />

      <div className="relative h-full flex flex-col justify-end p-6">
        <div className="flex items-center gap-2 mb-2 transition-all duration-300 ease-out-custom group-hover:opacity-0 group-hover:-translate-y-2 group-focus-within:opacity-0 group-focus-within:-translate-y-2">
          <span className="text-3xl font-bold text-lime">{service.number}</span>
          <SparkIcon />
        </div>
        <h3 className="font-bold text-bg-cream text-xl mb-3 transition-all duration-300 ease-out-custom group-hover:opacity-0 group-hover:-translate-y-2 group-focus-within:opacity-0 group-focus-within:-translate-y-2">
          {service.name.charAt(0) + service.name.slice(1).toLowerCase()}
        </h3>

        <div className="max-h-0 group-hover:max-h-[300px] group-focus-within:max-h-[300px] overflow-hidden transition-all duration-[550ms] ease-out-custom">
          <p className={`${lineBase} text-lime text-xs font-bold tracking-wide mb-3`} style={{ transitionDelay: '90ms' }}>
            {service.number} — {service.name}
          </p>
          <ul className="space-y-1 mb-3">
            {service.items.map((item, i) => (
              <li
                key={item}
                className={`${lineBase} font-bold text-bg-cream`}
                style={{ transitionDelay: `${150 + i * 70}ms` }}
              >
                {item}
              </li>
            ))}
          </ul>
          <p
            className={`${lineBase} text-sage text-sm`}
            style={{ transitionDelay: `${150 + service.items.length * 70 + 40}ms` }}
          >
            {service.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Servicos() {
  return (
    <section id="servicos" className="bg-grid-dark min-h-screen snap-start flex flex-col justify-center">
      <div className="max-w-[1280px] w-full mx-auto px-6 md:px-12 py-8 -mt-6 md:-mt-10">
        <p data-split className="text-lime text-center text-sm font-bold uppercase tracking-[0.2em] mb-3">
          Serviços
        </p>
        <h2 data-split className="text-bg-cream text-center text-2xl md:text-4xl mb-10">
          O que eu faço, exatamente?
        </h2>

        {/* Grid de 3 colunas: os 3 cards ficam totalmente visíveis lado a lado,
            sem scroll horizontal em 100% de zoom (empilham só no mobile). */}
        <div className="reveal grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.number} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
