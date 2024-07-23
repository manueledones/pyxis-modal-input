import { useState } from 'react'
import './App.scss'
import { Button, Input, Modal } from '@pyxis/react';
import { Select } from '@pyxis/react';

export interface Props {
  
}

export const App: React.FC<Props> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [documentName2, setDocumentName2] = useState('document');

  const portalContainer =
  document
    .getElementsByTagName("document-management")[0]
    ?.shadowRoot?.getElementById("document-management-modal-container") ??
  document.body;
  return (
    <>

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
  </>
);
}

export default App
