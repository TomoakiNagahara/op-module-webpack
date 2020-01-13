onepiece-framework JavaScript library
===

## D

```js
D(true);
```

## URL

 Correspond to g11n. This is not an FQDN. Return document root path.

```js
var url = $OP.URL('app:/');
```

 If CDN is set. If not set, it is identical to `$OP.URL()`.

```js
var cdn = $OP.CDN('cdn:/');
```

## Ajax

### GET

```js
//  Submit URL.
var url  = <?= $app->URL('app:/api/') ?>

//  GET Query.
var data = {};
    data.test = true;

//  Do Ajax.
$OP.Ajax.Get(url, data, function(result){
  //  Success
  D(result);
}, function(status){
  //  Failure
  D(status);
});
```

### POST

```js
//  Submit URL.
var url  = <?= $app->URL('app:/api/') ?>

//  POST value.
var data = {};
    data.test = true;

//  Do Ajax.
$OP.Ajax.Post(url, data, function(result){
  //  Success
  D(result);
}, function(status){
  //  Failure
  D(status);
});
```

### POST JSON FORMAT

```js
//  Submit URL.
var url  = <?= $app->URL('app:/api/') ?>

//  Json.
var json = {};
    json.value = true;

//  Do Ajax.
$OP.Ajax.Post(url, json, function(result){
  //  Success
  D(result);
}, function(status){
  //  Failure
  D(status);
});
```

### POST XML FORMAT

```js
//  Submit URL.
var url  = <?= $app->URL('app:/api/') ?>

//  XML.
var XML = '...';

//  Do Ajax.
$OP.Ajax.Post(url, xml, function(result){
  //  Success
  D(result);
}, function(status){
  //  Failure
  D(status);
});
```
