import { pnlSectionContent } from "@/consts/stats.const";

type PnLModalProps = {
  selectedImage: string | null;
  onClose: () => void;
};

const PnLModal = ({ selectedImage, onClose }: PnLModalProps) => {
  if (!selectedImage) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <img
        src={selectedImage}
        alt={pnlSectionContent.popupAlt}
        className="max-w-full max-h-full rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};

export default PnLModal;
