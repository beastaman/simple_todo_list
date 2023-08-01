import Card from "components/Card";
import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const Kanban = ({ data, setData, handleEditTask }) => {
  /**
   * Handle Drag and Drop Card Item
   */
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColIndex = data.findIndex((e) => e.id === source.droppableId);
      const destinationColIndex = data.findIndex(
        (e) => e.id === destination.droppableId
      );

      const sourceCol = data[sourceColIndex];
      const destinationCol = data[destinationColIndex];

      const sourceTask = [...sourceCol.tasks];
      const destinationTask = [...destinationCol.tasks];

      const [removed] = sourceTask.splice(source.index, 1);
      destinationTask.splice(destination.index, 0, removed);

      data[sourceColIndex].tasks = sourceTask;
      data[destinationColIndex].tasks = destinationTask;

      localStorage.setItem("dataTaskListState", JSON.stringify(data));
      setData(data);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="kanban">
        {data.map((section, index) => (
          <Droppable key={section.id} droppableId={section.id}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                className="kanban__section"
                ref={provided.innerRef}
              >
                <div
                  className={`kanban__section__title kanban__section__title-${index}`}
                >
                  <span>{section.title}</span>
                  {section.tasks.length}
                </div>
                <div className="kanban__section__content">
                  {section.tasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            opacity: snapshot.isDragging ? "0.5" : "1",
                          }}
                          onClick={() => handleEditTask(task)}
                        >
                          <Card data={task}>{task.title}</Card>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default Kanban;
