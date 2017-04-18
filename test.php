<?php
	//$dirs = array_filter(glob('*'), 'is_dir');
	//var_dump( $dirs);
	$p = 'images/midias/';
	$a = glob($p.'*');
	foreach ($a as $key => $value) {
		echo '<p>';
		$ca = explode('/',$value);
		echo '<strong>'.$p.$ca[2].'</strong><br>';
		$paths = glob('images/midias/cgh_rio_Chupim'.'/*.jpeg');
		foreach ($paths as $key => $val) {
			echo ''.$val.'<br>';
		}
		echo 'Total Fotos: '.sizeof($paths);
		echo '</p>';
	}
	//$a = $paths = glob('*.php');
	//$a = $paths = glob('my/*/dir/*.php');
?>