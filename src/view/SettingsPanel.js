import React, { useState, useEffect } from "react";

const SettingsPanel = ({ node, setNodes, setSelectedNode }) => {
  const [text, setText] = useState(node?.data?.content || "");

  useEffect(() => {
    setText(node?.data?.content);
  }, [node]);

  const handleChange = (event) => {
    const newText = event.target.value;
    setText(newText);
    setNodes((nodes) =>
      nodes.map((n) =>
        n.id === node.id ? { ...n, data: { ...n.data, content: newText } } : n
      )
    );
  };

  return (
    <div>
      <div style={{display:"flex",height:'38px', borderBottom:'1px solid #ddd'}}>
        <div
          onClick={() => {
            setSelectedNode(null);
          }}
        >
          🔙
        </div>
        <p style={{marginBlockEnd:'0px', marginBlockStart:'0px'}}>Message</p>
      </div>
      <div style={{marginTop:'10px'}}>
        <textarea
          style={{ width: "100%" }}
          value={text}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default SettingsPanel;
