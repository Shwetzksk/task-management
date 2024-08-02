import React, { useState } from "react";
import "@/styles/Form.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { motion } from "framer-motion";
import { useStore } from "@/tasks-store";

const variants = {
  open: { opacity: 1, y: 0, height: "auto" },
  closed: { opacity: 0, y: "-300%", height: 0 },
};
interface CreateTaskFormProps {
  open: boolean;
  onClose: () => void;
}
function CreateTaskForm({ onClose, open }: CreateTaskFormProps) {
  const [formData, setFormData] = useState({ title: "", description: "" });
  const { onAdd } = useStore();

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    setFormData((state) => ({ ...state, [name]: value }));
  }

  function handleSubmit() {
    onAdd(formData.title, formData.description);
    onClose();
  }
  return (
    <motion.section
      className="create-form"
      animate={open ? "open" : "closed"}
      variants={variants}
    >
      <header className="navbar">
        <div className="navbar-box">
          <button onClick={onClose}>
            <IoMdArrowRoundBack className="icon" />
          </button>
          <h1>Add Task</h1>
        </div>
      </header>
      <div className="form-box">
        <input
          placeholder="Enter the title "
          className="textfield"
          name="title"
          onChange={handleChange}
        />
        <textarea
          className="textfield"
          rows={3}
          placeholder="Enter the description "
          name="description"
          onChange={handleChange}
        />
        <div className="btn-grp">
          <button className="btn btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={!formData.title || !formData.description}
          >
            Add
          </button>
        </div>
      </div>
    </motion.section>
  );
}

export default CreateTaskForm;
