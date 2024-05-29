import React from 'react';
import { setItem } from '../utils/store';

const SaveButton = ({ nodes, edges }) => {
    const handleSave = () => {
        const invalidNodes = nodes.filter((node) => {
            const connectedEdges = edges.filter((edge) => edge.source === node.id);
            return connectedEdges.length === 0;
        });

        if (invalidNodes.length > 1) {
            alert('More than one node has an empty target handle.');
        } else {
            const prepData = { nodes : nodes, edges: edges }
            setItem(prepData);
            alert('Flow saved successfully!');
        }
    };

    return <button onClick={handleSave}>Save Flow</button>;
};

export default SaveButton;
