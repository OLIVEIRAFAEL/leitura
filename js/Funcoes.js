var Funcoes = {

    net : false,


    //Exibir alerta
    alerta: function(msg,title){

        /*navigator.notification.alert(
            msg,  // message
            Funcoes.esconderAlerta,         // callback
            title,            // title
            'Ok'                  // buttonName
        );*/

        myApp.addNotification({
            title: title,            
            message: msg,
            media: '<i class="fa fa-info-circle white"></i>'
        });
    },

    esconderAlerta: function(){
      //nada
    },

    //verificar conexao com internet
    internet: function(){
       return Funcoes.net;
    },

    //verificar conexao com internet
    checarInternet: function(callback){
       var networkState = navigator.network.connection.type;

        var states = {};
            states[Connection.UNKNOWN]  = false;
            states[Connection.ETHERNET] = false;
            states[Connection.WIFI]     = true;
            states[Connection.CELL_2G]  = true;
            states[Connection.CELL_3G]  = true;
            states[Connection.CELL_4G]  = true;
            states[Connection.CELL]     = true;
            states[Connection.NONE]     = false;

       Funcoes.net = states[networkState];
       callback(Funcoes.net);
    },

    checarGPS: function(){
        cordova.plugins.diagnostic.isLocationEnabled(function (enabled){
             //alert("GPS is "+(enabled ? "enabled" : "disabled"));
              if(!enabled){            
                return false;
              }else{
                return true;
              }
          },function (error){
              console.log("An error occurred: "+ error);
        });
    },

    //retornar codigo unico
    getAppId: function(){
        var dataAtual = new Date();
        var dia = dataAtual.getDate();        
        var mes = dataAtual.getMonth();
        var ano = dataAtual.getYear();
        if (ano < 1000)
            ano+=1900
        var hora = dataAtual.getHours();
        var minuto = dataAtual.getMinutes();
        var segundo = dataAtual.getSeconds();

        var valor_aleatorio = Math.floor(Math.random() * 10);

        return (valor_aleatorio+""+dia+""+mes+""+ano+""+hora+""+minuto+""+segundo);
    },

    ultimoString: function(str){
      var str = new String(str);     
      return str.substring(0,(str.length - 1));
    },

    dynamicSort: function(property) {
      var sortOrder = 1;
      if(property[0] === "-") {
          sortOrder = -1;
          property = property.substr(1);
      }
      return function (a,b) {
          var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
          return result * sortOrder;
      }
    },

    formatReal: function(value){
      if(value !== '' && value !== 0){
        // Pegando valor monetario para conversao
        var money = new String( value );

        // Valor armazenado em array
        money = money.split( "." );

        // Valor Real
        var real  = money[0];

        // Valor Decimal
        var decimal = money[1];

         
        if(typeof(decimal) !== 'undefined'){

         if(decimal.length == 1 ){
          decimal = decimal + '0';
          }else{
            decimal = decimal.substring(0,2);
          }
        }else{
          decimal = "00";
        }

         // Retornando valor  
         return  real + ',' + decimal;
      }else{
        return "0,00";
      }
      
    },

    getDataNow: function(){

        var dataAtual = new Date();
        
        var dia = dataAtual.getDate();        
        var mes = dataAtual.getMonth();
        var ano = dataAtual.getYear();

        if (ano < 1000){
            ano+=1900;
        }
        
        if(mes < 10){
            mes = 0+""+mes;
        }
        
        if(dia < 10){
            dia = 0+""+dia;
        }

      return dia+"/"+mes+"/"+ano;
    },

    corrigirNumero: function(numero,ddd){
        var numero = numero;
        var ddd = ddd;
        
        if(numero !== "" && numero !== null && numero !== "null"){
          //verificando se o numero tem o tamanho certo com ddd
          if(numero.length > 8){
              //verificando se o numero possui 0
              if(numero[0] === "0"){
                  //verificando se os 3 numeros formam um codigo de area
                  if(numero.substring(0,3) === ddd){
                    //numero correto
                  }
              }else{
                  //verifico se o numero primeiro corresponde a um inicio do ddd
                  if(numero[0] === ddd[1]){
                    //adiciono o 0
                    numero = 0+""+numero;
                  }else{
                    numero = ddd+""+numero;
                  }
              }
          }else{
              //verifico se o numero possui o tamanho de 8
              if(numero.length === 8 || numero.length === 9){
                  //adiciono o ddd
                  numero = ddd+""+numero;
              }else{
               return false;   
              }
          }
        }else{
          return false;
        }       
        
        numero = "("+numero.substring(0,3)+") "+numero.substring(3,7)+"-"+numero.substring(7);
        return numero;
    },

    getDateTime: function() {
        var now     = new Date(); 
        var year    = now.getFullYear();
        var month   = now.getMonth()+1; 
        var day     = now.getDate();
        var hour    = now.getHours();
        var minute  = now.getMinutes();
        var second  = now.getSeconds(); 
        if(month.toString().length == 1) {
            var month = '0'+month;
        }
        if(day.toString().length == 1) {
            var day = '0'+day;
        }   
        if(hour.toString().length == 1) {
            var hour = '0'+hour;
        }
        if(minute.toString().length == 1) {
            var minute = '0'+minute;
        }
        if(second.toString().length == 1) {
            var second = '0'+second;
        }   
        var dateTime = year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second;   
        return dateTime;
    },

    addslashes: function(str){
        return (str + '')
        .replace(/[\\"']/g, '\\$&')
        .replace(/\u0000/g, '\\0');
    },

    dataParaSqlite: function(str) {
        if(str != ''){
           var a = str.split("/");
           return a[2]+'-'+a[1]+'-'+a[0];
        }else{
            return '';
        }
    },

    dataParaUsuario: function(str) {
        if(str != ''){
           var a = str.split("-");
           return a[2]+'/'+a[1]+'/'+a[0];
        }else{
            return '';
        }
    },

    getValue: function(valor,form){
        var x = valor.toUpperCase();
        var z = form;
        var val = $$(z).find('option[value="' + x + '"]');
        var endval = val.attr('id');

        if(typeof(endval) !== 'undefined')
            return endval;
        else
            return '';
    },

    mostrarDiv: function(valorInput, valorComparado, divShow,condicaoComparado){

        if(typeof(condicaoComparado) === 'undefined' || condicaoComparado === '='){
        if(valorInput === valorComparado){
          $$("."+divShow).show("fast");
        }else{
          $$("."+divShow).hide("fast");
        }
      }else if(condicaoComparado === '!='){
        if(valorInput !== valorComparado){
          $$("."+divShow).show("fast");
        }else{
          $$("."+divShow).hide("fast");
        }
      }
    },

    removeDiv: function(div){
      $$("."+div).remove();
    }
};

var map={"â":"a","Â":"A","à":"a","À":"A","á":"a","Á":"A","ã":"a","Ã":"A","ê":"e","Ê":"E","è":"e","È":"E","é":"e","É":"E","î":"i","Î":"I","ì":"i","Ì":"I","í":"i","Í":"I","õ":"o","Õ":"O","ô":"o","Ô":"O","ò":"o","Ò":"O","ó":"o","Ó":"O","ü":"u","Ü":"U","û":"u","Û":"U","ú":"u","Ú":"U","ù":"u","Ù":"U","ç":"c","Ç":"C"};

function removerAcentos(s){ 
    return s.replace(/[\W\[\] ]/g,
        function(a){
            return map[a]||a
        });
    
}

function get_html_translation_table(table, quote_style) {
        //  discuss at: http://phpjs.org/functions/get_html_translation_table/
        // original by: Philip Peterson
        //  revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // bugfixed by: noname
        // bugfixed by: Alex
        // bugfixed by: Marco
        // bugfixed by: madipta
        // bugfixed by: Brett Zamir (http://brett-zamir.me)
        // bugfixed by: T.Wild
        // improved by: KELAN
        // improved by: Brett Zamir (http://brett-zamir.me)
        //    input by: Frank Forte
        //    input by: Ratheous
        //        note: It has been decided that we're not going to add global
        //        note: dependencies to php.js, meaning the constants are not
        //        note: real constants, but strings instead. Integers are also supported if someone
        //        note: chooses to create the constants themselves.
        //   example 1: get_html_translation_table('HTML_SPECIALCHARS');
        //   returns 1: {'"': '&quot;', '&': '&amp;', '<': '&lt;', '>': '&gt;'}

        var entities = {},
          hash_map = {},
          decimal;
        var constMappingTable = {},
          constMappingQuoteStyle = {};
        var useTable = {},
          useQuoteStyle = {};

        // Translate arguments
        constMappingTable[0] = 'HTML_SPECIALCHARS';
        constMappingTable[1] = 'HTML_ENTITIES';
        constMappingQuoteStyle[0] = 'ENT_NOQUOTES';
        constMappingQuoteStyle[2] = 'ENT_COMPAT';
        constMappingQuoteStyle[3] = 'ENT_QUOTES';

        useTable = !isNaN(table) ? constMappingTable[table] : table ? table.toUpperCase() : 'HTML_SPECIALCHARS';
        useQuoteStyle = !isNaN(quote_style) ? constMappingQuoteStyle[quote_style] : quote_style ? quote_style.toUpperCase() :
          'ENT_COMPAT';

        if (useTable !== 'HTML_SPECIALCHARS' && useTable !== 'HTML_ENTITIES') {
          throw new Error('Table: ' + useTable + ' not supported');
          // return false;
        }

        entities['38'] = '&amp;';
        if (useTable === 'HTML_ENTITIES') {
          entities['160'] = '&nbsp;';
          entities['161'] = '&iexcl;';
          entities['162'] = '&cent;';
          entities['163'] = '&pound;';
          entities['164'] = '&curren;';
          entities['165'] = '&yen;';
          entities['166'] = '&brvbar;';
          entities['167'] = '&sect;';
          entities['168'] = '&uml;';
          entities['169'] = '&copy;';
          entities['170'] = '&ordf;';
          entities['171'] = '&laquo;';
          entities['172'] = '&not;';
          entities['173'] = '&shy;';
          entities['174'] = '&reg;';
          entities['175'] = '&macr;';
          entities['176'] = '&deg;';
          entities['177'] = '&plusmn;';
          entities['178'] = '&sup2;';
          entities['179'] = '&sup3;';
          entities['180'] = '&acute;';
          entities['181'] = '&micro;';
          entities['182'] = '&para;';
          entities['183'] = '&middot;';
          entities['184'] = '&cedil;';
          entities['185'] = '&sup1;';
          entities['186'] = '&ordm;';
          entities['187'] = '&raquo;';
          entities['188'] = '&frac14;';
          entities['189'] = '&frac12;';
          entities['190'] = '&frac34;';
          entities['191'] = '&iquest;';
          entities['192'] = '&Agrave;';
          entities['193'] = '&Aacute;';
          entities['194'] = '&Acirc;';
          entities['195'] = '&Atilde;';
          entities['196'] = '&Auml;';
          entities['197'] = '&Aring;';
          entities['198'] = '&AElig;';
          entities['199'] = '&Ccedil;';
          entities['200'] = '&Egrave;';
          entities['201'] = '&Eacute;';
          entities['202'] = '&Ecirc;';
          entities['203'] = '&Euml;';
          entities['204'] = '&Igrave;';
          entities['205'] = '&Iacute;';
          entities['206'] = '&Icirc;';
          entities['207'] = '&Iuml;';
          entities['208'] = '&ETH;';
          entities['209'] = '&Ntilde;';
          entities['210'] = '&Ograve;';
          entities['211'] = '&Oacute;';
          entities['212'] = '&Ocirc;';
          entities['213'] = '&Otilde;';
          entities['214'] = '&Ouml;';
          entities['215'] = '&times;';
          entities['216'] = '&Oslash;';
          entities['217'] = '&Ugrave;';
          entities['218'] = '&Uacute;';
          entities['219'] = '&Ucirc;';
          entities['220'] = '&Uuml;';
          entities['221'] = '&Yacute;';
          entities['222'] = '&THORN;';
          entities['223'] = '&szlig;';
          entities['224'] = '&agrave;';
          entities['225'] = '&aacute;';
          entities['226'] = '&acirc;';
          entities['227'] = '&atilde;';
          entities['228'] = '&auml;';
          entities['229'] = '&aring;';
          entities['230'] = '&aelig;';
          entities['231'] = '&ccedil;';
          entities['232'] = '&egrave;';
          entities['233'] = '&eacute;';
          entities['234'] = '&ecirc;';
          entities['235'] = '&euml;';
          entities['236'] = '&igrave;';
          entities['237'] = '&iacute;';
          entities['238'] = '&icirc;';
          entities['239'] = '&iuml;';
          entities['240'] = '&eth;';
          entities['241'] = '&ntilde;';
          entities['242'] = '&ograve;';
          entities['243'] = '&oacute;';
          entities['244'] = '&ocirc;';
          entities['245'] = '&otilde;';
          entities['246'] = '&ouml;';
          entities['247'] = '&divide;';
          entities['248'] = '&oslash;';
          entities['249'] = '&ugrave;';
          entities['250'] = '&uacute;';
          entities['251'] = '&ucirc;';
          entities['252'] = '&uuml;';
          entities['253'] = '&yacute;';
          entities['254'] = '&thorn;';
          entities['255'] = '&yuml;';
        }

        if (useQuoteStyle !== 'ENT_NOQUOTES') {
          entities['34'] = '&quot;';
        }
        if (useQuoteStyle === 'ENT_QUOTES') {
          entities['39'] = '&#39;';
        }
        entities['60'] = '&lt;';
        entities['62'] = '&gt;';

        // ascii decimals to real symbols
        for (decimal in entities) {
          if (entities.hasOwnProperty(decimal)) {
            hash_map[String.fromCharCode(decimal)] = entities[decimal];
          }
        }

        return hash_map;
      }

    function htmlentities(string, quote_style, charset, double_encode) {
          //  discuss at: http://phpjs.org/functions/htmlentities/
          // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
          //  revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
          //  revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
          // improved by: nobbler
          // improved by: Jack
          // improved by: Rafał Kukawski (http://blog.kukawski.pl)
          // improved by: Dj (http://phpjs.org/functions/htmlentities:425#comment_134018)
          // bugfixed by: Onno Marsman
          // bugfixed by: Brett Zamir (http://brett-zamir.me)
          //    input by: Ratheous
          //  depends on: get_html_translation_table
          //   example 1: htmlentities('Kevin & van Zonneveld');
          //   returns 1: 'Kevin &amp; van Zonneveld'
          //   example 2: htmlentities("foo'bar","ENT_QUOTES");
          //   returns 2: 'foo&#039;bar'

          var hash_map = this.get_html_translation_table('HTML_ENTITIES', quote_style),
            symbol = '';
          string = string == null ? '' : string + '';

          if (!hash_map) {
            return false;
          }

          if (quote_style && quote_style === 'ENT_QUOTES') {
            hash_map["'"] = '&#039;';
          }

          if ( !! double_encode || double_encode == null) {
            for (symbol in hash_map) {
              if (hash_map.hasOwnProperty(symbol)) {
                string = string.split(symbol)
                  .join(hash_map[symbol]);
              }
            }
          } else {
            string = string.replace(/([\s\S]*?)(&(?:#\d+|#x[\da-f]+|[a-zA-Z][\da-z]*);|$)/g, function(ignore, text, entity) {
              for (symbol in hash_map) {
                if (hash_map.hasOwnProperty(symbol)) {
                  text = text.split(symbol)
                    .join(hash_map[symbol]);
                }
              }

              return text + entity;
            });
          }

          return string;
        }

