import React from 'react';
import { useDrag } from 'react-dnd';

const NodeTypes = {
    TEXT_NODE: 'textNode',
};

const NodesPanel = () => {
    const [, drag] = useDrag(() => ({
        type: NodeTypes.TEXT_NODE,
        item: { type: NodeTypes.TEXT_NODE },
    }));

    return (
        <div ref={drag} style={{ width: 200, padding: 10, border: '1px solid #ddd' }}>
            <div>Text Node</div>
        </div>
    );
};

export default NodesPanel;
