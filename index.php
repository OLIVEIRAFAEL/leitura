<?php
//include de arquivos
   include_once 'com/php/model/Config.php';
   include_once 'com/php/model/AutoLoad.php';
   include_once 'com/php/model/Sessao.php';
   
   $Config = new Config();
   $autoLoad = new AutoLoad(ROOT,'php');
   $Sessao = Sessao::getInstance();
   
   //autoload
   spl_autoload_register(array($autoLoad, 'loadCore'));
   spl_autoload_register(array($autoLoad, 'loadModel'));
   
   //classes
   Autenticar::isLogin();
   $DB      = new DataBase();
   $Funcoes = new Funcoes();
?>
 <?php
          //esquema para redirecionar o usuario para a pagina correta
          $page['url'] = '';
          $permissao = array('Obras', 'FotosObras', 'Andamento','Gerenciar', 'CadastrarFrota', 'Acesso', 'Cadastrar','RegistrarViagem');

          if(isset($_GET['p'])){
            $page['url'] = $_GET['p'];
            if(substr_count($page['url'], "/") > 0){
                $a = explode("/", $page['url']);
                //verificar se existe essa pagina     
                $page['var1'] = @$a[0]; #primeira variavel pelo link
                $page['page'] = in_array($a[1],$permissao) ? $a[1] : 'erro'; #segunda variavel
                $page['var2'] = @$a[2]; #terceira variavel pelo link
                $page['var3'] = @$a[3]; #quarta variavel pelo link
                $page['var4'] = @$a[4]; #quinta variavel pelo link
              }else{
                //nao faz nada
              }   
          }else{
            $page['page'] = 'principal';
          }

          //pastas
          switch (@$page['var1']) {

            case 'administracao':
              $diretorioPasta = "administracao";
              $caminho = "com/php/modules/administracao/view/";
              break;

            case 'clientes':
              $diretorioPasta = "clientes";
              $caminho = "com/php/modules/clientes/view/";
              break;

            case 'colaborador':
              $diretorioPasta = "colaborador";
              $caminho = "com/php/modules/colaborador/view/";
              break;

            case 'viagens':
              $diretorioPasta = "viagens";
              $caminho = "com/php/modules/viagens/view/";
              break;

            case 'frota':
              $diretorioPasta = "frota";
              $caminho = "com/php/modules/frota/view/";
              break;

            default:
              $caminho = "";
              break;
          }
?>
<!DOCTYPE html>
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
  <meta charset="utf-8">
  <meta name="description" content="">
  
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>ADM | <?php echo $Config->titleSite; ?></title>

  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
  <link rel="stylesheet" href="<?php echo $Config->url; ?>bootstrap/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css">
  <link rel="stylesheet" href="<?php echo $Config->url; ?>dist/css/AdminLTE.min.css">
  <link rel="stylesheet" href="<?php echo $Config->url; ?>dist/css/skins/_all-skins.min.css">
  <link rel="stylesheet" href="<?php echo $Config->url; ?>plugins/iCheck/flat/blue.css">
  <!--<link rel="stylesheet" href="<?php //echo $Config->url; ?>plugins/morris/morris.css">-->
  <link rel="stylesheet" href="<?php echo $Config->url; ?>plugins/jvectormap/jquery-jvectormap-1.2.2.css">
  <link rel="stylesheet" href="<?php echo $Config->url; ?>com/js/plugins/datatables/datatables.css">
  
  <link rel="stylesheet" href="<?php echo $Config->url; ?>plugins/datepicker/datepicker3.css">
  <link rel="stylesheet" href="<?php echo $Config->url; ?>plugins/daterangepicker/daterangepicker.css">
  <link rel="stylesheet" href="<?php echo $Config->url; ?>plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css">
  <link rel="stylesheet" href="<?php echo $Config->url; ?>com/js/plugins/select2/select2.css">
  <link rel="stylesheet" href="<?php echo $Config->url; ?>com/js/libs/css/ui-lightness/jquery-ui-1.9.2.custom.min.css">

<script src="<?php echo $Config->url; ?>plugins/jQuery/jquery-2.2.3.min.js"></script>
<script src="https://code.jquery.com/ui/1.11.4/jquery-ui.min.js"></script>
<script src="<?php echo $Config->url; ?>bootstrap/js/bootstrap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js"></script>
<!--<script src="<?php //echo $Config->url; ?>plugins/morris/morris.min.js"></script>-->
<script src="<?php echo $Config->url; ?>plugins/sparkline/jquery.sparkline.min.js"></script>
<script src="<?php echo $Config->url; ?>plugins/jvectormap/jquery-jvectormap-1.2.2.min.js"></script>
<script src="<?php echo $Config->url; ?>plugins/jvectormap/jquery-jvectormap-world-mill-en.js"></script>
<script src="<?php echo $Config->url; ?>plugins/knob/jquery.knob.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.11.2/moment.min.js"></script>
<script src="<?php echo $Config->url; ?>plugins/daterangepicker/daterangepicker.js"></script>
<script src="<?php echo $Config->url; ?>plugins/datepicker/bootstrap-datepicker.js"></script>
<script src="<?php echo $Config->url; ?>plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js"></script>
<script src="<?php echo $Config->url; ?>plugins/slimScroll/jquery.slimscroll.min.js"></script>
<script src="<?php echo $Config->url; ?>plugins/fastclick/fastclick.js"></script>
<script src="<?php echo $Config->url; ?>dist/js/app.min.js"></script>
<!--<script src="<?php //echo $Config->url; ?>dist/js/pages/dashboard.js"></script>-->
<script src="<?php echo $Config->url; ?>dist/js/demo.js"></script>

