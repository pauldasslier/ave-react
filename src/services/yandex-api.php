<?php
$yandexApi = file_get_contents('https://yandex.com/time/sync.json?geo=213');
return $yandexApi;
?>