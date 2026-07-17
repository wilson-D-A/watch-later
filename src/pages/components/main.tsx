import * as React from "react";
import { useState } from "react";
import patchTag from "../hooks/patchTag";
interface IMainProps {
  children?: React.ReactNode;
}

const Main: React.FunctionComponent<IMainProps> = ({ children }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [changeTag, setChangeTag] = useState<{ [key: string]: string }>({
    concepts: "",
    tools: "",
    topics: "",
  });
  const mutate = patchTag();

  const onClose = () => {
    setShowDialog(false);
    setChangeTag({
      concepts: "",
      tools: "",
      topics: "",
    });
  };

  const onOk = (id: number) => {
    mutate.mutate({
      id,
      tags: [
        { concepts: changeTag.concepts },
        { tools: changeTag.tools },
        { topics: changeTag.topics },
      ],
    });
    onClose();
  };

  return (
    <>
      {/* <Modal showDialog={showDialog} title="Edit Info" onClose={onClose}>
        <form action="">
          <input
            type="text"
            onChange={(e) => {
              setChangeTag({ ...changeTag, concepts: e.target.value });
            }}
          />
          <input
            type="text"
            onChange={(e) => {
              setChangeTag({ ...changeTag, tools: e.target.value });
            }}
          />
          <input
            type="text"
            onChange={(e) => {
              setChangeTag({ ...changeTag, topics: e.target.value });
            }}
          />
        </form>
      </Modal> */}
      {children}
    </>
  );
};

export default Main;
