/**
* @author Rafael
*/
'use strict';

var Obras = {

    url: "com/php/modules/administracao/controller/ObrasController.php",

    // Application Constructor
    init: function() {
        this.events();
    },

    events: function(){      
      Obras.buscar();
      
      $("#formDados #acao").val('SalvarDados');        
      $("#formDados #acao_cadastro").val('Novo'); 
      $("#formDados").attr('action',App.getUrl() + Obras.url);              
      Obras.formulario('formDados');
    },

    /**
    * Carregar tabela dados
    */
    buscar: function(){
        Funcoes.mostrarLoading();
        
        var variaveis = new Array();  

        Funcoes.tabelaDinamica('tabela_busca',Obras.url ,'Buscar',variaveis,2,'desc');  

        $("#tabela_busca").show();

        Funcoes.esconderLoading();
    },


    formulario: function(form){
     //Funcoes.mostrarLoading();
     var options = { 
            dataType:  'json',
            beforeSubmit:  Funcoes.disableButton,
            success:    function(json) { 
                if(json.result == true){
                  Funcoes.alerta('success','Sucesso',json.msg); 
                  Obras.buscar();
                  $('#'+form)[0].reset();                   
                }else{
                    Funcoes.alerta('danger','Erro',json.msg);                    
                }
                Funcoes.ativarButton(form);                
            },
            error: function(){                
                Funcoes.ativarButton(form);
            }
        }; 
        // pass options to ajaxForm 
        $('#'+form).ajaxForm(options);
    }
};