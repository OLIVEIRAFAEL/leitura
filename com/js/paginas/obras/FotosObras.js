/**
* @author Rafael
*/
'use strict';

var FotosObras = {

    url: "com/php/modules/administracao/controller/FotosObrasController.php",

    // Application Constructor
    init: function() {
        this.events();
    },

    events: function(){   
      Funcoes.mostrarLoading();   
      Funcoes.carregarDrop('sl_obras','obras','cod_obra','nome','','','nome','','');
      this.buscar();
      this._eventElement();
      Funcoes.esconderLoading();
    },

    addAlbum: function(p){
      $.ajax({
        url : App.getUrl()+FotosObras.url,
        type: "POST",
        dataType : "json",
        data: {
            acao: 'addlbum',
            path : p,
            ob: $("#sl_obras").val()
        },
        success : function(json){
          Funcoes.alerta('success','Sucesso',json.msg); 
        },error: function(){
            Funcoes.esconderLoading();
        }
      });
    },

    viewAlbum: function (dados){
      $.ajax({
        url : App.getUrl()+FotosObras.url,
        type: "POST",
        dataType : "json",
        data: {
            acao: 'viewAlbum',
            path : dados
        },
        success : function(json){
          $("#div_indicador").html("");
          $("#div_indicador").html(json.row);
          
          $("#div_carousel").html("");
          $("#div_carousel").html(json.fotos);
          FotosObras._openModal('myModal_2');  
        },error: function(){
            Funcoes.esconderLoading();
        }
      });
    },

    _eventElement: function(){
      $("#btn_alb_obr").click(function() {
        FotosObras._albumObras();
      });
    },

    _albumObras: function(){
      var sel = $("#sl_obras").val();
        if(sel === null || sel ===""){
          alert("Selecione Obras");
          return;
        }
        var htm = 'Album <i class="fa fa-random"></i> Obras';
        $("#titleModal").html("");
        $("#val_obra").val(sel);
        $("#titleModal").html(htm+"<br><strong> "+$("#sl_obras option:selected").text()+"</strong>");
        this._openModal('myModal');
        var variaveis = new Array();  
        Funcoes.tabelaDinamica('tabela_folder',this.url ,'BuscarAlbum',variaveis,2,'desc');  
        $("#tabela_folder").show();
    },

    _openModal: function(nome) {
        $('#'+nome).modal('show');
    },

    /**
    * Carregar tabela dados
    */
    buscar: function(){
        Funcoes.mostrarLoading();
        var variaveis = new Array();  
        Funcoes.tabelaDinamica('tabela_busca',FotosObras.url ,'Buscar',variaveis,2,'desc');  
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
                  FotosObras.buscar();
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