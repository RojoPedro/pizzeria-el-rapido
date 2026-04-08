import { useState, useEffect } from 'react';
import { Pencil, Trash2, Plus, Loader2, Search } from 'lucide-react';

interface Ingredient {
  id: number;
  name: string;
}

export function AdminIngredienti() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '' });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [search, setSearch] = useState('');

  const fetchIngredients = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('admin_auth_token');
      const res = await fetch('https://elrapido-backend-production.up.railway.app/api/ingredients', {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      setIngredients(data);
    } catch (e) {
      console.error(e);
      alert('Errore nel caricamento degli ingredienti');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  const openForm = (ing?: Ingredient) => {
    if (ing) {
      setEditingId(ing.id);
      setFormData({ name: ing.name });
    } else {
      setEditingId(null);
      setFormData({ name: '' });
    }
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setFormData({ name: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const url = editingId 
        ? `https://elrapido-backend-production.up.railway.app/api/ingredients/${editingId}`
        : 'https://elrapido-backend-production.up.railway.app/api/ingredients';
      
      const method = editingId ? 'PUT' : 'POST';

      const token = localStorage.getItem('admin_auth_token');
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error('Errore di salvataggio');
      
      await fetchIngredients();
      closeForm();
    } catch (e) {
      alert("Impossibile salvare l'ingrediente.");
      console.error(e);
    } finally {
      setProcessing(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Sei sicuro di voler eliminare questo ingrediente?')) return;
    
    try {
      const token = localStorage.getItem('admin_auth_token');
      const res = await fetch(`https://elrapido-backend-production.up.railway.app/api/ingredients/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!res.ok) throw new Error('Errore di eliminazione');
      
      await fetchIngredients();
    } catch (e) {
      console.error(e);
      alert("Impossibile eliminare l'ingrediente. Potrebbe essere in uso in una pizza.");
    }
  };

  if (loading) {
    return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-red-600" /></div>;
  }

  const filteredIngredients = ingredients.filter(ing => 
    ing.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Ingredienti</h1>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text"
              placeholder="Cerca ingrediente..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <button 
            onClick={() => openForm()}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            <Plus className="w-5 h-5" />
            Nuovo Ingrediente
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 w-full md:w-64">
          <p className="text-xs text-gray-500 uppercase font-bold mb-1">Ingredienti Totali</p>
          <p className="text-2xl font-bold text-blue-600">{ingredients.length}</p>
        </div>
      </div>

      {isFormOpen && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold mb-4">{editingId ? 'Modifica Ingrediente' : 'Aggiungi Ingrediente'}</h2>
          <form onSubmit={handleSubmit} className="flex items-end gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome Ingrediente</label>
              <input 
                type="text" 
                required 
                value={formData.name}
                onChange={e => setFormData({ name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
              />
            </div>
            <div className="flex gap-2">
              <button 
                type="button" 
                onClick={closeForm}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Annulla
              </button>
              <button 
                type="submit" 
                disabled={processing}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:opacity-50"
              >
                {processing ? 'Salvataggio...' : 'Salva'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">N.</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-28">Azioni</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredIngredients.map((ing, index) => (
              <tr key={ing.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ing.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-end gap-2">
                  <button 
                    onClick={() => openForm(ing)}
                    className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 p-2 rounded-md"
                    title="Modifica"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(ing.id)}
                    className="text-red-600 hover:text-red-900 bg-red-50 p-2 rounded-md"
                    title="Elimina"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {filteredIngredients.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-12 text-center text-gray-500">
                  <div className="flex flex-col items-center gap-2">
                    <Search className="w-8 h-8 text-gray-200" />
                    <p>Nessun ingrediente trovato.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
