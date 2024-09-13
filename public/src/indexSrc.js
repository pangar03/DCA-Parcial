import * as Components from "./components/indexComponents.js"

class AppContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <h1>Hola Mundo, yo soy un AppContainer</h1>
            <patient-board></patient-board>
        `;
    }

}

customElements.define("app-container", AppContainer);