import React, { useState, useEffect } from 'react';

const SettingsPanel = ({ node, setNodes }) => {
    const [text, setText] = useState(node.data.label);

    useEffect(() => {
        setText(node.data.label);
    }, [node]);

    const handleChange = (event) => {
        const newText = event.target.value;
        setText(newText);
        setNodes((nodes) =>
            nodes.map((n) => (n.id === node.id ? { ...n, data: { ...n.data, label: newText } } : n))
        );
    };

    return (
        <div style={{ width: 200, padding: 10, border: '1px solid #ddd' }}>
            <textarea value={text} onChange={handleChange} />
        </div>
    );
};

export default SettingsPanel;
