import React from "react";
//import { useDrag } from 'react-dnd';
import SettingsPanel from "./SettingsPanel";

const ItemTypes = {
  NODE: "node",
};

const NodeItem = ({ type, label }) => {
  let isDragging = false;
  const onDragStart = (event, nodeType, content) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.setData("content", content);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      onDragStart={(event) => onDragStart(event, "node", "message")}
      draggable
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
        marginBottom: "10px",
        textAlign:'center',
        border:'1px solid #dddddd',
        borderRadius:'5px',
        padding:'12px'
      }}
    >
      {label}
    </div>
  );
};

const NodesPanel = (props) => {
  const { selectedNode, setNodes, setSelectedNode } = props;
  //console.log('select', selectedNode)
  return (
    <div style={{ width: 200, padding: 10, border: "1px solid #ddd" }}>
      {selectedNode ? (
        <SettingsPanel
          node={selectedNode}
          setNodes={setNodes}
          setSelectedNode={setSelectedNode}
        />
      ) : (
        <NodeItem type="default" label="Message" />
      )}
    </div>
  );
};

export default NodesPanel;
