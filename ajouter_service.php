<?php
header('Content-Type: application/json');

// Répertoire où stocker les images
$uploadDir = 'images/';
$allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg', 'jfif'];

// Lire les anciennes données JSON
$services = [];
$jsonFile = 'services.json';
if (file_exists($jsonFile)) {
    $jsonData = file_get_contents($jsonFile);
    $services = json_decode($jsonData, true);
}

// Récupération des données du formulaire
$categorie = $_POST['categorie'] ?? '';
$nom = $_POST['nom'] ?? '';
$region = $_POST['region'] ?? '';
$ville = $_POST['ville'] ?? '';
$quartier = $_POST['quartier'] ?? '';
$adresse = $_POST['adresse'] ?? '';
$description = $_POST['description'] ?? '';

// Gérer l’upload des images
$imagePaths = [];
if (!empty($_FILES['images'])) {
    foreach ($_FILES['images']['name'] as $index => $imageName) {
        $tmpName = $_FILES['images']['tmp_name'][$index];
        $extension = strtolower(pathinfo($imageName, PATHINFO_EXTENSION));

        if (in_array($extension, $allowedExtensions)) {
            $uniqueName = uniqid('img_') . '.' . $extension;
            $destination = $uploadDir . $uniqueName;

            if (move_uploaded_file($tmpName, $destination)) {
                $imagePaths[] = $destination;
            }
        }
    }
}

// Créer le nouvel élément
$newService = [
    "id" => uniqid(), // identifiant unique
    "categorie" => $categorie,
    "nom" => $nom,
    "region" => $region,
    "ville" => $ville,
    "quartier" => $quartier,
    "adresse" => $adresse,
    "description" => $description,
    "images" => $imagePaths,
    "status" => "pending",
    "date" => date("Y-m-d H:i:s")
];

// Ajouter le nouveau service à la liste
$services[] = $newService;

// Sauvegarder dans services.json
if (file_put_contents($jsonFile, json_encode($services, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE))) {
    echo json_encode(["success" => true, "message" => "Service enregistré en attente de validation."]);
} else {
    echo json_encode(["success" => false, "message" => "Erreur lors de l'enregistrement."]);
}
exit();
?>
