/**
* @author Roni
*/

"use strict";

var Propostas = {

    totalExportado: 0,
	
	salvarDados: function(){            
		var self = this;
            
		//var formDados = myApp.formToJSON("#formDados");   
        var formData = $("#formProposta").serializeArray();
        var formDados = self.setValues(formData);               
                
    		self.tryError(formDados, function(erro){
    			if(erro == ''){
                      var queryProposta = formDados.acao == 'NOVO' ? self.salvarProposta(formDados) : self.atualizarProposta(formDados);
    			      DataBase.db.transaction(
                                  function(tx) {                                                                 
                                        tx.executeSql(queryProposta, [], 
                                              function(tx,res){
                                                Funcoes.alerta("Cadastrado com sucesso", "Aviso");
                                                
                                                mainView.router.load({
                                                    url: 'index.html'
                                                })

                                              }, DataBase.txErrorHandler);                              
                                  },
                                  function(){
                                        myApp.alert("Ops, ocorreu algum erro para salvar os dados.");
                                        return true;
                                  },
                                  function(tx) {
                                        myApp.alert("Salvo com sucesso.");
                                  }
                            );
    			}else{
    			   myApp.alert(erro);
    			}
    		});
	},

    listarPropostas: function(){

        var query = "select b.descricao      desc_veiculo, "+
                    "       c.nome           desc_cliente,"+
                    "       a.cod_empresa,"+
                    "       a.codigo_app,"+
                    "       a.tipo_cliente,"+
                    "       a.codcoligada,"+
                    "       a.codfilial,"+
                    "       a.cod_cliente,"+
                    "       a.cod_proposta,"+
                    "       a.ano_fabricacao,"+
                    "       a.ano_modelo, "+
                    "       a.valor_veiculo, "+
                    "       a.num_parcela, "+
                    "      a.valor_parcela "+
                    "  from cdc_propostas a "+
                    "  left outer join cdc_veiculos b "+
                    "    on b.cod_veiculo = (a.cod_modelo || '#' || a.cod_produto) "+
                    "  left outer join cdc_clientes c "+
                    "    on c.cod_cliente = a.cod_cliente "+
                    " order by a.data_cadastro desc";
        
        var div = '';

        DataBase.db.transaction(function(tx) {
            tx.executeSql(query, [], function(tx, res){

              var dataset = res.rows; 

              if(dataset.length > 0){
                for (var i= 0; i < dataset.length; i++) {
                  var obj = dataset.item(i);

                    div += '<li class="swipeout">'+
                    ' <div class="swipeout-content item-content">'+
                    '  <div class="item-inner">'+
                    '      <div class="item-title">'+
                    obj.desc_veiculo+ ' - '+ obj.desc_cliente +
                    '      </div>'+
                    '      <div class="item-after">'+
                    'R$ '+Funcoes.formatReal(obj.valor_veiculo)+' | Parc.: '+obj.num_parcela+' x R$ '+Funcoes.formatReal(obj.valor_parcela)+
                    '      </div>'+
                    '  </div>'+
                    '</div>'+
                    '<div class="swipeout-actions-right">'+
                    '  <a href="anexar-documentos.html?codigo_app='+obj.codigo_app+'" data-context=\'{"codigo_app" : "'+obj.codigo_app+'","cod_proposta" : "'+obj.cod_proposta+'","cod_empresa" : "'+obj.cod_empresa+'", "codcoligada" : "'+obj.codcoligada+'", "codfilial" : "'+obj.codfilial+'", "cod_cliente" : "'+obj.cod_cliente+'", "cod_empresa" : "'+obj.cod_empresa+'","desc_modelo": "'+obj.desc_veiculo+'", "desc_cliente": "'+obj.desc_cliente+'"}\' class="action1 bg-orange">Anexar Documentos</a>'+
                    ' <a href="cadastrar-proposta.html?codigo_app='+obj.codigo_app+'&acao=ATUALIZAR" class="action3">Alterar</a>'+
                    '  <a href="#" class="action2 bg-red">Excluir</a>'+
                    '</div>'+
                  ' </li>';
                }
              }else{
                div = 'Nenhuma proposta cadastrada';
              }
              
              $$("#listar-dados").html(div);

            }, DataBase.txErrorHandler);                              
          });
    },

    carregarProposta: function(codigo_app){

        var query = "select * "+
                    "  from cdc_propostas a "+
                    "  where a.codigo_app = '"+codigo_app+"' ";
        
        console.log(query);
        var div = '';

        DataBase.db.transaction(function(tx) {
            tx.executeSql(query, [], function(tx, res){

              var dataset = res.rows; 

              if(dataset.length > 0){
                var obj = dataset.item(0);
                console.log(obj);

                $$("#codCliente").val(obj.cod_cliente);
                $$("#acao").val('ATUALIAZAR');
                $$("#codigo_app").val(obj.codigo_app);
                $$("#tipoCliente").val(obj.tipo_cliente);
                $$("#possuiAvalista").val(obj.possui_avalista).trigger("change");
                $$("#tipo_avalista").val(obj.tipo_avalista);
                $$("#codAvalista").val(obj.cod_avalista);
                
                Drop.carregarVeiculo("modeloVeiculo",obj.cod_modelo+'#'+obj.cod_produto);

                $$("#valorVeiculo").val(obj.valor_veiculo);
                $$("#anoFabricacao").val(obj.ano_fabricacao);
                $$("#anoModelo").val(obj.ano_modelo);
                $$("#tabelaFinanciamento").val(obj.tabela_financiamento);
                $$("#prazoFinanciamento").val(obj.prazo_financiamento);
                $$("#possuiEmplacamento").val(obj.possui_emplacamento);
                $$("#emplacamentoValor").val(obj.valor_emplacamento);
                $$("#valorTc").val(obj.valor_tc);
                $$("#valorEntrada").val(obj.valor_entrada);
                $$("#numParcela").val(obj.num_parcela);
                $$("#valorParcela").val(obj.valor_parcela);
                $$("#coeficiente").val(obj.coeficiente);
                $$("#carenciaDias").val(obj.carencia_dias);                            

              }else{
                div = 'Nenhuma proposta cadastrada';
              }
                            

            }, DataBase.txErrorHandler);                              
          });
    },

	salvarProposta: function(formDados, cb){	
		var dadosVeic = formDados.modeloVeiculo.split("#");
        var cod_modelo = dadosVeic[0], cod_produto = dadosVeic[1];

		var query = "INSERT INTO CDC_PROPOSTAS "+
                "  (COD_EMPRESA,"+
                "      CODCOLIGADA,"+
                "      CODFILIAL,"+
                "      COD_PROPOSTA,"+
                "      POSSUI_EMPLACAMENTO,"+
                "      VALOR_EMPLACAMENTO,"+
                "      VALOR_ENTRADA,"+
                "      COD_MODELO,"+
                "      COD_EVENTO,"+
                "      TIPO_CLIENTE,"+
                "      COD_CLIENTE,"+
                "      CARENCIA_DIAS,"+
                "      TABELA_FINANCIAMENTO,"+
                "      PRAZO_FINANCIAMENTO,"+
                "      COEFICIENTE,"+
                "      VALOR_PARCELA,"+                      
                "      USUARIO_CRIOU,"+
                "      COD_PRODUTO,"+
                "      NUM_PARCELA,"+
                "      COD_AVALISTA,"+
                "      VALOR_VEICULO,"+
                "      ANO_FABRICACAO,"+
                "      ANO_MODELO,"+
                "      VALOR_TC,"+
                "      POSSUI_AVALISTA,"+
                "      DATA_CADASTRO,"+
                "      COD_STATUS, "+
                "      CODIGO_APP)"+
                " values"+
                "  ('"+Usuario.getCodEmpresa()+"',"+
                "   '"+Usuario.getCodColigada()+"',"+
                "   '"+Usuario.getCodFilial()+"',"+             
                "   '"+Funcoes.getAppId()+"',"+
                "   '"+formDados.possuiEmplacamento+"',"+
                "   '"+formDados.emplacamentoValor+"',"+
                "   '"+formDados.valorEntrada+"',"+
                "   '"+cod_modelo+"',"+
                "   '',"+
                "   '"+formDados.tipoCliente+"',"+
                "   '"+formDados.codCliente+"',"+
                "   '"+formDados.carenciaDias+"',"+
                "   '"+formDados.tabelaFinanciamento+"',"+
                "   '"+formDados.prazoFinanciamento+"',"+
                "   '"+formDados.coeficiente+"',"+
                "   '"+formDados.valorParcela+"',"+
                "   '"+Usuario.getUsuario()+"',"+
                "   '"+cod_produto+"',"+
                "   '"+formDados.numParcela+"',"+
                "   '"+formDados.codAvalista+"',"+
                "   '"+formDados.valorVeiculo+"',"+
                "   '"+formDados.anoFabricacao+"',"+
                "   '"+formDados.anoModelo+"',"+
                "   '"+formDados.valorTc+"',"+
                "   '"+formDados.possuiAvalista+"',"+
                "   '"+Funcoes.getDataNow()+"',"+                
                "   '1',"+
                "   '"+Funcoes.getAppId()+"')";            
            console.log(query);
            return query;
	},

    atualizarProposta: function(formDados, cb){    
        var dadosVeic = formDados.modeloVeiculo.split("#");
        var cod_modelo = dadosVeic[0], cod_produto = dadosVeic[1];

        var query = "update cdc_propostas"+
                    "   set "+
                    "       possui_emplacamento = '"+formDados.possuiEmplacamento+"',"+
                    "       valor_emplacamento = '"+formDados.emplacamentoValor+"',"+
                    "       valor_entrada = '"+formDados.valorEntrada+"',"+
                    "       cod_modelo = '"+cod_modelo+"',"+                                                        
                    "       carencia_dias = '"+formDados.carenciaDias+"',"+
                    "       tabela_financiamento = '"+formDados.tabelaFinanciamento+"',"+
                    "       prazo_financiamento = '"+formDados.prazoFinanciamento+"',"+
                    "       coeficiente = '"+formDados.coeficiente+"',"+
                    "       valor_parcela = '"+formDados.valorParcela+"',"+                                        
                    "       cod_produto = '"+cod_produto+"',"+
                    "       num_parcela = '"+formDados.numParcela+"',"+
                    "       cod_avalista = '"+formDados.codAvalista+"',"+
                    "       valor_veiculo = '"+formDados.valorVeiculo+"',"+
                    "       ano_fabricacao = '"+formDados.anoFabricacao+"',"+
                    "       ano_modelo = '"+formDados.anoModelo+"',"+
                    "       valor_tc = '"+formDados.valorTc+"',"+
                    "       possui_avalista = '"+formDados.possuiAvalista+"',"+                    
                    "       status_app = 'N'"+                    
                    " where codigo_app = '"+formDados.codigo_app+"'";            
            
        return query;
    },

    gerarDados: function(cb){

        var query = "select * from cdc_propostas where status_app = 'N' LIMIT 1";

        var dadosProposta = '', dadosCliente = '', dadosClienteDiverso = '', dadosFisico = '', dadosJuridico = '', dadosBanco = '',
        dadosConjuge = '', dadosParente = '', dadosAnexo = '';

        DataBase.db.transaction(
          function(tx) {                                                                 
                tx.executeSql(query, [], 
                    function(tx, res){

                      var dataset = res.rows; 

                      if(dataset.length > 0){

                        //for (var i= 0; i < dataset.length; i++) {
                          var obj = dataset.item(0);

                            dadosProposta = JSON.stringify(obj);
                                                       
                                /// dados proposta anexo
                                Propostas.getAnexos('cdc_propostas_anexos', obj.codigo_app, true, function(res, msg, dados){
                                    if(res == true){
                                        dadosAnexo = JSON.stringify(dados);
                                    }

                                    /// dados cliente
                                    Clientes.getDadosCliente('cdc_clientes', obj.cod_cliente, false, function(res, msg, dados){
                                        if(res == true){
                                            dadosCliente = JSON.stringify(dados);
                                        }
                                    });

                                    /// dados banco
                                    Clientes.getDadosCliente('cdc_clientes_banco', obj.cod_cliente, true, function(res, msg, dados){
                                        if(res == true){
                                            dadosBanco = JSON.stringify(dados);
                                        }
                                    });

                                    /// dados cliente diverso
                                    Clientes.getDadosCliente('cdc_cliente_diverso', obj.cod_cliente, false, function(res, msg, dados){
                                        if(res == true){
                                            dadosClienteDiverso = JSON.stringify(dados);
                                        }
                                    });

                                    /// dados dados
                                    Clientes.getDadosCliente('cdc_dados_fisicos', obj.cod_cliente, false, function(res, msg, dados){
                                        if(res == true){
                                            dadosFisico = JSON.stringify(dados);
                                        }
                                    });

                                    Clientes.getDadosCliente('cdc_dados_juridicos', obj.cod_cliente, false, function(res, msg, dados){
                                        if(res == true){
                                            dadosJuridico = JSON.stringify(dados);
                                        }
                                    });

                                    /// dados cliente conjuge
                                    Clientes.getDadosCliente('cdc_clientes_conjuge', obj.cod_cliente, false, function(res, msg, dados){
                                        if(res == true){
                                            dadosConjuge = JSON.stringify(dados);
                                        }
                                    });

                                    /// dados cliente parente
                                    Clientes.getDadosCliente('cdc_clientes_parentes', obj.cod_cliente, true, function(res, msg, dados){
                                        if(res == true){
                                            dadosParente = JSON.stringify(dados);
                                        }
                                    });

                                    myApp.showPreloader("Aguarde exportando dados");                                    
                                    window.setTimeout(function(){                                        
                                        cb(true, dadosProposta, dadosCliente, dadosClienteDiverso, dadosFisico, dadosJuridico, dadosBanco, dadosConjuge, dadosParente, dadosAnexo);
                                    }, 10000);
                                });  
                        
                        //}
                        
                        
                      }else{
                        cb(false, dadosProposta, dadosCliente, dadosClienteDiverso, dadosFisico, dadosJuridico, dadosBanco, dadosConjuge, dadosParente, dadosAnexo);
                      }
                                               
                    }, DataBase.txErrorHandler);
          },
          function(){
              myApp.hidePreloader();              
              myApp.alert("Ops, erro para carregar as propostas");
          },
          function(tx) {
              //sucesso
          }
      );

    },

    startExport: function(){
        var self = this;

        myApp.showPreloader("Aguarde, exportando dados.");
        window.setTimeout(function(){
        self.gerarDados(function(result,dadosProposta, dadosCliente, dadosClienteDiverso, dadosFisico, dadosJuridico, dadosBanco, dadosConjuge, dadosParente, dadosAnexo){
            console.log("Resultado "+result);
            if(result == true){
                self.exportaDados(dadosProposta, dadosCliente, dadosClienteDiverso, dadosFisico, dadosJuridico, dadosBanco, dadosConjuge, dadosParente, dadosAnexo, function(json){
                    if(json.result == true){
                        self.atualizaDados(json.codigo_app, function(){
                            self.startExport();                            
                        });
                    }else{
                        myApp.alert("Erro para exportar os dados da proposta "+json.cliente);
                    }
                });
            }else{
                console.log("Total Exportado: "+self.totalExportado);
                myApp.alert("Total Exportado: "+self.totalExportado);
                self.totalExportado = 0;

                myApp.hidePreloader();
            }
        });
        },2000);
    },

    exportaDados: function(dadosProposta, dadosCliente, dadosClienteDiverso, dadosFisico, dadosJuridico, dadosBanco, dadosConjuge, dadosParente, dadosAnexo, cb){        
        $$.ajax({
            url: appUrl+ "ServiceBase.php",
            method: "POST",
            data: {
              acao: 'Importar',
              esquema: Usuario.getSchema(),
              dadosProposta : dadosProposta, 
              dadosCliente : dadosCliente, 
              dadosClienteDiverso : dadosClienteDiverso, 
              dadosFisico : dadosFisico, 
              dadosJuridico : dadosJuridico, 
              dadosBanco : dadosBanco, 
              dadosConjuge : dadosConjuge, 
              dadosParente : dadosParente, 
              dadosAnexo : dadosAnexo
            },
            dataType:"json",
            success:function (json) {                
                if(json.result == true){
                  self.totalExportado = self.totalExportado + 1;
                  cb(json.dados);                  
                }else{
                  var dados = [];
                  cb(dados);
                }                
            },
            error: function(model, response) {
                //console.log(JSON.stringify(response));
                //console.log(JSON.stringify(model));
                //myApp.hidePreloader();
            }
        });
    },


    atualizaDados: function(codigo_app ,callback){
        var query = "update cdc_propostas set status_app = 'S' where codigo_app = '"+cod_cliente+"'";        
        console.log(query);
        DataBase.db.transaction(
              function(tx) {                                                                 
                    tx.executeSql(query, [], 
                        function(tx, res){
                            console.log("Cllback atualiza proposta ");
                          callback();
                                                   
                        }, DataBase.txErrorHandler(query));
              },
              function(){
                  myApp.hidePreloader();              
                  callback(false,'Ops erro para salvar os dados');
              },
              function(tx) {
                  //sucesso
              }
          );
    },

    getAnexos: function(tabela, cod_cliente, arrRes ,callback){
        var query = "select * from "+tabela+" where codigo_app = '"+cod_cliente+"' ";
        
        var arr = [];

        console.log(query);

        DataBase.db.transaction(
              function(tx) {                                                                 
                    tx.executeSql(query, [], 
                        function(tx, res){
                            console.log("Entrou anexo");
                          var dataset = res.rows; 

                          console.log("Qtde "+dataset.length);
                          if(parseInt(dataset.length) > 0){

                            for (var i= 0; i < dataset.length; i++) {
                              var obj = dataset.item(i);

                              if(arrRes == true)
                                arr.push(obj);
                              else
                                var arr = obj;
                            }

                            console.log(arr);
                            callback(true, 'Sucesso', arr);
                            
                          }else{
                            console.log("Anexos Falso");
                            callback(false, 'Ops, nenhum cliente cadastrado');          
                          }
                                                   
                        }, function(query){

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
		erro += formDados.modeloVeiculo == '' ? "Informe o veículo <br>" : "";
		erro += formDados.valorVeiculo == '' ? "Informe o valor do veículo <br>" : "";
		erro += formDados.anoModelo == '' ? "Informe o ano do modelo<br>" : "";
		erro += formDados.anoFabricacao == '' ? "Informe o ano de fabricação<br>" : "";
        erro += formDados.tabelaFinanciamento == '' ? "Informe a tabela de financiamento<br>" : "";
        erro += formDados.valorEntrada == '' ? "Informe o valor da entrada<br>" : "";
        erro += formDados.coeficiente == '' ? "Informe o coeficiente<br>" : "";
        erro += formDados.valorParcela == '' ? "Informe o valor da parcela<br>" : "";

		cb(erro);
	}
}
