import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  "https://zsnovjyzgdyhvuctwozz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
);

// Récupère le formulaire
document.getElementById("form-ajout").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const nom = form.nom.value;
  const categorie = form.categorie.value;
  const region = form.region.value;
  const ville = form.ville.value;
  const quartier = form.quartier.value;
  const adresse = form.adresse.value;
  const description = form.description.value;
  const imagesInput = form.images.files;

  if (!imagesInput.length) {
    alert("Veuillez sélectionner au moins une image.");
    return;
  }

  let uploadedImageURLs = [];

  for (let i = 0; i < imagesInput.length; i++) {
    const file = imagesInput[i];
    const filePath = `${Date.now()}_${file.name}`;

    const { data, error } = await supabase.storage
      .from("images")
      .upload(filePath, file);

    if (error) {
      console.error("Erreur upload image :", error.message);
      alert("Échec de l'upload de l'image.");
      return;
    }

    // Génère l’URL publique de l’image
    const imageURL = `${supabase.storage.from("images").getPublicUrl(filePath).data.publicUrl}`;
    uploadedImageURLs.push(imageURL);
  }

  // Ajoute le service à la table
  const { error: insertError } = await supabase.from("services").insert([
    {
      nom,
      categorie,
      region,
      ville,
      quartier,
      adresse,
      description,
      images: uploadedImageURLs,
      status: "pending",
    }
  ]);

  if (insertError) {
    console.error("Erreur enregistrement :", insertError.message);
    alert("Erreur lors de l’ajout du service.");
  } else {
    alert("Service ajouté avec succès !");
    form.reset();
  }
});
