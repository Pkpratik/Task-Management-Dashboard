import { Modal as RBModal } from 'react-bootstrap';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  return (
    <RBModal
      show={isOpen}
      onHide={onClose}
      centered
      size="lg"
      contentClassName="premium-modal-content"
      backdropClassName="premium-modal-backdrop"
      animation={true}
    >
      <div className="relative w-full h-full flex flex-col">
        {/* Bulletproof Close Button - Top Right */}
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 w-14 h-14 rounded-full bg-white text-black shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-[1100] border-4 border-[var(--bg-secondary)]"
          aria-label="Close modal"
        >
          <X className="w-8 h-8" />
        </button>

        {title && (
          <div className="px-10 pt-12 pb-6 shrink-0">
            <h2 className="text-4xl font-black text-[var(--text-primary)] tracking-tighter leading-none">
              {title}
            </h2>
          </div>
        )}

        <div className="px-10 pb-10 relative overflow-y-auto max-h-[85vh] scrollbar-hide">
          {children}
        </div>
      </div>
    </RBModal>
  );
};
