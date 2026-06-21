import { useState, useEffect } from 'react';
import { useAuth } from '../lib/auth';
import api from '../lib/api';
import { Plus, Trash2, Edit2, Copy, ExternalLink } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const [links, setLinks] = useState([]);
  const [profile, setProfile] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    icon: '',
    color: '#000000'
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [profileRes, linksRes] = await Promise.all([
        api.get('/profile'),
        api.get('/links')
      ]);
      
      setProfile(profileRes.data);
      setLinks(linksRes.data || []);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingId) {
        const response = await api.put(`/links/${editingId}`, formData);
        setLinks(links.map(l => l.id === editingId ? response.data : l));
      } else {
        const response = await api.post('/links', formData);
        setLinks([...links, response.data]);
      }
      
      setFormData({ title: '', url: '', icon: '', color: '#000000' });
      setEditingId(null);
      setShowForm(false);
    } catch (error) {
      alert('Erro ao salvar link');
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Tem certeza que deseja deletar este link?')) {
      try {
        await api.delete(`/links/${id}`);
        setLinks(links.filter(l => l.id !== id));
      } catch (error) {
        alert('Erro ao deletar link');
      }
    }
  };

  const handleEdit = (link) => {
    setEditingId(link.id);
    setFormData({
      title: link.title,
      url: link.url,
      icon: link.icon || '',
      color: link.color || '#000000'
    });
    setShowForm(true);
  };

  const profileUrl = `${window.location.origin}/${user?.username}`;

  if (loading) {
    return <div className="text-center py-12">Carregando...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Profile Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{profile?.username}</h1>
            <p className="text-gray-600 mb-4">{profile?.bio || 'Sem bio ainda'}</p>
            <div className="flex items-center gap-2">
              <span className="text-gray-700">{profileUrl}</span>
              <button
                onClick={() => navigator.clipboard.writeText(profileUrl)}
                className="text-purple-600 hover:text-purple-800"
              >
                <Copy size={18} />
              </button>
              <a
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:text-purple-800"
              >
                <ExternalLink size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Links Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Meus Links</h2>
          <button
            onClick={() => {
              setEditingId(null);
              setFormData({ title: '', url: '', icon: '', color: '#000000' });
              setShowForm(!showForm);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            <Plus size={18} />
            Novo Link
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 rounded border border-gray-200">
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Título</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Meu YouTube"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-600"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">URL</label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://youtube.com/@seu_canal"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-600"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Ícone (opcional)</label>
                  <input
                    type="text"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    placeholder="youtube"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-600"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Cor</label>
                  <input
                    type="color"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                >
                  {editingId ? 'Atualizar' : 'Criar'} Link
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                  }}
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </form>
        )}

        {links.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Nenhum link ainda. Comece criando um!</p>
        ) : (
          <div className="space-y-3">
            {links.map((link) => (
              <div
                key={link.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded hover:bg-gray-50"
              >
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: link.color }}
                ></div>
                <div className="flex-1 ml-4">
                  <h3 className="font-semibold">{link.title}</h3>
                  <p className="text-sm text-gray-500">{link.url}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(link)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(link.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
