export default function SideArea({ view, setView, onAddNew }) {
  const links = ['active', 'archived', 'trash'];

  return (
    <aside className="sidebar">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Notes App</h2>
      
      <button 
        onClick={onAddNew}
        className="bg-green-600 text-white w-full py-2 rounded-lg mb-6 shadow-md hover:shadow-lg transition-transform hover:scale-105"
      >
        + Add New Note
      </button>

      <nav className="flex flex-col gap-2">
        {links.map(v => (
          <div 
            key={v} 
            onClick={() => setView(v)} 
            className={`nav-link ${view === v ? 'active' : ''} capitalize`}
          >
            {v}
          </div>
        ))}
      </nav>
    </aside>
  );
}