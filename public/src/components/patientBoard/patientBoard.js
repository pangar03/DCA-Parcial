import PatientCard from "../patientCard/patientCard.js"

class PatientBoard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});

        // Listas Pacientes
        this.patients = [];
    }

    connectedCallback() {
        this.render();
        const form = this.shadowRoot.querySelector(".patient-form")

        form.addEventListener("submit" , (e) => {
            e.preventDefault();

            const patientName = e.target.querySelector("#patient-name").value;
            const patientSpecies = e.target.querySelector("#patient-species").value;
            const dateIn = e.target.querySelector("#date-in").value;
            const symptoms = e.target.querySelector("#symptoms").value;

            this.addPatient(patientName, patientSpecies, dateIn, symptoms);
        })
    }

    addPatient(patientName, patientSpecies, dateIn, symptoms) {
        const patientCard = this.ownerDocument.createElement('patient-card')

        patientCard.setAttribute('patientname', patientName);
        patientCard.setAttribute('patientspecies', patientSpecies);
        patientCard.setAttribute('datein', dateIn);
        patientCard.setAttribute('symptoms', symptoms);
        patientCard.setAttribute('ispending', true);

        this.patients.push(patientCard);
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <h1>VetClinic</h1>
        `;

        // Formulario de ingreso de pacientes
        const patientForm = document.createElement('form');
        patientForm.classList.add("patient-form");
        patientForm.innerHTML= `
            <label for="patient-name">Nombre</label>
            <input type="text" name="patient-name" id="patient-name" placeholder="Nombre del paciente" required>
            <label for="patient-species">Especie</label>
            <input type="text" name="patient-species" id="patient-species" placeholder="Especie del paciente" required>
            <label for="date-in">Especie</label>
            <input type="date" name="date-in" id="date-in" required>
            <label for="symptoms">Sintomas</label>
            <input type="text" name="symptoms" id="symptoms" required>
            <input id="submit-button" type="submit" value="Agregar Tarea">
        `;

        this.shadowRoot.appendChild(patientForm);

        // Seccion de pacientes pendientes
        const pendingSection = document.createElement('section');
        pendingSection.classList.add("pending-section");
        const titlePending = document.createElement("h1");
        titlePending.textContent = "Pendientes";
        pendingSection.appendChild(titlePending);
        
        // Seccion de pacientes atendidos
        const treatedSection = document.createElement('section');
        treatedSection.classList.add("treated-section");
        const titleTreated = document.createElement("h1");
        titleTreated.textContent = "Atendidos";
        treatedSection.appendChild(titleTreated);
        
        this.patients.forEach(patient => {
            patient.ispending ? pendingSection.appendChild(patient) : treatedSection(patient);
        })

        this.shadowRoot.appendChild(pendingSection);
        this.shadowRoot.appendChild(treatedSection);
    }
}

customElements.define("patient-board", PatientBoard);
export default PatientBoard;