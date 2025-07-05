// Remplace ici par tes vrais identifiants Supabase :
const SUPABASE_URL = "https://zsnoyvjzgdyhvuctwozz.supabase.co";
const SUPABASE_KEY = "COLLE_TON_ANON_KEY_ICI"; // Modifie ici !

const form = document.getElementById("form-service");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    categorie: form.categorie.value,
    nom: form.nom.value,
    region: form.region.value,
    ville: form.ville.value,
    quartier: form.quartier.value,
    adresse: form.adresse.value,
    description: form.description.value,
    images: form.images.value,
    status: "pending"
  };

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/chapchap-guide`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=representation"
      },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      alert("Service envoyé !");
      form.reset();
    } else {
      const err = await res.json();
      alert("Erreur : " + JSON.stringify(err));
    }
  } catch (err) {
    alert("Erreur réseau : " + err.message);
  }
});
