import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://zsnovjyzgdyhvuctwozz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpzbm92anl6Z2R5aHZ1Y3R3b3p6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2NTczMTQsImV4cCI6MjA2NzIzMzMxNH0.r2QCyhhdZS5Ksmjh3is5bK8PAOH8LWEFMlzJV0IwaU4'
);

export async function POST(req) {
  const formData = await req.formData();
  const image = formData.get('image');

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('services')
    .upload(`images/${Date.now()}_${image.name}`, image, {
      cacheControl: '3600',
      upsert: false,
    });

  if (uploadError) {
    return new Response(JSON.stringify({ error: 'Erreur upload image' }), { status: 500 });
  }

  const imageUrl = `https://zsnovjyzgdyhvuctwozz.supabase.co/storage/v1/object/public/services/${uploadData.path}`;

  const { error } = await supabase.from('services').insert([
    {
      categorie: formData.get('categorie'),
      nom: formData.get('nom'),
      region: formData.get('region'),
      ville: formData.get('ville'),
      quartier: formData.get('quartier'),
      adresse: formData.get('adresse'),
      description: formData.get('description'),
      images: [imageUrl],
      status: 'valide',
    },
  ]);

  if (error) {
    return new Response(JSON.stringify({ error: 'Erreur enregistrement base' }), { status: 500 });
  }

  return new Response(JSON.stringify({ message: 'OK' }), { status: 200 });
}
