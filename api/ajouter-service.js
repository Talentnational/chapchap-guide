// api/ajouter-service.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  const { categorie, nom, region, ville, quartier, adresse, description } = req.body;

  const supabaseUrl = 'https://zsnovjyzgdyhvuctwozz.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpzbm92anl6Z2R5aHZ1Y3R3b3p6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2NTczMTQsImV4cCI6MjA2NzIzMzMxNH0.r2QCyhhdZS5Ksmjh3is5bK8PAOH8LWEFMlzJV0IwaU4';

  const response = await fetch(`${supabaseUrl}/rest/v1/services`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`,
      'Prefer': 'return=representation'
    },
    body: JSON.stringify({
      categorie,
      nom,
      region,
      ville,
      quartier,
      adresse,
      description,
      status: 'pending',
      created_at: new Date().toISOString()
    })
  });

  const data = await response.json();

  if (response.ok) {
    return res.status(200).json({ message: 'Service ajouté avec succès', data });
  } else {
    return res.status(500).json({ message: 'Erreur lors de l’ajout', error: data });
  }
}
