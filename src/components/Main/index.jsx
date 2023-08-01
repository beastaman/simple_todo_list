import { ReactComponent as DropdownIcon } from "assets/icon/dropdown-icon.svg";
import Kanban from "components/Kanban";
import LogoComponent from "components/LogoComponent";
import ModalNewTask from "components/ModalNewTask";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

const Main = () => {
  const [dataTaskList, setDataTaskList] = useState(
    localStorage.getItem("dataTaskListState")
      ? JSON.parse(localStorage.getItem("dataTaskListState"))
      : [
          {
            id: "field-1-to-do",
            title: "To do",
            tasks: [],
          },
          {
            id: "field-2-doing",
            title: "Doing",
            tasks: [],
          },
          {
            id: "field-3-done",
            title: "Done 🙌",
            tasks: [],
          },
        ]
  );
  const [isShowModalNewTask, setIsShowModalNewTask] = useState(false);
  const [activeTask, setActiveTask] = useState({});
  const [isEditTask, setIsEditTask] = useState(false);

  /**
   * Handle initialization state
   */
  useEffect(() => {
    localStorage.setItem("dataTaskListState", JSON.stringify(dataTaskList));
  }, [dataTaskList]);

  /**
   * Handle close Modal create new task
   */
  const handleCloseModalNewTask = (item) => {
    if (item.title.trim().length > 0) {
      if (isEditTask) {
        const tmpDataTaskList = dataTaskList.map((field) => ({
          ...field,
          tasks: field.tasks.filter((task) => task.id !== item.id),
        }));
        if (item.status === "doing") {
          setDataTaskList([
            { ...tmpDataTaskList[0] },
            {
              ...tmpDataTaskList[1],
              tasks: [...tmpDataTaskList[1].tasks, item],
            },
            { ...tmpDataTaskList[2] },
          ]);
        } else if (item.status === "done") {
          setDataTaskList([
            { ...tmpDataTaskList[0] },
            { ...tmpDataTaskList[1] },
            {
              ...tmpDataTaskList[2],
              tasks: [...tmpDataTaskList[2].tasks, item],
            },
          ]);
        } else {
          setDataTaskList([
            {
              ...tmpDataTaskList[0],
              tasks: [...tmpDataTaskList[0].tasks, { ...item, status: "todo" }],
            },
            { ...tmpDataTaskList[1] },
            { ...tmpDataTaskList[2] },
          ]);
        }
      } else {
        if (item.status === "doing") {
          setDataTaskList([
            { ...dataTaskList[0] },
            { ...dataTaskList[1], tasks: [...dataTaskList[1].tasks, item] },
            { ...dataTaskList[2] },
          ]);
        } else if (item.status === "done") {
          setDataTaskList([
            { ...dataTaskList[0] },
            { ...dataTaskList[1] },
            { ...dataTaskList[2], tasks: [...dataTaskList[2].tasks, item] },
          ]);
        } else {
          setDataTaskList([
            {
              ...dataTaskList[0],
              tasks: [...dataTaskList[0].tasks, { ...item, status: "todo" }],
            },
            { ...dataTaskList[1] },
            { ...dataTaskList[2] },
          ]);
        }
      }
    }
    setActiveTask({});
    setIsShowModalNewTask(false);
    setIsEditTask(false);
  };

  /**
   * Handle Edit task item
   */
  const handleEditTask = (item) => {
    setActiveTask(item);
    setIsEditTask(true);
    setIsShowModalNewTask(true);
  };

  /**
   * Handle Delete task item
   */
  const handleDeleteTask = (item) => {
    const tmpDataTaskList = dataTaskList.map((field) => ({
      ...field,
      tasks: field.tasks.filter((task) => task.id !== item.id),
    }));
    setDataTaskList(tmpDataTaskList);
    setActiveTask({});
    setIsShowModalNewTask(false);
    setIsEditTask(false);
  };

  return (
    <>
      <div id="main" className="main">
        <div className="main-heading">
          <h1 className="main-heading--title">
            <LogoComponent size={36} /> Task List
          </h1>
          <div className="main-heading--sub-title">
            Use this template to track your personal tasks. <br />
            Click <span>+&nbsp;&nbsp;New</span> to create a new task directly on
            this board.
            <br />
            Click an existing task to add additional context or subtasks.
          </div>
        </div>
        <div className="main-content">
          <div className="main-content__nav">
            <Button onClick={() => setIsShowModalNewTask(true)}>
              New{" "}
              <span>
                <DropdownIcon />
              </span>
            </Button>
          </div>
          <div className="main-content__kanban">
            <Kanban
              data={dataTaskList}
              setData={setDataTaskList}
              handleEditTask={handleEditTask}
            />
          </div>
        </div>
      </div>

      {isShowModalNewTask && (
        <ModalNewTask
          show={isShowModalNewTask}
          handleClose={handleCloseModalNewTask}
          activeTask={activeTask}
          isEditTask={isEditTask}
          handleDeleteTask={handleDeleteTask}
        />
      )}
    </>
  );
};

export default Main;
