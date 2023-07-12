"use client";

import { useState } from "react";
import Task from "./Task";
import { AiFillDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskValues, setTaskValues] = useState({
    name: " ",
    description: " ",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (taskValues.name === " " || taskValues.description === " ") {
      alert("Please enter a value");
    } else if (taskValues.name && taskValues.description && isEditing) {
      setTasks(
        tasks.map((task) => {
          if (task.id === editId) {
            return {
              ...task,
              name: taskValues.name,
              description: taskValues.description,
            };
          }
          return task;
        })
      );
      setEditId(null);
      setIsEditing(false);
      setTaskValues({ ...taskValues, name: " ", description: "" });
    } else {
      const newTask = {
        id: Date.now(),
        name: taskValues.name,
        description: taskValues.description,
      };
      setTasks([...tasks, newTask]);
      setTaskValues({ ...taskValues, name: " ", description: "" });
    }
  };

  const removeTasks = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const updateTasks = (id: number) => {
    const currentItem = tasks.find((task) => task.id === id)!;
    setEditId(id);
    setIsEditing(true);
    setTaskValues({
      ...taskValues,
      name: currentItem?.name,
      description: currentItem?.description,
    });
  };

  return (
    <main>
      <h1>Task Management Application</h1>
      <form onSubmit={handleSubmit}>
        <label className="inline-block">
          <span>Task Name</span>
          <input
            type="text"
            name="text"
            className=" mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            value={taskValues.name}
            onChange={(e) =>
              setTaskValues({ ...taskValues, name: e.target.value })
            }
          />
        </label>
        <label className="inline-block px-5">
          <span>Task Description</span>
          <input
            type="text"
            name="text"
            className=" mt-1 px-8 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 "
            value={taskValues.description}
            onChange={(e) =>
              setTaskValues({ ...taskValues, description: e.target.value })
            }
          />
        </label>
        <div className="w-40 inline-block">
          <label className="select inline-block text-sm font-medium text-gray-700">
            Task Status
          </label>
          <select id="select" className="form-select py-2 ml-10 mt-1 ">
            <option>To Do</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>
        <button type="submit" className="mx-10">
          {isEditing ? "Edit Task" : "Add Task"}
        </button>
      </form>
      <section className="task-list">
        {tasks.map((task) => {
          const { id, name, description } = task;
          return (
            <div key={id}>
              <h2>{name}</h2>
              <p>{description}</p>
              <button onClick={() => removeTasks(id)}>
                <AiFillDelete />
              </button>
              <button onClick={() => updateTasks(id)}>
                <FiEdit2 />
              </button>
            </div>
          );
        })}
      </section>
    </main>
  );
}
