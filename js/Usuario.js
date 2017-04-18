/**
* @author Roni
*/
var Usuario = {

    loginApp: function(){
        var self = this;

        $$.ajax({
            url: appUrl+ "ServiceUsuario.php",
            method: "POST",
            data: {
              acao: 'Login',
              login: $$("#login").val(),
              senha: $$("#senha").val()
            },
            dataType:"json",
            success:function (json) {                
                if(json.result == true){
                    self.setCodEmpresa(json.cod_empresa);
                    self.setUsuario(json.usuario);
                    self.setCodColigada(json.codcoligada);
                    self.setCodFilial(json.codfilial);
                    self.setNome(json.nome);
                    self.setCpf(json.cpf);
                    self.setSchema(json.schema);

                    myApp.showPreloader('Carregando');
                    DataBase.carregarVeiculo('NBS', '4', function(json){                
                        DataBase.query(json, function(){                      
                            myApp.hidePreloader();
                            myApp.hidePreloader();

                            mainView.router.loadPage("index.html");
                        });
                    });
                    
                }else{
                    myApp.alert(json.msg);
                }                
            },
            error: function(model, response) {
                console.log("Erro - Login");
                myApp.hidePreloader();
            }
        });
    },

    telaIndex: function(){
        var self = this;
        if(self.isOnline() == true){
            $$("#nome_usuario").html(self.getNome());
        }else{
            mainView.router.loadPage("login.html");
        }
    },

    sair: function(){
        var self = this;
        
        self.setUsuario('');
        self.setNome('');
        self.setCpf('');

        localStorage.clear();

        mainView.router.loadPage('login.html');
    },

    isOnline: function(){        
        if(this.getUsuario() !== null && this.getUsuario() !== '' && typeof this.getUsuario() !== 'undefined'){
            return true;
        }else{
            return false;
        }
    },

    setUsuario: function(n){
        localStorage.setItem('usuario',n);
    },

    getUsuario: function(){        
        return localStorage.getItem('usuario');
    },

    setCodEmpresa: function(n){
        localStorage.setItem('cod_empresa',n);
    },

    getCodEmpresa: function(){        
        return localStorage.getItem('cod_empresa');
    },

    setCodColigada: function(n){
        localStorage.setItem('codcoligada',n);
    },

    getCodColigada: function(){        
        return localStorage.getItem('codcoligada');
    },

    setCodFilial: function(n){
        localStorage.setItem('codfilial',n);
    },

    getCodFilial: function(){        
        return localStorage.getItem('codfilial');
    },

    setCpf: function(n){
        localStorage.setItem('cpf',n);
    },

    getCpf: function(){        
        return localStorage.getItem('cpf');
    },

    setNome: function(n){
        localStorage.setItem('nome',n);
    },

    getNome: function(){        
        return localStorage.getItem('nome');
    },

    setSchema: function(n){
        localStorage.setItem('schema',n);
    },

    getSchema: function(){        
        return localStorage.getItem('schema');
    }
}