import React from "react";

interface ModalProps {
  id: string;
  title: string;
  content: React.ReactNode;
  onCloseText: string;
}

const Modal: React.FC<ModalProps> = ({ id, title, content, onCloseText }) => {
  return (
    <dialog id={id} className="modal">
      <div className="modal-box bg-[#ffffff] text-black dark:bg-[#181818] dark:text-white">
        <h3 className="text-lg font-bold">{title}</h3>
        <div className="py-4">{content}</div>
        <div className="modal-action">
          <form method="dialog">
            {/* <button className="rounded-md bg-red px-2 py-2 text-white outline-none">
              {onCloseText}
            </button> */}
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
