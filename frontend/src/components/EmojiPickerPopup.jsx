import EmojiPicker from "emoji-picker-react";
import { Image, X } from "lucide-react";
import { useState } from "react";

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleEmojiSelect = (emojiObject) => {
    onSelect(emojiObject.emoji); 
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row items-start gap-5 mb-6">
      <div
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-4 cursor-pointer"
      >
        <div className="w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 text-purple-500 rounded-lg transition-colors hover:bg-purple-100">
          {icon ? (
            <span className="text-2xl">{icon}</span>
          ) : (
            <Image className="w-6 h-6" />
          )}
        </div>
        <p className="text-gray-700 font-medium">{icon ? "Change icon" : "Pick icon"}</p>
      </div>

      
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center" 
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="relative"
            onClick={(e) => e.stopPropagation()} 
          >
            <button
              className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 shadow-lg rounded-full absolute -top-3 -right-3 z-10 cursor-pointer text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <X size={16} />
            </button>
            <EmojiPicker
              open={isOpen}
              onEmojiClick={handleEmojiSelect}
              width={350} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;