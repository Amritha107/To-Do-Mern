import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");

  const [priority, setPriority] =
    useState("Medium");

  const [dueDate, setDueDate] =
    useState("");

  const [darkMode, setDarkMode] =
    useState(false);

  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/tasks",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      fetchTasks();
    }
  }, []);

  const addTask = async () => {
    if (!title) return;

    try {
      await axios.post(
        "http://localhost:5000/api/tasks",
        {
          title,
          priority,
          dueDate,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setTitle("");

      setPriority("Medium");

      setDueDate("");

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const toggleTask = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/tasks/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");

    navigate("/");
  };

  const getPriorityColor = (priority) => {
    if (priority === "High") return "danger";

    if (priority === "Medium")
      return "warning";

    return "success";
  };

  return (
    <div
      className={`container-fluid min-vh-100 py-5 ${
        darkMode
          ? "bg-dark text-light"
          : "bg-light"
      }`}
    >
      <div
        className={`card shadow p-4 mx-auto ${
          darkMode
            ? "bg-secondary text-light"
            : ""
        }`}
        style={{ maxWidth: "600px" }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Todo Dashboard</h2>

          <div className="d-flex gap-2">
            <button
              className="btn btn-secondary"
              onClick={() =>
                setDarkMode(!darkMode)
              }
            >
              {darkMode
                ? "☀ Light"
                : "🌙 Dark"}
            </button>

            <button
              className="btn btn-danger"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter Task"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <select
          className="form-select mb-3"
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value)
          }
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <input
          type="date"
          className="form-control mb-3"
          value={dueDate}
          onChange={(e) =>
            setDueDate(e.target.value)
          }
        />

        <button
          className="btn btn-primary mb-4"
          onClick={addTask}
        >
          Add Task
        </button>

        {tasks.length === 0 ? (
          <p className="text-center text-muted">
            No Tasks Yet
          </p>
        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              className={`card p-3 mb-3 ${
                darkMode
                  ? "bg-dark text-light"
                  : ""
              }`}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5>{task.title}</h5>

                  <span
                    className={`badge bg-${getPriorityColor(
                      task.priority
                    )}`}
                  >
                    {task.priority} Priority
                  </span>

                  <p className="mt-2 mb-1">
                    📅 Due Date:{" "}
                    {task.dueDate || "No Date"}
                  </p>

                  {task.completed && (
                    <p
                      style={{
                        color: "limegreen",
                        fontSize: "14px",
                        margin: "0",
                        marginTop: "5px",
                      }}
                    >
                      ✅ Congrats! You did it 🎉
                    </p>
                  )}
                </div>

                <div className="d-flex gap-2">
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() =>
                      toggleTask(task._id)
                    }
                  >
                    {task.completed
                      ? "Done ✅"
                      : "Complete"}
                  </button>

                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() =>
                      deleteTask(task._id)
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;