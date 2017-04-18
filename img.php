<?php

$width = $_GET['w'];
$height = $_GET['h'];
$im = ImageCreate($width, $height);
$bg = ImageColorAllocate($im, rand(0,155), rand(0,155), rand(0,155));
$textcolor = ImageColorAllocate($im, rand(155,255), rand(155,255), rand(155,255));
ImageRectangle($im, 0, 0, $width - 1, $height - 1, $bg);
$text = '';
$v = explode(" ", $_GET['txt']);
 if(sizeof($v)>1){
 	$text = substr($v[0],0,1).substr($v[1],0,1);
 }else{
 	$text = substr($v[0],0,1).substr($v[0],1,1);
 }
$font = 30;
$font_width = ImageFontWidth($font);
$font_height = ImageFontHeight($font);

$image_width = imagesx($im);  
$image_height = imagesy($im);

$text_width = $font_width * strlen($text);
$position_center = ceil(($width - $text_width) / 2);
$text_height = $font_height;
$position_middle = ceil(($height - $text_height) / 2);

$fonts = './css/fonts/bariol_regular-webfont.ttf';

$bbox = imagettftext($im, 75, 0, 23, 118, $textcolor, $fonts, strtoupper($text));

//$bbox = imagettfbbox(85, 0, $fonts, $text);
//$center1 = (imagesx($im) / 2) - (($bbox[2] - $bbox[0]) / 2);

//$image_string = ImageString($im, $font, $position_center, $position_middle, $text, $textcolor);
header("Content-type: image/png");
ImagePNG($im);
?>