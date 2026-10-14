// Artigos do blog. Para publicar um novo, adicione um objeto ao início da lista.
// (Futuramente pode ser trocado por um CMS — Sanity, Notion, WordPress headless etc.)

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // AAAA-MM-DD
  image: string;
  body: string[]; // parágrafos; linhas iniciadas com "## " viram subtítulos
};

const u = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`;

export const posts: Post[] = [
  {
    slug: "reforma-tributaria-o-que-muda-para-pequenas-empresas",
    title: "Reforma Tributária: o que muda para as pequenas empresas",
    excerpt:
      "CBS e IBS chegam de forma gradual. Veja como a transição afeta empresas do Simples Nacional e como se preparar desde já.",
    date: "2026-10-10",
    image: u("1579621970563-ebec7560ff3e"),
    body: [
      "A Reforma Tributária substitui gradualmente PIS, Cofins, IPI, ICMS e ISS por dois novos tributos sobre o consumo: a CBS (federal) e o IBS (estadual e municipal). A transição acontece ao longo de vários anos, e cada etapa traz ajustes na emissão de notas e na apuração dos impostos.",
      "## E o Simples Nacional?",
      "O Simples Nacional continua existindo. Porém, empresas que vendem para outras empresas poderão avaliar se vale a pena recolher CBS e IBS fora do regime para que seus clientes aproveitem créditos. Essa decisão depende do perfil de cada negócio e precisa ser feita com números em mãos.",
      "## Como se preparar",
      "Revise o cadastro de produtos e serviços, mantenha a emissão de notas fiscais em dia e converse com seu contador sobre simulações de carga tributária. Antecipar o planejamento evita surpresas no caixa.",
    ],
  },
  {
    slug: "como-escolher-o-regime-tributario",
    title: "Simples, Presumido ou Real: como escolher o regime tributário",
    excerpt:
      "O regime tributário certo pode reduzir de forma significativa o imposto pago. Entenda as diferenças entre as opções.",
    date: "2026-09-22",
    image: u("1554224155-6726b3ff858f"),
    body: [
      "Escolher o regime tributário é uma das decisões mais importantes para a saúde financeira de uma empresa. O enquadramento errado pode significar pagar mais imposto do que o necessário durante todo o ano.",
      "## Simples Nacional",
      "Reúne vários tributos em uma guia única e costuma ser vantajoso para empresas com faturamento até R$ 4,8 milhões por ano, dependendo da atividade e da folha de pagamento.",
      "## Lucro Presumido",
      "A base de cálculo é uma margem de lucro presumida pela legislação. Pode ser interessante para empresas com margens altas e despesas baixas.",
      "## Lucro Real",
      "Os tributos incidem sobre o lucro efetivamente apurado. É obrigatório para algumas atividades e faturamentos e vantajoso para empresas com margens apertadas ou prejuízo.",
      "A melhor escolha depende de uma simulação com os números reais do seu negócio — e é exatamente isso que fazemos na Planecon.",
    ],
  },
  {
    slug: "documentos-para-abrir-uma-empresa",
    title: "Quais documentos são necessários para abrir uma empresa",
    excerpt:
      "Um checklist prático com os documentos e as etapas para tirar o CNPJ do papel sem dor de cabeça.",
    date: "2026-08-30",
    image: u("1450101499163-c8848c66ca85"),
    body: [
      "Abrir uma empresa envolve registro na Junta Comercial, inscrição no CNPJ, inscrições estadual e municipal e, conforme a atividade, alvarás e licenças. Ter a documentação organizada acelera todo o processo.",
      "## Documentos dos sócios",
      "RG e CPF, comprovante de residência, certidão de casamento (quando houver) e número do recibo da última declaração de Imposto de Renda.",
      "## Informações da empresa",
      "Endereço com IPTU do imóvel, descrição das atividades, capital social e participação de cada sócio. A partir disso definimos o CNAE e o regime tributário mais vantajoso.",
      "Com tudo em mãos, a Planecon cuida das etapas junto aos órgãos públicos e entrega sua empresa pronta para operar.",
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const formatDate = (iso: string) =>
  new Date(iso + "T12:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
