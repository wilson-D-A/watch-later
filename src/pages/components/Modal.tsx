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
    <dialog ref={dialogRef} className="top-[30%] left-[50%] h-88 w-55">
      <h1>{title}</h1>
      <div>{children}</div>
      <button onClick={clickOk}>OK</button>
      <button onClick={closeDialog}>Cancel</button>
    </dialog>
  ) : null;

  return <>{modal}</>;
}
