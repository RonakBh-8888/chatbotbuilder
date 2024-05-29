import { MarkerType } from "reactflow";

const InitData = {
  nodes: [
    {
      id: "1",
      type: "node",
      data: { heading: "Send Message", content: "This is text 1" },
      position: { x: 50, y: 200 },
    },
    {
      id: "2",
      type: "node",
      data: { heading: "Send Message", content: "This is text 2" },
      position: { x: 300, y: 100 },
    },
  ],
  edges: [
    {
      id: "e1-2",
      source: "1",
      target: "2",
      // label: "this is an edge label",
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    },
  ],
};

export const setItem = (data = {}) => {
  localStorage.setItem("chatFlow", JSON.stringify(data));
};

export const getItem = () => {
  const resData = JSON.parse(localStorage.getItem("chatFlow"));
  return resData || InitData;
};

export const removeData = () => {
  localStorage.removeItem("chatFlow");
};
