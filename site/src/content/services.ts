// Áreas de atuação. Cada uma gera uma página própria em /servicos/[slug] (bom para SEO).

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  image: string;
  items: string[];
  seoTitle: string;
  seoDescription: string;
};

const u = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`;

export const services: Service[] = [
  {
    slug: "contabilidade-empresarial",
    title: "Contábil",
    short: "Escrituração, balanços e relatórios de acordo com as Normas Brasileiras de Contabilidade.",
    description:
      "Planejamento e escrituração contábil completos para que sua empresa tenha números confiáveis, cumpra a legislação e tome decisões com segurança.",
    image: u("1554224155-6726b3ff858f"),
    items: [
      "Planejamento contábil",
      "Elaboração de plano de contas",
      "Escrituração contábil física e digital (SPED)",
      "Relatórios oficiais de acordo com as Normas Brasileiras de Contabilidade",
      "Análise de balanços",
      "Perícias contábeis",
      "Assessoria a empresas do Lucro Real, Presumido, Simples Nacional, imunes e isentas",
      "Apuração do resultado anual ou trimestral",
    ],
    seoTitle: "Contabilidade Empresarial em Campinas",
    seoDescription:
      "Escrituração contábil, SPED, balanços e assessoria para empresas do Simples Nacional, Lucro Presumido e Lucro Real em Campinas e região.",
  },
  {
    slug: "assessoria-fiscal",
    title: "Fiscal",
    short: "Apuração de tributos, escrituração de notas e acompanhamento de fiscalizações.",
    description:
      "Gestão fiscal completa para manter sua empresa em dia com as obrigações federais, estaduais e municipais, evitando multas e pagando apenas o necessário.",
    image: u("1554224154-26032ffc0d07"),
    items: [
      "Escrituração de notas fiscais de entrada, saída e serviços",
      "Conferência da emissão das notas fiscais",
      "Emissão dos livros fiscais",
      "Escrituração dos estoques",
      "Apuração dos tributos a recolher",
      "Emissão de guias e declarações (DCTF, DIPI, GIA etc.)",
      "Demonstrativo de débitos estaduais e federais",
      "Acompanhamento de fiscalização federal, estadual e municipal",
      "Orientação sobre substituição tributária",
    ],
    seoTitle: "Assessoria Fiscal e Tributária em Campinas",
    seoDescription:
      "Apuração de impostos, escrituração fiscal, obrigações acessórias e acompanhamento de fiscalizações para empresas de Campinas e região.",
  },
  {
    slug: "departamento-pessoal",
    title: "Trabalhista e Previdenciária",
    short: "Folha de pagamento, admissões, rescisões, eSocial e obrigações trabalhistas.",
    description:
      "Cuidamos de toda a rotina do departamento pessoal, da admissão à rescisão, com atenção às convenções coletivas e às mudanças na legislação.",
    image: u("1522071820081-009f0129c71c"),
    items: [
      "Controle e execução de rotinas trabalhistas",
      "Admissão e demissão de empregados",
      "Folha de pagamento e recibos de pró-labore",
      "Guias de recolhimento das contribuições sobre a folha",
      "Relatórios complementares (RAIS, eSocial, CAGED)",
      "Controle de contrato de experiência e férias",
      "Apuração de IRRF, INSS, FGTS e contribuições sindicais",
      "Acompanhamento de convenções, acordos e dissídios coletivos",
      "Orientação sobre benefícios obrigatórios e facultativos",
    ],
    seoTitle: "Departamento Pessoal e Folha de Pagamento em Campinas",
    seoDescription:
      "Terceirização do departamento pessoal: folha de pagamento, eSocial, admissões, rescisões e obrigações trabalhistas para empresas de Campinas.",
  },
  {
    slug: "abertura-e-legalizacao-de-empresas",
    title: "Societária",
    short: "Abertura, alteração e encerramento de empresas, alvarás e certidões.",
    description:
      "Do primeiro registro à reorganização societária: orientamos o melhor enquadramento e cuidamos de toda a documentação junto aos órgãos públicos.",
    image: u("1450101499163-c8848c66ca85"),
    items: [
      "Constituição e encerramento de empresas",
      "Legalização de empresas nos órgãos públicos",
      "Cisão, fusão, incorporação e aquisição de empresas",
      "Elaboração de contratos sociais conforme o Código Civil",
      "Análise para melhor enquadramento da empresa",
      "Obtenção de alvarás e licenças junto à Prefeitura",
      "Obtenção de certidões negativas",
    ],
    seoTitle: "Abertura de Empresa em Campinas",
    seoDescription:
      "Abertura, alteração e encerramento de empresas em Campinas: contrato social, enquadramento tributário, alvarás, licenças e certidões negativas.",
  },
  {
    slug: "imposto-de-renda",
    title: "Imposto de Renda",
    short: "Declaração de IR pessoa física e jurídica com orientação especializada.",
    description:
      "Declarações de Imposto de Renda feitas com cuidado técnico, aproveitando as deduções permitidas e evitando a malha fina.",
    image: u("1586281380349-632531db7ed4"),
    items: [
      "Orientação tributária para pessoas físicas e jurídicas",
      "Declaração do Imposto de Renda Pessoa Física (IRPF)",
      "Declaração do Imposto de Renda Pessoa Jurídica",
      "Análise e controle da aplicação dos dispositivos legais vigentes",
      "Cálculo do IRRF",
      "Regularização de pendências e malha fina",
    ],
    seoTitle: "Declaração de Imposto de Renda em Campinas",
    seoDescription:
      "Declaração de Imposto de Renda Pessoa Física e Jurídica em Campinas, com orientação sobre deduções e regularização de malha fina.",
  },
  {
    slug: "auditoria",
    title: "Auditoria",
    short: "Prevenção de passivos trabalhistas e tributários e orientação legal.",
    description:
      "Revisamos procedimentos e registros para identificar riscos antes que virem passivos, trazendo mais segurança para sócios e gestores.",
    image: u("1460925895917-afdab827c52f"),
    items: [
      "Prevenção de passivos trabalhistas e tributários",
      "Acompanhamento e orientação dos procedimentos legais da empresa",
      "Revisão de rotinas contábeis e fiscais",
      "Relatórios com pontos de atenção e recomendações",
    ],
    seoTitle: "Auditoria Contábil e Tributária em Campinas",
    seoDescription:
      "Auditoria contábil, fiscal e trabalhista para prevenir passivos e dar mais segurança à gestão da sua empresa em Campinas e região.",
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
