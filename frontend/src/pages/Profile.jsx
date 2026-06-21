import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../lib/api';
import { ExternalLink } from 'lucide-react';

export default function Profile() {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfileData();
  }, [username]);

  const loadProfileData = async () => {
    try {
      const [profileRes, linksRes] = await Promise.all([
        api.get(`/profile/${username}`),
        api.get(`/links/profile/${username}`)
      ]);
      
      setProfile(profileRes.data);
      setLinks(linksRes.data || []);
    } catch (error) {
      console.error('Erro ao carregar perfil:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Carregando...</div>;
  }

  if (!profile) {
    return <div className="text-center py-12">Perfil não encontrado</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Profile Header */}
        <div className="text-center mb-12">
          {profile.avatar_url && (
            <img
              src={profile.avatar_url}
              alt={profile.username}
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
            />
          )}
          <h1 className="text-4xl font-bold mb-2">@{profile.username}</h1>
          <p className="text-gray-600 text-lg">{profile.bio || 'Sem bio'}</p>
        </div>

        {/* Links */}
        <div className="space-y-3">
          {links.length === 0 ? (
            <p className="text-center text-gray-500">Nenhum link disponível</p>
          ) : (
            links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 rounded-lg transition hover:shadow-lg"
                style={{
                  backgroundColor: link.color,
                  opacity: 0.9
                }}
              >
                <div className="flex items-center justify-between text-white">
                  <span className="font-semibold">{link.title}</span>
                  <ExternalLink size={18} />
                </div>
              </a>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500">
          <p>Criado com VOID</p>
        </div>
      </div>
    </div>
  );
}
