import React, { useEffect, useState } from "react";
import "@/styles/Form.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { motion } from "framer-motion";
import { useStore } from "@/tasks-store";
import { TaskItem as TaskItemType } from "@/types/tasks";
import { STATUS } from "@/config/constants";
import { FaCircle } from "react-icons/fa";

const variants = {
  open: { opacity: 1, y: 0, height: "auto" },
  closed: { opacity: 0, y: "-300%", height: 0 },
};
interface EditFormProps extends TaskItemType {
  open: boolean;
  onClose: () => void;
}
function EditForm({ onClose, open, ...others }: EditFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "in-progress",
    id: 0,
    timestamp: 0,
  });
  const { onUpdate } = useStore();

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((state) => ({ ...state, [name]: value }));
  }

  function handleSubmit() {
    onUpdate(
      formData.title,
      formData.description,
      formData.status,
      formData.id
    );
    onClose();
  }

  useEffect(() => {
    if (open) {
      setFormData({ ...others });
    }
  }, [open]);
  return (
    <motion.section
      className="edit create-form"
      animate={open ? "open" : "closed"}
      variants={variants}
    >
      <header className="navbar">
        <div className="navbar-box">
          <button onClick={onClose}>
            <IoMdArrowRoundBack className="icon" />
          </button>
          <h1>Edit Task</h1>
        </div>
      </header>
      <div className="form-box">
        <input
          placeholder="Enter the title "
          className="textfield"
          name="title"
          onChange={handleChange}
          value={formData.title}
        />
        <textarea
          className="textfield"
          rows={3}
          placeholder="Enter the description "
          name="description"
          onChange={handleChange}
          value={formData.description}
        />{" "}
        <select
          className="textfield"
          name="status"
          onChange={handleChange}
          value={formData.status}
        >
          {Object.entries(STATUS).map((status, i) => (
            <option key={i} value={status[1].code}>
              <p>{status[1].emoji}</p> {status[1].text}
            </option>
          ))}
        </select>
        <div className="btn-grp">
          <button className="btn btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={!formData.title || !formData.description}
          >
            Update
          </button>
        </div>
      </div>
    </motion.section>
  );
}

export default EditForm;
