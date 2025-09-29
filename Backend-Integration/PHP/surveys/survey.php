<?php
require_once __DIR__ . '/../../vendor/autoload.php';
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../../../');
$dotenv->load();

/*
Check PHP ini
echo json_encode(PDO::getAvailableDrivers());
exit;
*/

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
    $surveyId = $_GET['id'] ?? null;

    if (!$surveyId) {

        http_response_code(400);
        echo json_encode(['error' => 'Falta el parámetro "id".']);
        exit;
    }

    $stmt = $pdo->prepare("SELECT id, qualification FROM survey WHERE id = ?");
    $stmt->execute([$surveyId]);
    $survey = $stmt->fetch();

    if (!$survey) {

        http_response_code(404);
        echo json_encode(['error' => 'Encuesta no encontrada.']);
        exit;
    }

    $stmt = $pdo->prepare("SELECT id, text FROM question WHERE surveyId = ?");
    $stmt->execute([$surveyId]);
    $questions = $stmt->fetchAll();
    $survey['questions'] = $questions;
    echo json_encode($survey);
} catch (Exception $e) {

    http_response_code(500);
    echo json_encode(['error' => 'Error del servidor', 'details' => $e->getMessage()]);
}
