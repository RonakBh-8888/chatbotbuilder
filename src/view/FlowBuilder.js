import React, { useState, useCallback, useRef } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  applyNodeChanges,
  applyEdgeChanges,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";

import NodesPanel from "./NodesPanel";
import SaveButton from "./SaveButton";

import { MarkerType } from "reactflow";
import NodeComp from "./NodeComp";
import { getItem, removeData, setItem } from "../utils/store";

const NodeType = { node: NodeComp };

const FlowBuilder = () => {
  const data = getItem();
  const [nodes, setNodes] = useState(data?.nodes);
  const [edges, setEdges] = useState(data?.edges);
  const [selectedNode, setSelectedNode] = useState(null);
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onInit = (reactFlowInstance) => setReactFlowInstance(reactFlowInstance);

  const onNodesChange = (changes) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  };

  const onEdgesChange = (changes) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  };

  const onConnect = useCallback((params) => {
    setEdges((eds) =>
      addEdge(
        {
          ...params,
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
        },
        eds
      )
    );
  }, []);

  const onDrop = (event) => {
    event.preventDefault();

    if (!reactFlowWrapper.current) {
      return;
    }

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData("application/reactflow");

    // check if the dropped element is valid
    if (typeof type === "undefined" || !type) {
      return;
    }

    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });

    const newNode = {
      id: `${nodes.length + 1}`,
      type,
      position,
      data: {
        heading: "Send Message",
        content: `This is text ${nodes.length + 1}`,
      },
    };

    setNodes((nds) => nds.concat(newNode));
  };

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onNodeClick = (event, node) => {
    setSelectedNode(node);
  };

  return (
    <React.Fragment>
      <div
        style={{ background: "yellow", padding: "10px", textAlign: "center" }}
      >
        <SaveButton nodes={nodes} edges={edges} />
      </div>

      <div style={{ display: "flex", height: "100vh" }}>
        <ReactFlowProvider>
          <div
            style={{ flexGrow: 1, position: "relative" }}
            ref={reactFlowWrapper}
          >
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={NodeType}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={onInit}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onNodeClick={onNodeClick}
              attributionPosition="top-right"
            >
              <MiniMap />
              <Controls />
              <Background />
            </ReactFlow>
          </div>
        </ReactFlowProvider>
        <NodesPanel
          selectedNode={selectedNode}
          setNodes={setNodes}
          setSelectedNode={setSelectedNode}
        />
      </div>
    </React.Fragment>
  );
};

let id = 0;
const getId = () => `dndnode_${id++}`;

export default FlowBuilder;
