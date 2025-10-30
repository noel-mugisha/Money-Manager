import { useState } from "react";
import { LoaderCircle } from "lucide-react";

const DeleteAlert = ({ content, onDelete, onClose }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await onDelete();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <p className="text-base text-gray-700 mb-6">{content}</p>
      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={onClose}
          disabled={loading}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          disabled={loading}
          className={`
    px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 
    flex items-center justify-center gap-2 min-w-[90px] h-10
    text-white bg-red-600 hover:bg-red-700 cursor-pointer
    ${loading ? "opacity-70 cursor-not-allowed" : "shadow-md"}
  `}
        >
          {loading ? (
            <>
              <LoaderCircle className="w-5 h-5 animate-spin" />
              Deleting...
            </>
          ) : (
            <span>Delete</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default DeleteAlert;
