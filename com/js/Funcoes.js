var Funcoes = {

  _empresa : '',

  alerta: function(type,title,mensagem){
    //success, warning, danger
    $.howl ({
      type: type,
      title: title,
      content: mensagem,
      lifetime: 17500
    });
  },

  perfil: function (name, s_name, id) {
      var intials = name.text().charAt(0) + s_name.text().charAt(0);
      var profileImage = $('#'+id).text(intials);
  },

  tabelaDinamica: function(tabela,url,acao,variaveis,colunaOrderBy, tipoOrderBy, cb){
     //Funcoes.mostrarLoading();
     var url = App.getUrl()+url;
     url += "?acao="+acao;
     //percorrer variaveis
     if(variaveis.length > 0){
       $.each(variaveis,function(i,obj){
          url += "&"+obj[0]+"="+obj[1];
       });
     }

     //ordenar tabela pela coluna
     colunaOrderBy = colunaOrderBy != '' ? colunaOrderBy : 1;
     tipoOrderBy = tipoOrderBy != '' ? tipoOrderBy : 'desc';

     var oTable = $("#"+tabela).dataTable( {
             "language": {
                 "url": "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Portuguese-Brasil.json"
            },
            destroy: true,
            "order": [[ colunaOrderBy, tipoOrderBy ]],
            "bProcessing": true,
            "serverSide": false,
            "sAjaxSource": url,
            "sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
            "sPaginationType": "full_numbers",
            "lengthMenu": [
                [5, 10, 25, -1],
                [5, 10, 25, "Todos"]
            ],
            "iDisplayLength": 5          
        });

     /* $('#'+tabela+' tbody').on('click', 'tr', function () {
        var data = oTable.row( this ).data();
        alert( 'You clicked on '+data[0]+'\'s row' );
      });*/
    
    if(cb && typeof(cb) === 'function'){
      cb();
    }
  },

  modalAbrir: function(s,w,h,m){
    $( "#"+s ).dialog({
      height: h,
      modal: m,
      width: w
    });
  },

  modalFechar: function(s){
    $("#"+s).dialog( "close" );
  },

    /*
  Form Geral
  */
  formulario: function(form){
     //Funcoes.mostrarLoading();
     var options = { 
            dataType:  'json',
            beforeSubmit:  Funcoes.disableButton,
            success:    function(json) { 
                if(json.result == true){
                     Funcoes.alerta('success','Sucesso',json.msg);                     
                }else{
                    Funcoes.alerta('danger','Erro',json.msg);                    
                }
                Funcoes.ativarButton(form);
                //Funcoes.esconderLoading();
            },
            error: function(){
                //Funcoes.esconderLoading();
                Funcoes.ativarButton(form);
            }
        }; 

        // pass options to ajaxForm 
        $('#'+form).ajaxForm(options);
  },


  /**
  * @return url
  */
  _url: function(){
    _url = window.location.protocol+"//"+window.location.host+window.location.pathname;
    return _url;
  },

  /**
  * Gerar dropDown <select>
  */
  _dropDown: function(sl,tb,vl,ds,wh,sc){
    Funcoes.mostrarLoading();
    $.ajax({
                url : App.getUrl()+"com/php/controller/FuncoesController.php",
                type: "POST",
                dataType : "json",
                data: {
                    acao: 'CarregarSelect',
                    tb: tb,
                    vl: vl,
                    ds: ds,
                    wh: wh
                },
                success : function(json){
                    var op = '';
                    if(json.total > 0){
                        op += sc == '' ? '<option value="" selected>Selecione...</option>' : '<option value="">Selecione...</option>';
                        $.each(json.dados, function(i,obj){
                            if(sc == obj.valor)
                                op += '<option value="'+obj.valor+'" selected>'+obj.descricao+'</option>';
                            else
                                op += '<option value="'+obj.valor+'">'+obj.descricao+'</option>';
                        });

                    }else{
                        op += '<option value="" selected>Sem resultados</option>';
                    }

                    $("#"+sl).html(op);
                   // $("#"+sl).trigger("chosen:updated");
                    $("#"+sl).select2("destroy");
                    $("#"+sl).select2();
                   // $("#"+sl).trigger("onchange");

                    Funcoes.esconderLoading();
                },error: function(){
                    alert("Erro para carregar os dados");
                    Funcoes.esconderLoading();
                }
            });
  },

  carregarDrop: function(sl,tb,vl,ds,wh,sc,by,ord,tr){
        Funcoes.mostrarLoading();
            $.ajax({
                url : App.getUrl()+"com/php/controller/FuncoesController.php",
                type: "POST",
                dataType : "json",
                data: {
                    acao: 'CarregarSelect',
                    tb: tb,
                    vl: vl,
                    ds: ds,
                    wh: wh,
                    by: by,
                    ord: ord
                },
                success : function(json){
                    
                    var op = '';
                    //op += all == 'S' ? '<option value="">---</option>' : '';
                    if(json.total > 0){
                        //op += sc == '' ? '<option value="" selected>---</option>' : '<option value="">---</option>';
                        $.each(json.dados, function(i,obj){                            
                            if(sc == obj.valor)
                                op += '<option value="'+obj.valor+'" selected>'+obj.descricao+'</option>';
                            else
                                op += '<option value="'+obj.valor+'">'+obj.descricao+'</option>';
                        });

                    }else{
                        op += '<option value="T" selected>Sem resultados</option>';
                    }

                    $("#"+sl).html(op);
                   // $("#"+sl).trigger("chosen:updated");
                    $("#"+sl).select2("destroy");
                    $("#"+sl).select2();
                    if(tr === 'S')
                      $("#"+sl).trigger('change');
                   // $("#"+sl).trigger("onchange");

                    Funcoes.esconderLoading();
                },error: function(){
                    Funcoes.alerta("Erro","Erro para carregar os dados","light");
                    Funcoes.esconderLoading();
                }
            });
    },

  dateForUser: function(str){
    if(str != '' && str != null){
      data =  str.split("-");
      
      if(data[2] != '00')
        return data[2]+"/"+data[1]+"/"+data[0];
      else
        return '';

    }else{
      return '';
    }
  },

  voltar: function(url){
    url = atob(url);
    window.location = url;
  },

  mostrarLoading: function(){
		$.blockUI({ message: $('#loadingShow') }); 
   },

   esconderLoading: function(){
    	$.unblockUI({ fadeOut: 200 });
   },

  disableButton: function(data, $form, opts) {
    $form.find('button:submit').html('<i class="fa-li fa fa-spinner fa-spin"></i> Salvando...').attr('disabled','disabled');
  },

  ativarButton: function(form){
    $("#"+form).find('button:submit').html('<i class="fa fa-check"></i> Salvar Dados').removeAttr('disabled','disabled');
  },

  dataParaMysql: function(str) {
    //console.log(str);
        if(str != ''){
           var a = str.split("-");
           return a[2]+'/'+a[1]+'/'+a[0];
        }else{
            return '';
        }
    },

  html_entity_decode: function (string, quote_style) {
    var hash_map = {},
      symbol = '',
      tmp_str = '',
      entity = '';
    tmp_str = string.toString();

    if (false === (hash_map = this.get_html_translation_table('HTML_ENTITIES', quote_style))) {
      return false;
    }

    // fix &amp; problem
    // http://phpjs.org/functions/get_html_translation_table:416#comment_97660
    delete(hash_map['&']);
    hash_map['&'] = '&amp;';

    for (symbol in hash_map) {
      entity = hash_map[symbol];
      tmp_str = tmp_str.split(entity)
        .join(symbol);
    }
    tmp_str = tmp_str.split('&#039;')
      .join("'");

    return tmp_str;
  }


}