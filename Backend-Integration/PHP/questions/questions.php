<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

require_once __DIR__ . '/../../config.php';
$host = $_ENV['DB_HOST'];
$db = $_ENV['DB_NAME'];
$user = $_ENV['DB_USER'];
$pass = $_ENV['DB_PASS'];
$charset = $_ENV['DB_CHARSET'];

$sql = "SELECT id, content FROM Question";
$result = $db->query($sql);
$questions = [];

if ($result && $result->num_rows > 0) {

    while ($row = $result->fetch_assoc()) {

        $questions[] = [

            'id' => $row['id'],
            'content' => $row['content']

        ];
    }
}

echo json_encode($questions);
