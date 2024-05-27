import React, { useState, useCallback } from 'react';
import ReactFlow, { addEdge, Background, Controls, MiniMap, applyEdgeChanges, applyNodeChanges } from 'reactflow';
import 'reactflow/dist/style.css';
import { useDrop } from 'react-dnd';

import NodesPanel from './NodesPanel';
import SettingsPanel from './SettingsPanel';
import SaveButton from './SaveButton';

const initialElements = [];

const FlowBuilder = () => {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [selectedNode, setSelectedNode] = useState(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);

    const onNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
    const onEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);
    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

    const onDrop = useCallback((event) => {
        const reactFlowBounds = event.target.getBoundingClientRect();
        const type = event.dataTransfer.getData('application/reactflow');

        // check if the dropped element is valid
        if (typeof type === 'undefined' || !type) {
            return;
        }

        const position = reactFlowInstance.project({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
        });

        const newNode = {
            id: getId(),
            type,
            position,
            data: { label: `${type} node` },
        };

        setNodes((nds) => nds.concat(newNode));
    }, []);

    const [{ isOver }, drop] = useDrop(
        () => ({
            accept: 'textNode',
            drop: onDrop,
            collect: (monitor) => {
                console.log('------------', monitor)
                return({
                isOver: !!monitor.isOver(),
            })},
        }),
        [onDrop]
    );
    console.log('drop------------', drop)
    const onNodeClick = (event, node) => {
        setSelectedNode(node);
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <NodesPanel />
            <div style={{ flexGrow: 1 }} ref={drop}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onNodeClick={onNodeClick}
                >
                    <MiniMap />
                    <Controls />
                    <Background />
                </ReactFlow>
                <SaveButton nodes={nodes} edges={edges} />
            </div>
            {selectedNode && <SettingsPanel node={selectedNode} setNodes={setNodes} />}
        </div>
    );
};

let id = 0;
const getId = () => `dndnode_${id++}`;

export default FlowBuilder;
