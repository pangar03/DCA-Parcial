class PatientCard extends HTMLElement {
    static get observedAttributes() {
        return['patientname', 'patientspecies', 'datein', 'symptoms', 'ispending'];
    }

    attributeChangedCallback(propName, oldValue, newValue){
        if (oldValue !== newValue) {
            this[propName] = propName === 'ispending' ? newValue === 'true' : newValue
            this.render()
        }
    }

    togglePending(){
        this.ispending = !this.ispending
        this.render()
    }

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <div class="${this.ispending ? "Pendiente" : "Atendido"}">
                <h2 class="state">${this.ispending ? "Pendiente" : "Atendido"}</h2>
                <h1>Nombre: ${this.patientname}</h1>
                <h4>Especie: ${this.patientspecies}</h4>
                <h4>Fecha de ingreso</h4>
                <p>${this.datein}</p>
                <h5>Sintomas</h5>
                <p>${this.symptoms}</p>
                <input type="checkbox" ${this.ispending ? "" : "checked"} class="pending-checkbox">
            </div>
        `;

        const checkbox = this.shadowRoot.querySelector('.pending-checkbox')
        checkbox.addEventListener('change', () => this.togglePending())
    }

}

customElements.define("patient-card", PatientCard);
export default PatientCard;