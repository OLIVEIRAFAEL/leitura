var Index = {

  init: function(){
    Index.menuUsuario();
  },

  actionEvents: function(){
   
  },

  menuUsuario: function(pag){

        $.post( App.getUrl()+"com/php/controller/MenuController.php", 
                {   
                    acao: 'MenuUsuario',
                    pagina: pag
                },function(json){
                   var htm = $("#menu_principal").html();
                   $("#menu_principal").html("");
                   $("#menu_principal").append(htm+""+json);
                });
  }

}
