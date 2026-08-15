import Modal from "@/presentation/main/Modal";
import ModalButton from "@/presentation/main/ModalButton";
import TagPatchForm from "@/presentation/TagPatchForm";
import { useState } from "react";
import Delete from "../../public/Delete";
import Edit from "../../public/Edit";
import useDeleteVideo from "../hooks/services/useDeleteVideo";
import usePatchTags from "../hooks/services/usePatchTags";

type UsePatchTagContainerProps = {
  id: number;
  concept: string;
  tools: string;
  topics: string;
  position?: { delete: string; edit: string };
};

function UsePatchTagContainer({
  id,
  concept,
  tools,
  topics,
  position = {
    delete: "absolute top-2 right-2",
    edit: "absolute top-12 right-2",
  },
}: UsePatchTagContainerProps) {
  const [activeModal, setActiveModal] = useState<"edit" | "delete" | null>(
    null,
  );
  const [changeTag, setChangeTag] = useState<{ [key: string]: string }>({
    concept: "",
    tool: "",
    topic: "",
  });
  const mutate = usePatchTags();
  const mutateDelete = useDeleteVideo();

  const onClose = () => {
    setActiveModal(null);
    setChangeTag({
      concept: "",
      tool: "",
      topic: "",
    });
  };
  const nextTags = {
    concept: changeTag.concept || concept,
    tool: changeTag.tool || tools,
    topic: changeTag.topic || topics,
  };
  const onOk = (id: number) => {
    mutate.mutate({
      id,
      tags: nextTags,
    });

    onClose();
  };

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setChangeTag({ ...changeTag, [e.target.name]: e.target.value });
  }

  function handleShowEditDialog() {
    setActiveModal("edit");
  }

  function handleShowDeleteDialog() {
    setActiveModal("delete");
  }

  const onDelete = () => {
    mutateDelete.mutate({
      id,
    });
  };
  return (
    <>
      <ModalButton
        handleShowDialog={handleShowEditDialog}
        classname={{
          position: position.edit,
          color: "bg-zinc-300/75 rounded px-1 py-1 text-sm text-zinc-300",
          hoverColor: "hover:bg-zinc-200",
        }}
      >
        <Edit width={20} height={20} viewBox="-2 -2 20 20" />
      </ModalButton>
      <ModalButton
        handleShowDialog={handleShowDeleteDialog}
        classname={{
          position: position.delete,
          color: "bg-red-500/75 rounded px-1 py-1 text-sm text-zinc-300",
          hoverColor: "hover:bg-red-500",
        }}
      >
        <Delete width={20} height={20} viewBox="0 0 24 24" />
      </ModalButton>

      <Modal
        onOk={onDelete}
        showDialog={activeModal === "delete"}
        title="are you sure you want to delete this video?"
        onClose={onClose}
      ></Modal>
      <Modal
        onOk={() => onOk(id)}
        showDialog={activeModal === "edit"}
        title="Edit Video Tags"
        onClose={onClose}
      >
        <TagPatchForm
          concept={concept}
          tool={tools}
          topic={topics}
          handleOnChange={handleOnChange}
        />
      </Modal>
    </>
  );
}

export default UsePatchTagContainer;
