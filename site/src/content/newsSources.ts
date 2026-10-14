// Fontes públicas da seção "Atualize-se". As notícias de todas as fontes são misturadas e ordenadas por data.
//
// mode:
//   "link" → mostra manchete + resumo; o cartão leva direto à matéria no site original (respeita direitos autorais).
//   "full" → publica a matéria completa numa página do site, com crédito e link para o original.
//
// Para adicionar uma fonte: inclua um objeto com o endereço RSS. Para remover: apague a linha.

export type NewsSource = {
  id: string; // curto, sem espaços (usado nos endereços /atualize-se/<id>-...)
  name: string; // nome exibido no crédito
  url: string; // feed RSS
  mode: "link" | "full";
  limit?: number; // máximo de notícias aproveitadas desta fonte
};

export const newsSources: NewsSource[] = [
  {
    id: "contabeis",
    name: "Portal Contábeis",
    url: "https://www.contabeis.com.br/rss/noticias/",
    mode: "link",
    limit: 30,
  },
  {
    // Política da Agência Brasil: "Reprodução autorizada para veículos de comunicação com fins jornalísticos,
    // mediante indicação da fonte". Se preferir não republicar, troque para mode: "link".
    id: "agenciabrasil",
    name: "Agência Brasil",
    url: "https://agenciabrasil.ebc.com.br/rss/economia/feed.xml",
    mode: "full",
    limit: 10,
  },
];
