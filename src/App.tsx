import { useState } from 'react'
import './App.scss'
import { Autocomplete, Button, Input, Modal } from '@pyxis/react';
import { Select } from '@pyxis/react';
import {FocusScope} from 'react-aria';

export interface Props {
  
}

export const App: React.FC<Props> = () => {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const [documentName, setDocumentName] = useState('');

  const [isOpenAria, setOpenAria] = useState(false);

  const portalContainer =
  document
    .getElementsByTagName("document-management")[0]
    ?.shadowRoot?.getElementById("document-management-modal-container") ??
  document.body;
  return (
    <>

<p>Here is the list of issues we're having when the project is built as a webcomponent.</p>
  <ul>

  <li>npm run build</li>
  <li>copy dist/index.js in the `script` element of example.html</li>
  <li>serve example.html (e.g npx serve)</li>
  </ul>

<hr />
<hr />
<hr />

<h1>1. Issues with focus different inputs inside modal</h1>

<p>Here I have 2 inputs, I can swich focus between the two, but inside Modal does not work</p>
<Input
          label="label"
          name="name"
          onChange={(e) => setDocumentName(e)}
          placeholder="edit me 1"
          value={documentName}
        />    <Input
          label="label"
          name="name"
          onChange={(e) => setDocumentName(e)}
          placeholder="edit me 2"
          value={documentName}
        />

    <Button onClick={() => setIsOpen1(true)}>Open</Button>
    <Modal
    id="mymodal1"
      isOpen={isOpen1}
      portalContainer={portalContainer}
      hasClosingButton={false}
      onClose={() => {
        setIsOpen1(false);
        console.log('Global callback');
      }}
      
    >
      {() => ([
        <Modal.Header closeLabel="Close modal" title="Modal Title" />,
        <Modal.Content>

<Input
          label="label"
          name="name"
          onChange={(e) => setDocumentName(e)}
          placeholder="placeholder"
          value={documentName}
        />

        <Input
          label="label"
          name="name"
          onChange={(e) => setDocumentName(e)}
          placeholder="placeholder"
          value={documentName}
        />
           
        </Modal.Content>,
        <Modal.Footer buttons={[]}
        />,
      ])}
    </Modal>

        <br/>
<br/>

        I have the exact same behavior/bug simply using React Aria focusscope.<br/>
        If you click on the button 2 inputs and a Close button will appear.<br/>
        In the no-webcomponent version you can tab between these 3 elements.<br/>
        In the webcomponent version you cannot move the focus from the 1st input to the 2nd, but only from the 2nd to the 1st.
        <br/>
        <Button onClick={() => setOpenAria(true)}>Open React Aria focusscope</Button>
      {isOpenAria &&
        (
          <FocusScope contain restoreFocus autoFocus>
            <label htmlFor="first-input">First Input</label>
            <input id="first-input" placeholder='edit me 1' />
            <label htmlFor="second-input">Second Input</label>
            <input id="second-input" placeholder='edit me 2' />
            <Button onClick={() => setOpenAria(false)}>Close</Button>
          </FocusScope>
        )}

<hr />
<hr />
<hr />
    <h1>2. Select/Autocomplete doesn't open using mouseclick, only with keyboard (spacebar)</h1>
    This looks somehow related to the useClickOutside, if removed, it works property even inside the web-component version.
      <br />
      In the web-component version event.target is <pre>{
        
        `<document-management> #shadow-root</document-management>`}</pre> and this is the issue I think.
    
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
  name="select_1"
  onChange={() => {}}
  placeholder="Select an option..."
/>


<Autocomplete
value="green"
  items={[
    {
      label: 'Beige',
      value: 'beige'
    },
    {
      label: 'Black',
      value: 'black'
    },
    {
      label: 'Blue',
      value: 'blue'
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
  name="autocomplete_1"
  onChange={function fa(){}}
  placeholder="Choose a color"
/>


<hr />
<hr />
<hr />
<h1>3. Modal with hasClosingButton=true closes itself clicking anywhere inside the modal</h1>

    <Button onClick={() => setIsOpen2(true)}>Open</Button>
    <Modal
    id="mymodal"
      isOpen={isOpen2}
      portalContainer={portalContainer}
      hasClosingButton={true}
      onClose={() => {
        setIsOpen2(false);
        console.log('Global callback');
      }}
      
    >
      {() => ([
        <Modal.Header closeLabel="Close modal" title="Modal Title" />,
        <Modal.Content>

<Input
          label="label"
          name="name"
          onChange={(e) => setDocumentName(e)}
          placeholder="edit me 1"
          value={documentName}
        />
        <Input
          label="label"
          name="name"
          onChange={(e) => setDocumentName(e)}
          placeholder="edit me 2"
          value={documentName}
        />
           
        </Modal.Content>,
        <Modal.Footer buttons={[]}
        />,
      ])}
    </Modal>
    <hr />


  </>
);
}

export default App
