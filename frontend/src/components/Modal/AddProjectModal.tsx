"use client";

const AddProjectModal = ({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-opacity-40 flex justify-center items-center">
      <div className="bg-gray-200 p-6 rounded-xl w-[400px] relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 transition cursor-pointer"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default AddProjectModal;
