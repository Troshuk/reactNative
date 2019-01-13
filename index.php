<?php
try{
	$response = "";
	$content = file_get_contents('php://input');
	$decoded = json_decode($content,true);
	if(!is_array($decoded)){
	    throw new Exception('Received content contained invalid JSON!');
	}
	if(!isset($decoded) || empty($decoded['firstName'])){
	    throw new Exception('Invalid First Name');
	}
	if(!isset($decoded) || empty($decoded['lastName'])){
	    throw new Exception('Invalid Last Name');
	}
	$firstName = $decoded['firstName'];
	$lastName = $decoded['lastName'];
	$DB = new mysqli('localhost', 'root', '', 'DB');
	$sql = "INSERT INTO users (firstName, lastName)
	VALUES ('$firstName','$lastName')";
	if ($DB->query($sql) === TRUE) {
		$result =  $DB->query('SELECT * FROM users WHERE id = ' . mysqli_insert_id($DB));
		$user = $result->fetch_assoc();
		$response = "User " . $user['firstName'] . " " . $user['lastName'] . " added.";
	} else {
	    throw new Exception("Error: " . $DB->error);
	}
	echo json_encode(['code' => 200, 'response' => $response]);
} catch (Exception $e) {
	echo json_encode(['code' => 400, 'response' => $e->getMessage()]);
}
?>