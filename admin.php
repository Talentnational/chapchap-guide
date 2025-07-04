<?php
$jsonFile = 'services.json';

if (isset($_GET['action']) && isset($_GET['id'])) {
    $action = $_GET['action'];
    $id = $_GET['id'];

    if (file_exists($jsonFile)) {
        $jsonData = file_get_contents($jsonFile);
        $services = json_decode($jsonData, true);

        foreach ($services as &$service) {
            if ($service['id'] === $id) {
                if ($action === 'valider') {
                    $service['status'] = 'approved';
                } elseif ($action === 'rejeter') {
                    $service['status'] = 'rejected';
                }
                break;
            }
        }

        file_put_contents($jsonFile, json_encode($services, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    }

    // Redirection après action
    header("Location: admin.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Espace Admin - Validation des Services</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
      background: #f7f7f7;
    }
    h1 {
      text-align: center;
    }
    .card {
      background: white;
      padding: 15px;
      margin: 10px auto;
      border-radius: 8px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      max-width: 700px;
    }
    .card h2 {
      margin: 0;
    }
    .card p {
      margin: 5px 0;
    }
    .card img {
      max-width: 100px;
      border-radius: 5px;
      margin: 5px;
    }
    .buttons {
      margin-top: 10px;
    }
    .buttons a {
      text-decoration: none;
      padding: 8px 12px;
      margin-right: 10px;
      color: white;
      border-radius: 4px;
    }
    .valider {
      background-color: #28a745;
    }
    .rejeter {
      background-color: #dc3545;
    }
  </style>
</head>
<body>
  <h1>Services en attente de validation</h1>

  <?php
  if (file_exists($jsonFile)) {
      $jsonData = file_get_contents($jsonFile);
      $services = json_decode($jsonData, true);
      $servicesEnAttente = array_filter($services, fn($s) => $s['status'] === 'pending');

      if (empty($servicesEnAttente)) {
          echo "<p style='text-align:center;'>Aucun service en attente.</p>";
      } else {
          foreach ($servicesEnAttente as $service) {
              echo "<div class='card'>";
              echo "<h2>" . htmlspecialchars($service['nom']) . " (" . htmlspecialchars($service['categorie']) . ")</h2>";
              echo "<p><strong>Région :</strong> " . htmlspecialchars($service['region']) . "</p>";
              echo "<p><strong>Ville :</strong> " . htmlspecialchars($service['ville']) . "</p>";
              echo "<p><strong>Adresse :</strong> " . htmlspecialchars($service['adresse']) . "</p>";
              echo "<p><strong>Description :</strong> " . htmlspecialchars($service['description']) . "</p>";

              if (!empty($service['images'])) {
                  foreach ($service['images'] as $img) {
                      echo "<img src='" . htmlspecialchars($img) . "' alt='Image'>";
                  }
              }

              echo "<div class='buttons'>";
              echo "<a class='valider' href='?action=valider&id=" . urlencode($service['id']) . "'>Valider</a>";
              echo "<a class='rejeter' href='?action=rejeter&id=" . urlencode($service['id']) . "'>Rejeter</a>";
              echo "</div>";

              echo "</div>";
          }
      }
  } else {
      echo "<p>Le fichier services.json n'existe pas.</p>";
  }
  ?>
</body>
</html>
