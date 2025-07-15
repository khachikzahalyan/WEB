import React from "react";

export default function TaskForm({
  title,
  description,
  setTitle,
  setDescription,
  onSubmit,
  isEdit
}) {
  return (
    <div className="task-form">
      <h3>{isEdit ? "Խմբագրել առաջադրանքը" : "Նոր առաջադրանք"}</h3>
      <input
        type="text"
        placeholder="Վերնագիր"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Առաջադրանքի նկարագրություն"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button onClick={onSubmit}>
        {isEdit ? "Պահպանել փոփոխությունները" : "Ավելացնել առաջադրանք"}
      </button>
    </div>
  );
}
