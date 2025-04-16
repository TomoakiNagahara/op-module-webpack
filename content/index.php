<?php
/**	op-module-webpack:/content/index.php
 *
 * @created    2025-04-16
 * @version    1.0
 * @package    op-module-webpack
 * @author     Tomoaki Nagahara <tomoaki.nagahara@gmail.com>
 * @copyright  Tomoaki Nagahara All right reserved.
 */

/**	namespace
 *
 */
namespace OP;

//	Does not match defined directory.
OP()->Env()->MIME('text/plain');

//	Error message.
echo 'Has not specified extension.';
