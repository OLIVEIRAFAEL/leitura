myApp.onPageInit('index', function (page) { 
   Usuario.telaIndex();
});

myApp.onPageInit('cadastrar-cliente', function (page) {	
	Drop.carregarEstado("ufRes");
	Drop.carregarEstado("ufCom");
	Drop.carregar('clientes_profissao', 'cod_profissao', 'descricao', '', 'codProfissao', '');
	Drop.carregar('clientes_profissao', 'cod_profissao', 'descricao', '', 'codFuncaoTrabalhoConj', '');
	Drop.carregar('nacionalidade', 'cod_nacionalidade', 'descricao_nacionalidade', '', 'codNacionalidade', '');
	Drop.carregarEstado("codNaturalidade");

   $$("#codCliente").on("keypress",function(){
      var cliente = $$(this).val();
      console.log(cliente);
      if(cliente.length > 9){
         Clientes.consultarCliente(cliente);
      }
   });

	var contBanco = 0;

	$$("#btnAddBanco").on("click", function(){
		contBanco++;
		$$("#divBancario").append('<div class=" div_'+contBanco+'">\
                              <div class="row">\
                                             <div class="col-30">\
                                                <label>Tipo de Conta</label>\
                                                <input type="hidden" name="codBanco[]" id="codBanco">\
                                                <select id="tipoConta" name="tipoConta[]" class="form-control">\
                                                         <option value="S" >Conta Poupanca</option>\
                                                         <option value="N" >Conta Corrente</option>\
                                                      </select>\
                                             </div>\
                                             <div class="col-40">\
                                                <label>Banco</label>\
                                                <input id="descricaoBanco" name="descricaoBanco[]" class="form-control bancoPrincipal" type="text" >\
                                             </div>\
                                             <div class="col-30">\
                                                <label>Agência</label>\
                                                <input id="agencia" name="agencia[]" class="form-control bancoPrincipal" type="text" >\
                                             </div>\
                                          </div>\
                                          <div class="row">\
                                             <div class="col-30">\
                                                <label>Numero da Conta</label>\
                                                <input id="numeroConta" name="numeroConta[]" class="form-control bancoPrincipal" type="text" >\
                                             </div>\
                                             <div class="col-10">\
                                                <label>Dig</label>\
                                                <input id="digitoConta" name="digitoConta[]" class="form-control bancoPrincipal" type="text" >\
                                             </div>\
                                             <div class="col-30">\
                                                <label>Cheque Especial</label>\
                                                <select id="chequeEspecial" name="chequeEspecial[]" class="form-control">\
                                                         <option value="S" >Sim</option>\
                                                         <option value="N" selected>Não</option>\
                                                      </select>\
                                             </div>\
                                             <div id="divBotaoBancario" class="col-10">\
                                                <label>&nbsp;</label><br>\
                                                <a id="btnRemoveBanco" href="javascript:Funcoes.removeDiv(\'div_'+contBanco+'\');" \
                           class="button button-raised button-fill color-red"><i class="fa fa-trash"></i></a>\
                                             </div>\
                                          </div>\
                     </div>');
	});

	var contRef = 0;

	$$("#btnAddRef").on("click", function(){
		contRef++;
		$$("#divParentesco").append('<div class="row div_parentesco_'+contRef+'">\
                        <div class="col-30">\
                           <input id="codParente" name="codParente[]" class="form-control" type="hidden">\
                           <label>Nome <span class="requeObr">*</span></label>\
                           <input id="nomeParente" name="nomeParente[]" \
                           class="form-control referenciaPrincipal" type="text" data-required="true" >\
                        </div>\
                        <div class="col-30">\
                           <label>Telefone <span class="requeObr">*</span></label>\
                           <input id="telefoneParente" name="telefoneParente[]" \
                           class="form-control referenciaPrincipal" type="text" data-required="true">\
                        </div>\
                        <div id="divBotaoParentesco" class="col-20">\
                           <label>&nbsp;</label><br>\
                           <a id="btnAddRef" href="javascript:Funcoes.removeDiv(\'div_parentesco_'+contRef+'\');" \
                           class="button button-raised button-fill color-red"><i class="fa fa-trash"></i></a>\
                        </div>\
                     </div>');
	});

	//salvar formulario
	$$("#btn-salvar").on("click", function(){
		Clientes.salvarDados();
	});

	$$(".formDados").on("submit", function(e){
		e.preventDefault();
		Clientes.salvarDados();
	});

});

myApp.onPageInit('cadastrar-proposta', function (page) { 
   myApp.hidePreloader();
   
   if(page.query.acao == 'ATUALIZAR'){
      Propostas.carregarProposta(page.query.codigo_app)
   }else{
      Drop.carregarVeiculo("modeloVeiculo");
   }   

   $$(".formDados").on("submit", function(e){
      e.preventDefault();
      Propostas.salvarDados();
   });

}); 

myApp.onPageInit('listar-propostas', function (page) { 
  Propostas.listarPropostas();
}); 


myApp.onPageInit('anexar-documentos', function (page) { 
   //salvar formulario
   $$("#btn-salvar").on("click", function(){
      Arquivo.salvar();
   });

   Arquivo.listarArquivos(page.query.codigo_app);
}); 

