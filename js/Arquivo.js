/**
* @author Roni
*/
'use strict';

var Arquivo = {
    pictureSource : null,
    destinationType: null,
    imageData: null,
    tipoImagem: '',    

    tirarFoto: function(seletor){
        Arquivo.tipoImagem = 'imagem';
        var cam = navigator.camera.DestinationType.DATA_URL;

            navigator.camera.getPicture(function(imageData){
                var smallImage = "data:image/jpeg;base64," + imageData;
                $$("#image-"+seletor).val(imageData);
                $$("#"+seletor).html('<img style="width:240px;height:240px;" src="'+smallImage+'" />');
            }, Arquivo.onFail,{
                    quality: 50,
                    targetWidth: 800,
                    targetHeight: 800,
                    correctOrientation: true,
                    destinationType: cam              
                  }
            );
    },

    onSuccess: function(imageData){
        Arquivo.imageData = imageData;
        Arquivo.tipoImagem = 'imagem';
        
        var smallImage = imageData;

        //var smallImage = "data:image/jpeg;base64," + imageData;
        //console.log(smallImage);
        //$$("#imagem_jpg").val(imageData)
        //$$("#smallImg").html('<img style="width:120px;height:120px;" src="'+smallImage+'" />');
    },

    onFail: function(message){
        //Funcoes.alerta(message, 'Erro camera');
    },

    salvar: function(){
        var cod_empresa = $$("#cod_empresa").val(),codcoligada = $$("#codcoligada").val(),
        codfilial = $$("#codfilial").val(),cod_cliente = $$("#cod_cliente").val(),cod_proposta = $$("#cod_proposta").val()

        DataBase.db.transaction(
            function(tx) {  

                if($$("#image-documento").val() != ''){
                    var query = "insert into cdc_propostas_anexos "+
                            "  ( "+
                            "   comentario, "+
                            "   codigo_app, "+
                            "   cod_empresa,"+
                            "   codfilial,"+
                            "   codcoligada,"+
                            "   cod_proposta,"+
                            "   cod_cliente,"+
                            "   base64)"+
                            " values"+
                            " ("+
                            "   '"+$$("#observacao").val()+"',"+
                            "   '"+$$("#codigo_app").val()+"',"+
                            "   '"+cod_empresa+"',"+
                            "   '"+codfilial+"',"+
                            "   '"+codcoligada+"',"+
                            "   '"+cod_proposta+"',"+
                            "   '"+cod_cliente+"',"+
                            "   '"+$$("#image-documento").val()+"') ";

                        tx.executeSql(query, [], Arquivo.txSucesso, DataBase.txErrorHandler);
                }
                                              
            },
            function(){
                myApp.alert("Ops, ocorreu algum erro para salvar os dados.");
                return true;
            },
            function(tx) {
                myApp.alert("Salvo com sucesso.");
            }
        );
        
    },

    txSucesso: function(){
        Arquivo.listarArquivos($$("#codigo_app").val());
    },

    listarArquivos: function(cod_proposta){
       
        DataBase.db.transaction(
            function(tx) {  
                
                var query = "select * from cdc_propostas_anexos where codigo_app = '"+cod_proposta+"'";

                tx.executeSql(query, [], function(tx, res){
                    var dataset = res.rows;
                     var div = '', contCol = 0;
                    if(dataset.length > 0){

                        div += '<div class="row">';

                        for (var i = 0; i < dataset.length; i++) {
                            var obj = dataset.item(i);
                            
                            if(contCol == 3){
                                div +='</div> <div class="row">';
                                contCol = 1;
                            }else{
                                contCol++;
                            }

                            div += '<div class="col-33">'+
                                   obj.comentario+'<br>'+                                   
                                   '<a href="#" onclick="Arquivo.removerArquivo(\''+obj.base64+'\');">'+
                                   '<span id="holerite-1">'+
                                   '<img style="width:120px;height:120px;" src="data:image/jpeg;base64,'+obj.base64+'" />'+
                                   '</span> '+
                                   '</a>'+
                                   '</div>';
                        }

                        div += '</div>';

                        $$(".lista-arquivo").html(div);
                    }
                }, DataBase.txErrorHandler);
                                              
            },
            function(){
                myApp.alert("Ops, ocorreu algum erro para carregar os antigos arquivos");
                return true;
            },
            function(tx) {
                //myApp.alert("Salvo com sucesso.");
            }
        );
        
    },

    removerArquivo: function(arquivo){
        myApp.confirm('Deseja realmente excluir?', 
          function () {
            
            DataBase.db.transaction(
                function(tx) {  
                    var query = "delete from cdc_propostas_anexos where base64 = '"+arquivo+"'";
                    //console.log(query);
                    tx.executeSql(query, [], function(tx,res){
                        console.log("Console delete");
                        Arquivo.listarArquivos($$("#codigo_app").val());
                    }, DataBase.txErrorHandler);                                                  
                },
                function(){
                    myApp.alert("Ops, ocorreu algum erro para deletar os dados.");
                    return true;
                },
                function(tx) {
                   // myApp.alert("Salvo com sucesso.");
                }
            );

          },
          function () {
            //cancel
          }
        );
    }

}