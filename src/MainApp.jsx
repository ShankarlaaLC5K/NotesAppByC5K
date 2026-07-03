import { useState, useEffect } from 'react';
import { Archive, Trash2, LayoutGrid, Menu } from 'lucide-react';
import Card from './components/Card.jsx';
import Form from './components/Form.jsx';

function MainApp() {
  const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem('notes')) || []);
  const [view, setView] = useState('active');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState({ title: '', description: '', priority: 'medium', tags: [] });
  const [viewingNote, setViewingNote] = useState(null);

  const bgColors = ['bg-blue-50', 'bg-green-50', 'bg-purple-50', 'bg-pink-50', 'bg-orange-50'];
  const navItems = [
    { name: 'active', icon: <LayoutGrid size={20} /> },
    { name: 'archived', icon: <Archive size={20} /> },
    { name: 'trash', icon: <Trash2 size={20} /> },
  ];

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const saveNote = () => {
    if (!currentNote.title) return;
    const noteData = { 
      ...currentNote, 
      id: currentNote.id || Date.now(), 
      status: currentNote.status || 'active', 
      isPinned: currentNote.isPinned || false,
      bgColor: currentNote.bgColor || bgColors[Math.floor(Math.random() * bgColors.length)]
    };
    setNotes(prev => currentNote.id ? prev.map(n => n.id === noteData.id ? noteData : n) : [...prev, noteData]);
    setIsModalOpen(false);
    setCurrentNote({ title: '', description: '', priority: 'medium', tags: [] });
  };

  const filteredNotes = notes
    .filter(n => n.status === view)
    .filter(n => (n.title.toLowerCase().includes(searchTerm.toLowerCase()) || n.description.toLowerCase().includes(searchTerm.toLowerCase())))
    .filter(n => selectedTag ? (n.tags && n.tags.includes(selectedTag)) : true)
    .sort((a, b) => b.isPinned - a.isPinned);

  return (
    <div className="flex min-h-screen bg-gray-50">
<nav className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white p-6 border-r border-gray-200 flex flex-col`}>
  
  {/* Hamburger Button */}
  <button 
    onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
    className="mb-10 text-gray-700 hover:bg-gray-100 p-2 rounded-lg w-10 h-10 flex items-center justify-center"
  >
    <Menu size={24} />
  </button>

  {/* Navigation Items Container: Removed mt-8, using flex-col gap-4 */}
<div className="flex flex-col gap-4">
  {navItems.map(item => (
    <button 
      key={item.name} 
      onClick={() => { setView(item.name); setSelectedTag(null); }} 
      // added 'overflow-hidden' and 'whitespace-nowrap'
      className={`flex items-center gap-4 px-1 py-1 rounded-xl font-black capitalize w-full overflow-hidden whitespace-nowrap
        ${view === item.name 
          ? 'bg-blue-600 text-white' 
          : 'text-gray-500 hover:bg-gray-200 hover:text-gray-900'}`}
    >
      {/* Icon: flex-shrink-0 prevents the icon from being compressed */}
      <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
        {item.icon}
      </span>
      
      {/* Label: truncate prevents text from pushing icon out */}
      <span className={`${isSidebarOpen ? 'block' : 'hidden'} truncate`}>
        {item.name}
      </span>
    </button>
  ))}
</div>
</nav>


      <main className="flex-grow p-4 md:p-8">
        <div className="max-w-5xl mx-auto flex flex-col gap-8">
          <h1 className="text-4xl font-black text-gray-900 text-center">My Notes</h1>
          <div className="flex flex-wrap gap-4">
            <input placeholder="Search notes..." className="flex-grow px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <button onClick={() => { setCurrentNote({ title: '', description: '', priority: 'medium', tags: [] }); setIsModalOpen(true); }} className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700">+ New Note</button>
          </div>

          {selectedTag && (
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg flex justify-between items-center">
              <span>Filtered by: <strong>{selectedTag}</strong></span>
              <button onClick={() => setSelectedTag(null)} className="underline text-xs">Clear Filter</button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredNotes.map(note => (
              <Card key={note.id} note={note} view={view} onView={() => setViewingNote(note)} setTagFilter={setSelectedTag} updateNote={(id, upd) => setNotes(prev => prev.map(n => n.id === id ? { ...n, ...upd } : n))} deleteNote={(id) => setNotes(prev => prev.filter(n => n.id !== id))} editNote={(n) => { setCurrentNote({ ...n }); setIsModalOpen(true); }} />
            ))}
          </div>
        </div>
      </main>

      <Form isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} currentNote={currentNote} setCurrentNote={setCurrentNote} onSave={saveNote} />
      
      {viewingNote && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-xl">
            <h2 className="text-3xl font-black text-gray-950 mb-6 border-b pb-4">{viewingNote.title}</h2>
            <p className="text-gray-800 text-lg whitespace-pre-line leading-relaxed">{viewingNote.description}</p>
            <button onClick={() => setViewingNote(null)} className="mt-8 w-full bg-gray-900 text-white py-3 rounded-lg font-bold hover:bg-gray-800">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainApp;