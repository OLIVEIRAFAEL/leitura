/**
* @author Roni
*/

"use strict";

var Drop = {    


  init: function(){

  },

  carregarEstado: function(seletor, selected){
      myApp.showPreloader("Aguarde um momento");
      
      var query = "select uf from uf order by uf;";

      DataBase.db.transaction(
            function(tx) {                                
                tx.executeSql(query, [], function(tx,res){                
                  var div = '';

                  var dataset = res.rows;

                  div += '<option value="">----</option>';

                  if(dataset.length > 0){
                    for(var i=0; i < dataset.length; i++){
                      var obj = dataset.item(i);

                      if(selected == obj.uf)
                        div += '<option value="'+obj.uf+'" selected>'+obj.uf+'</option>';
                      else
                        div += '<option value="'+obj.uf+'">'+obj.uf+'</option>';
                    }
                  }                  

                  $$("#"+seletor).html(div);

                }, DataBase.txErrorHandler);                              
            },
            DataBase.txErrorHandler,
            function(tx) {
               myApp.hidePreloader();
            }
      );

  },

  carregarVeiculo: function(seletor, selected){
      myApp.showPreloader("Aguarde um momento");
      
      var query = "select * from cdc_veiculos order by descricao;";

      DataBase.db.transaction(
            function(tx) {                                
                tx.executeSql(query, [], function(tx,res){                
                  var div = '';

                  var dataset = res.rows;

                  div += '<option value="">----</option>';

                  if(dataset.length > 0){
                    for(var i=0; i < dataset.length; i++){
                      var obj = dataset.item(i);

                      if(selected == obj.cod_veiculo)
                        div += '<option value="'+obj.cod_veiculo+'" selected>'+obj.descricao+'</option>';
                      else
                        div += '<option value="'+obj.cod_veiculo+'">'+obj.descricao+'</option>';
                    }
                  }                  

                  $$("#"+seletor).html(div);

                }, DataBase.txErrorHandler);                              
            },
            DataBase.txErrorHandler,
            function(tx) {
               myApp.hidePreloader();
            }
      );

  },


  carregarCidade: function(uf, seletor, selected){
      myApp.showPreloader("Aguarde um momento");
      
      var query = "select cod_cidades, descricao from cidades where uf = '"+uf+"' order by descricao;";

      DataBase.db.transaction(
            function(tx) {                                
                tx.executeSql(query, [], function(tx,res){                
                  var div = '';

                  var dataset = res.rows;

                  div += '<option value="">----</option>';

                  if(dataset.length > 0){
                    for(var i=0; i < dataset.length; i++){
                      var obj = dataset.item(i);

                      if(selected == obj.cod_cidades)
                        div += '<option value="'+obj.cod_cidades+'" selected>'+obj.descricao+'</option>';
                      else
                        div += '<option value="'+obj.cod_cidades+'">'+obj.descricao+'</option>';
                    }
                  }                  

                  $$("#"+seletor).html(div);

                }, DataBase.txErrorHandler);                              
            },
            DataBase.txErrorHandler,
            function(tx) {
               myApp.hidePreloader();
            }
      );

  },

  carregar: function(tabela, campo, descricao, where, seletor, selected){
      myApp.showPreloader("Aguarde um momento");
      
      var query = "select "+campo+" valor, "+descricao+" descricao from "+tabela;
      query += where !== '' ? where : "";
      query += " order by "+descricao+";";

      DataBase.db.transaction(
            function(tx) {                                
                tx.executeSql(query, [], function(tx,res){                
                  var div = '';

                  var dataset = res.rows;

                  div += '<option value="">----</option>';

                  if(dataset.length > 0){
                    for(var i=0; i < dataset.length; i++){
                      var obj = dataset.item(i);

                      if(selected == obj.valor)
                        div += '<option value="'+obj.valor+'" selected>'+obj.descricao+'</option>';
                      else
                        div += '<option value="'+obj.valor+'">'+obj.descricao+'</option>';
                    }
                  }                  

                  $$("#"+seletor).html(div);

                }, DataBase.txErrorHandler);                              
            },
            DataBase.txErrorHandler,
            function(tx) {
               myApp.hidePreloader();
            }
      );

  },

};
