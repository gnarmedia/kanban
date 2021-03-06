import React from "react";
import styled from "styled-components";
import { Draggable, Droppable } from "react-beautiful-dnd";

import Task from "./Task";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  min-height: 20px; /* ensure droppable area for empty list */
  padding: 8px;
  flex-grow: 1;
  transition: background-color 0.2s ease;
  background: ${({ isDraggingOver, isDropDisabled }) =>
    isDropDisabled ? "lightgrey" : isDraggingOver ? "skyblue" : "inherit"};
`;

export default function Group({ group, tasks, isDropDisabled, index }) {
  const { title, id } = group;

  return (
    <Draggable draggableId={id} index={index}>
      {provided => (
        <Container {...provided.draggableProps} ref={provided.innerRef}>
          <Title {...provided.dragHandleProps} ref={provided.innerRef}>{title}</Title>
          <Droppable
            droppableId={id}
            // type={id === "group3" ? "done" : "active"}
            isDropDisabled={isDropDisabled}
          >
            {(provided, { isDraggingOver }) => (
              <TaskList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={isDraggingOver}
                isDropDisabled={isDropDisabled}
              >
                {tasks.map((task, index) => (
                  <Task key={task.id} task={task} index={index} />
                ))}
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  );
}
