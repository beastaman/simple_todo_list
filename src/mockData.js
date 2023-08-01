import { v4 as uuidv4 } from "uuid";

const mockData = [
  {
    id: uuidv4(),
    title: "To do",
    tasks: [
      {
        id: uuidv4(),
        title: "Learn ReactJS",
      },
      {
        id: uuidv4(),
        title: "Learn Git",
      },
      {
        id: uuidv4(),
        title: "Learn NodeJS",
      },
    ],
  },
  {
    id: uuidv4(),
    title: "Doing",
    tasks: [
      {
        id: uuidv4(),
        title: "Learn GraphQL",
      },
      {
        id: uuidv4(),
        title: "Learn Amplify",
      },
    ],
  },
  {
    id: uuidv4(),
    title: "Done 🙌",
    tasks: [
      {
        id: uuidv4(),
        title: "Learn Vim",
      },
    ],
  },
];

export default mockData;
