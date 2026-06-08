# Checklist de Testes Manuais

## Autenticação

- [ ] Login com super_admin.
- [ ] Logout.
- [ ] Redirecionamento automático para login sem sessão.
- [ ] Bloqueio de usuário inativo.
- [ ] Tela de nenhuma obra vinculada para viewer sem obras.

## Usuários e Obras

- [ ] Criar obra.
- [ ] Criar usuário viewer vinculado a uma obra.
- [ ] Criar usuário viewer_global e confirmar leitura de todas as RMs.
- [ ] Criar admin_suprimentos.
- [ ] Ativar/inativar usuário.
- [ ] Confirmar que somente super_admin vê Usuários e Configurações.

## Requisições

- [ ] Importar planilha de RMs.
- [ ] Validar erros por linha.
- [ ] Filtrar por busca.
- [ ] Mover card no Kanban como admin_suprimentos.
- [ ] Confirmar que viewer não arrasta card.
- [ ] Abrir detalhes de uma RM e enviar link de WhatsApp/Outlook quando houver contato do comprador.
- [ ] Alterar comprador de uma RM como admin_suprimentos.
- [ ] Confirmar que viewer_global enxerga RMs de obras diferentes e não consegue editar.
- [ ] Filtrar RMs por obra como admin e como viewer_global.
- [ ] Exportar XLSX.

## Orçamentos

- [ ] Criar solicitação manual.
- [ ] Criar solicitação manual como viewer, com anexo.
- [ ] Abrir detalhes como admin_orcamentos e baixar anexo.
- [ ] Importar planilha.
- [ ] Mover status como admin_orcamentos.
- [ ] Conferir cronômetro: não iniciado, em cotação e total finalizado em horário comercial.
- [ ] Validar KPIs de spend/saving.
- [ ] Exportar XLSX.

## Contratos

- [ ] Criar solicitação pelo formulário.
- [ ] Mover fases de contratos.
- [ ] Mover para fases Compor.
- [ ] Importar contratos.
- [ ] Confirmar que admin_contratos não altera outros módulos.

## Fornecedores

- [ ] Importar base de fornecedores.
- [ ] Importar `Mapa de Fornecedores - Original.xlsx` e confirmar leitura das abas com cabeçalho na linha 2.
- [ ] Filtrar por UF/status.
- [ ] Buscar por serviço.
- [ ] Validar filtros por categoria, região, UF e status.
- [ ] Conferir telefone, e-mail, site e observações no detalhe do fornecedor.
- [ ] Abrir mapa.
- [ ] Montar rota.
- [ ] Exportar XLSX.

## PWA

- [ ] Abrir app em desktop e verificar opção de instalação.
- [ ] Abrir app em mobile e verificar manifest.
- [ ] Simular offline e confirmar tela informativa.
