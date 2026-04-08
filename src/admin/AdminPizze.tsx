import { useState, useEffect } from 'react';
import { Pencil, Trash2, Plus, Loader2, Check, X, Search } from 'lucide-react';

interface Prezzi {
  normale: string;
  media: string;
  maxi: string;
}


interface PizzaData {
  id: number;
  nome: string;
  is_visible: boolean;
  prezzi: Prezzi;
  ingredienti: string[];
}

interface ApiIngredientList {
  id: number;
  name: string;
}

export function AdminPizze() {
  const [pizze, setPizze] = useState<PizzaData[]>([]);
  const [allIngredients, setAllIngredients] = useState<ApiIngredientList[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    nome: '',
    is_visible: true,
    price_normale: '0.00',
    price_media: '0.00',
    price_maxi: '0.00',
    ingredients: [] as number[],
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [pizzaSearch, setPizzaSearch] = useState('');
  const [ingredientSearch, setIngredientSearch] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('admin_auth_token');
      const [resPizze, resIng] = await Promise.all([
        fetch('https://elrapido-backend-production.up.railway.app/api/pizze?all=1', {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }),
        fetch('https://elrapido-backend-production.up.railway.app/api/ingredients', {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
      ]);
      const dataPizze = await resPizze.json();
      const dataIng = await resIng.json();

      setPizze(dataPizze.data);
      setAllIngredients(dataIng);
    } catch (e) {
      console.error(e);
      alert('Errore nel caricamento dei dati');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openForm = (pizza?: PizzaData) => {
    if (pizza) {
      setEditingId(pizza.id);

      // Determine ingredient IDs based on names (since the GET pizza API returns string[] of names)
      const ingredientIds = pizza.ingredienti
        .map(name => allIngredients.find(ing => ing.name === name)?.id)
        .filter((id): id is number => id !== undefined);

      setFormData({
        nome: pizza.nome,
        is_visible: pizza.is_visible,
        price_normale: pizza.prezzi.normale,
        price_media: pizza.prezzi.media,
        price_maxi: pizza.prezzi.maxi,
        ingredients: ingredientIds,
      });
    } else {
      setEditingId(null);
      setFormData({
        nome: '',
        is_visible: true,
        price_normale: '',
        price_media: '',
        price_maxi: '',
        ingredients: [],
      });
    }
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setIngredientSearch('');
  };

  const handleIngredientToggle = (id: number) => {
    setFormData(prev => {
      const isSelected = prev.ingredients.includes(id);
      if (isSelected) {
        return { ...prev, ingredients: prev.ingredients.filter(i => i !== id) };
      } else {
        return { ...prev, ingredients: [...prev.ingredients, id] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const url = editingId
        ? `https://elrapido-backend-production.up.railway.app/api/pizze/${editingId}`
        : 'https://elrapido-backend-production.up.railway.app/api/pizze';

      const method = editingId ? 'PUT' : 'POST';

      // Il backend si aspetta 'ingredients' come array di ID o stringa delimitata,
      // la documentazione lo descrive come form field. Proviamo a mandarlo come array JSON.
      const payload = {
        name: formData.nome, // Backend si aspetta 'name'
        is_visible: formData.is_visible,
        price_normale: parseFloat(formData.price_normale),
        price_media: parseFloat(formData.price_media),
        price_maxi: parseFloat(formData.price_maxi),
        ingredients: formData.ingredients
      };

      const token = localStorage.getItem('admin_auth_token');
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Errore di salvataggio');
      }

      await fetchData();
      closeForm();
    } catch (e: any) {
      alert(`Impossibile salvare la pizza: ${e.message}`);
      console.error(e);
    } finally {
      setProcessing(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Sei sicuro di voler eliminare questa pizza?')) return;

    try {
      const token = localStorage.getItem('admin_auth_token');
      const res = await fetch(`https://elrapido-backend-production.up.railway.app/api/pizze/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) throw new Error('Errore di eliminazione');

      await fetchData();
    } catch (e) {
      console.error(e);
      alert('Impossibile eliminare la pizza.');
    }
  };

  if (loading) {
    return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-red-600" /></div>;
  }

  const filteredPizze = pizze.filter(p =>
    p.nome.toLowerCase().includes(pizzaSearch.toLowerCase()) ||
    p.ingredienti.some(ing => ing.toLowerCase().includes(pizzaSearch.toLowerCase()))
  );

  const filteredIngredients = allIngredients.filter(ing =>
    ing.name.toLowerCase().includes(ingredientSearch.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Pizze</h1>
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cerca pizza o ingrediente..."
              value={pizzaSearch}
              onChange={e => setPizzaSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <button
            onClick={() => openForm()}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            <Plus className="w-5 h-5" />
            Nuova Pizza
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-xs text-gray-500 uppercase font-bold mb-1">Pizze Totali</p>
          <p className="text-2xl font-bold text-gray-800">{pizze.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-xs text-gray-500 uppercase font-bold mb-1">Pizze Sul Menu</p>
          <p className="text-2xl font-bold text-green-600">{pizze.filter(p => p.is_visible).length}</p>
        </div>
      </div>

      {isFormOpen && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold mb-4">{editingId ? 'Modifica Pizza' : 'Aggiungi Pizza'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome Pizza</label>
                <input
                  type="text"
                  required
                  value={formData.nome}
                  onChange={e => setFormData({ ...formData, nome: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                />
              </div>

              <div className="flex items-center h-full pt-6">
                <label className="flex items-center cursor-pointer gap-2">
                  <input
                    type="checkbox"
                    checked={formData.is_visible}
                    onChange={e => setFormData({ ...formData, is_visible: e.target.checked })}
                    className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Visibile nel menu</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-gray-100 pt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prezzo Normale (€)</label>
                <input
                  type="number"
                  step="0.10"
                  required
                  value={formData.price_normale}
                  onChange={e => setFormData({ ...formData, price_normale: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prezzo Media (€)</label>
                <input
                  type="number"
                  step="0.10"
                  required
                  value={formData.price_media}
                  onChange={e => setFormData({ ...formData, price_media: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prezzo Maxi (€)</label>
                <input
                  type="number"
                  step="0.10"
                  required
                  value={formData.price_maxi}
                  onChange={e => setFormData({ ...formData, price_maxi: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">Ingredienti</label>
                <div className="relative w-48">
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Filtra ingredienti..."
                    value={ingredientSearch}
                    onChange={e => setIngredientSearch(e.target.value)}
                    className="w-full pl-7 pr-2 py-1 text-xs border border-gray-300 rounded focus:ring-red-500 focus:border-red-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-48 overflow-y-auto p-2 border border-gray-200 rounded-md bg-gray-50">
                {filteredIngredients.map(ing => (
                  <label key={ing.id} className="flex items-center gap-2 cursor-pointer text-sm p-1 hover:bg-white rounded transition">
                    <input
                      type="checkbox"
                      checked={formData.ingredients.includes(ing.id)}
                      onChange={() => handleIngredientToggle(ing.id)}
                      className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                    />
                    <span className={formData.ingredients.includes(ing.id) ? 'font-bold text-red-700' : 'text-gray-700'}>
                      {ing.name}
                    </span>
                  </label>
                ))}
                {filteredIngredients.length === 0 && (
                  <div className="col-span-full py-4 text-center text-gray-400 text-xs italic">
                    Nessun ingrediente trovato
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-40">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">Visibile</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Prezzo Norm.</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ingredienti</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-28">Azioni</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPizze.map((pizza, index) => (
              <tr key={pizza.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{pizza.nome}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {pizza.is_visible ? <Check className="w-5 h-5 text-green-500" /> : <X className="w-5 h-5 text-red-500" />}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">€ {parseFloat(pizza.prezzi.normale).toFixed(2)}</td>
                <td className="px-6 py-4 text-sm text-gray-600 italic">
                  {pizza.ingredienti.join(', ')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-end gap-2">
                  <button
                    onClick={() => openForm(pizza)}
                    className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 p-2 rounded-md"
                    title="Modifica"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(pizza.id)}
                    className="text-red-600 hover:text-red-900 bg-red-50 p-2 rounded-md"
                    title="Elimina"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {filteredPizze.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                  <div className="flex flex-col items-center gap-2">
                    <Search className="w-8 h-8 text-gray-200" />
                    <p>Nessuna pizza trovata con i criteri di ricerca.</p>
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
