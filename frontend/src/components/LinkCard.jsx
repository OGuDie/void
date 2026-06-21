import { ExternalLink, Edit2, Trash2 } from 'lucide-react';

export default function LinkCard({ link, onEdit, onDelete }) {
  return (
    <div
      className="flex items-center justify-between p-4 border border-gray-200 rounded hover:bg-gray-50 transition"
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
          onClick={() => onEdit(link)}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
        >
          <Edit2 size={18} />
        </button>
        <button
          onClick={() => onDelete(link.id)}
          className="p-2 text-red-600 hover:bg-red-50 rounded transition"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}