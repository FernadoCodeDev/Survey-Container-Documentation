<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
require_once __DIR__ . '/../../config.php';

$sql = "SELECT 
            r.id,
            r.surveyId,
            r.questionId,
            q.content AS questionText,
            r.answer
        FROM Response r
        JOIN Question q ON r.questionId = q.id";

$result = $db->query($sql);
$responses = [];

if ($result && $result->num_rows > 0) {

    while ($row = $result->fetch_assoc()) {

        $responses[] = [

            'id' => $row['id'],
            'surveyId' => $row['surveyId'],
            'questionId' => $row['questionId'],
            'questionText' => $row['questionText'],
            'answer' => $row['answer']

        ];
    }
}

echo json_encode($responses);
