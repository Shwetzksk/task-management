import { useMemo, useState } from "react";
import "./styles/App.css";
import Accordian from "@/components/Accordian";
import TaskItem from "@/components/TaskItem";
import SearchBar from "@/components/SearchBar";
import { MdAdd } from "react-icons/md";
import CreateTaskForm from "@/components/CreateTaskForm";
import { useStore } from "./tasks-store";
import EditForm from "@/components/EditTaskForm";
import { STATUS } from "./config/constants";

const initialData = {
  title: "",
  description: "",
  timestamp: 0,
  id: 0,
  status: STATUS["in-progress"].code,
};
function App() {
  const { tasks, search } = useStore();
  const filteredTask = useMemo(() => {
    if (search) {
      return tasks.filter((data) =>
        data.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    return tasks;
  }, [search]);
  const inProgress = useMemo(() => {
    return filteredTask.filter((task) => task.status === "in-progress");
  }, [filteredTask]);
  const pending = useMemo(() => {
    return filteredTask.filter((task) => task.status === "pending");
  }, [filteredTask]);
  const completed = useMemo(() => {
    return filteredTask.filter((task) => task.status === "completed");
  }, [filteredTask]);
  const [edit, setEdit] = useState({ ...initialData });
  const [add, setAdd] = useState(false);

  console.log(tasks);
  return (
    <section>
      {add ? <CreateTaskForm open={add} onClose={() => setAdd(false)} /> : null}
      {edit?.title ? (
        <EditForm
          open={!!edit?.title}
          onClose={() => setEdit({ ...initialData })}
          {...edit}
        />
      ) : null}
      {!edit.title && !add ? (
        <>
          <header className="navbar">
            <div className="navbar-box">
              <h1>TO-DO APP</h1>
            </div>
          </header>

          <main className="container">
            <SearchBar />
            <Accordian title={`In Progress (${inProgress.length})`}>
              {inProgress.map((task) => (
                <TaskItem {...task} onEdit={setEdit} />
              ))}
              {!inProgress.length ? <p>No data</p> : null}
            </Accordian>
            <Accordian title={`Pending (${pending.length})`}>
              {pending.map((task) => (
                <TaskItem {...task} onEdit={setEdit} />
              ))}
              {!pending.length ? <p>No data</p> : null}
            </Accordian>{" "}
            <Accordian title={`Completed (${completed.length})`}>
              {completed.map((task) => (
                <TaskItem {...task} onEdit={setEdit} />
              ))}
              {!completed.length ? <p>No data</p> : null}
            </Accordian>
          </main>
          <button className="floating-btn" onClick={() => setAdd(true)}>
            <MdAdd />
          </button>
        </>
      ) : null}
    </section>
  );
}

export default App;
