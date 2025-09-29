<?php
// Creating surveys 
/*
template for testing the API
{
  "qualification": "survey name",
  "questions": [
    { "text": "ask" },
    { "text": "ask" }
  ]
}
*/

require_once __DIR__ . '/../../vendor/autoload.php';
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../../../');
$dotenv->load();
$host = $_ENV['DB_HOST'];
$db = $_ENV['DB_NAME'];
$user = $_ENV['DB_USER'];
$pass = $_ENV['DB_PASS'];
$charset = $_ENV['DB_CHARSET'];
$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input || !isset($input['qualification']) || !isset($input['questions'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Datos inválidos. Se requiere "qualification" y "questions".']);
        exit;
    }

    $pdo->beginTransaction();
    // id 
    $surveyId = uniqid();
    $stmt = $pdo->prepare("INSERT INTO survey (id, qualification) VALUES (?, ?)");
    $stmt->execute([$surveyId, $input['qualification']]);
    $stmt = $pdo->prepare("INSERT INTO question (id, surveyId, text) VALUES (?, ?, ?)");
    foreach ($input['questions'] as $question) {

        if (!isset($question['text'])) continue;
        $questionId = uniqid();
        $stmt->execute([$questionId, $surveyId, $question['text']]);

    }

    $pdo->commit();

    echo json_encode(['message' => 'Encuesta creada exitosamente', 'survey_id' => $surveyId]);

} catch (Exception $e) {

    if ($pdo->inTransaction()) $pdo->rollBack();
    http_response_code(500);
    echo json_encode(['error' => 'Error al crear la encuesta', 'details' => $e->getMessage()]);
    
}
