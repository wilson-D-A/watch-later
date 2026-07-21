type IModalButtonProps = {
  handleShowDialog: () => void;
  classname?: { position?: string; color?: string; hoverColor?: string };
  children?: React.ReactNode;
};
function ModalButton({
  handleShowDialog,
  classname,
  children,
}: React.PropsWithChildren<IModalButtonProps>) {
  return (
    <button
      className={`${
        classname?.position
      } z-10 flex size-7 cursor-pointer gap-2 rounded-full px-1 py-1 text-xs ${
        classname?.color
      } ${classname?.hoverColor || ""}`}
      onClick={(e) => {
        handleShowDialog();
        e.stopPropagation();
      }}
    >
      {children}
    </button>
  );
}

export default ModalButton;
