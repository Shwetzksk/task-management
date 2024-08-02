import { STATUS } from "@/config/constants";
import "@/styles/TaskItem.css";
import { useStore } from "@/tasks-store";
import { TaskItem as TaskItemType } from "@/types/tasks";
import { format } from "date-fns";
import { FaCircle } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { SlPencil } from "react-icons/sl";

interface TaskItemProps extends TaskItemType {
  onEdit: (task: TaskItemType) => void;
}

function TaskItem({
  title,
  description,
  timestamp,
  status,
  id,
  onEdit,
}: TaskItemProps) {
  const { onDelete } = useStore();
  return (
    <div className="task-item-card">
      <div className="avatar">{title[0]}</div>
      <div className="content">
        <div className="header">
          <p className="title">{title}</p>
          <p className="status">
            <FaCircle className={`${STATUS[status].code} `} />
            <span>{STATUS[status].text}</span>
          </p>
        </div>
        <p>{description}</p>
        <div className="footer">
          <p className="date">{format(timestamp, "EEE d, LLL yyyy")}</p>
          <div className="footer--action-btn">
            <button
              className="edit-btn"
              onClick={() =>
                onEdit({ title, description, timestamp, status, id })
              }
            >
              <SlPencil />
            </button>
            <button className="delete-btn" onClick={() => onDelete(id)}>
              <RiDeleteBinLine />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
