import React, { useState, useEffect } from 'react';

const SettingsPanel = ({ node, setNodes, setSelectedNode }) => {
    const [text, setText] = useState(node?.data?.content || '');

    // useEffect(() => {
    //     setText(node.data.label);
    // }, [node]);

    const handleChange = (event) => {
        const newText = event.target.value;
        setText(newText);
        setNodes((nodes) =>
            nodes.map((n) => (n.id === node.id ? { ...n, data: { ...n.data, content: newText } } : n))
        );
    };

    return (
        <div>
             <div onClick={()=>{setSelectedNode(null)}}>🔙</div>
             <div>
                <label>Text Message</label>
                <textarea style={{width:'100%'}} value={text} onChange={handleChange} />
             </div>
        </div>
       
    );
};

export default SettingsPanel;
