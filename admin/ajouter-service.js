export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: "Méthode non autorisée" });
  }

  const {
    categorie,
    nom,
    region,
    ville,
    quartier,
    adresse,
    description,
    images,
  } = req.body;

  const SUPABASE_URL = "https://zsnovjyzgdyhvuctwozz.supabase.co";
  const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
  const table = "services";

  const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      "apikey": SUPABASE_KEY,
      "Authorization": `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      "Prefer": "return=representation"
    },
    body: JSON.stringify({
      categorie,
      nom,
      region,
      ville,
      quartier,
      adresse,
      description,
      images,
      status: "pending",
      created_at: new Date().toISOString()
    })
  });

  const data = await response.json();

  if (response.ok) {
    res.status(200).json({ message: "Service ajouté", data });
  } else {
    res.status(500).json({ message: "Erreur ajout", error: data });
  }
}
