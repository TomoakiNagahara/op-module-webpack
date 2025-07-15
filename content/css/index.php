<?php
/**	op-module-webpack:/content/css/index.php
 *
 * @created    2023-01-22  op-skeleton-2020:/js/index.php
 * @moved      2025-04-16
 * @version    1.0
 * @package    op-module-webpack
 * @author     Tomoaki Nagahara <tomoaki.nagahara@gmail.com>
 * @copyright  Tomoaki Nagahara All right reserved.
 */

/**	namespace
 *
 */
namespace OP;

//	Get extension.
$extension = basename(__DIR__);

//	Set MIME from extension.
OP::MIME($extension);

//	Get Layout name.
$layout = OP::Request('layout') ?? OP::Unit()->Layout()->Name();

//	Set each layout default config.
if( $path   = OP::Path("asset:/layout/{$layout}/config.php") ){
	$config = include( $path );
	OP::Config($layout, $config);
}

//	Set directories.
OP::Unit()->WebPack()->Auto("asset:/layout/{$layout}/{$extension}/");
OP::Unit()->WebPack()->Auto('./');

//	Output codes.
OP::Unit()->WebPack()->Auto();
