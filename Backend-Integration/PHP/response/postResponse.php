
<?php

// CORS headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

/* 
    OPTIONS
        OPTIONS is an automatic preflight that the browser makes when you send a POST
        request with a Content-Type: application/json header to a server that is not on
        the exact same domain (even if it is localhost).
        It will be necessary to answer the surveys, otherwise the error 400 will 
        be displayed when trying to send the survey response.
    */

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/../../config.php';
$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['responses']) || !is_array($data['responses'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Se espera un arreglo de respuestas bajo la llave "responses".']);
    exit;
}

$stmt = $db->prepare("INSERT INTO Response (id, content, questionId) VALUES (?, ?, ?)");
$success = true;

foreach ($data['responses'] as $response) {

    $responseId = uniqid();
    $content = $response['content'] ?? '';
    $questionId = $response['questionId'] ?? '';

    if (!$content || !$questionId) {
        continue;
    }

    $stmt->bind_param("sss", $responseId, $content, $questionId);

    if (!$stmt->execute()) {
        $success = false;
        break;
    }
}
