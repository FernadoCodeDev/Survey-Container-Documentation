<?php

require_once('../../config.php');
require_once __DIR__ . '/../../vendor/autoload.php';
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
$surveyId = $_GET['surveyId'] ?? null;
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
    if ($surveyId) {
        /*  
        View a single survey by placing ?surveyS=ID, 
        this is already done by Survey in Survey/survey.php 
        as well
        */
        $stmt = $pdo->prepare('SELECT id, text FROM question WHERE surveyId = :surveyId');
        $stmt->execute(['surveyId' => $surveyId]);
        $questions = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $metrics = [];
        foreach ($questions as $question) {

            $stmt = $pdo->prepare('
                SELECT content, COUNT(*) as count
                FROM response
                WHERE questionId = :questionId
                GROUP BY content
            ');

            $stmt->execute(['questionId' => $question['id']]);
            $responses = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $metrics[] = [

                'questionId' => $question['id'],
                'text' => $question['text'],
                'responses' => $responses

            ];
        }
        echo json_encode($metrics);
    } else {

        /* 
        View all database metrics 
        with their questions
        */

        $stmt = $pdo->query('SELECT id, qualification FROM survey');
        $surveys = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $result = [];

        foreach ($surveys as $survey) {
            $stmt = $pdo->prepare('SELECT id, text FROM question WHERE surveyId = :surveyId');
            $stmt->execute(['surveyId' => $survey['id']]);
            $questions = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $result[] = [

                'id' => $survey['id'],
                'qualification' => $survey['qualification'],
                'questions' => $questions

            ];
        }

        echo json_encode($result);
    }
} catch (PDOException $e) {

    http_response_code(500);
    echo json_encode(['error' => 'Error de base de datos: ' . $e->getMessage()]);
}
