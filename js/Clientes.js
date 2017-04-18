/**
* @author Roni
*/

"use strict";

var Clientes = {
	
	salvarDados: function(){            
		var self = this;
            
		//var formDados = myApp.formToJSON("#formDados");   
            var formData = $(".formDados").serializeArray();
            var formDados = self.setValues(formData);               
            
		self.tryError(formDados, function(erro){
			if(erro == ''){
                        myApp.showPreloader("Salvando dados...");
			      DataBase.db.transaction(
                              function(tx) {                                                                 
                                    tx.executeSql(self.salvarClienteDiverso(formDados), [], 
                                          DataBase.txSuccess, DataBase.txErrorHandler);

                                    tx.executeSql(self.salvarClienteFisico(formDados), [], 
                                          DataBase.txSuccess, DataBase.txErrorHandler);

                                    tx.executeSql(self.salvarCliente(formDados), [], 
                                          function(){
                                                self.salvarClienteReferencia(formDados);
                                                self.salvarClienteBanco(formDados);
                                          }, DataBase.txErrorHandler);

                              },
                              function(){
                                    myApp.hidePreloader();
                                    myApp.alert("Ops, ocorreu algum erro para salvar os dados.");                                    
                                    return true;
                              },
                              function(tx) {
                                    myApp.hidePreloader();                                    

                                    mainView.router.load({
                                        url: 'cadastrar-proposta.html',
                                        context: {
                                          codCliente: formDados.codCliente,
                                          tipoCliente: 'F',
                                          acao: 'NOVO'
                                        }
                                    })
                              }
                        );
			}else{
			   myApp.alert(erro);
			}
		});
	},

	salvarClienteDiverso: function(formDados, cb){		
		var cpfFormatado = formDados.codCliente.replace(/^(\d{3})(\d{3})(\d{3})(\d{2}).*/,"$1.$2.$3-$4");
		 
		var query = "INSERT INTO CDC_CLIENTE_DIVERSO\
                  (COD_CLIENTE,COD_TIPO_CLIENTE,COD_EMPRESA,COD_CIDADES,UF,\
                        COD_TIPO,ENDERECO,COD_CONCEITO_CLIENTE,CPF,NOME,\
                        FONE_CONTATO,RG,ORGAO_EMISSOR,BLOQUEADO,BAIRRO,\
                        CEP,PREFIXO_FONE_CONTATO,DATA_CADASTRO,USUARIO_RESPONSAVEL,\
                        COD_NACIONALIDADE,FACHADA)\
                values\
                  ('"+formDados.codCliente+"',\
                   '1',\
                   '"+Usuario.getCodEmpresa()+"',\
                   '"+formDados.codCidRes+"',\
                   '"+formDados.ufRes+"',\
                   'C',\
                   '"+formDados.ruaRes+"',\
                   '1',\
                   '"+cpfFormatado+"',\
                   '"+formDados.nome+"',\
                   '',\
                   '"+formDados.rgNumero+"',\
                   '"+formDados.rgEmissor+"',\
                   '',\
                   '"+formDados.bairroRes+"',\
                   '"+formDados.cepRes+"',\
                   '"+formDados.prefixoCel+"',\
                   '"+Funcoes.getDataNow()+"',\
                   '"+Usuario.getUsuario()+"',\
                   '"+formDados.codNacionalidade+"',\
                   '"+formDados.fachadaRes+"')";            
            
            return query;
	},

	salvarClienteFisico: function(formDados, cb){
		var cpfFormatado = formDados.codCliente.replace(/^(\d{3})(\d{3})(\d{3})(\d{2}).*/,"$1.$2.$3-$4");

		var query = "INSERT INTO CDC_DADOS_FISICOS\
                  (COD_CLIENTE,COD_SEXO,COD_ESTADO_CIVIL,\
                    ANIVERSARIO,PAI,MAE,RG_NUMERO,\
                    CPF,RG_EMISSOR,RG_DATA_EMISSAO,RG_NUMERO2,COD_CIDADES,COD_NATURALIDADE)\
                values\
                  ('"+formDados.codCliente+"',\
                   '"+formDados.codSexo+"',\
                   '"+formDados.codEstadoCivil+"',\
                   '"+formDados.aniversario+"',\
                   '"+formDados.pai+"',\
                   '"+formDados.mae+"',\
                   '"+formDados.rgNumero+"',\
                   '"+cpfFormatado+"',\
                   '"+formDados.rgEmissor+"',\
                   '"+formDados.rgDataEmissao+"',\
                   '',\
                   '"+formDados.codCidadesNatural+"',\
                   '"+formDados.codNaturalidade+"')";

            return query;
	},

  salvarClienteConjugue: function(formDados, cb){
            var cpfFormatado = formDados.codCliente.replace(/^(\d{3})(\d{3})(\d{3})(\d{2}).*/,"$1.$2.$3-$4");

            var query = "INSERT INTO CDC_CLIENTES_CONJUGE\
                  (NOME_CONJUGUE,COD_CLIENTE,CPF_CONJUGE,\
                        DATA_NASCIMENTO_CONJUGE,CGC_CONJUGE,\
                        RG_CONJUGE,TELEFONE_COMERCIAL,RG_EMISSOR,\
                        NOME_EMPRESA_TRAB_CONJ,\
                        CATEGORIA_PROFISSIONAL_CONJ,COD_FUNCAO_TRABALHO_CONJ)\
                values\
                  ('"+formDados.nomeConjugue+"',\
                   '"+parseInt(formDados.codCliente)+"',\
                   '"+formDados.cpfConjuge+"',\
                   '"+formDados.dataNascimentoConjuge+"',\
                   '"+formDados.cpfConjuge+"',\
                   '"+formDados.rgConjugue+"',\
                   '"+formDados.telefoneComercial+"',\
                   '"+formDados.rgEmissorCon+"',\
                   '"+formDados.nomeEmpresaTrab+"',\
                   '"+formDados.categoriaProfissionalConj+"',\
                   '"+formDados.codFuncaoTrabalhoConj+"')";

            return query;
  },

	salvarCliente: function(formDados, cb){
		var query = "INSERT INTO CDC_CLIENTES\
                  (COD_CLIENTE,USUARIO_CADASTROU,COD_NACIONALIDADE,COD_CLASSE,COD_TIPO,\
                        COD_PROFISSAO,AVISA_COBRANCA,EMITE_FATURA,UF_RES,COD_CID_RES,\
                        BAIRRO_RES,RUA_RES,CEP_RES,COMPLEMENTO_RES,FACHADA_RES,\
                        UF_COM,BAIRRO_COM,COD_CID_COM,RUA_COM,CEP_COM,COMPLEMENTO_COM,\
                        FACHADA_COM,CONTATO_COM,UF_COBRANCA,BAIRRO_COBRANCA,RUA_COBRANCA,\
                        COD_CID_COBRANCA,CEP_COBRANCA,COMPLEMENTO_COBRANCA,FACHADA_COBRANCA,\
                        CONTATO_COBRANCA,PREFIXO_RES,TELEFONE_RES,OBSERVACAO_RES,PREFIXO_COM,TELEFONE_COM,\
                        PREFIXO_CEL,TELEFONE_CEL,OBSERVACAO_CEL,ENDERECO_ELETRONICO,NOME,\
                        NOME_EMPRESA_TRAB,CGC_EMPRESA_TRAB,CATEGORIA_PROFISSIONAL,TEMPO_ATIVIDADE,EMPRESA_ANTERIOR_TRAB,\
                        EMPRESA_ANTERIOR_ENDERECO, TIPO_RESIDENCIA,TEMPO_RESIDENCIA_ANTERIOR,\
                        NUMERO_DEPENDENTES, TEMPO_RES_ANTERIOR_MESES, TEMPO_ATIVIDADE_MESES,\
                        NUMERO_DEPENDENTES_MAIORES, EMAIL_NFE, COD_FUNCAO_TRABALHO, DATA_ADMISSAO_TRABALHO,\
                        RENDA_TRABALHO, TELEFONE_TRABALHO, TELEFONE_CONTADOR_TRABALHO, TEMPO_RESIDENCIA_ATUAL,\
                        TEMPO_RES_ATUAL_MESES)\
                values\
                  ('"+formDados.codCliente+"',\
                   '"+Usuario.getUsuario()+"',\
                   '"+formDados.codNacionalidade+"',\
                   'F',\
                   'C',\
                   '"+formDados.codProfissao+"',\
                   'S',\
                   'N',\
                   '"+formDados.ufRes+"',\
                   '"+formDados.codCidRes+"',\
                   '"+formDados.bairroRes+"',\
                   '"+formDados.ruaRes+"',\
                   '"+formDados.cepRes+"',\
                   '"+formDados.complementoRes+"',\
                   '"+formDados.fachadaRes+"',\
                   '"+formDados.ufCom+"',\
                   '"+formDados.bairroCom+"',\
                   '"+formDados.codCidCom+"',\
                   '"+formDados.ruaCom+"',\
                   '"+formDados.cepCom+"',\
                   '"+formDados.complementoCom+"',\
                   '"+formDados.fachadaCom+"',\
                   '"+formDados.contatoCom+"',\
                   '"+formDados.ufRes+"',\
                   '"+formDados.bairroRes+"',\
                   '"+formDados.ruaRes+"',\
                   '"+formDados.codCidRes+"',\
                   '"+formDados.cepRes+"',\
                   '"+formDados.complementoRes+"',\
                   '"+formDados.fachadaRes+"',\
                   '',\
                   '"+formDados.prefixoRes+"',\
                   '"+formDados.telefoneRes+"',\
                   '"+formDados.observacaoRes+"',\
                   '"+formDados.prefixoCom+"',\
                   '"+formDados.telefoneCom+"',\
                   '"+formDados.prefixoCel+"',\
                   '"+formDados.telefoneCel+"',\
                   '"+formDados.observacaoCel+"',\
                   '"+formDados.emailNfe+"',\
                   '"+formDados.nome+"',\
                   '"+formDados.nomeEmpresaTrab+"',\
                   '"+formDados.cgcEmpresaTrab+"',\
                   '"+formDados.categoriaProfissional+"',\
                   '"+formDados.tempoAtividade+"',\
                   '"+formDados.empresaAnteriorTrab+"',\
                   '"+formDados.empresaAnteriorEndereco+"',\
                   '',\
                   '"+formDados.tempoResidenciaAtual+"',\
                   '',\
                   '"+formDados.tempoResAtualMeses+"',\
                   '"+formDados.tempoAtividadeMeses+"',\
                   '',\
                   '"+formDados.emailNfe+"',\
                   '"+formDados.codProfissao+"',\
                   '"+formDados.dataAdmissaoTrabalho+"',\
                   '"+formDados.rendaTrabalho+"',\
                   '"+formDados.telefoneTrabalho+"',\
                   '',\
                   '"+formDados.tempoResidenciaAtual+"',\
                   '"+formDados.tempoResAtualMeses+"')";

            return query;
	},

  salvarClienteReferencia: function(formDados){
            var nome = [];
            var telefone = [];

            $$("input[name='nomeParente[]']").each(function(){
               nome.push($$(this).val());
            });

            $$("input[name='telefoneParente[]']").each(function(){
               telefone.push($$(this).val());
            });
            
            for(var i = 0; i < nome.length; i++){     
                  if(nome[i] != ''){             
                        var query = "INSERT INTO cdc_clientes_parentes\
                              (NOME_PARENTE,NOME,COD_CLIENTE,TELEFONE_PARENTE)\
                            values\
                              ('"+nome[i]+"',\
                               '"+Usuario.getUsuario()+"',\
                               '"+parseInt(formDados.codCliente)+"',\
                               '"+telefone[i]+"')";                  
                        DataBase.query(query, function(){
                        });
                  }
            }

  },

  salvarClienteBanco: function(formDados){
            var banco = [];
            var agencia = [];
            var conta = [];

            $$("input[name='descricaoBanco[]']").each(function(){
               banco.push($$(this).val());
            });

            $$("input[name='agencia[]']").each(function(){
               agencia.push($$(this).val());
            });

            $$("input[name='numeroConta[]']").each(function(){
               conta.push($$(this).val());
            });
            
            for(var i = 0; i < banco.length; i++){     
                  if(banco[i] != ''){             
                        var query = "INSERT INTO cdc_clientes_banco\
                          (DESCRICAO_BANCO,NOME,COD_CLIENTE,AGENCIA,\
                              NUMERO_CONTA,CONFIRMADO,UF_BANCO,COD_CIDADE_BANCO)\
                        values\
                          (\
                           '"+banco[i]+"',\
                           '"+Usuario.getUsuario()+"',\
                           '"+parseInt(formDados.codCliente)+"',\
                           '"+agencia[i]+"',\
                           '"+conta[i]+"',\
                           'N',\
                           '"+formDados.ufRes+"',\
                           '"+formDados.codCidRes+"')";                  
                        DataBase.query(query, function(){
                        });
                  }
            }

  },

  consultarCliente: function(codigo_cpf){
        myApp.showPreloader("Verificando o CPF, aguarde.");

        $$.ajax({
                type: "POST",
                url: appUrl+ "ServiceCliente.php",
                data: {
                  acao: 'ConsultarCliente',
                  esquema: Usuario.getSchema(),
                  cod_cliente: codigo_cpf
                },
                dataType: "json",
                success: function (json){
                  
                  if(json.result == true){                    
                    Clientes.consultarClienteCampos(json.dados);
                  }else{
                    
                  }
                  
                  myApp.hidePreloader();
                },error: function (){
                  //
                }
          });
    },

  consultarClienteCampos: function(json){
      $$("#formDados input, select").each(function(){
        $$(this).each(function(){
          var id  = $$(this).attr("id"); //recuperando o input
          for (var key in json.dados) {
            if(id !== undefined && (key.toLowerCase()) === (id.toLowerCase())){
              var novaString = id.toUpperCase();
              $$("#"+id).val(json.dados[novaString]).trigger('change');

              /*if((id.toLowerCase()) === 'codcidadesnatural'){
                Funcoes._dropDown('codCidadesNatural','CIDADES','cod_cidades','descricao',"WHERE UF = '"+json.dados.CODNATURALIDADE+"'",json.dados.CODCIDADESNATURAL,'descricao','');
              }

              if((id.toLowerCase()) === 'codcidres'){
                Funcoes._dropDown('codCidRes','CIDADES','cod_cidades','descricao',"WHERE UF = '"+json.dados.UFRES+"'",json.dados.CODCIDRES,'descricao','');
              }

              if((id.toLowerCase()) === 'codcidcom'){
                Funcoes._dropDown('codCidCom','CIDADES','cod_cidades','descricao',"WHERE UF = '"+json.dados.UFRES+"'",json.dados.CODCIDCOM,'descricao','');
              }*/
            }
          }
          //$('#clienteDesde').show('slow');
          //$("#formDados #acao_cadastro").val('ATUALIZAR');
        });
      });
  },

  getDadosCliente: function(tabela, cod_cliente, arrRes ,callback){
    var query = "select * from "+tabela+" where cod_cliente = '"+cod_cliente+"'";

    var arr = new Array();

    DataBase.db.transaction(
          function(tx) {                                                                 
                tx.executeSql(query, [], 
                    function(tx, res){

                      var dataset = res.rows; 

                      if(dataset.length > 0){

                        for (var i= 0; i < dataset.length; i++) {
                          var obj = dataset.item(i);

                          if(arrRes == true){
                            //console.log(obj);
                            arr.push(obj);
                          }
                          else{
                            var arr = obj;
                          }
                        }

                        callback(true, 'Sucesso', arr);
                      }else{
                        callback(false, 'Ops, nenhum cliente cadastrado');          
                      }
                                               
                    }, function(){
                      console.log("Erro - >"+query);
                    });
          },
          function(){
              myApp.hidePreloader();              
              callback(false,'Ops erro para buscar os dados');
          },
          function(tx) {
              //sucesso
          }
      );
  },

  setValues: function(formData){
            var formDados = {};

            $$.each(formData, function(i, obj){
                  formDados[obj.name] = obj.value;
            });

            return formDados;
  },

	tryError: function(formDados, cb){
		var erro = '';
		erro += formDados.codCliente == '' ? "Informe o CPF/CNPJ do cliente <br>" : "";
		erro += formDados.nome == '' ? "Informe o nome do cliente <br>" : "";
		erro += formDados.aniversario == '' ? "Informe o CPF/CNPJ do cliente <br>" : "";
		erro += formDados.rgNumero == '' ? "Informe o RG do cliente <br>" : "";
		erro += formDados.codSexo == '' ? "Informe o Sexo do cliente <br>" : "";
		erro += formDados.codEstadoCivil == '2' && formDados.nomeConjugue == '' ? "Informe o nome do Conjugue <br>" : "";
            erro += formDados.codEstadoCivil == '2' && formDados.cpfConjuge == '' ? "Informe o CPF do Conjugue <br>" : "";

		cb(erro);
	}
}
