<?php
//pasta -- nome da pagina
Autenticar::isAcessoPag($page['var1'],$page['page']) ? null : header("Location: ".$Config->url);
?>
<script src="<?php echo $Config->url; ?>com/js/paginas/obras/FotosObras.js"></script>
<script type="text/javascript">
  $(function (){
    FotosObras.init();
  });
</script>
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        Cadastrar Fotos de Obras
        <small>Painel para cadastro de Fotos de Obras</small>
      </h1>
    </section>

    <!-- Main content -->
    <section class="content">

      
      <div class="box box-default">
        <div class="box-header with-border">
          <h3 class="box-title">Cadastrar Fotos Obras</h3>

          <div class="box-tools pull-right">
            <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
            <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-remove"></i></button>
          </div>
        </div>
        <!-- /.box-header -->
        <div class="box-body">
            <div class="row">
              <div class="col-md-8">
                <div class="form-group">
                  <label>Obras</label>
                <select id="sl_obras" name="sl_obras" class="select2" data-placeholder="Selecione uma Obra" style="width: 100%;">
                </select>
                </div>
                <!-- /.form-group -->
              </div>
            </div>
            <div class="row">
              <?php if(Autenticar::isAcesso('21002')){ ?>
              <div class="col-md-2">
                <div class="form-group">
                  <label style="color: white;">.</label>
                  <button id="btn_alb_obr" type="submit"  class="form-control btn btn-primary">Album <i class="fa fa-random"></i> Obras</button>
                </div>
              </div>
              <?php } ?>
              <div class="col-md-2">
                <div class="form-group">
                  <label style="color: white;">.</label>
                  <button type="submit" class="form-control btn btn-success">Adiconar Imagem</button>
                </div>
              </div>
            </div>
          <!-- /.row -->
        </div>
        <!-- /.box-body -->
      </div>

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
                      <th width="10%">Código</th>
                      <th width="30%">Obra</th>
                      <th width="30%">Album</th>
                      <th width="10%">Ativo</th>
                      <th width="10%">Fotos</th>
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
    </section>
    <!-- /.content -->

<div id="myModal" class="modal fade" role="dialog" data-backdrop="static">
    <div class="modal-dialog modal-lg">
    <input id="val_obra" name="val_obra" type="hidden" value="">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close closemd" data-dismiss="modal">&times;</button>
                <h4 class="modal-title" id="titleModal"></h4>
            </div>
            <div class="modal-body" id="loadSecton">
              <div class="box box-success">
              <div class="box-body">
                <!-- Minimal style -->
                  <table id="tabela_folder" width="100%" class="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th width="10%">Código</th>
                        <th width="30%">Album</th>
                        <th width="10%">Nº Fotos</th>
                        <th width="10%">Fotos</th>
                        <th width="10%">Ativar</th>
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
            </div>
            <div class="modal-footer" style="display: none;">
                <button type="button" class="btn btn-default closemd" data-dismiss="modal">Sair</button>
            </div>
        </div>
    </div>
</div>


<div id="myModal_2" class="modal fade" role="dialog" >
    <div class="modal-dialog modal-lg">
    <input id="val_obra" name="val_obra" type="hidden" value="">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close closemd" data-dismiss="modal">&times;</button>
                <h4 class="modal-title" id="titleModal">Album <i class="fa fa-random"></i> Obras</h4>
            </div>
            <div class="modal-body" id="loadSecton">
                <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
                  <ol class="carousel-indicators" id="div_indicador">
                    <li data-target="#carousel-demo" data-slide-to="0" class="active"></li>
                    <li data-target="#carousel-demo" data-slide-to="1"></li>
                    <li data-target="#carousel-demo" data-slide-to="2"></li>
                  </ol>
                  <div class="carousel-inner" id="div_carousel">
                  </div>
                </div>
                <a class="left carousel-control" href="#carousel-demo" data-slide="prev">
                  <span class="glyphicon glyphicon-chevron-left"></span>
                </a>
                <a class="right carousel-control" href="#carousel-example-generic" data-slide="next">
                  <span class="glyphicon glyphicon-chevron-right"></span>
                </a>    
            </div>
            <div class="modal-footer" style="display: none;">
                <button type="button" class="btn btn-default closemd" data-dismiss="modal">Sair</button>
            </div>
        </div>
    </div>
</div>