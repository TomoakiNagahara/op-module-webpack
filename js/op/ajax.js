/**
 * app-skeleton-webpack:/js/op/ajax.js
 *
 * @creation  2018-09-18
 * @version   1.0
 * @package   app-skeleton-webpack
 * @author    Tomoaki Nagahara <tomoaki.nagahara@gmail.com>
 * @copyright Tomoaki Nagahara All right reserved.
 */
//	...
if(!$OP.Ajax ){
	$OP.Ajax = {};
};

//	...
(function(){
	/** Get method.
	 *
	 * @param   string    URL
	 * @param   object    POST or GET data
	 * @param   function  Successful
	 * @param   function  failed
	 * @return  XMLHttpRequest
	 */
	$OP.Ajax.Get = function(url, data, __success, __failure){
		//	...
		if( data ){
			url += '?' + _convert_url_query(data);
		};
		return _ajax('get', url, null, __success, __failure);
	};

	/** Post method.
	 *
	 * @param   string    URL
	 * @param   object    POST or GET data
	 * @param   function  Successful
	 * @param   function  failed
	 * @return  XMLHttpRequest
	 */
	$OP.Ajax.Post = function(url, data, __success, __failure){
		return _ajax('post', url, data, __success, __failure);
	};

	/** POST data is JSON.
	 *
	 * @param   string    URL
	 * @param   object    POST or GET data
	 * @param   function  Successful
	 * @param   function  failed
	 * @return  XMLHttpRequest
	 */
	$OP.Ajax.Json = function(url, data, __success, __failure){
		return _ajax('json', url, data, __success, __failure);
	};

	/** POST data is XML.
	 *
	 * @param   string    URL
	 * @param   object    POST or GET data
	 * @param   function  Successful
	 * @param   function  failed
	 * @return  XMLHttpRequest
	 */
	$OP.Ajax.Xml = function(url, data, __success, __failure){
		return _ajax('xml', url, data, __success, __failure);
	};

	//	...
	function _ajax(method, url, data, __success, __failure){
		//	...
		if(!url ){
			console.error("URL is empty.");
			return;
		}

		//	Check --> app:/
		if( url.match(/\w+:\/[^\/]?/) ){
			url = $OP.URL(url);
		};

		//	...
		var xhr = new XMLHttpRequest();
		if(!xhr){
			console.error("XMLHttpRequest was failed.");
			return;
		};

		//	...
		xhr.onreadystatechange = function(){
			/**
			 * 0 = uninitialized
			 * 1 = loading
			 * 2 = loaded
			 * 3 = interactive
			 * 4 = complete
			 */
			var state  = this.readyState;

			/**
			 * 200	OK
			 * 401	Unauthorized
			 * 403	Forbidden
			 * 404	Not Found
			 * 500	Internal Server Error
			 */
			var status = this.status;

			//	...
			if( state === 4 ){
				if( status === 200 ){
					var type = xhr.getResponseHeader('content-type');
					var text = this.responseText;

					//	...
					if( type.substr(0, 9) === 'text/json' ){
						//	...
						var json = text = JSON.parse(text);

						//	...
						if( (json.errors && json.errors.length) ||
							(json.notice && json.notice.length) ){
							console.error('Error', url);
						};

						//	...
						if( json.errors ){
							for(var i=0; i<json.errors.length; i++){
								console.error(json.errors[i]);
							}
						}

						//	...
						if( json.notice ){
							for(var i=0; i<json.notice.length; i++){
								console.info(json.notice[i]);
							}
						}
					}

					//	...
					if( __success ){
						__success(text);
					}
				}else{
					//	...
					if( __failure ){
						__failure(status);
					}
				}
			}
		};

		//	For debug.
		console.log(url);

		//	method, url, async, user-name, password
		xhr.open(method, url, true, null, null);

		//	...
		var body = null;

		//	...
		switch( method ){
			case 'get':
				break;

			case 'post':
				body = _convert_url_query(data);
				xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
				break;

			case 'json':
				xhr.setRequestHeader('Content-Type','application/json');
				body = JSON.stringify(data);
				break;

			case 'xml':
				break;
		};

		//	...
		if( body ){
			_check_post_url(url);
		};

		//	...
		xhr.send(body);
//		xhr.abort();

		//	...
		return xhr;
	};

	/** Generate URL Query.
	 *
	 * <pre>
	 * {"A":1, "B":2} --> A=1&B=2
	 * </pre>
	 *
	 * @param   object
	 * @return  string
	 */
	function _convert_url_query(data){
		var join = [];
		for(var key in data){
			var val =  data[key];
				key =  encodeURIComponent(key);
			switch( typeof val ){
				case 'string':
					val = encodeURIComponent(val);
					break;

				case 'object':
					for(var tmp in val){
						tmp = encodeURIComponent(tmp);

						//	...
						join.push(key+'['+tmp+']' +'='+ encodeURIComponent(val[tmp]));
					}
					continue;

				default:
			}

			//	...
			join.push(key +'='+ val);
		}

		/**
		 * Escape otherwise this: A-Z, a-z, 0-9, *, -, ., _
		 *
		 * " " --> %20
		 * "+" --> %2b
		 *
		 * @see https://url.spec.whatwg.org/#concept-urlencoded-byte-serializer
		 */
		return join.join('&')/*.replace( /%20/g, '+' )*/;
	}

	/** If the URL refers to a directory, a slash is required at the end.
	 *  That's because, 301 Moved error is returned.
	 *  If automatically recaptured, it is not POST method. It is GET method.
	 *  The POST value is discarded.
	 *
	 *  @param string url
	 */
	function _check_post_url(url){
		//	Remove URL Query.
		var pos = url.indexOf('?');
		if( pos > 0 ){
			url = url.substring(0, pos);
		};

		//	In case of SmartURL.
		if( url[url.length-1] === '/' ){
			//	OK
			return;
		};

		//	When accessing files directly.
		var pos = url.lastIndexOf('.');
		if( pos > 0 ){
			//	...
			var ext = url.substring(pos+1);

			//	...
			switch( ext ){
			case 'php':
			case 'json':
			case 'xml':
			case 'txt':
				//	OK
				return;
			default:
				console.error(`This extension is not supported. (${ext})`);
				return;
			};
		};

		//	Warning statement.
		console.error(`If the URL refers to a directory, add a slash at the end. (${url})`);
	};
})();
