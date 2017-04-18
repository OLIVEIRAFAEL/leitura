/**
* @author Rafael
*/
'use strict';

var Funcao = {

    url: "com/php/modules/funcao/controller/FuncaoController.php",

    // Application Constructor
    init: function() {
        this.events();
    },

    events: function(){      
      App.carregarEmpresas('cooperativa','','21001', function(){
        Funcoes.carregarDrop('sl_funcao','funcao','cod_funcao','descricao',"WHERE cooperativa = '"+$("#cooperativa").val()+"'",'','descricao','','');
      });
      $("#cooperativa").on('change', function(){
        Funcoes.carregarDrop('sl_funcao','funcao','cod_funcao','descricao',"WHERE cooperativa = '"+$("#cooperativa").val()+"'",'','descricao','','');
      });
      //Funcoes.carregarDrop('cooperativa','cooperativa','cod_cooperativa','nome',"",'','','','');
    },

    /**
    * Carregar tabela dados
    */
    buscar: function(){
        Funcoes.mostrarLoading();
        
        var variaveis = new Array(                  
                  ['busca_ativo',$('#busca_ativo').val()],
                  ['busca_nome',$('#busca_nome').val()]
                  );  

        Funcoes.tabelaDinamica('tabela_busca',Clientes.url ,'Buscar',variaveis,2,'desc');  

        $("#tabela_busca").show();

        Funcoes.esconderLoading();
    }
};