import { useState } from 'react'
import './App.scss'
import { Button, Input, Modal } from '@pyxis/react';
import { Select } from '@pyxis/react';
import {FocusScope} from 'react-aria';

export interface Props {
  
}

export const App: React.FC<Props> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [documentName2, setDocumentName2] = useState('document');
  const [isOpenAria, setOpenAria] = useState(false);

  const portalContainer =
  document
    .getElementsByTagName("document-management")[0]
    ?.shadowRoot?.getElementById("document-management-modal-container") ??
  document.body;
  return (
    <>

<p>Here is the list of issues we're having when the project is built as a webcomponent.</p>
<p>
  <ul>

  <li>npm run build</li>
  <li>copy dist/index.js in the `script` element of example.html</li>
  <li>serve example.html (e.g npx serve)</li>
  </ul>
</p>

<h1>1. Issues with focus different inputs inside modal</h1>

<p>Here I have 2 inputs, I can swich focus between the two, but inside Modal does not work</p>
    <input placeholder="edit me"></input>
    <Input
          label="label"
          name="name"
          onChange={(e) => setDocumentName2(e)}
          placeholder="placeholder"
          value={documentName2}
        />

    <Button onClick={() => setIsOpen(true)}>Open</Button>
    <Modal
    id="mymodal"
      isOpen={isOpen}
      portalContainer={portalContainer}
      hasClosingButton={false}
      onClose={() => {
        setIsOpen(false);
        console.log('Global callback');
      }}
      
    >
      {() => ([
        <Modal.Header closeLabel="Close modal" title="Modal Title" />,
        <Modal.Content>

        <input placeholder="edit me"></input>

        <Input
          label="label"
          name="name"
          onChange={(e) => setDocumentName2(e)}
          placeholder="placeholder"
          value={documentName2}
        />
           
        </Modal.Content>,
        <Modal.Footer buttons={[]}
        />,
      ])}
    </Modal>

        <br/>
        I have the same behavior/bug simply using React Aria focusscope...<br/>
        <button onClick={() => setOpenAria(true)}>Open React Aria focusscope</button>
      {isOpenAria &&
        (
          <FocusScope contain restoreFocus autoFocus>
            <label htmlFor="first-input">First Input</label>
            <input id="first-input" />
            <label htmlFor="second-input">Second Input</label>
            <input id="second-input" />
            <button onClick={() => setOpenAria(false)}>Close</button>
          </FocusScope>
        )}

      
    <h1>2. Select doesn't open using mouseclick, only with keyboard (spacebar)</h1>
<Select
value="black"
  items={[
    {
      label: 'Black',
      value: 'black'
    },
    {
      label: 'Blue but also slightly purple to simulate a lengthy option list',
      value: 'blue but also slightly purple to simulate a lengthy option list'
    },
    {
      label: 'Green',
      value: 'green'
    },
    {
      label: 'Grey',
      value: 'grey'
    },
    {
      label: 'Light blue',
      value: 'light blue'
    },
    {
      label: 'Orange',
      value: 'orange'
    },
    {
      label: 'Pink',
      value: 'pink'
    },
    {
      label: 'Red',
      value: 'red'
    },
    {
      label: 'Violet',
      value: 'violet'
    },
    {
      label: 'White',
      value: 'white'
    },
    {
      label: 'Yellow',
      value: 'yellow'
    }
  ]}
  label="Label"
  name="default"
  onChange={() => {}}
  placeholder="Select an option..."
/>




<h1>3. Modal with hasClosingButton=true closes itself clicking anywhere inside the modal</h1>

    <Button onClick={() => setIsOpen(true)}>Open</Button>
    <Modal
    id="mymodal"
      isOpen={isOpen}
      portalContainer={portalContainer}
      hasClosingButton={true}
      onClose={() => {
        setIsOpen(false);
        console.log('Global callback');
      }}
      
    >
      {() => ([
        <Modal.Header closeLabel="Close modal" title="Modal Title" />,
        <Modal.Content>

        <input placeholder="edit me"></input>

        <Input
          label="label"
          name="name"
          onChange={(e) => setDocumentName2(e)}
          placeholder="placeholder"
          value={documentName2}
        />
           
        </Modal.Content>,
        <Modal.Footer buttons={[]}
        />,
      ])}
    </Modal>
  </>
);
}

export default App
