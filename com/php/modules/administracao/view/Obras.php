<?php
//pasta -- nome da pagina
Autenticar::isAcessoPag($page['var1'],$page['page']) ? null : header("Location: ".$Config->url);
?>
<script src="<?php echo $Config->url; ?>com/js/paginas/obras/Obras.js"></script>
<script type="text/javascript">
  $(function (){
    Obras.init();
  });
</script>
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        Cadastrar Obras
        <small>Painel para cadastro de Obras</small>
      </h1>
    </section>

    <!-- Main content -->
    <section class="content">

      <!-- SELECT2 EXAMPLE -->
      <div class="box box-default">
        <div class="box-header with-border">
          <h3 class="box-title">Cadastrar Obras</h3>

          <div class="box-tools pull-right">
            <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
            <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-remove"></i></button>
          </div>
        </div>
        <!-- /.box-header -->
        <div class="box-body">
          <form id="formDados" name="formDados" method="post" autocomplete="off">       
            <input id="acao" name="acao" type="hidden" value="">
            <input id="acao_cadastro" name="acao_cadastro" type="hidden" value="">
            <div class="row">
              <div class="col-md-4">
                <div class="form-group">
                  <label>Nome</label>
                  <input type="text" name="nome_obra" class="form-control">
                </div>
                <!-- /.form-group -->
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label>Data</label>
                  <input type="text" name="data_obra" class="form-control">
                </div>
                <!-- /.form-group -->
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label>Local</label>
                  <input type="text" name="local_obra" class="form-control">
                </div>
                <!-- /.form-group -->
              </div>
              <div class="col-md-2" style="display: none;">
                <div class="form-group">
                  <label style="color: white;">.</label>
                  <button class="form-control btn btn-default">Buscar</button>
                </div>
              </div>
            </div>
            <div class="row">
              <?php if(Autenticar::isAcesso('21002')){ ?>
              <div class="col-md-2">
                <div class="form-group">
                  <label style="color: white;">.</label>
                  <button type="submit" class="form-control btn btn-primary">Cadastrar</button>
                </div>
              </div>
              <?php } ?>
            </div>
          </form>
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
              <h3 class="box-title">Obras</h3>
            </div>
            <div class="box-body">
              <!-- Minimal style -->
                <table id="tabela_busca" width="100%" class="table table-striped table-bordered table-hover">
              <thead>
                  <tr>
                      <th width="5%">Código</th>
                      <th width="20%">Nome</th>
                      <th width="20%">Data</th>
                      <th width="40%">Local</th>
                      <th width="5%">Exibir</th>
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