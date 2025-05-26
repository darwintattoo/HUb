import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>
        {children}
      </div>
    </div>
  );
};
