<?php
//pasta -- nome da pagina
Autenticar::isAcessoPag($page['var1'],$page['page']) ? null : header("Location: ".$Config->url);
?>
<script src="<?php echo $Config->url; ?>com/js/paginas/Funcao/Funcao.js"></script>
<script type="text/javascript">
  $(function (){
    Funcao.init();
  });
</script>
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        Funções
        <small>Painel para controle de funções</small>
      </h1>
    </section>

    <!-- Main content -->
    <section class="content">

      <!-- SELECT2 EXAMPLE -->
      <div class="box box-default">
        <div class="box-header with-border">
          <h3 class="box-title">Buscar Funções</h3>

          <div class="box-tools pull-right">
            <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
            <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-remove"></i></button>
          </div>
        </div>
        <!-- /.box-header -->
        <div class="box-body">
          <div class="row">
            <div class="col-md-4">
              <div class="form-group">
                <label>Cooperativa</label>
                <select class=" select2" style="width: 100%;" id="cooperativa" name="cooperativa">
                </select>
              </div>
              <!-- /.form-group -->
            </div>
            <div class="col-md-4">
              <div class="form-group">
                <label>Funções</label>
                <select id="sl_funcao" name="sl_funcao" class="select2" data-placeholder="Selecione uma função" style="width: 100%;">
                </select>
              </div>
            </div>
            <div class="col-md-2">
              <div class="form-group">
                <label style="color: white;">.</label>
                <button class="form-control btn btn-default">Buscar</button>
              </div>
            </div>
            
            <?php if(Autenticar::isAcesso('21002')){ ?>
            <div class="col-md-2">
              <div class="form-group">
                <label style="color: white;">.</label>
                <button class="form-control btn btn-primary">Cadastrar</button>
              </div>
            </div>
            <?php } ?>
          </div>
          <!-- /.row -->
        </div>
        <!-- /.box-body -->
      </div>
      <!-- /.box -->

      <div class="row">
        <!-- /.col (left) -->
        <div class="col-md-12">

          <!-- iCheck -->
          <div class="box box-success">
            <div class="box-header">
              <h3 class="box-title">Funções</h3>
            </div>
            <div class="box-body">
              <!-- Minimal style -->
              	<table id="tabela_busca" width="100%" class="table table-striped table-bordered table-hover">
			        <thead>
			            <tr>
			                <th width="10%">Código</th>
			                <th width="30%">Cooperativa</th>
			                <th width="30%">Descrição</th>
			                <th width="5%">Ativo</th>
			                <th width="10%">Data Alteração</th>
			                <th width="10%">Ação</th>
			            </tr>
			        </thead>
			        <tbody>

			        </tbody>
			    </table>
            <!-- /.box-body -->
            <div class="box-footer">
            </div>
          </div>
          <!-- /.box -->
        </div>
        <!-- /.col (right) -->
      </div>
      <!-- /.row -->
    </section>
    <!-- /.content -->
 