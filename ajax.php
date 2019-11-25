<?php
header('Content-Type: text/html; charset=utf-8');
define('MODX_API_MODE', true);
require 'index.php';
$pdo = $modx->getService('pdoTools');
// Откликаться будет ТОЛЬКО на ajax запросы
if (empty($_SERVER['HTTP_X_REQUESTED_WITH']) || $_SERVER['HTTP_X_REQUESTED_WITH'] != 'XMLHttpRequest') {
    die('error');
}
// Сниппет будет обрабатывать не один вид запросов, поэтому работать будем по запрашиваемому действию
// Если в массиве POST нет действия - выход
if (!empty($_REQUEST['action'])) {
    switch ($_REQUEST['action']) {
        case 'getDependedOptions':
            $res = $pdo->runSnippet('@FILE:snippets/getDependedOptions.php',[
                'option' => $_REQUEST['val'],
                'type' => $_REQUEST['type']
            ]);
        break;
        case 'getViewsService':
            $res = $pdo->runSnippet('@FILE:snippets/getViewsService.php',[
                'option' => $_REQUEST['val'],
                'page' => $_REQUEST['page']
            ]);
        break;
        /*case 'getAjaxOptions':
            $html = $pdo->getChunk('@FILE:chunks_new/services/calculator/calculator.ajax.options.tpl',[
                 'parent' => $_POST['parent']
            ]);
            if ($TV = $modx->getObject('modTemplateVarResource',[
                'contentid' => $_POST['parent'],
                'tmplvarid' => 69
            ])){
               $url = $modx->makeUrl($TV->get('value'));
            } else {
                $url = $modx->makeUrl($_POST['parent']);
            }
            $res['html'] = $html;
            $res['url'] = $url;
            $res['status'] = 'success';
            break;*/
    }
} else {
    die('error');
}
if (!empty($res)) {
    $res = $modx->toJSON($res);
    die($res);
}