import React from "react";

type TagPatchFormProps = {
  concept: string;
  tool: string;
  topic: string;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function TagPatchForm({
  concept,
  tool,
  topic,
  handleOnChange,
}: TagPatchFormProps) {
  return (
    <form action="">
      <h1>concept</h1>

      <input
        placeholder={concept}
        className="bg-concept mb-2 w-full rounded px-2 py-1 text-zinc-300 inset-ring-1 inset-ring-[#aad97d] outline-none"
        type="text"

        onChange={(e) => {
          handleOnChange(e);
        }}
      />
      <h1>tool</h1>

      <input
        placeholder={tool}
        className="border-border bg-tool inset-1ring-1 mb-2 w-full rounded border-2 px-2 py-1 text-zinc-300 inset-ring-1 inset-ring-[#5a97d6] outline-none"
        type="text"
        onChange={(e) => {
          handleOnChange(e);
        }}
      />
      <h1>topic</h1>
      <input
        placeholder={topic}
        className="border-border bg-topic inset-0 mb-2 w-full rounded border-2 px-2 py-1 text-zinc-300 inset-ring-1 inset-ring-[#b7a1ff] outline-none"
        type="text"
        onChange={(e) => {
          handleOnChange(e);
        }}
      />
    </form>
  );
}

export default TagPatchForm;
