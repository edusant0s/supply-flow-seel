# Instruções Para Importar Planilhas Existentes

## Ordem Recomendada

1. Cadastre as obras em Configurações.
2. Importe fornecedores.
3. Importe RMs.
4. Importe orçamentos.
5. Importe contratos.
6. Crie usuários viewers e vincule às obras.

## Colunas Reconhecidas

### RMs

- `Num RM`, `RM`, `Requisicao`, `Número`
- `Data RM`, `Data Inclusão Item`, `Emissão`
- `Data Assinatura RM`: quando existir e estiver vazia, a RM vai para `Pend. assinatura`
- `Data Entrega RM`, `Data Entrega`, `Prazo`, `Data Necessidade`
- `Solicitante`, `Comprador`, `Centro de Custo`, `Categoria`, `Fase`, `Status`

### Orçamentos

- `Número Proposta`, `Proposta`, `PP`
- `Solicitante`, `Email`, `Cliente`, `Local da Obra`
- `Tipo de Orçamento`, `Data Solicitação`, `Data Entrega Cotações`
- `Fornecedor`, `Valor Final`, `Spend`, `Saving`, `Quantidade REQ`

### Contratos

- `Solicitante`, `Email`, `Centro de Custo`
- `Tipo Documento`, `Urgência`, `Prazo`
- `Status`, `Fase Compor`
- Campos adicionais ficam preservados em `payload`.

### Fornecedores

- `Código`, `Nome do Fornecedor`, `Categoria`
- `Produto/Serviço`, `Cidade`, `UF`, `Região`
- `Telefone`, `Email`, `Site`
- `Tem Cadastro Ativo?`, `Latitude`, `Longitude`

O arquivo `Mapa de Fornecedores - Original.xlsx` possui várias abas e uma linha de título antes do cabeçalho real. O importador detecta automaticamente a linha de cabeçalho de cada aba, ignora a aba `Menu Principal` e usa o nome da aba como categoria quando a coluna `Categoria` vier vazia.

Também são aceitas abas sem `Código`; nesses casos o upsert usa `codigo` quando existir e preserva o restante em `payload`.

## Regras

- A importação não apaga dados existentes.
- RMs, orçamentos e fornecedores usam upsert pelas chaves.
- Linhas repetidas da mesma RM são agrupadas antes de gravar, preservando os itens em `payload._linhas_importadas`.
- Fornecedores repetidos por `codigo` são atualizados; fornecedores sem código são inseridos como novos registros.
- Contratos são inseridos como novas solicitações.
- Erros por linha aparecem antes da confirmação.
- Campos não reconhecidos são gravados em `payload`.
