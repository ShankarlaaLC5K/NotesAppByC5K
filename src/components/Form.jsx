import { useState } from 'react';

const Form = ({ isOpen, onClose, currentNote, setCurrentNote, onSave }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
<h2 className="text-xl font-extrabold mb-4 text-gray-900">
  {currentNote.id ? 'Edit Note' : 'Create New Note'}
</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            className="w-full p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            value={currentNote.title}
            onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })}
            placeholder="Enter note title..."
          />
        </div>


        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
            value={currentNote.description}
            onChange={(e) => setCurrentNote({ ...currentNote, description: e.target.value })}
            placeholder="Enter description..."
          />
        </div>


        <div className="relative w-full mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
          
          <div 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full p-2 border border-gray-300 rounded-lg bg-white cursor-pointer flex justify-between items-center hover:border-blue-500 transition-colors"
          >
            <span className="capitalize">{currentNote.priority || 'Medium'}</span>
            <span className="text-gray-400 text-xs">▼</span>
          </div>

          {isDropdownOpen && (
            <div className="absolute w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 overflow-hidden">
              {['High', 'Medium', 'Low'].map((p) => (
                <div 
                  key={p}
                  onClick={() => {
                    setCurrentNote({ ...currentNote, priority: p.toLowerCase() });
                    setIsDropdownOpen(false);
                  }}
                  className="p-2 hover:bg-blue-50 cursor-pointer capitalize transition-colors"
                >
                  {p}
                </div>
              ))}
            </div>
            
          )}
        </div>


        <div className="flex justify-end items-center gap-4 mt-6">
          <button 
            type="button" 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 font-medium"
          >
            Cancel
          </button>
          <button 
            onClick={onSave} 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form;