const Card = ({ note, view, onView, setTagFilter, updateNote, deleteNote, editNote }) => {  const priorityColors = { high: 'bg-red-100 text-red-700 border-red-200', medium: 'bg-yellow-100 text-yellow-700 border-yellow-200', low: 'bg-green-100 text-green-700 border-green-200' };

  return (
<div 
      onClick={onView} 
      className={`p-8 rounded-2xl border flex flex-col justify-between shadow-sm cursor-pointer hover:border-blue-300 min-h-[250px] transition-colors 
      ${note.isPinned ? 'border-yellow-400 bg-yellow-100' : `${note.bgColor || 'bg-white'} border-gray-200`}`}
    >
      <div className="mb-4">
        <div className="flex justify-between items-start mb-4 gap-2">
          <h3 className="font-extrabold text-xl text-gray-950 truncate tracking-tight">{note.title}</h3>
          <span className={`shrink-0 px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${priorityColors[note.priority || 'medium']}`}>{note.priority}</span>
        </div>
        <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">{note.description}</p>
        
  
        <div className="flex flex-wrap gap-2 mt-4">
          {note.tags?.map(tag => (
            <span key={tag} onClick={(e) => { e.stopPropagation(); setTagFilter(tag); }} className="text-[10px] bg-blue-50 text-blue-700 px-3 py-1 rounded-full cursor-pointer hover:bg-blue-100 font-medium">
              #{tag}
            </span>
          ))}
        </div>
      </div>

<div 
  onClick={(e) => e.stopPropagation()} 
  className="flex items-center gap-x-2 pt-6 border-t border-gray-100 mt-auto"
>
  {view !== 'trash' ? (
    <>
      <button onClick={() => updateNote(note.id, { isPinned: !note.isPinned })} 
              className="flex-1 px-1 py-1.5 text-[9px] font-black uppercase rounded bg-blue-600 text-white hover:bg-blue-700 whitespace-nowrap">
        {note.isPinned ? 'Unpin' : 'Pin'}
      </button>
      <button onClick={() => editNote(note)} 
              className="flex-1 px-1 py-1.5 text-[9px] font-black uppercase rounded bg-yellow-400 text-gray-950 hover:bg-yellow-500 whitespace-nowrap">
        Edit
      </button>
      <button onClick={() => updateNote(note.id, { status: view === 'active' ? 'archived' : 'active' })} 
              className="flex-1 px-1 py-1.5 text-[9px] font-black uppercase rounded bg-gray-900 text-white hover:bg-black whitespace-nowrap">
        {view === 'active' ? 'Archive' : 'Restore'}
      </button>
      <button onClick={() => updateNote(note.id, { status: 'trash' })} 
              className="flex-1 px-1 py-1.5 text-[9px] font-black uppercase rounded bg-red-600 text-white hover:bg-red-700 whitespace-nowrap">
        Trash
      </button>
    </>
  ) : (
    <>
      <button onClick={() => updateNote(note.id, { status: 'active' })} 
              className="flex-1 px-2 py-1.5 text-[9px] font-black uppercase rounded bg-green-600 text-white">
        Restore
      </button>
      <button onClick={() => deleteNote(note.id)} 
              className="flex-1 px-2 py-1.5 text-[9px] font-black uppercase rounded bg-red-600 text-white">
        Delete
      </button>
    </>
  )}
</div>
    </div>
  );
};

export default Card;