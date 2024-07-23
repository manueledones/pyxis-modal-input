/* eslint-disable no-console */

import ReactDOM from "react-dom/client";
import App from "./App";

// We're using vite-plugin-shadow-style to attach the style of all React components inside the web component
// (vitejs by default put it under the root <style> element but we don't want to pollute the style of host application)
// Also the following is put inside the web component shadow DOM.
import "./index.scss";

// This style instead will be loaded outside the shadow DOM element, in the root <style> element
// Since we're using vite-plugin-shadow-style we're using ?inline to put its content in a place which is not the default one.
// https://vitejs.dev/guide/features.html#disabling-css-injection-into-the-page
import global from "src/global.scss?inline";

class DocumentManagement extends HTMLElement {
  static #globalStyleId = "document-management-global-style-unique-id";

  constructor() {
    // Always call super first in constructor
    super();
  }

  disconnectedCallback() {
    // remove global style, this should be useful when the webcomponent will be
    // connected/disconnected by routing (e.g navigating back and forth to different tabs)
    const globalStyleElement = document.getElementById(
      DocumentManagement.#globalStyleId,
    );
    globalStyleElement?.remove();
  }

  connectedCallback() {
    console.log("document-management: connectedCallback");

    // create <style> element attached to <html><head> (mainly for pyxis css variables)
    const globalStyleElement = document.createElement("style");
    globalStyleElement.id = DocumentManagement.#globalStyleId;
    globalStyleElement.textContent = global;
    document.head.appendChild(globalStyleElement);

    // Create some CSS to apply to the shadow dom
    // https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM#applying_styles_inside_the_shadow_dom
    const style = document.createElement("style");
    style.textContent += SHADOW_STYLE;

    // Create a shadow root
    const shadow = this.attachShadow({ mode: "open" });

    // Attach the created elements to the shadow dom
    shadow.appendChild(style);
    console.log("style.isConnected: " + style.isConnected);

    const div = document.createElement("div");
    shadow.appendChild(div);

    // container element where pyxis modal will be attached to
    const modalContainer = document.createElement("div");
    modalContainer.id = "document-management-modal-container";
    shadow.appendChild(modalContainer);

    const root = ReactDOM.createRoot(div!);


    root.render(<App />);
  }
}

customElements.define("document-management", DocumentManagement);
