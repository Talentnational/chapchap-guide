<?php
// Fichier JSON à modifier
$fichier = 'services.json';

// Lire les services existants
$services = file_exists($fichier) ? json_decode(file_get_contents($fichier), true) : [];

// Récupérer les données envoyées en POST
$donnees = json_decode(file_get_contents("php://input"), true);

// Ajouter le nouveau service à la liste
$services[] = $donnees;

// Réécrire le fichier JSON avec le nouveau service
file_put_contents($fichier, json_encode($services, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

echo json_encode(["success" => true, "message" => "Service ajouté avec succès."]);
?>
