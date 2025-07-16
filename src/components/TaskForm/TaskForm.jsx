import "./TaskForm.css";

export default function TaskForm({
  title,
  description,
  deadlineInDays,
  setTitle,
  setDescription,
  setDeadlineInDays,
  onSubmit,
  isEdit
}) {
  return (
    <div className="task-form-container">
      <h3 className="task-form-title">
        {isEdit ? "Խմբագրել առաջադրանքը" : "Նոր առաջադրանք"}
      </h3>
      <input
        className="task-form-input"
        type="text"
        placeholder="Վերնագիր"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        className="task-form-textarea"
        placeholder="Առաջադրանքի նկարագրություն"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <p>Նշեք առաջադրանքի վերջնաժամկետը</p>
      <input
        className="task-form-input"
        type="number"
        min={1}
        placeholder="Ժամկետ (օրերով)"
        value={deadlineInDays}
        onChange={e => setDeadlineInDays(Number(e.target.value))}
      />
      <button className="task-form-button" onClick={onSubmit}>
        {isEdit ? "Պահպանել փոփոխությունները" : "Ավելացնել առաջադրանք"}
      </button>
    </div>
  );
}
