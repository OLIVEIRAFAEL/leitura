<?php

class Menu {
 
    public static function loadMenu($cod_pai, $arrayMenu, $arrayAcesso, $acessoGrupo,$nav,$pagina){

      $DB = new DataBase();
      $Config = new Config();
      
      // calcula o número de índices do array
		$menuSize = count( $arrayMenu );
	 
		echo '<ul class="'.$nav.'">';

		//echo '<li class="header">MENU DE NAVEGAÇÃO</li>';
		for ( $i = 1; $i <= $menuSize; $i++ )
		{	
			//verifica se possui acessos para ver o menu
			if(in_array($arrayMenu[$i]['cod_menu'], $arrayAcesso) || $acessoGrupo === '1' || $arrayMenu[$i]['acesso_geral'] == 'S'){
				if ( $arrayMenu[$i]['cod_pai'] == $cod_pai )
				{	
					$pagina .= "#".$pagina;
					$active = $arrayMenu[$i]['controle'] > 0 ? " treeview  " : '';
					$active .= $pagina ===  $arrayMenu[$i]['link'] ? " active treeview " : '';	
					//$linkDrop = $arrayMenu[$i]['controle'] > 0 ? ' class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown"' : '';			
					$setaSub = $arrayMenu[$i]['controle'] > 0 ? ' <span class="caret"></span>' : '';

					echo '<li class="'.$active.'" >';					
					echo '<a href="'.$Config->url.$arrayMenu[$i]['link'].'">';
					//echo '<a href="'.$Config->url.$arrayMenu[$i]['link'].'" '.$linkDrop.'>';
					echo '<i class="'.$arrayMenu[$i]['icone'].' '.$arrayMenu[$i]['cor_btn'].'"><b class=""></b></i><span> ';
					echo $arrayMenu[$i]['descricao'];
					echo $setaSub;
					echo '</span></a>';
		 		
					// busca as subcategorias da categoria atual
					if($arrayMenu[$i]['controle'] > 0){						
						self::loadMenu($arrayMenu[$i]['cod_menu'], $arrayMenu,$arrayAcesso,$acessoGrupo,"treeview-menu",'', 2);
		 			}
					echo "</li>";
				}
			}
		}
		echo "</ul>";
    }
}