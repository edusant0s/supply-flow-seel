-- Atualiza o modelo editavel do formulario de contratos e restringe alteracao estrutural ao super_admin.

create or replace function public.can_manage_embedded_state_key(p_module_key text, p_storage_key text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.current_profile_is_active()
    and case p_module_key
      when 'contratos' then
        case
          when p_storage_key = 'seel_form_google_forms_v8_sem_mapa_sem_un' then public.get_current_user_role() = 'super_admin'
          else public.get_current_user_role() in ('super_admin','admin_contratos')
        end
      when 'estoque_obras' then public.get_current_user_role() in ('super_admin','admin_suprimentos')
      when 'fretes' then public.get_current_user_role() = 'super_admin'
      when 'frota' then public.get_current_user_role() = 'super_admin'
      when 'avaliacao_fornecedores' then public.get_current_user_role() = 'super_admin'
      else false
    end;
$$;

drop policy if exists embedded_app_state_insert on public.embedded_app_state;
create policy embedded_app_state_insert on public.embedded_app_state
for insert with check (public.can_manage_embedded_state_key(module_key, storage_key));

drop policy if exists embedded_app_state_update on public.embedded_app_state;
create policy embedded_app_state_update on public.embedded_app_state
for update using (public.can_manage_embedded_state_key(module_key, storage_key))
with check (public.can_manage_embedded_state_key(module_key, storage_key));

drop policy if exists embedded_app_state_delete on public.embedded_app_state;
create policy embedded_app_state_delete on public.embedded_app_state
for delete using (public.can_manage_embedded_state_key(module_key, storage_key));

insert into public.embedded_app_state (storage_key, module_key, payload, updated_at)
values (
  'seel_form_google_forms_v8_sem_mapa_sem_un',
  'contratos',
  $contract_form$[
  {
    "title": "SOLICITAÇÃO DE CONTRATOS",
    "description": "Através deste formulário você poderá solicitar a confecção de contratos, distratos, aditivos e rerratificação de contratos ao setor de cadastro.",
    "fields": [
      {
        "name": "data_solicitacao",
        "label": "Data da solicitação",
        "type": "date",
        "required": true,
        "readonly": true,
        "note": "Preenchida automaticamente na abertura do formulário e salva junto com a solicitação."
      },
      {
        "name": "email",
        "label": "E-mail",
        "type": "email",
        "required": true
      },
      {
        "name": "solicitante",
        "label": "Solicitante",
        "type": "text",
        "required": true,
        "note": "Favor identificar seu nome."
      },
      {
        "name": "solicitacao",
        "label": "Solicitação",
        "type": "select",
        "required": true,
        "options": [
          "Obra",
          "Departamentos Administrativos"
        ]
      },
      {
        "name": "prazo_urgencia",
        "label": "PRAZO DE URGÊNCIA",
        "type": "select",
        "required": true,
        "options": [
          "NORMAL - 5 DIAS ÚTEIS",
          "URGENTE - 3 DIAS ÚTEIS"
        ],
        "note": "Selecione o prazo logo no início. A data limite será calculada automaticamente em dias úteis a partir da data de preenchimento do formulário."
      },
      {
        "name": "data_limite_atendimento",
        "label": "Data limite de atendimento",
        "type": "date",
        "required": true,
        "readonly": true,
        "note": "Urgente: 3 dias úteis. Normal: 5 dias úteis."
      }
    ],
    "condition": null
  },
  {
    "title": "Departamentos Administrativos",
    "description": "",
    "fields": [
      {
        "name": "centro_departamento",
        "label": "Centro de custo",
        "type": "select",
        "required": true,
        "options": [
          "SUPPLY CHAIN",
          "EQUIPAMENTOS",
          "COMERCIAL",
          "PESSOAS (RH/DP)",
          "MARKETING",
          "DIRETORIA",
          "FINANÇAS (CONTABILIDADE/FINANCEIRO)",
          "CADASTRO",
          "PLANEJAMENTO & CONTROLE",
          "TI",
          "ENGENHARIA",
          "PLANEJAMENTO ESTRATÉGICO",
          "QSMS",
          "SEDE"
        ]
      },
      {
        "name": "tipo_documento_departamento",
        "label": "Qual tipo de documento você pretende criar?",
        "type": "select",
        "required": true,
        "options": [
          "CONTRATO",
          "DISTRATO",
          "ADITIVO",
          "RERRATIFICAÇÃO",
          "PJ"
        ]
      }
    ],
    "condition": {
      "field": "solicitacao",
      "values": [
        "Departamentos Administrativos"
      ]
    }
  },
  {
    "title": "Obra",
    "description": "",
    "fields": [
      {
        "name": "centro_obra",
        "label": "Centro de custo",
        "type": "select",
        "required": true,
        "options": [
          "CIC UN ENERGIA",
          "793 - LAMSA",
          "827 - PETROBRAS TRANSPORTE S.A - TRANSPETRO - SC",
          "852 - POCO FUNDO ENERGIA S/A",
          "857 - ENGETEC CONSTRUCOES E MONTAGENS SA - SP",
          "862 - HOSPITAL NAVAL MARCILIO DIAS - RJ",
          "866 - MJRE CONSTRUTORA LTDA - RJ",
          "868 - CONCESSIONARIA DO SISTEMA RODOVIARIO RIO - SAO PAULO",
          "869 - CONCESSIONARIA DO SISTEMA RODOVIARIO RIO - SAO PAULO",
          "871 - CEMIG GERACAO SUL S.A - MG",
          "874 - CEMIG GERACAO SUL S.A.",
          "875 - AESAN ENGENHARIA E PARTICIPACOES LTDA - RJ",
          "877 - 1 ASSOCIACAO INSTITUTO NACIONAL DE MATEMATICA PURA - RJ",
          "878 - FUND. INST. DE GEOTECNIA DO MUN. DO R.J - GEORIO - RJ",
          "881 - PETRÓLEO BRASILEIRO S/A - PETROBRÁS - RJ",
          "882 - MRS LOGISTICA S/A - RJ",
          "883 - AUTOPISTA LITORAL SUL S.A - SC",
          "884 - CONCESSIONARIA DO SISTEMA RODOVIARIO RIO - SAO PAULO",
          "885 - EMPRESA MUNICIPAL DE MORADIA URBANIZACAO E SANEAME - RJ",
          "886 - EMPRESA MUNICIPAL DE MORADIA URBANIZACAO E SANEAME - RJ",
          "887 - LIGHT - ENERGIA S/A - RJ",
          "889 - DNIT-DEPARTAMENTO NACIONAL DE INFRAEST DE TRANSPOR - SP",
          "890 - GERDAU - MG",
          "891 - SANTA FE ENERGIA S/A - ES",
          "892 - 1 MRS LOGISTICA S/A",
          "892-2 MRS LOGISTICA S/A",
          "892-3 MRS LOGISTICA S/A",
          "892-4 MRS LOGISTICA S/A",
          "892-6 MRS LOGISTICA S/A",
          "892-7 MRS LOGISTICA S/A",
          "892-8 MRS LOGISTICA S/A",
          "892-9 MRS LOGISTICA S/A",
          "892-10 MRS LOGISTICA S/A",
          "892-11 MRS LOGISTICA S/A",
          "892-12 MRS LOGISTICA S/A",
          "893 - AUTOPISTA PLANALTO SUL S.A - SC",
          "894 - PREFEITURA DA CIDADE DO RIO DE JANEIRO",
          "895-1 - AESAN ENGENHARIA E PARTICIPACOES LTDA - RJ",
          "895-2 AESAN ENGENHARIA E PARTICIPACOES LTDA - RJ",
          "896 - CEMIG GERACAO E TRANSMISSAO S.A",
          "897 - CONSORCIO CANDONGA",
          "898 - CONCESSIONARIA DO SISTEMA ANHANGUERA-BANDEIRANTES",
          "900 - FURNAS CENTRAIS ELÉTRICAS S/A",
          "901 - AUTOPISTA LITORAL SUL S.A.",
          "902 - CONCESSIONARIA DAS RODOVIAS INTEGRADAS DO SUL S.A.",
          "903 - AESAN ENGENHARIA E PARTICIPACOES LTDA",
          "904 - MRS LOGISTICA S/A",
          "905 - EMPRESA DE TECNOLOGIA E INFORMACOES DA PREVIDENCIA",
          "906 - AUTOPISTA LITORAL SUL S.A.",
          "907 - MRS LOGISTICA S/A",
          "908 - CEMIG DISTRIBUICAO S.A",
          "909 - CEMIG DISTRIBUICAO S.A",
          "910 - PETROBRAS TRANSPORTE S.A. -TRANSPETRO",
          "911 - ENGIE SOLUCOES DE OPERACAO E MANUTENCAO LTDA.",
          "912 - CONCESSIONARIA DO SISTEMA RODOVIARIO RIO - SAO PAULO",
          "913 - AUTOPISTA LITORAL SUL S.A.",
          "914 - CONCESSIONARIA DO SISTEMA RODOVIARIO RIO - SAO PAU",
          "915 - AUTOPISTA PLANALTO SUL S.A",
          "916 - GERDAU ACOS LONGOS S.A",
          "917 - PETROBRAS TRANSPORTE S.A. -TRANSPETRO",
          "918 - MRS",
          "919 - GEORIO",
          "920 - CCR VIACOSTEIRA",
          "921 - SEIC",
          "922 - CEMIG",
          "923 - CCR VIA SUL",
          "924 - CEMIG",
          "925 - ARTERIS",
          "926 - CEEE-G",
          "927 - DNIT-DEPARTAMENTO NACIONAL DE INFRAEST DE TRANSPOR - SP",
          "928 - ARTERIS",
          "929 - ARTERIS",
          "930 - SEIOP",
          "931 - GERDAU",
          "932 - ECORIOMINAS",
          "933 - AEGEA",
          "934 - IGUÁ - RJ",
          "935 - ENGIE - RN",
          "936 - ARTERIS",
          "937 - CCR",
          "938 - AEGEA",
          "939 - AEGEA",
          "940 - CCR",
          "941 - ECORIOMINAS",
          "942 - RUMO",
          "943 - ARTERIS",
          "944 - STATE",
          "945 - CCR",
          "946 - CCR",
          "947 - CCR",
          "948 - G5 ENGENHARIA",
          "949 - DNIT",
          "950 - CSG",
          "951 - ECORIOMINAS",
          "952 - CCR",
          "953 - BRASFELS",
          "954 - AUTOPISTA PLANALTO SUL",
          "955 - RUMO",
          "956 - CORSAN",
          "957 - EPR",
          "958 - AGUAS DO RIO 4 SPE",
          "959 - CCR",
          "960 - VLI",
          "961 - METRO BH",
          "962 - ION EMUSA",
          "OBRA 963 - CSG",
          "OBRA 964 - AUTOPISTA L SUL",
          "966 - SABESP",
          "967 - ARTERIS",
          "968 - RUMO",
          "971 - EMAE"
        ]
      },
      {
        "name": "tipo_documento_obra",
        "label": "Qual tipo de documento você pretende criar?",
        "type": "select",
        "required": true,
        "options": [
          "CONTRATO",
          "DISTRATO",
          "ADITIVO"
        ]
      }
    ],
    "condition": {
      "field": "solicitacao",
      "values": [
        "Obra"
      ]
    }
  },
  {
    "title": "Elaboração da minuta",
    "description": "Faz parte do fluxo de CONTRATO. Como o mapa de cotação foi removido, esta seção abre diretamente após selecionar CONTRATO.",
    "fields": [
      {
        "name": "minuta_aprovada",
        "label": "A minuta do contrato foi aprovada pelo fornecedor?",
        "type": "select",
        "required": true,
        "options": [
          "SIM",
          "NÃO"
        ]
      }
    ],
    "condition": {
      "any": [
        {
          "field": "tipo_documento_obra",
          "values": [
            "CONTRATO"
          ]
        },
        {
          "field": "tipo_documento_departamento",
          "values": [
            "CONTRATO"
          ]
        }
      ]
    }
  },
  {
    "title": "MODELO DE CONTRATO",
    "description": "",
    "fields": [
      {
        "name": "tipo_contrato",
        "label": "Qual seria o tipo de contrato?",
        "type": "select",
        "required": true,
        "options": [
          "PRESTAÇÃO DE SERVIÇO TERCEIRIZADOS",
          "LOCAÇÃO DE IMÓVEL POR TEMPORADA - PF",
          "LOCAÇÃO DE IMÓVEL POR TEMPORADA - PJ",
          "PRESTAÇÃO DE SERVIÇO DE ALIMENTAÇÃO",
          "PRESTAÇÃO DE SERVIÇO PF - RPA",
          "LOCAÇÃO DE EQUIPAMENTO SEM OPERADOR",
          "LOCAÇÃO DE EQUIPAMENTO COM OPERADOR",
          "FORNECIMENTO DE COMBUSTÍVEL",
          "LOCAÇÃO DE ÁREA DE CANTEIRO",
          "PRESTAÇÃO DE SERVIÇOS DE TRANSPORTES - PJ",
          "PRESTAÇÃO DE SERVIÇOS TERCEIRIZADOS (FATURAMENTO DIRETO)",
          "FORNECIMENTO DE MATERIAL"
        ]
      }
    ],
    "condition": {
      "all": [
        {
          "any": [
            {
              "field": "tipo_documento_obra",
              "values": [
                "CONTRATO"
              ]
            },
            {
              "field": "tipo_documento_departamento",
              "values": [
                "CONTRATO"
              ]
            }
          ]
        },
        {
          "field": "minuta_aprovada",
          "values": [
            "SIM"
          ]
        }
      ]
    }
  },
  {
    "title": "Dados gerais do contrato",
    "description": "",
    "fields": [
      {
        "name": "cnpj_cpf",
        "label": "CNPJ / CPF",
        "type": "text",
        "required": true,
        "note": "CPF somente para pessoa física."
      },
      {
        "name": "razao_social",
        "label": "RAZÃO SOCIAL",
        "type": "text",
        "required": true
      },
      {
        "name": "objeto_contrato",
        "label": "Objeto do contrato",
        "type": "textarea",
        "required": true,
        "note": "Obs.: Para contratos de alojamento neste campo deve ser inserido o endereço do imóvel."
      },
      {
        "name": "representante_legal",
        "label": "NOME DO REPRESENTANTE LEGAL OU PROCURADOR",
        "type": "text",
        "required": true
      },
      {
        "name": "rg_orgao",
        "label": "RG E ÓRGÃO EXPEDIDOR",
        "type": "text",
        "required": true
      },
      {
        "name": "cpf_representante",
        "label": "CPF",
        "type": "text",
        "required": true
      },
      {
        "name": "nacionalidade",
        "label": "NACIONALIDADE",
        "type": "text",
        "required": true
      },
      {
        "name": "profissao",
        "label": "PROFISSÃO",
        "type": "text",
        "required": true
      },
      {
        "name": "inicio_vigencia",
        "label": "Favor, informar o início de vigência do contrato.",
        "type": "date",
        "required": true,
        "note": "Exemplo: 7 de janeiro de 2019."
      },
      {
        "name": "termino_vigencia",
        "label": "Favor, informar o término de vigência do contrato.",
        "type": "date",
        "required": true,
        "note": "Exemplo: 7 de janeiro de 2019."
      },
      {
        "name": "cnpj_seel",
        "label": "Em qual CNPJ SEEL o contrato será elaborado?",
        "type": "select",
        "required": true,
        "options": [
          "72.030.927/0001-85 (Rio de Janeiro)",
          "72.030.927/0006-90 (Santa Catarina)",
          "72.030.927/0007-70 (Minas Gerais)"
        ],
        "note": "O CNPJ do contrato deve ser o mesmo da nota fiscal / fatura."
      }
    ],
    "condition": {
      "all": [
        {
          "any": [
            {
              "field": "tipo_documento_obra",
              "values": [
                "CONTRATO"
              ]
            },
            {
              "field": "tipo_documento_departamento",
              "values": [
                "CONTRATO"
              ]
            }
          ]
        },
        {
          "field": "minuta_aprovada",
          "values": [
            "SIM"
          ]
        }
      ]
    }
  },
  {
    "title": "Forma de pagamento - Contrato / Somente depósito bancário",
    "description": "Esta seção aparece para PRESTAÇÃO DE SERVIÇO TERCEIRIZADOS. Neste tipo de contrato, a forma de pagamento permitida é somente Depósito Bancário.",
    "fields": [
      {
        "name": "forma_pagamento_contrato_deposito_only",
        "label": "Qual a forma de pagamento acordada?",
        "type": "select",
        "required": true,
        "options": [
          "Depósito bancário"
        ]
      },
      {
        "name": "dados_bancarios_contrato_deposito_only",
        "label": "Favor informar os dados bancários",
        "type": "textarea",
        "required": true
      },
      {
        "name": "favorecido_contrato_deposito_only",
        "label": "Favorecido",
        "type": "text",
        "required": true
      },
      {
        "name": "cpf_cnpj_contrato_deposito_only",
        "label": "CPF OU CNPJ",
        "type": "text",
        "required": true,
        "note": "CPF somente para MEI / Empresário individual."
      },
      {
        "name": "pagamento_dias_contrato_deposito_only",
        "label": "Pagamento quantos dias após a emissão da nota fiscal?",
        "type": "text",
        "required": true,
        "note": "Pagamentos menores que 30 dias após emissão precisarão de liberação do HEAD da UN."
      }
    ],
    "condition": {
      "all": [
        {
          "any": [
            {
              "field": "tipo_documento_obra",
              "values": [
                "CONTRATO"
              ]
            },
            {
              "field": "tipo_documento_departamento",
              "values": [
                "CONTRATO"
              ]
            }
          ]
        },
        {
          "field": "minuta_aprovada",
          "values": [
            "SIM"
          ]
        },
        {
          "field": "tipo_contrato",
          "values": [
            "PRESTAÇÃO DE SERVIÇO TERCEIRIZADOS"
          ]
        }
      ]
    }
  },
  {
    "title": "Forma de pagamento - Contrato / Depósito ou boleto",
    "description": "Esta seção aparece para os demais tipos de contrato. A forma de pagamento pode ser Depósito Bancário ou Boleto Bancário.",
    "fields": [
      {
        "name": "forma_pagamento_contrato_demais",
        "label": "Qual a forma de pagamento acordada?",
        "type": "select",
        "required": true,
        "options": [
          "Depósito bancário",
          "Boleto bancário"
        ]
      },
      {
        "name": "dados_bancarios_contrato_demais",
        "label": "Caso tenha selecionado Depósito Bancário, favor informar os dados bancários",
        "type": "textarea",
        "required": false
      },
      {
        "name": "favorecido_contrato_demais",
        "label": "Favorecido",
        "type": "text",
        "required": false
      },
      {
        "name": "cpf_cnpj_contrato_demais",
        "label": "CPF OU CNPJ",
        "type": "text",
        "required": false,
        "note": "CPF somente para MEI / Empresário individual."
      },
      {
        "name": "pagamento_dias_contrato_demais",
        "label": "Pagamento quantos dias após a emissão da nota fiscal/boleto?",
        "type": "text",
        "required": true,
        "note": "Pagamentos menores que 30 dias após emissão precisarão de liberação do HEAD da UN."
      }
    ],
    "condition": {
      "all": [
        {
          "any": [
            {
              "field": "tipo_documento_obra",
              "values": [
                "CONTRATO"
              ]
            },
            {
              "field": "tipo_documento_departamento",
              "values": [
                "CONTRATO"
              ]
            }
          ]
        },
        {
          "field": "minuta_aprovada",
          "values": [
            "SIM"
          ]
        },
        {
          "field": "tipo_contrato",
          "values": [
            "LOCAÇÃO DE IMÓVEL POR TEMPORADA - PF",
            "LOCAÇÃO DE IMÓVEL POR TEMPORADA - PJ",
            "PRESTAÇÃO DE SERVIÇO DE ALIMENTAÇÃO",
            "PRESTAÇÃO DE SERVIÇO PF - RPA",
            "LOCAÇÃO DE EQUIPAMENTO SEM OPERADOR",
            "LOCAÇÃO DE EQUIPAMENTO COM OPERADOR",
            "FORNECIMENTO DE COMBUSTÍVEL",
            "LOCAÇÃO DE ÁREA DE CANTEIRO",
            "PRESTAÇÃO DE SERVIÇOS DE TRANSPORTES - PJ",
            "PRESTAÇÃO DE SERVIÇOS TERCEIRIZADOS (FATURAMENTO DIRETO)",
            "FORNECIMENTO DE MATERIAL"
          ]
        }
      ]
    }
  },
  {
    "title": "Processo de assinaturas",
    "description": "Favor, informar os dados necessários para seguirmos com o contrato. Os dados deverão ser de quem realmente irá assinar o documento. Esta seção permanece vinculada aos pontos do PDF que pulam para o processo de assinaturas.",
    "fields": [
      {
        "name": "forma_assinatura",
        "label": "De que forma ocorrerá as assinaturas?",
        "type": "select",
        "required": true,
        "options": [
          "Portal Seel",
          "Portal do fornecedor",
          "Física"
        ]
      },
      {
        "name": "email_representante",
        "label": "Email do representante legal do contrato / procurador? (Fornecedor)",
        "type": "email",
        "required": true
      },
      {
        "name": "emails_testemunhas",
        "label": "Favor informar os e-mails das testemunhas",
        "type": "textarea",
        "required": true
      },
      {
        "name": "procuracao",
        "label": "Em caso de procurador do fornecedor, poderia anexar a procuração válida, por favor.",
        "type": "file",
        "required": false
      },
      {
        "name": "minuta",
        "label": "Minuta",
        "type": "file",
        "required": true
      }
    ],
    "condition": {
      "any": [
        {
          "all": [
            {
              "any": [
                {
                  "field": "tipo_documento_obra",
                  "values": [
                    "CONTRATO"
                  ]
                },
                {
                  "field": "tipo_documento_departamento",
                  "values": [
                    "CONTRATO"
                  ]
                }
              ]
            },
            {
              "field": "minuta_aprovada",
              "values": [
                "SIM"
              ]
            },
            {
              "field": "tipo_contrato",
              "values": [
                "PRESTAÇÃO DE SERVIÇO TERCEIRIZADOS",
                "LOCAÇÃO DE IMÓVEL POR TEMPORADA - PF",
                "LOCAÇÃO DE IMÓVEL POR TEMPORADA - PJ",
                "PRESTAÇÃO DE SERVIÇO DE ALIMENTAÇÃO",
                "PRESTAÇÃO DE SERVIÇO PF - RPA",
                "LOCAÇÃO DE EQUIPAMENTO SEM OPERADOR",
                "LOCAÇÃO DE EQUIPAMENTO COM OPERADOR",
                "FORNECIMENTO DE COMBUSTÍVEL",
                "LOCAÇÃO DE ÁREA DE CANTEIRO",
                "PRESTAÇÃO DE SERVIÇOS DE TRANSPORTES - PJ",
                "PRESTAÇÃO DE SERVIÇOS TERCEIRIZADOS (FATURAMENTO DIRETO)",
                "FORNECIMENTO DE MATERIAL"
              ]
            }
          ]
        },
        {
          "all": [
            {
              "any": [
                {
                  "field": "tipo_documento_obra",
                  "values": [
                    "CONTRATO"
                  ]
                },
                {
                  "field": "tipo_documento_departamento",
                  "values": [
                    "CONTRATO"
                  ]
                }
              ]
            },
            {
              "field": "minuta_aprovada",
              "values": [
                "NÃO"
              ]
            },
            {
              "field": "motivo_minuta_nao_aprovada",
              "values": [
                "Fornecedor aceita seguir somente com a minuta dele",
                "Fornecedor não aceitou uma cláusula/texto específico do contrato"
              ]
            }
          ]
        },
        {
          "all": [
            {
              "any": [
                {
                  "field": "tipo_documento_obra",
                  "values": [
                    "ADITIVO"
                  ]
                },
                {
                  "field": "tipo_documento_departamento",
                  "values": [
                    "ADITIVO"
                  ]
                }
              ]
            },
            {
              "field": "tipo_aditivo",
              "values": [
                "ADITIVO DE PRAZO",
                "ALTERAÇÃO DE VALOR",
                "ALTERAÇÃO DE OBJETO CONTRATUAL"
              ]
            }
          ]
        },
        {
          "all": [
            {
              "any": [
                {
                  "field": "tipo_documento_obra",
                  "values": [
                    "DISTRATO"
                  ]
                },
                {
                  "field": "tipo_documento_departamento",
                  "values": [
                    "DISTRATO"
                  ]
                }
              ]
            },
            {
              "field": "forma_pagamento_distrato",
              "values": [
                "Depósito bancário",
                "Boleto bancário"
              ]
            }
          ]
        }
      ]
    }
  },
  {
    "title": "Minuta não aprovada pelo fornecedor",
    "description": "",
    "fields": [
      {
        "name": "motivo_minuta_nao_aprovada",
        "label": "Minuta não aprovada pelo fornecedor",
        "type": "select",
        "required": true,
        "options": [
          "Fornecedor não aceitou uma cláusula/texto específico do contrato",
          "Fornecedor aceita seguir somente com a minuta dele"
        ]
      }
    ],
    "condition": {
      "all": [
        {
          "any": [
            {
              "field": "tipo_documento_obra",
              "values": [
                "CONTRATO"
              ]
            },
            {
              "field": "tipo_documento_departamento",
              "values": [
                "CONTRATO"
              ]
            }
          ]
        },
        {
          "field": "minuta_aprovada",
          "values": [
            "NÃO"
          ]
        }
      ]
    }
  },
  {
    "title": "Minuta do fornecedor",
    "description": "",
    "fields": [
      {
        "name": "minuta_fornecedor",
        "label": "Encaminhar minuta do fornecedor",
        "type": "file",
        "required": true
      }
    ],
    "condition": {
      "all": [
        {
          "any": [
            {
              "field": "tipo_documento_obra",
              "values": [
                "CONTRATO"
              ]
            },
            {
              "field": "tipo_documento_departamento",
              "values": [
                "CONTRATO"
              ]
            }
          ]
        },
        {
          "field": "motivo_minuta_nao_aprovada",
          "values": [
            "Fornecedor aceita seguir somente com a minuta dele"
          ]
        }
      ]
    }
  },
  {
    "title": "Com base na resposta: Fornecedor não aceitou uma cláusula/texto específico do contrato",
    "description": "",
    "fields": [
      {
        "name": "clausula_nao_aceita",
        "label": "Qual cláusula / texto o fornecedor não concorda?",
        "type": "textarea",
        "required": true
      },
      {
        "name": "nome_parceiro_negocios_contrato",
        "label": "Nome do parceiro de negócios",
        "type": "text",
        "required": true
      }
    ],
    "condition": {
      "all": [
        {
          "any": [
            {
              "field": "tipo_documento_obra",
              "values": [
                "CONTRATO"
              ]
            },
            {
              "field": "tipo_documento_departamento",
              "values": [
                "CONTRATO"
              ]
            }
          ]
        },
        {
          "field": "motivo_minuta_nao_aprovada",
          "values": [
            "Fornecedor não aceitou uma cláusula/texto específico do contrato"
          ]
        }
      ]
    }
  },
  {
    "title": "De acordo com a resposta \"ADITIVO\"",
    "description": "",
    "fields": [
      {
        "name": "nome_parceiro_negocios_aditivo",
        "label": "Nome do parceiro de negócios",
        "type": "text",
        "required": true
      },
      {
        "name": "anexo_contrato_aditivo",
        "label": "Anexo do contrato que será realizado o aditivo",
        "type": "file",
        "required": true
      },
      {
        "name": "tipo_aditivo",
        "label": "Qual é o tipo de aditivo?",
        "type": "select",
        "required": true,
        "options": [
          "ADITIVO DE PRAZO",
          "ALTERAÇÃO DE VALOR",
          "ALTERAÇÃO DE OBJETO CONTRATUAL"
        ]
      }
    ],
    "condition": {
      "any": [
        {
          "field": "tipo_documento_obra",
          "values": [
            "ADITIVO"
          ]
        },
        {
          "field": "tipo_documento_departamento",
          "values": [
            "ADITIVO"
          ]
        }
      ]
    }
  },
  {
    "title": "ADITIVO DE PRAZO",
    "description": "",
    "fields": [
      {
        "name": "motivo_aditivo",
        "label": "Qual é o motivo do aditivo?",
        "type": "textarea",
        "required": true
      },
      {
        "name": "termino_aditivo",
        "label": "Qual o término do ADITIVO? (baseado no prazo da obra)",
        "type": "date",
        "required": true,
        "note": "Exemplo: 7 de janeiro de 2019."
      },
      {
        "name": "observacao_aditivo_prazo",
        "label": "Observação",
        "type": "textarea",
        "required": false,
        "note": "Descreva aqui caso for haver mais alterações junto da prorrogação do prazo."
      },
      {
        "name": "anexo_aditivo_prazo",
        "label": "Anexo",
        "type": "file",
        "required": false
      }
    ],
    "condition": {
      "all": [
        {
          "any": [
            {
              "field": "tipo_documento_obra",
              "values": [
                "ADITIVO"
              ]
            },
            {
              "field": "tipo_documento_departamento",
              "values": [
                "ADITIVO"
              ]
            }
          ]
        },
        {
          "field": "tipo_aditivo",
          "values": [
            "ADITIVO DE PRAZO"
          ]
        }
      ]
    }
  },
  {
    "title": "ADITIVO - ALTERAÇÃO DE VALOR",
    "description": "",
    "fields": [
      {
        "name": "valor_alterado_aditivo",
        "label": "Qual o valor a ser alterado no aditivo?",
        "type": "text",
        "required": true
      },
      {
        "name": "observacao_aditivo_valor",
        "label": "Observação",
        "type": "textarea",
        "required": false,
        "note": "Adicione imagens em caso de haver tabela referente ao modelo do fornecedor com a descrição dos valores."
      },
      {
        "name": "anexo_alteracao_valor",
        "label": "Anexo",
        "type": "file",
        "required": false
      }
    ],
    "condition": {
      "all": [
        {
          "any": [
            {
              "field": "tipo_documento_obra",
              "values": [
                "ADITIVO"
              ]
            },
            {
              "field": "tipo_documento_departamento",
              "values": [
                "ADITIVO"
              ]
            }
          ]
        },
        {
          "field": "tipo_aditivo",
          "values": [
            "ALTERAÇÃO DE VALOR"
          ]
        }
      ]
    }
  },
  {
    "title": "ADITIVO - ALTERAÇÃO DE OBJETO CONTRATUAL",
    "description": "",
    "fields": [
      {
        "name": "objeto_alterado_aditivo",
        "label": "Qual objeto do contrato a ser alterado?",
        "type": "textarea",
        "required": true
      },
      {
        "name": "observacao_aditivo_objeto",
        "label": "Observação",
        "type": "textarea",
        "required": false
      },
      {
        "name": "anexo_alteracao_objeto",
        "label": "Anexo",
        "type": "file",
        "required": false
      }
    ],
    "condition": {
      "all": [
        {
          "any": [
            {
              "field": "tipo_documento_obra",
              "values": [
                "ADITIVO"
              ]
            },
            {
              "field": "tipo_documento_departamento",
              "values": [
                "ADITIVO"
              ]
            }
          ]
        },
        {
          "field": "tipo_aditivo",
          "values": [
            "ALTERAÇÃO DE OBJETO CONTRATUAL"
          ]
        }
      ]
    }
  },
  {
    "title": "De acordo com a sua resposta \"DISTRATO\"",
    "description": "",
    "fields": [
      {
        "name": "observacao_distrato",
        "label": "Observação",
        "type": "textarea",
        "required": false
      },
      {
        "name": "nome_parceiro_negocios_distrato",
        "label": "Nome do parceiro de negócios",
        "type": "text",
        "required": true
      },
      {
        "name": "anexo_contrato_distrato",
        "label": "Anexo do contrato que será realizado o distrato",
        "type": "file",
        "required": true
      },
      {
        "name": "data_rescisao_distrato",
        "label": "Qual a data que ambas as partes decidem rescindir o contrato?",
        "type": "date",
        "required": true,
        "note": "Exemplo: 7 de janeiro de 2019."
      },
      {
        "name": "forma_pagamento_distrato",
        "label": "Qual a forma de pagamento acordada?",
        "type": "select",
        "required": true,
        "options": [
          "Depósito bancário",
          "Boleto bancário"
        ]
      }
    ],
    "condition": {
      "any": [
        {
          "field": "tipo_documento_obra",
          "values": [
            "DISTRATO"
          ]
        },
        {
          "field": "tipo_documento_departamento",
          "values": [
            "DISTRATO"
          ]
        }
      ]
    }
  },
  {
    "title": "Forma de pagamento - Distrato / Depósito bancário",
    "description": "Vínculo conforme fluxo de DISTRATO e forma de pagamento Depósito bancário.",
    "fields": [
      {
        "name": "dados_bancarios_distrato",
        "label": "Caso tenha selecionado a opção de depósito, favor informar os dados bancários",
        "type": "textarea",
        "required": true
      },
      {
        "name": "favorecido_distrato",
        "label": "Favorecido",
        "type": "text",
        "required": true
      },
      {
        "name": "cpf_cnpj_distrato",
        "label": "CPF OU CNPJ",
        "type": "text",
        "required": true,
        "note": "CPF somente para MEI/ Empresário individual."
      }
    ],
    "condition": {
      "all": [
        {
          "any": [
            {
              "field": "tipo_documento_obra",
              "values": [
                "DISTRATO"
              ]
            },
            {
              "field": "tipo_documento_departamento",
              "values": [
                "DISTRATO"
              ]
            }
          ]
        },
        {
          "field": "forma_pagamento_distrato",
          "values": [
            "Depósito bancário"
          ]
        }
      ]
    }
  },
  {
    "title": "Forma de pagamento - Distrato / Boleto bancário",
    "description": "Vínculo conforme fluxo de DISTRATO e forma de pagamento Boleto bancário.",
    "fields": [
      {
        "name": "favorecido_distrato_boleto",
        "label": "Favorecido",
        "type": "text",
        "required": true
      },
      {
        "name": "cpf_cnpj_distrato_boleto",
        "label": "CPF OU CNPJ",
        "type": "text",
        "required": true,
        "note": "CPF somente para MEI/ Empresário individual."
      }
    ],
    "condition": {
      "all": [
        {
          "any": [
            {
              "field": "tipo_documento_obra",
              "values": [
                "DISTRATO"
              ]
            },
            {
              "field": "tipo_documento_departamento",
              "values": [
                "DISTRATO"
              ]
            }
          ]
        },
        {
          "field": "forma_pagamento_distrato",
          "values": [
            "Boleto bancário"
          ]
        }
      ]
    }
  },
  {
    "title": "Departamentos Administrativos",
    "description": "",
    "fields": [
      {
        "name": "centro_custo_departamento_final",
        "label": "Favor informar o centro de custo",
        "type": "select",
        "required": true,
        "options": [
          "SUPPLY CHAIN",
          "EQUIPAMENTOS",
          "COMERCIAL",
          "PESSOAS (RH/DP)",
          "MARKETING",
          "DIRETORIA",
          "FINANÇAS (CONTABILIDADE/FINANCEIRO)",
          "CADASTRO",
          "PLANEJAMENTO & CONTROLE",
          "TI",
          "ENGENHARIA",
          "PLANEJAMENTO ESTRATÉGICO",
          "QSMS",
          "SEDE"
        ]
      }
    ],
    "condition": {
      "field": "tipo_documento_departamento",
      "values": [
        "CONTRATO",
        "DISTRATO",
        "ADITIVO",
        "RERRATIFICAÇÃO",
        "PJ"
      ]
    }
  },
  {
    "title": "Minuta",
    "description": "",
    "fields": [
      {
        "name": "modelo_minuta",
        "label": "A minuta será no padrão Seel ou no modelo do fornecedor?",
        "type": "select",
        "required": true,
        "options": [
          "Modelo Seel",
          "Modelo Fornecedor"
        ]
      }
    ],
    "condition": {
      "field": "tipo_documento_departamento",
      "values": [
        "CONTRATO"
      ]
    }
  },
  {
    "title": "Modelo Fornecedor",
    "description": "",
    "fields": [
      {
        "name": "minuta_modelo_fornecedor",
        "label": "Encaminhar minuta para análise",
        "type": "file",
        "required": true
      }
    ],
    "condition": {
      "field": "modelo_minuta",
      "values": [
        "Modelo Fornecedor"
      ]
    }
  },
  {
    "title": "MINUTA - PRESTAÇÃO DE SERVIÇO DE ALIMENTAÇÃO",
    "description": "",
    "fields": [
      {
        "name": "fornecimento_alimentacao",
        "label": "Favor informar qual será o fornecimento",
        "type": "checkbox",
        "required": true,
        "options": [
          "Café da manhã",
          "Almoço",
          "Janta",
          "Lanche"
        ]
      },
      {
        "name": "descricao_valores_alimentacao",
        "label": "Baseado no fornecimento selecionado, favor informar a descrição dos valores para cada.",
        "type": "textarea",
        "required": true
      },
      {
        "name": "medicao_alimentacao",
        "label": "MEDIÇÃO",
        "type": "select",
        "required": true,
        "options": [
          "Quinzenal",
          "Mensal"
        ]
      },
      {
        "name": "pagamento_dias_nf_alimentacao",
        "label": "Pagamento quantos dias após a emissão da nota fiscal?",
        "type": "text",
        "required": true,
        "note": "Pagamentos menores que 30 dias após emissão precisarão de liberação do HEAD da UN."
      },
      {
        "name": "checklist_alimentacao",
        "label": "Modelo de Checklist Alimentação",
        "type": "file",
        "required": true,
        "note": "Segue abaixo link de download do checklist para ser encaminhado preenchido junto ao formulário."
      }
    ],
    "condition": {
      "all": [
        {
          "any": [
            {
              "field": "tipo_documento_obra",
              "values": [
                "CONTRATO"
              ]
            },
            {
              "field": "tipo_documento_departamento",
              "values": [
                "CONTRATO"
              ]
            }
          ]
        },
        {
          "any": [
            {
              "field": "tipo_documento_departamento",
              "values": [
                "CONTRATO"
              ]
            },
            {
              "any": [
                {
                  "field": "tipo_documento_obra",
                  "values": [
                    "CONTRATO"
                  ]
                },
                {
                  "field": "tipo_documento_departamento",
                  "values": [
                    "CONTRATO"
                  ]
                }
              ]
            },
            {
              "any": [
                {
                  "field": "tipo_documento_obra",
                  "values": [
                    "CONTRATO"
                  ]
                },
                {
                  "field": "tipo_documento_departamento",
                  "values": [
                    "CONTRATO"
                  ]
                }
              ]
            }
          ]
        },
        {
          "field": "minuta_aprovada",
          "values": [
            "SIM"
          ]
        },
        {
          "field": "tipo_contrato",
          "values": [
            "PRESTAÇÃO DE SERVIÇO DE ALIMENTAÇÃO"
          ]
        }
      ]
    }
  },
  {
    "title": "PJ",
    "description": "",
    "fields": [
      {
        "name": "cnpj_pj",
        "label": "CNPJ",
        "type": "text",
        "required": true
      },
      {
        "name": "cpf_rg_pj",
        "label": "CPF E RG",
        "type": "text",
        "required": true
      },
      {
        "name": "profissao_pj",
        "label": "Profissão",
        "type": "text",
        "required": true
      },
      {
        "name": "objeto_setor_pj",
        "label": "Objeto do contrato e setor",
        "type": "textarea",
        "required": true
      },
      {
        "name": "data_inicio_pj",
        "label": "Data de início",
        "type": "date",
        "required": true,
        "note": "Exemplo: 7 de janeiro de 2019."
      },
      {
        "name": "valor_contratual_pj",
        "label": "Valor contratual",
        "type": "text",
        "required": true
      },
      {
        "name": "beneficios_pj",
        "label": "Benefícios",
        "type": "textarea",
        "required": true
      },
      {
        "name": "dados_bancarios_pj",
        "label": "Dados bancários",
        "type": "textarea",
        "required": true
      }
    ],
    "condition": {
      "field": "tipo_documento_departamento",
      "values": [
        "PJ"
      ]
    }
  },
  {
    "title": "DISTRATO - PJ",
    "description": "",
    "fields": [
      {
        "name": "contrato_prestacao_pj",
        "label": "Favor informar o contrato de prestação de serviços",
        "type": "text",
        "required": true
      },
      {
        "name": "data_rescisao_pj",
        "label": "Qual a data que ambas as partes decidem rescindir o contrato?",
        "type": "date",
        "required": true,
        "note": "Exemplo: 7 de janeiro de 2019."
      },
      {
        "name": "valor_acordado_pj",
        "label": "Qual o valor acordado?",
        "type": "text",
        "required": true
      }
    ],
    "condition": {
      "all": [
        {
          "any": [
            {
              "field": "tipo_documento_obra",
              "values": [
                "CONTRATO"
              ]
            },
            {
              "field": "tipo_documento_departamento",
              "values": [
                "CONTRATO"
              ]
            }
          ]
        },
        {
          "any": [
            {
              "field": "tipo_documento_departamento",
              "values": [
                "CONTRATO"
              ]
            },
            {
              "any": [
                {
                  "field": "tipo_documento_obra",
                  "values": [
                    "CONTRATO"
                  ]
                },
                {
                  "field": "tipo_documento_departamento",
                  "values": [
                    "CONTRATO"
                  ]
                }
              ]
            },
            {
              "any": [
                {
                  "field": "tipo_documento_obra",
                  "values": [
                    "CONTRATO"
                  ]
                },
                {
                  "field": "tipo_documento_departamento",
                  "values": [
                    "CONTRATO"
                  ]
                }
              ]
            }
          ]
        },
        {
          "field": "minuta_aprovada",
          "values": [
            "SIM"
          ]
        },
        {
          "any": [
            {
              "field": "tipo_documento_departamento",
              "values": [
                "PJ"
              ]
            },
            {
              "field": "tipo_contrato",
              "values": [
                "PRESTAÇÃO DE SERVIÇOS DE TRANSPORTES - PJ"
              ]
            }
          ]
        }
      ]
    }
  },
  {
    "title": "MINUTA - LOCAÇÃO DE TEMPORADA",
    "description": "",
    "fields": [
      {
        "name": "pagamento_dias_nf_locacao",
        "label": "O pagamento será quantos dias após a emissão da nota fiscal?",
        "type": "text",
        "required": true,
        "note": "Pagamentos menores que 30 dias após emissão precisarão de liberação do HEAD da UN."
      },
      {
        "name": "valor_global_locacao",
        "label": "Valor global do contrato",
        "type": "text",
        "required": true
      },
      {
        "name": "quartos_imovel",
        "label": "Quantos quartos há no imóvel (objeto do contrato)?",
        "type": "number",
        "required": true
      },
      {
        "name": "valor_acordado_locacao",
        "label": "Qual o valor acordado?",
        "type": "text",
        "required": true
      },
      {
        "name": "responsavel_iptu_incendio",
        "label": "Valores referentes a taxas de IPTU e taxas de incêndio ficarão de responsabilidade da?",
        "type": "select",
        "required": true,
        "options": [
          "Locatária",
          "Locador"
        ],
        "note": "Locatária é Seel."
      },
      {
        "name": "responsavel_agua_energia",
        "label": "Valores referentes a contas de energia, contas de água ficarão de responsabilidade da?",
        "type": "select",
        "required": true,
        "options": [
          "Locatária",
          "Locador"
        ],
        "note": "Locatária é Seel."
      },
      {
        "name": "datas_pagamento_locacao",
        "label": "Favor informar as datas de pagamento acordadas",
        "type": "textarea",
        "required": true
      },
      {
        "name": "caucao",
        "label": "CAUÇÃO",
        "type": "select",
        "required": true,
        "options": [
          "SIM",
          "NÃO"
        ]
      },
      {
        "name": "checklist_alojamento",
        "label": "Modelo de Checklist Alojamento",
        "type": "file",
        "required": true,
        "note": "Segue abaixo link de download do checklist para ser encaminhado preenchido junto ao formulário."
      }
    ],
    "condition": {
      "all": [
        {
          "any": [
            {
              "field": "tipo_documento_obra",
              "values": [
                "CONTRATO"
              ]
            },
            {
              "field": "tipo_documento_departamento",
              "values": [
                "CONTRATO"
              ]
            }
          ]
        },
        {
          "any": [
            {
              "field": "tipo_documento_departamento",
              "values": [
                "CONTRATO"
              ]
            },
            {
              "any": [
                {
                  "field": "tipo_documento_obra",
                  "values": [
                    "CONTRATO"
                  ]
                },
                {
                  "field": "tipo_documento_departamento",
                  "values": [
                    "CONTRATO"
                  ]
                }
              ]
            },
            {
              "any": [
                {
                  "field": "tipo_documento_obra",
                  "values": [
                    "CONTRATO"
                  ]
                },
                {
                  "field": "tipo_documento_departamento",
                  "values": [
                    "CONTRATO"
                  ]
                }
              ]
            }
          ]
        },
        {
          "field": "minuta_aprovada",
          "values": [
            "SIM"
          ]
        },
        {
          "field": "tipo_contrato",
          "values": [
            "LOCAÇÃO DE IMÓVEL POR TEMPORADA - PF",
            "LOCAÇÃO DE IMÓVEL POR TEMPORADA - PJ"
          ]
        }
      ]
    }
  },
  {
    "title": "COM CAUÇÃO",
    "description": "",
    "fields": [
      {
        "name": "valor_caucao",
        "label": "Favor informar o valor do caução.",
        "type": "text",
        "required": true
      },
      {
        "name": "data_pagamento_caucao",
        "label": "Data de pagamento do caução",
        "type": "date",
        "required": true,
        "note": "Exemplo: 7 de janeiro de 2019."
      }
    ],
    "condition": {
      "field": "caucao",
      "values": [
        "SIM"
      ]
    }
  },
  {
    "title": "MINUTA - PRESTAÇÃO DE SERVIÇOS TERCEIRIZADOS",
    "description": "",
    "fields": [
      {
        "name": "valores_acordados_terceirizados",
        "label": "Favor informar os valores acordados",
        "type": "textarea",
        "required": true
      },
      {
        "name": "valor_global_terceirizados",
        "label": "Descrever valor global do contrato",
        "type": "textarea",
        "required": true
      },
      {
        "name": "pagamento_dias_nf_terceirizados",
        "label": "Pagamento quantos dias após a emissão da nota fiscal?",
        "type": "text",
        "required": true,
        "note": "Pagamentos menores que 30 dias após emissão precisarão de liberação do HEAD da UN."
      },
      {
        "name": "periodo_medicao_terceirizados",
        "label": "Favor informar o período da medição.",
        "type": "text",
        "required": true,
        "note": "Ex.: quinzenal ou mensal."
      },
      {
        "name": "codigo_lc116_terceirizados",
        "label": "Qual o código de emissão da nota de acordo com a Lei Complementar nº 116?",
        "type": "text",
        "required": true,
        "note": "Esse código é necessário para finalizar o cadastro no sistema compor."
      },
      {
        "name": "retencao_terceirizados",
        "label": "RETENÇÃO",
        "type": "select",
        "required": true,
        "options": [
          "SIM",
          "NÃO"
        ]
      }
    ],
    "condition": {
      "all": [
        {
          "any": [
            {
              "field": "tipo_documento_obra",
              "values": [
                "CONTRATO"
              ]
            },
            {
              "field": "tipo_documento_departamento",
              "values": [
                "CONTRATO"
              ]
            }
          ]
        },
        {
          "any": [
            {
              "field": "tipo_documento_departamento",
              "values": [
                "CONTRATO"
              ]
            },
            {
              "any": [
                {
                  "field": "tipo_documento_obra",
                  "values": [
                    "CONTRATO"
                  ]
                },
                {
                  "field": "tipo_documento_departamento",
                  "values": [
                    "CONTRATO"
                  ]
                }
              ]
            },
            {
              "any": [
                {
                  "field": "tipo_documento_obra",
                  "values": [
                    "CONTRATO"
                  ]
                },
                {
                  "field": "tipo_documento_departamento",
                  "values": [
                    "CONTRATO"
                  ]
                }
              ]
            }
          ]
        },
        {
          "field": "minuta_aprovada",
          "values": [
            "SIM"
          ]
        },
        {
          "field": "tipo_contrato",
          "values": [
            "PRESTAÇÃO DE SERVIÇO TERCEIRIZADOS",
            "PRESTAÇÃO DE SERVIÇOS TERCEIRIZADOS (FATURAMENTO DIRETO)"
          ]
        }
      ]
    }
  },
  {
    "title": "CONTRATO COM RETENÇÃO",
    "description": "",
    "fields": [
      {
        "name": "percentual_retencao",
        "label": "Quanto de % a CONTRATANTE (Seel) irá reter da CONTRATADA (Fornecedor)?",
        "type": "select",
        "required": true,
        "options": [
          "3%",
          "4%",
          "5%",
          "6%"
        ],
        "note": "Obs.: Preferência de 5%."
      },
      {
        "name": "observacao_retencao",
        "label": "Observação",
        "type": "textarea",
        "required": false
      }
    ],
    "condition": {
      "all": [
        {
          "any": [
            {
              "field": "tipo_documento_obra",
              "values": [
                "CONTRATO"
              ]
            },
            {
              "field": "tipo_documento_departamento",
              "values": [
                "CONTRATO"
              ]
            }
          ]
        },
        {
          "field": "retencao_terceirizados",
          "values": [
            "SIM"
          ]
        }
      ]
    }
  },
  {
    "title": "MINUTA - LOCAÇÃO DE EQUIPAMENTO COM OPERADOR",
    "description": "",
    "fields": [
      {
        "name": "pagamento_dias_nf_equip_operador",
        "label": "Pagamento quantos dias após a emissão da nota fiscal?",
        "type": "text",
        "required": true,
        "note": "Pagamentos menores que 30 dias após emissão precisarão de liberação do HEAD da UN."
      },
      {
        "name": "valores_equipamento_operador",
        "label": "Descrever valores para cada equipamento",
        "type": "textarea",
        "required": true
      },
      {
        "name": "valores_mao_obra",
        "label": "Descrever valores para a mão de obra",
        "type": "textarea",
        "required": true
      },
      {
        "name": "valor_global_equip_operador",
        "label": "Descrever valor global do contrato",
        "type": "textarea",
        "required": true,
        "note": "Informar valor previsto para todo o tempo de contrato."
      },
      {
        "name": "minimo_horas",
        "label": "Favor informar o mínimo de horas trabalhadas",
        "type": "text",
        "required": true,
        "note": "Caso ultrapasse o mínimo informado será cobrado o valor de hora extra."
      },
      {
        "name": "valor_horas_extras",
        "label": "Favor informar o valor das horas extras",
        "type": "text",
        "required": true
      },
      {
        "name": "periodo_prestacao_equip_operador",
        "label": "Qual o período da prestação a ser considerado?",
        "type": "text",
        "required": true,
        "note": "Ex.: quinzenal ou mensal."
      },
      {
        "name": "codigo_lc116_equip_operador",
        "label": "Qual o código de emissão da nota de acordo com a Lei Complementar nº 116?",
        "type": "text",
        "required": true,
        "note": "Esse código é necessário para finalizar o cadastro no sistema compor."
      },
      {
        "name": "retencao_equip_operador",
        "label": "RETENÇÃO",
        "type": "select",
        "required": true,
        "options": [
          "SIM",
          "NÃO"
        ]
      }
    ],
    "condition": {
      "all": [
        {
          "any": [
            {
              "field": "tipo_documento_obra",
              "values": [
                "CONTRATO"
              ]
            },
            {
              "field": "tipo_documento_departamento",
              "values": [
                "CONTRATO"
              ]
            }
          ]
        },
        {
          "any": [
            {
              "field": "tipo_documento_departamento",
              "values": [
                "CONTRATO"
              ]
            },
            {
              "any": [
                {
                  "field": "tipo_documento_obra",
                  "values": [
                    "CONTRATO"
                  ]
                },
                {
                  "field": "tipo_documento_departamento",
                  "values": [
                    "CONTRATO"
                  ]
                }
              ]
            },
            {
              "any": [
                {
                  "field": "tipo_documento_obra",
                  "values": [
                    "CONTRATO"
                  ]
                },
                {
                  "field": "tipo_documento_departamento",
                  "values": [
                    "CONTRATO"
                  ]
                }
              ]
            }
          ]
        },
        {
          "field": "minuta_aprovada",
          "values": [
            "SIM"
          ]
        },
        {
          "field": "tipo_contrato",
          "values": [
            "LOCAÇÃO DE EQUIPAMENTO COM OPERADOR"
          ]
        }
      ]
    }
  },
  {
    "title": "CONTRATO COM RETENÇÃO",
    "description": "",
    "fields": [
      {
        "name": "percentual_retencao_equip",
        "label": "Quanto de % a CONTRATANTE (Seel) irá reter da CONTRATADA (Fornecedor)?",
        "type": "select",
        "required": true,
        "options": [
          "3%",
          "4%",
          "5%",
          "6%"
        ],
        "note": "Obs.: Preferência de 5%."
      },
      {
        "name": "observacao_retencao_equip",
        "label": "Observação",
        "type": "textarea",
        "required": false
      }
    ],
    "condition": {
      "all": [
        {
          "any": [
            {
              "field": "tipo_documento_obra",
              "values": [
                "CONTRATO"
              ]
            },
            {
              "field": "tipo_documento_departamento",
              "values": [
                "CONTRATO"
              ]
            }
          ]
        },
        {
          "field": "retencao_equip_operador",
          "values": [
            "SIM"
          ]
        }
      ]
    }
  },
  {
    "title": "MINUTA - LOCAÇÃO DE EQUIPAMENTO/MÁQUINA (SEM OPERADOR)",
    "description": "",
    "fields": [
      {
        "name": "pagamento_dias_nf_equip_sem_operador",
        "label": "Pagamento quantos dias após a emissão da nota fiscal?",
        "type": "text",
        "required": true,
        "note": "Pagamentos menores que 30 dias após emissão precisarão de liberação do HEAD da UN."
      },
      {
        "name": "periodo_medicao_equip_sem_operador",
        "label": "Favor informar o período da medição.",
        "type": "text",
        "required": true,
        "note": "Ex.: O período de locação a ser considerado é do dia 01 (primeiro) a 30 (trinta) de cada mês."
      },
      {
        "name": "valores_equipamento_sem_operador",
        "label": "Descrever valores para cada equipamento",
        "type": "textarea",
        "required": true
      },
      {
        "name": "valor_global_equip_sem_operador",
        "label": "Valor global do contrato",
        "type": "text",
        "required": true,
        "note": "Informar o valor previsto considerando todo o tempo de contrato."
      },
      {
        "name": "observacao_equip_sem_operador",
        "label": "Observação",
        "type": "textarea",
        "required": false
      }
    ],
    "condition": {
      "all": [
        {
          "any": [
            {
              "field": "tipo_documento_obra",
              "values": [
                "CONTRATO"
              ]
            },
            {
              "field": "tipo_documento_departamento",
              "values": [
                "CONTRATO"
              ]
            }
          ]
        },
        {
          "any": [
            {
              "field": "tipo_documento_departamento",
              "values": [
                "CONTRATO"
              ]
            },
            {
              "any": [
                {
                  "field": "tipo_documento_obra",
                  "values": [
                    "CONTRATO"
                  ]
                },
                {
                  "field": "tipo_documento_departamento",
                  "values": [
                    "CONTRATO"
                  ]
                }
              ]
            },
            {
              "any": [
                {
                  "field": "tipo_documento_obra",
                  "values": [
                    "CONTRATO"
                  ]
                },
                {
                  "field": "tipo_documento_departamento",
                  "values": [
                    "CONTRATO"
                  ]
                }
              ]
            }
          ]
        },
        {
          "field": "minuta_aprovada",
          "values": [
            "SIM"
          ]
        },
        {
          "field": "tipo_contrato",
          "values": [
            "LOCAÇÃO DE EQUIPAMENTO SEM OPERADOR"
          ]
        }
      ]
    }
  },
  {
    "title": "MINUTA - FORNECIMENTO DE COMBUSTÍVEL",
    "description": "",
    "fields": [
      {
        "name": "pagamento_dias_nf_combustivel",
        "label": "O pagamento será quantos dias após a emissão da nota fiscal?",
        "type": "text",
        "required": true,
        "note": "Pagamentos menores que 30 dias após emissão precisarão de liberação do HEAD da UN."
      },
      {
        "name": "valores_unitarios_combustivel",
        "label": "Descrever valores unitários",
        "type": "textarea",
        "required": true,
        "note": "Os valores de combustíveis não são informados no contrato devido a variação, porém é necessário o valor para ser incluído no sistema compor."
      },
      {
        "name": "valor_global_combustivel",
        "label": "Descrever valor global do contrato",
        "type": "text",
        "required": true
      }
    ],
    "condition": {
      "all": [
        {
          "any": [
            {
              "field": "tipo_documento_obra",
              "values": [
                "CONTRATO"
              ]
            },
            {
              "field": "tipo_documento_departamento",
              "values": [
                "CONTRATO"
              ]
            }
          ]
        },
        {
          "any": [
            {
              "field": "tipo_documento_departamento",
              "values": [
                "CONTRATO"
              ]
            },
            {
              "any": [
                {
                  "field": "tipo_documento_obra",
                  "values": [
                    "CONTRATO"
                  ]
                },
                {
                  "field": "tipo_documento_departamento",
                  "values": [
                    "CONTRATO"
                  ]
                }
              ]
            },
            {
              "any": [
                {
                  "field": "tipo_documento_obra",
                  "values": [
                    "CONTRATO"
                  ]
                },
                {
                  "field": "tipo_documento_departamento",
                  "values": [
                    "CONTRATO"
                  ]
                }
              ]
            }
          ]
        },
        {
          "field": "minuta_aprovada",
          "values": [
            "SIM"
          ]
        },
        {
          "field": "tipo_contrato",
          "values": [
            "FORNECIMENTO DE COMBUSTÍVEL"
          ]
        }
      ]
    }
  },
  {
    "title": "MINUTA - LOCAÇÃO DE ÁREA DE CANTEIRO",
    "description": "",
    "fields": [
      {
        "name": "valor_acordado_area_canteiro",
        "label": "Qual o valor acordado?",
        "type": "text",
        "required": true
      },
      {
        "name": "valor_global_area_canteiro",
        "label": "Descrever valor global do contrato",
        "type": "text",
        "required": true
      },
      {
        "name": "responsavel_taxas_area",
        "label": "Valores referentes a taxas de IPTU, contas de energia, contas de água, taxas de incêndio ficarão de responsabilidade da?",
        "type": "select",
        "required": true,
        "options": [
          "LOCATÁRIA",
          "LOCADORA"
        ],
        "note": "Locatária é Seel."
      },
      {
        "name": "datas_pagamento_area",
        "label": "Favor informar as datas de pagamento acordadas",
        "type": "textarea",
        "required": true
      },
      {
        "name": "caucao_area",
        "label": "CAUÇÃO",
        "type": "select",
        "required": true,
        "options": [
          "SIM",
          "NÃO"
        ]
      },
      {
        "name": "fins_canteiro",
        "label": "Descrever os fins do canteiro",
        "type": "textarea",
        "required": true
      },
      {
        "name": "observacao_area",
        "label": "Observação",
        "type": "textarea",
        "required": false
      }
    ],
    "condition": {
      "all": [
        {
          "any": [
            {
              "field": "tipo_documento_obra",
              "values": [
                "CONTRATO"
              ]
            },
            {
              "field": "tipo_documento_departamento",
              "values": [
                "CONTRATO"
              ]
            }
          ]
        },
        {
          "any": [
            {
              "field": "tipo_documento_departamento",
              "values": [
                "CONTRATO"
              ]
            },
            {
              "any": [
                {
                  "field": "tipo_documento_obra",
                  "values": [
                    "CONTRATO"
                  ]
                },
                {
                  "field": "tipo_documento_departamento",
                  "values": [
                    "CONTRATO"
                  ]
                }
              ]
            },
            {
              "any": [
                {
                  "field": "tipo_documento_obra",
                  "values": [
                    "CONTRATO"
                  ]
                },
                {
                  "field": "tipo_documento_departamento",
                  "values": [
                    "CONTRATO"
                  ]
                }
              ]
            }
          ]
        },
        {
          "field": "minuta_aprovada",
          "values": [
            "SIM"
          ]
        },
        {
          "field": "tipo_contrato",
          "values": [
            "LOCAÇÃO DE ÁREA DE CANTEIRO"
          ]
        }
      ]
    }
  },
  {
    "title": "PRESTAÇÃO DE SERVIÇO PF - RPA",
    "description": "",
    "fields": [
      {
        "name": "valor_acordado_rpa",
        "label": "Qual o valor acordado?",
        "type": "text",
        "required": true
      },
      {
        "name": "pagamento_dias_rpa",
        "label": "Pagamento quantos dias após a emissão do recibo de RPA?",
        "type": "number",
        "required": false,
        "note": "Pagamentos menores que 30 dias após emissão precisarão de liberação do HEAD da UN."
      }
    ],
    "condition": {
      "all": [
        {
          "any": [
            {
              "field": "tipo_documento_obra",
              "values": [
                "CONTRATO"
              ]
            },
            {
              "field": "tipo_documento_departamento",
              "values": [
                "CONTRATO"
              ]
            }
          ]
        },
        {
          "any": [
            {
              "field": "tipo_documento_departamento",
              "values": [
                "CONTRATO"
              ]
            },
            {
              "any": [
                {
                  "field": "tipo_documento_obra",
                  "values": [
                    "CONTRATO"
                  ]
                },
                {
                  "field": "tipo_documento_departamento",
                  "values": [
                    "CONTRATO"
                  ]
                }
              ]
            },
            {
              "any": [
                {
                  "field": "tipo_documento_obra",
                  "values": [
                    "CONTRATO"
                  ]
                },
                {
                  "field": "tipo_documento_departamento",
                  "values": [
                    "CONTRATO"
                  ]
                }
              ]
            }
          ]
        },
        {
          "field": "minuta_aprovada",
          "values": [
            "SIM"
          ]
        },
        {
          "field": "tipo_contrato",
          "values": [
            "PRESTAÇÃO DE SERVIÇO PF - RPA"
          ]
        }
      ]
    }
  },
  {
    "title": "MINUTA - FORNECIMENTO DE MATERIAL",
    "description": "",
    "fields": [
      {
        "name": "especificacao_material",
        "label": "ESPECIFICAÇÃO DO MATERIAL",
        "type": "textarea",
        "required": true
      },
      {
        "name": "quantidade_estimada",
        "label": "QUANTIDADE ESTIMADA?",
        "type": "text",
        "required": true
      },
      {
        "name": "valor_unitario",
        "label": "VALOR UNITÁRIO?",
        "type": "text",
        "required": true
      },
      {
        "name": "valor_total_estimado",
        "label": "VALOR TOTAL DE CONTRATO ESTIMADO?",
        "type": "text",
        "required": true
      },
      {
        "name": "pagamento_dias_boleto",
        "label": "Pagamento quantos dias após a emissão do boleto",
        "type": "number",
        "required": true,
        "note": "Pagamentos menores que 30 dias após emissão precisarão de liberação do HEAD da UN."
      }
    ],
    "condition": {
      "all": [
        {
          "any": [
            {
              "field": "tipo_documento_obra",
              "values": [
                "CONTRATO"
              ]
            },
            {
              "field": "tipo_documento_departamento",
              "values": [
                "CONTRATO"
              ]
            }
          ]
        },
        {
          "any": [
            {
              "field": "tipo_documento_departamento",
              "values": [
                "CONTRATO"
              ]
            },
            {
              "any": [
                {
                  "field": "tipo_documento_obra",
                  "values": [
                    "CONTRATO"
                  ]
                },
                {
                  "field": "tipo_documento_departamento",
                  "values": [
                    "CONTRATO"
                  ]
                }
              ]
            },
            {
              "any": [
                {
                  "field": "tipo_documento_obra",
                  "values": [
                    "CONTRATO"
                  ]
                },
                {
                  "field": "tipo_documento_departamento",
                  "values": [
                    "CONTRATO"
                  ]
                }
              ]
            }
          ]
        },
        {
          "field": "minuta_aprovada",
          "values": [
            "SIM"
          ]
        },
        {
          "field": "tipo_contrato",
          "values": [
            "FORNECIMENTO DE MATERIAL"
          ]
        }
      ]
    }
  },
  {
    "title": "RERRATIFICAÇÃO",
    "description": "",
    "fields": [
      {
        "name": "numero_contrato_rerratificacao",
        "label": "Número do contrato da rerratificação",
        "type": "text",
        "required": true
      },
      {
        "name": "razao_social_rerratificacao",
        "label": "Razão social",
        "type": "text",
        "required": true
      },
      {
        "name": "correcao_rerratificacao",
        "label": "Qual correção será realizada? Sinalizar a cláusula.",
        "type": "textarea",
        "required": true
      },
      {
        "name": "objeto_alterado_rerratificacao",
        "label": "Qual objeto do contrato será alterado?",
        "type": "textarea",
        "required": false
      },
      {
        "name": "observacao_rerratificacao",
        "label": "Observação",
        "type": "textarea",
        "required": false
      }
    ],
    "condition": {
      "field": "tipo_documento_departamento",
      "values": [
        "RERRATIFICAÇÃO"
      ]
    }
  }
]$contract_form$::jsonb,
  now()
)
on conflict (storage_key) do update set
  module_key = excluded.module_key,
  payload = excluded.payload,
  updated_at = now();
