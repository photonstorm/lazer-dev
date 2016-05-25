<?php
$data = file_get_contents('php://input');
$json_data = json_decode($data, true);
if ($json_data) {
    $file = fopen("perf_test_results.txt", "a");
    fwrite($file, "{\"user_agent\": \"" . $json_data["ua"] . "\",");
    fwrite($file, "\"vendor\": \"" . $json_data["vendor"] . "\",");
    fwrite($file, "\"platform\": \"" . $json_data["platform"] . "\",");
    fwrite($file, "\"OOP_Time\": \"" . $json_data["T1"]["time"] . "\",");
    fwrite($file, "\"OOP_AvgTime\": \"" . $json_data["T1"]["avgTime"] . "\",");
    fwrite($file, "\"OOP_AvgFPS\": \"" . $json_data["T1"]["avgFPS"] . "\",");
    fwrite($file, "\"DOD_Time\": \"" . $json_data["T2"]["time"] . "\",");
    fwrite($file, "\"DOD_AvgTime\": \"" . $json_data["T2"]["avgTime"] . "\",");
    fwrite($file, "\"DOD_AvgFPS\": \"" . $json_data["T2"]["avgFPS"] . "\"");
    fwrite($file, "}\n\0");
    fclose($file);
} else {
    echo "<img src='https://media.makeameme.org/created/dafuq-u-doin.jpg'/>";
}
?>