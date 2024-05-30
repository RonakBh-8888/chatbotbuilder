##Components

1. FlowBuilder.js
This is the main component that integrates all other components and manages the state of the flow.

State Management: Uses useState to manage nodes, edges, and the selected node.
Node and Edge Changes: Utilizes applyNodeChanges and applyEdgeChanges from reactflow to handle node and edge updates.
Node Selection: Allows users to select a node to view and edit its settings in the Settings Panel.

2. NodesPanel.js
A sidebar component that provides draggable node items.

NodeItem Component: Simply make nodes draggable.
Draggable Nodes: Currently supports a single type of node (Message) but can be extended to include other types.

3. SettingsPanel.js
A sidebar component that allows users to edit the properties of the selected node.

Text Editing: Provides an input field for editing the text content of a selected node.
State Update: Updates the nodes' state with the new text content.

4. SaveButton.js
A button component to save the current flow and perform validation checks.

Save Logic: Checks for incomplete nodes (nodes without edges) and displays an error if more than one such node is found.
(data will be stored in localStorage)
Flow Saving: Alerts the user that the flow has been saved successfully if no errors are found.



***************************************************Deployed***************************************************

URL : https://chatbotbuilder.netlify.app/


*************************************************Extensibility********************************************

The application is designed to be extensible:

Nodes Panel: Can be extended to include different types of nodes by adding more NodeItem components.
Node Data: Can include more properties and different types of data for each node.
Flow Validation: Can include more comprehensive checks and error handling during the save process.
