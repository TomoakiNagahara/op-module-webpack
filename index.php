<?php
/**
 * app-skeleton-webpack:/index.php
 *
 * @creation  2018-04-12
 * @version   1.0
 * @package   app-skeleton-webpack
 * @author    Tomoaki Nagahara <tomoaki.nagahara@gmail.com>
 * @copyright Tomoaki Nagahara All right reserved.
 */

/** namespace
 *
 * @creation  2019-02-25
 */
namespace OP;

/* @var $app \OP\UNIT\App */

//	Get extension from smart url.
if(!$ext = $app->Args()[0] ?? null ){
	return;
}

//	Get layout name.
$layout = UNIT\App::Layout();

//	Generate MIME.
switch( $ext ){
	case 'js':
		$mime = 'text/javascript';
		break;
	case 'css':
		$mime = 'text/css';
		break;
	default:
};

//	Change MIME.
Env::Mime($mime);

//	Disable layout.
$app->Layout(false);

/* @var $webpack \OP\UNIT\WebPack */
if( $webpack = $app->Unit('WebPack') ){

	//	Output packing string.
	$webpack->Out($ext);
};

//	...
if( Env::isAdmin() ){
	//	...
	$datetime = date(_OP_DATE_TIME_);

	//	...
	switch( $ext ){
		case 'js':
			echo "console.log('WebPack was successful. {$datetime}, {$layout}')\n";
			break;
		case 'css':
			echo "/* WebPack was successful. {$datetime}, {$layout}') */\n";
			break;
		default:
	};
}
