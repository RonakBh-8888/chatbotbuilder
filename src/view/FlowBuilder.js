import React, { useState } from 'react';
import ReactFlow, { addEdge, Background, Controls, MiniMap, applyEdgeChanges, applyNodeChanges } from 'reactflow';
import 'reactflow/dist/style.css';

import NodesPanel from './NodesPanel';
import SettingsPanel from './SettingsPanel';
import SaveButton from './SaveButton';

const FlowBuilder = () => {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [selectedNode, setSelectedNode] = useState(null);

    const onNodesChange = (changes) => setNodes((nds) => applyNodeChanges(changes, nds));
    const onEdgesChange = (changes) => setEdges((eds) => applyEdgeChanges(changes, eds));
    const onConnect = (params) => setEdges((eds) => addEdge(params, eds));

    const onNodeClick = (event, node) => {
        setSelectedNode(node);
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <NodesPanel />
            <div style={{ flexGrow: 1 }}>
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

export default FlowBuilder;
