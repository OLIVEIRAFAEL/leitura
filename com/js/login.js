var Login = {

  init: function(){
    this.actionEvents();
  },

  actionEvents: function(){
    
    $("#btnForgot").click(function(){
      $("#formLogin").hide("fast");
      $("#forgotPass").show("fast");
    });

    $("#btnLogin").click(function(){
      Login.loginWeb();
    });

    $("#btnBackLogin").click(function(){
      $("#formLogin").show("fast");
      $("#forgotPass").hide("fast");
    });
    
  },

  loginWeb: function(){
    Funcoes.mostrarLoading();
    $.ajax({
            url : App.getUrl()+"com/php/controller/AutenticarController.php",
            type: "POST",
            dataType : "json",
            data: {
                acao: 'LoginWeb',
                login: $("#usuario").val(),
                senha : $("#senha").val()
            },
            success : function(json){
                //possui dados
                if(json.result == true){
                    window.location = App.getUrl();
                }else{  
                    //
                    Funcoes.alerta('danger','Problemas para logar',json.msg);
                    Funcoes.esconderLoading();
                }
            },
            error: function(){
               Funcoes.alerta('danger','Problemas para logar','Ops ocorreu um erro, tente novamente em instantes');
               Funcoes.esconderLoading();
            }
    });
  }

}

$(function () {
  Login.init ()
})
