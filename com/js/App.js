/**
* @author Rafael
* Email: rafael@partilhas.com.br
*/
var App = {
    
    url: '',
    codSistemaEmpresa: '',

    // Application Constructor
    init: function() {       
        
    },

    carregarEstados: function(seletor,selected){
          $.ajax({
                url : App.getUrl()+"com/php/controller/FuncoesController.php",
                type: "POST",
                dataType : "json",
                data: {
                    acao: 'CarregarEstados'
                },
                success : function(json){
                    var op = '<option value="" selected>Selecione...</option>';
                    if(json.total > 0){
                        $.each(json.dados, function(i,obj){
                            if(selected == obj.valor)
                                op += '<option value="'+obj.valor+'" selected>'+obj.descricao+'</option>';
                            else
                                op += '<option value="'+obj.valor+'">'+obj.descricao+'</option>';
                        });

                    }else{
                        op += '<option value="" selected>Sem resultados</option>';
                    }
                    $("#"+seletor).html(op);
                    $("#"+seletor).select2("destroy");
                    $("#"+seletor).select2();
                },error: function(){
                    alert("Erro para carregar as Estados");
                }
            });
  },

  carregarCidades: function(seletor,selected,valor){
          $.ajax({
                url : App.getUrl()+"com/php/controller/FuncoesController.php",
                type: "POST",
                dataType : "json",
                data: {
                    acao: 'CarregarCidades',
                    valor : valor
                },
                success : function(json){
                    var op = '<option value="" selected>Selecione...</option>';
                    if(json.total > 0){
                        $.each(json.dados, function(i,obj){
                            if(selected == obj.valor)
                                op += '<option value="'+obj.valor+'" selected>'+obj.descricao+'</option>';
                            else
                                op += '<option value="'+obj.valor+'">'+obj.descricao+'</option>';
                        });

                    }else{
                        op += '<option value="" selected>Sem resultados</option>';
                    }
                    $("#"+seletor).html(op);
                    $("#"+seletor).select2("destroy");
                    $("#"+seletor).select2();
                },error: function(){
                    alert("Erro para carregar as Cidades");
                }
            });
  },

  carregarEmpresas: function(seletor,selected,acesso, cb){
          $.ajax({
                url : App.getUrl()+"com/php/controller/FuncoesController.php",
                type: "POST",
                dataType : "json",
                data: {
                    acao: 'CarregarEmpresas',
                    acesso : acesso
                },
                success : function(json){
                    var op = '';
                    if(json.total > 0){
                        $.each(json.dados, function(i,obj){
                            if(selected == obj.valor)
                                op += '<option value="'+obj.valor+'" selected>'+obj.descricao+'</option>';
                            else
                                op += '<option value="'+obj.valor+'">'+obj.descricao+'</option>';
                        });

                    }else{
                        op += '<option value="T" selected>Sem resultados</option>';
                    }
                    $("#"+seletor).html(op);
                    $("#"+seletor).select2("destroy");
                    $("#"+seletor).select2();
                },error: function(){
                    alert("Erro para carregar as Empresa");
                }
            });
        if(cb && typeof(cb) === 'function'){
                cb();
        }
  },

  carregarParceiros: function(seletor,selected){
          $.ajax({
                url : App.getUrl()+"com/php/controller/FuncoesController.php",
                type: "POST",
                dataType : "json",
                data: {
                    acao: 'CarregarParceiros'                    
                },
                success : function(json){
                    var op = '';
                    if(json.total > 0){
                        $.each(json.dados, function(i,obj){
                            if(selected == obj.valor)
                                op += '<option value="'+obj.valor+'" selected>'+obj.descricao+'</option>';
                            else
                                op += '<option value="'+obj.valor+'">'+obj.descricao+'</option>';
                        });

                    }else{
                        op += '<option value="T" selected>Sem resultados</option>';
                    }
                    $("#"+seletor).html(op);
                    $("#"+seletor).select2("destroy");
                    $("#"+seletor).select2();
                },error: function(){
                    alert("Erro para carregar as Cidades");
                }
            });
  },

    getUrl: function(){
        return App.url;
    }
};