import { JSX, useEffect, useRef } from "react";

interface ModalProps {
  title: string;
  onClose?: () => void;
  onOk?: () => void;
  children?: React.ReactNode;
  showDialog: boolean;
}

export default function Modal({
  title,
  onClose,
  onOk,
  children,
  showDialog,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (showDialog) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [showDialog]);

  const closeDialog = () => {
    dialogRef.current?.close();
    onClose?.();
  };
  const clickOk = () => {
    onOk?.();
    closeDialog();
  };

  const modal: JSX.Element | null = showDialog ? (
    <dialog
      ref={dialogRef}
      className="bg-border/80 backdrop:bg-background/50 top-[30%] left-[50%] flex h-77 w-55 flex-col rounded-lg p-4 text-zinc-300 backdrop:backdrop-blur-sm"
    >
      <h1 className="mb-6 text-lg font-bold">{title}</h1>
      <div>{children}</div>
      <div className="flex justify-between gap-2">
        <button
          className="bg-accent/50 mt-4 cursor-pointer rounded-lg px-4 py-2"
          onClick={clickOk}
        >
          OK
        </button>
        <button
          className="mt-4 cursor-pointer rounded-lg bg-red-500/50 px-4 py-2"
          onClick={closeDialog}
        >
          Cancel
        </button>
      </div>
    </dialog>
  ) : null;

  return <>{modal}</>;
}
