<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Lire les données du formulaire
    $categorie = $_POST['categorie'];
    $nom = $_POST['nom'];
    $region = $_POST['region'];
    $ville = $_POST['ville'];
    $quartier = $_POST['quartier'];
    $adresse = $_POST['adresse'];
    $description = $_POST['description'];

    // Traitement des images
    $images = [];
    $upload_directory = 'images/';
    $allowed_extensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg'];

    foreach ($_FILES['images']['tmp_name'] as $index => $tmp_name) {
        $original_name = basename($_FILES['images']['name'][$index]);
        $extension = strtolower(pathinfo($original_name, PATHINFO_EXTENSION));

        if (in_array($extension, $allowed_extensions)) {
            $unique_name = uniqid() . '.' . $extension;
            $destination = $upload_directory . $unique_name;

            if (move_uploaded_file($tmp_name, $destination)) {
                $images[] = $destination;
            }
        }
    }

    // Créer un nouvel objet service
    $nouveau_service = [
        "id" => strtolower(preg_replace('/\s+/', '_', $nom)),
        "categorie" => $categorie,
        "nom" => $nom,
        "region" => $region,
        "ville" => $ville,
        "quartier" => $quartier,
        "adresse" => $adresse,
        "description" => $description,
        "images" => $images
    ];

    // Charger les anciens services
    $services_file = 'services.json';
    $services = [];

    if (file_exists($services_file)) {
        $json_content = file_get_contents($services_file);
        $services = json_decode($json_content, true);
    }

    // Ajouter le nouveau service
    $services[] = $nouveau_service;

    // Enregistrer dans le fichier JSON
    file_put_contents($services_file, json_encode($services, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

    // Redirection ou message
    echo "Service ajouté avec succès !";
}
?>