<script src="<?php echo $Config->url; ?>com/js/libs/jquery-ui-1.9.2.custom.min.js"></script>
<script src="<?php echo $Config->url; ?>com/js/plugins/howl/howl.js"></script>
<script src="<?php echo $Config->url; ?>com/js/plugins/select2/select2.js"></script>
<script src="<?php echo $Config->url; ?>com/js/libs/jquery.blockUI.js"></script>
<script src="<?php echo $Config->url; ?>com/js/plugins/datatables/jquery.dataTables.min.js"></script>
<script src="<?php echo $Config->url; ?>com/js/libs/jquery.form.js"></script>
<script src="<?php echo $Config->url; ?>com/js/plugins/modal/jquery-ui.js"></script>  
 <script src="<?php echo $Config->url; ?>com/js/libs/jquery.price.js"></script>
 <script src="<?php echo $Config->url; ?>com/js/libs/number.format.js"></script>
 <script src="<?php echo $Config->url; ?>com/js/plugins/datepicker/bootstrap-datepicker.js"></script>
 <script src="<?php echo $Config->url; ?>com/js/plugins/timepicker/bootstrap-timepicker.js"></script>
<script src="<?php echo $Config->url; ?>com/js/Index.js"></script>
<script src="<?php echo $Config->url; ?>com/js/App.js"></script>
<script src="<?php echo $Config->url; ?>com/js/Funcoes.js"></script>
<script src="<?php echo $Config->url; ?>com/js/mask.js"></script>
<div id="loadingShow" style="display:none;"> 
   <h1>Aguarde...</h1> 
</div>
<script type="text/javascript">
  $(function(){
    var myBlock = $('#loadingShow');
            $(document).on('ajaxStart', function(e) {
                $.blockUI({
                    message: $('#loadingShow'),
                    baseZ: 9999
                });
            });
            $(document).on('ajaxComplete', function() {
                $.unblockUI({
                    fadeOut: 200
                });
            });
         
      App.url = '<?php echo $Config->url; ?>';
      App.codSistemaEmpresa = '<?php echo $Sessao->get('site_cod_empresa'); ?>';
      Index.menuUsuario('<?php echo @$page["var1"]; ?>');
  });
</script>
</head>
<body class="hold-transition skin-purple sidebar-mini">
<div class="wrapper">

  <header class="main-header">
    <!-- Logo -->
    <a href="#" class="logo">
      <!-- mini logo for sidebar mini 50x50 pixels -->
      <span class="logo-mini"><b>A</b>D<b>M</b></span>
      <!-- logo for regular state and mobile devices -->
      <span class="logo-lg"><b>ADM |</b> <?php echo $Config->titleSite; ?></span>
    </a>
    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top">
      <!-- Sidebar toggle button-->
      <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
        <span class="sr-only">Toggle navigation</span>
      </a>

      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <li class="dropdown user user-menu">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <img src="<?php echo $Config->url; ?>img.php?txt=<?php echo $Sessao->get('site_nome');?>&w=160&h=160" class="user-image" alt="User Image">
              <span class="hidden-xs"><?php echo $Sessao->get('site_nome');?></span>
            </a>
            <ul class="dropdown-menu">
              <!-- User image -->
              <li class="user-header">
                <img src="<?php echo $Config->url; ?>img.php?txt=<?php echo $Sessao->get('site_nome');?>&w=160&h=160" class="img-circle" alt="User Image">

                <p>
                  <?php echo $Sessao->get('site_nome');?>
                  <small><?php echo $Sessao->get('site_email');?></small>
                </p>
              </li>
              <!-- Menu Body -->
              <!-- Menu Footer-->
              <li class="user-footer">
                <div class="pull-right">
                  <a href="<?php echo $Config->url; ?>sair.php" class="btn btn-default btn-flat">Sair</a>
                </div>
              </li>
            </ul>
          </li>
          <!-- Control Sidebar Toggle Button -->
          <!--<li>
            <a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
          </li>-->
        </ul>
      </div>
    </nav>
  </header>
  <!-- Left side column. contains the logo and sidebar -->
  <aside class="main-sidebar">
    <section class="sidebar" id="menu_principal">
      <div class="user-panel">
        <div class="pull-left image">
          <img src="<?php echo $Config->url; ?>img.php?txt=<?php echo $Sessao->get('site_nome');?>&w=160&h=160" class="img-circle" alt="User Image">
        </div>
        <div class="pull-left info">
          <p><?php echo $Sessao->get('site_nome');?></p>
          <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
        </div>
      </div>
        
    </section>
  </aside>

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
    </section>
      <?php include_once $caminho.$page['page'].'.php'; ?>
  </div>
  <!-- /.content-wrapper -->
  <footer class="main-footer">
    <div class="pull-right hidden-xs">
      <b>Version</b> 2.3.8
    </div>
    <p>&copy; <?php echo date("Y");?> ADM 1.0 Beta - Desenvolvido por <a target="_blank" href="http://partilhas.com.br"><b>Partilhas</b></a> </p>
  </footer>
  <!-- /.control-sidebar -->
  <!-- Add the sidebar's background. This div must be placed
       immediately after the control sidebar -->
  <div class="control-sidebar-bg"></div>
</div>
<!-- ./wrapper -->
</body>
</html>
