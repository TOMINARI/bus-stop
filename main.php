<?php

//あきらめないボタンを押したときの処理
if(isset($_REQUEST['akiramenai'])) {
	$fp = fopen("data/wait_req.csv", "r+");
	$count = 0;
	while ($row = fgets($fp, 1024)) {
		$count = $row + 1;
		var_dump($count);
	}
	fclose($fp);
	$fp = fopen("data/wait_req.csv", "w");
	fwrite($fp, $count);
	fclose($fp);

// 	$data = array();
// 	while ($row = fgetcsv($fp, 1000, ",") !== false) {
// 			$data[$row[0]] = $row;
// 	}
// 	var_dump($data);
	//mb_internal_encoding("utf8");
// 	$count = file_get_contents("data/wait_req.csv");
// 	$count++;
// 	file_put_contents("data/wait_req.csv", $count);

// 	$stop_name = $_REQUEST['stop_name'];
// 	$data[$stop_name]++;

// 	foreach ($data as $row) {
// 		fputcsv($fp, $row);
// 	}

// 	fclose($fp);
}