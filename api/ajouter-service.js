import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const data = req.body;

      const filePath = path.join(process.cwd(), 'services.json');

      let services = [];
      if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath);
        services = JSON.parse(fileData);
      }

      services.push(data);

      fs.writeFileSync(filePath, JSON.stringify(services, null, 2));

      return res.status(200).json({ message: 'Service ajouté avec succès !' });
    } catch (error) {
      console.error('Erreur:', error);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
  } else {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }
}
