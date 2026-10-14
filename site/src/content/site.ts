// Dados institucionais da Planecon — altere aqui e o site inteiro é atualizado.

export const site = {
  name: "Planecon Contabilidade",
  shortName: "Planecon",
  url: "https://www.planeconcontabilidade.com.br",
  tagline: "Organização Contábil de Campinas e Região",
  email: "jmmonegatte@planeconcontabilidade.com.br",
  phone: "(19) 3213-3025",
  phoneHref: "tel:+551932133025",
  // TODO: confirmar número de WhatsApp com o cliente (formato internacional, só dígitos).
  whatsapp: "551932133025",
  whatsappMessage: "Olá! Vim pelo site e gostaria de falar com a Planecon Contabilidade.",
  address: {
    street: "Av. Barão de Monte Alegre, 180",
    district: "Vila Teixeira",
    city: "Campinas",
    state: "SP",
    postalCode: "13030-300", // TODO: confirmar CEP
    country: "BR",
  },
  mapsUrl: "https://maps.app.goo.gl/KVVKnxdRc3SU2WmV8",
  mapsEmbed:
    "https://www.google.com/maps?q=Av.+Bar%C3%A3o+de+Monte+Alegre,+180+-+Vila+Teixeira,+Campinas+-+SP&output=embed",
  openingHours: "Seg a Sex, 8h às 18h", // TODO: confirmar horário
  social: {
    instagram: "", // TODO: preencher se houver
    linkedin: "",
    facebook: "",
  },
};

export const whatsappLink = (message = site.whatsappMessage) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/sobre", label: "Sobre" },
  { href: "/servicos", label: "Serviços" },
  { href: "/blog", label: "Blog" },
  { href: "/atualize-se", label: "Atualize-se" },
  { href: "/contato", label: "Contato" },
];

// Imagens provisórias (Unsplash). Substitua por fotos reais do escritório e da equipe
// colocando os arquivos em /public/images e trocando os caminhos abaixo.
const u = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`;

export const images = {
  hero: u("1507679799987-c73779587ccf"),
  about: u("1551836022-d5d88e9218df"),
  cta: u("1556761175-5973dc0f32e7"),
  faq: u("1454165804606-c3d57bc86b40"),
  contact: u("1521791136064-7986c2920216"),
  pageHero: u("1497366216548-37526070297c"),
};

export const stats = [
  { value: "+25", label: "anos de experiência" }, // TODO: confirmar números
  { value: "+300", label: "empresas atendidas" },
  { value: "6", label: "áreas de atuação" },
];

export const values = [
  "Ética",
  "Segurança",
  "Transparência",
  "Inovação",
  "Responsabilidade",
  "Comprometimento",
  "Qualidade nos Serviços",
  "Respeito ao Próximo",
];

export const faq = [
  {
    q: "A Planecon atende empresas de qual porte e regime tributário?",
    a: "Atendemos MEIs, micro, pequenas e médias empresas, além de entidades imunes e isentas, nos regimes Simples Nacional, Lucro Presumido e Lucro Real.",
  },
  {
    q: "Como funciona a troca de contador para a Planecon?",
    a: "Cuidamos de todo o processo: solicitamos a documentação ao escritório anterior, conferimos a situação fiscal da empresa e assumimos as obrigações sem que você precise se preocupar com a burocracia.",
  },
  {
    q: "Vocês ajudam a abrir uma empresa do zero?",
    a: "Sim. Analisamos o melhor enquadramento tributário, elaboramos o contrato social e cuidamos de registros, alvarás e licenças junto aos órgãos públicos.",
  },
  {
    q: "Fazem declaração de Imposto de Renda para pessoa física?",
    a: "Sim. Elaboramos declarações de IRPF e IRPJ, com orientação sobre deduções, ganhos de capital e regularização de pendências na malha fina.",
  },
  {
    q: "Atendem apenas empresas de Campinas?",
    a: "Nossa sede fica em Campinas e atendemos toda a região metropolitana. Com o atendimento digital, também acompanhamos empresas de outras cidades.",
  },
];
