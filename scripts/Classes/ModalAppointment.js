import postVisit from "../API/postVisit.js";
import getVisits from "../API/getVisits.js";
import {mainBlock} from "../variables.js";
import putVisit from "../API/putVisit.js";

class ModalAppointment {
    constructor(title, textButtonBlue) {
        this.title = title;
        this.textButtonBlue = textButtonBlue;

        this.darkBackground = document.createElement("div");
        this.modalContainer = document.createElement("div");
        this.fullName = document.createElement("input");
        this.purpose = document.createElement("input");
        this.description = document.createElement("input");
        this.doctorDropdown = document.createElement("select");
        this.urgencyDropdown = document.createElement("select");
        this.statusDropdown = document.createElement("select");
        this.lastVisit = document.createElement("input");
        this.age = document.createElement("input");
        this.diseases = document.createElement("input");
        this.pressure = document.createElement("input");
        this.bmi = document.createElement("input");
        this.buttonBlue = document.createElement("button");
    }

    render() {
        // Stop scrolling background
        document.body.style.overflow = "hidden";
        // Create dark background
        this.darkBackground.style.top = window.scrollY + "px";
        this.darkBackground.classList.add("dark-background");
        // Create modal window
        this.modalContainer.classList.add("modal-attention", "modal-container");
        // Title
        const modalTitle = document.createElement("span");
        modalTitle.classList.add("modal-container__title");
        modalTitle.textContent = this.title;
        // Inputs container
        const inputsContainer = document.createElement("div");
        inputsContainer.classList.add("modal-container__inputs-container")
        // Select doctor
        this.doctorDropdown.setAttribute("aria-label", "Select the doctor");
        this.doctorDropdown.classList.add("form-select", "my-2", "modal-container__inputs-container__select");
        this.doctorDropdown.setAttribute("id", "select-doctor")
        this.doctorDropdown.insertAdjacentHTML(
            "beforeend",
            `<option value="any">Select the doctor</option>
                  <option value="cardiologist">Cardiologist</option>
                  <option value="therapist">Therapist</option>
                  <option value="dentist">Dentist</option>
                `
        )
        // Select urgency
        this.urgencyDropdown.setAttribute("aria-label", "Select the urgency");
        this.urgencyDropdown.classList.add("form-select", "my-2", "modal-container__inputs-container__select");
        this.urgencyDropdown.setAttribute("id", "select-urgency")
        this.urgencyDropdown.insertAdjacentHTML(
            "beforeend",
            `<option value="any">Select the urgency</option>
                  <option value="low">Non-urgent</option>
                  <option value="medium">Priority</option>
                  <option value="high">Urgent</option>
                `
        );
        inputsContainer.append(this.doctorDropdown, this.urgencyDropdown);
        // Text fields
        const textField = (input, title, type, placeholder, idSelector, place) => {
            const block = document.createElement("div");
            block.classList.add("modal-container__inputs-container__text-block");
            const blockTitle = document.createElement("label");
            blockTitle.classList.add("modal-container__inputs-container__text-block__label");
            blockTitle.setAttribute("id", idSelector);
            blockTitle.textContent = title;
            input.setAttribute("id", idSelector);
            input.setAttribute("type", type);
            input.setAttribute("placeholder", placeholder);
            input.classList.add("modal-container__inputs-container__text-block__input");
            block.append(blockTitle, input);
            place.append(block)
        };

        textField(this.fullName, "Patient’s name", "text", "Enter full name", "patientNameInput", inputsContainer);
        textField(this.purpose, "Purpose", "text", "Enter purpose of the visit", "purposeInput", inputsContainer);
        textField(this.description, "Description", "text", "Enter short description", "descriptionInput", inputsContainer);

        const secondaryInfo = document.createElement("div");
        secondaryInfo.classList.add("modal-container__inputs-container__secondary-block");
        inputsContainer.append(secondaryInfo);

        this.doctorDropdown.addEventListener("input", () => {
            if (this.doctorDropdown.value === "dentist") {
                secondaryInfo.innerHTML = "";
                textField(this.lastVisit, "Last visit", "date", "dd.mm.yyyy", "lastVisitInput", secondaryInfo);
            } else if (this.doctorDropdown.value === "therapist") {
                secondaryInfo.innerHTML = "";
                textField(this.age, "Patient’s age", "text", "Enter patient's age", "patientAgeInput", secondaryInfo);
            } else if (this.doctorDropdown.value === "cardiologist") {
                secondaryInfo.innerHTML = "";
                textField(this.diseases, "Diseases", "text", "Enter patient's diseases", "patientDiseasesInput", secondaryInfo);
                textField(this.pressure, "Normal pressure", "text", "Enter patient's normal pressure", "patientPressureInput", secondaryInfo);
                textField(this.age, "Patient’s age", "text", "Enter patient's age", "patientAgeInput", secondaryInfo);
                textField(this.bmi, "BMI", "text", "Enter patient's BMI", "patientBmiInput", secondaryInfo);
            } else {
                secondaryInfo.innerHTML = "";
            }

        })

        //Buttons container
        const buttonsContainer = document.createElement("div");
        buttonsContainer.classList.add("modal-container__buttons-container");
        const buttonCancel = document.createElement("button");
        buttonCancel.classList.add("modal-container__buttons-container__cancel");
        buttonCancel.innerText = "Cancel";
        this.buttonBlue.classList.add("modal-container__buttons-container__disabled");
        this.buttonBlue.innerText = this.textButtonBlue;
        buttonsContainer.append(this.buttonBlue, buttonCancel);

        // Inserting
        this.modalContainer.append(modalTitle, inputsContainer, buttonsContainer);
        this.darkBackground.append(this.modalContainer);
        document.body.append(this.darkBackground);

        buttonCancel.addEventListener("click", (e) => {
            e.stopPropagation();
            document.body.style.overflow = "";
            this.modalContainer.remove();
            this.darkBackground.remove();
        })

        this.darkBackground.addEventListener("click", (e) => {
            if (!e.target.closest(".modal-container")) {
                e.stopPropagation();
                document.body.style.overflow = "";
                this.modalContainer.remove();
                this.darkBackground.remove();
            }
        })
    }

    create() {
        this.modalContainer.addEventListener("change", () => {
            if (this.fullName.value !== "" && this.urgencyDropdown.value !== "any" && this.purpose.value !== "" && this.description.value !== "" && this.doctorDropdown.value !== "any") {
                if (this.doctorDropdown.value === "dentist") {
                    if (this.lastVisit.value !== "") {
                        this.buttonBlue.classList.remove("modal-container__buttons-container__disabled");
                        this.buttonBlue.classList.add("modal-container__buttons-container__button-blue");
                    } else {
                        this.buttonBlue.classList.add("modal-container__buttons-container__disabled");
                        this.buttonBlue.classList.remove("modal-container__buttons-container__button-blue");
                    }

                } else if (this.doctorDropdown.value === "therapist") {
                    if (this.age.value !== "") {
                        this.buttonBlue.classList.remove("modal-container__buttons-container__disabled");
                        this.buttonBlue.classList.add("modal-container__buttons-container__button-blue");
                    } else {
                        this.buttonBlue.classList.add("modal-container__buttons-container__disabled");
                        this.buttonBlue.classList.remove("modal-container__buttons-container__button-blue");
                    }
                } else if (this.doctorDropdown.value === "cardiologist") {
                    if (this.pressure.value !== "" && this.bmi.value !== "" && this.diseases.value !== "" && this.age.value !== "") {

                        this.buttonBlue.classList.remove("modal-container__buttons-container__disabled");
                        this.buttonBlue.classList.add("modal-container__buttons-container__button-blue");
                    } else {
                        this.buttonBlue.classList.add("modal-container__buttons-container__disabled");
                        this.buttonBlue.classList.remove("modal-container__buttons-container__button-blue");
                    }
                }
            } else {
                this.buttonBlue.classList.add("modal-container__buttons-container__disabled");
                this.buttonBlue.classList.remove("modal-container__buttons-container__button-blue");
            }



        })

        this.buttonBlue.addEventListener("click", async () => {
            try {
                if (this.fullName.value !== "" && this.urgencyDropdown.value !== "any" && this.purpose.value !== "" && this.description.value !== "" && this.doctorDropdown.value !== "any") {
                    const visits = await getVisits(localStorage.getItem('token'));
                    let maxId = Math.max(...visits.map(obj => obj.id));

                    const body = {
                        fullName: this.fullName.value,
                        urgency: this.urgencyDropdown.value,
                        status: "Open",
                        purpose: this.purpose.value,
                        description: this.description.value,
                        doctor: this.doctorDropdown.value,
                        id: maxId++,

                    }
                    if (this.doctorDropdown.value === "dentist") {
                        if (this.lastVisit.value !== "") {
                            body.lastVisit = this.lastVisit.value;
                            console.log(this.lastVisit.value)
                            this.buttonBlue.classList.remove("modal-container__buttons-container__disabled");
                            this.buttonBlue.classList.add("modal-container__buttons-container__button-blue");
                        }

                    } else if (this.doctorDropdown.value === "therapist") {
                        if (this.age.value !== "") {
                            body.age = this.age.value;
                            this.buttonBlue.classList.remove("modal-container__buttons-container__disabled");
                            this.buttonBlue.classList.add("modal-container__buttons-container__button-blue");
                        }
                    } else if (this.doctorDropdown.value === "cardiologist") {
                        if (this.pressure.value !== "" && this.bmi.value !== "" && this.diseases.value !== "" && this.age.value !== "") {
                            body.pressure = this.pressure.value;
                            body.bmi = this.bmi.value;
                            body.diseases = this.diseases.value;
                            body.age = this.age.value;
                            this.buttonBlue.classList.remove("modal-container__buttons-container__disabled");
                            this.buttonBlue.classList.add("modal-container__buttons-container__button-blue");
                        }
                    }

                    await postVisit(body);
                    this.modalContainer.remove();
                    this.darkBackground.remove();
                    location.reload();
                }
            } catch (err) {
                console.log(err)
            }
        })
    }

    edit(doctor, urgency, status, fullName, purpose, description, age = "", lastVisit = "", diseases = "", pressure="", bmi = "", id) {
        this.buttonBlue.classList.add("modal-container__buttons-container__button-blue");
        this.buttonBlue.classList.remove("modal-container__buttons-container__disabled");

        this.modalContainer.addEventListener("change", () => {
            if (this.fullName.value !== "" && this.urgencyDropdown.value !== "any" && this.purpose.value !== "" && this.description.value !== "" && this.doctorDropdown.value !== "any") {
                if (this.doctorDropdown.value === "dentist") {
                    if (this.lastVisit.value !== "") {
                        this.buttonBlue.classList.remove("modal-container__buttons-container__disabled");
                        this.buttonBlue.classList.add("modal-container__buttons-container__button-blue");
                    } else {
                        this.buttonBlue.classList.add("modal-container__buttons-container__disabled");
                        this.buttonBlue.classList.remove("modal-container__buttons-container__button-blue");
                    }

                } else if (this.doctorDropdown.value === "therapist") {
                    if (this.age.value !== "") {
                        this.buttonBlue.classList.remove("modal-container__buttons-container__disabled");
                        this.buttonBlue.classList.add("modal-container__buttons-container__button-blue");
                    } else {
                        this.buttonBlue.classList.add("modal-container__buttons-container__disabled");
                        this.buttonBlue.classList.remove("modal-container__buttons-container__button-blue");
                    }
                } else if (this.doctorDropdown.value === "cardiologist") {
                    if (this.pressure.value !== "" && this.bmi.value !== "" && this.diseases.value !== "" && this.age.value !== "") {

                        this.buttonBlue.classList.remove("modal-container__buttons-container__disabled");
                        this.buttonBlue.classList.add("modal-container__buttons-container__button-blue");
                    } else {
                        this.buttonBlue.classList.add("modal-container__buttons-container__disabled");
                        this.buttonBlue.classList.remove("modal-container__buttons-container__button-blue");
                    }
                }
            } else {
                this.buttonBlue.classList.add("modal-container__buttons-container__disabled");
                this.buttonBlue.classList.remove("modal-container__buttons-container__button-blue");
            }

        })
        const textField = (input, title, type, placeholder, idSelector, place) => {
            const block = document.createElement("div");
            block.classList.add("modal-container__inputs-container__text-block");
            const blockTitle = document.createElement("label");
            blockTitle.classList.add("modal-container__inputs-container__text-block__label");
            blockTitle.setAttribute("id", idSelector);
            blockTitle.textContent = title;
            input.setAttribute("id", idSelector);
            input.setAttribute("type", type);
            input.setAttribute("placeholder", placeholder);
            input.classList.add("modal-container__inputs-container__text-block__input");
            block.append(blockTitle, input);
            place.append(block)
        };

        this.statusDropdown.setAttribute("aria-label", "Select the status");
        this.statusDropdown.classList.add("form-select", "my-2", "modal-container__inputs-container__select");
        this.statusDropdown.setAttribute("id", "select-status")
        this.statusDropdown.insertAdjacentHTML(
            "beforeend",
            `
                  <option value="open">Open</option>
                  <option value="done">Done</option>
                `
        );
        this.urgencyDropdown.after(this.statusDropdown);

        this.statusDropdown.value = status.toLowerCase();
        this.doctorDropdown.value = doctor.toLowerCase();
        this.doctorDropdown.querySelector("[value='any']").remove();
        this.urgencyDropdown.value = urgency;
        this.urgencyDropdown.querySelector("[value='any']").remove();
        this.fullName.value = fullName;
        this.purpose.value = purpose;
        this.description.value = description;

        const secondaryBlock = this.modalContainer.querySelector(".modal-container__inputs-container__secondary-block");

        const body = {
            fullName: this.fullName.value,
            urgency: this.urgencyDropdown.value,
            status: this.statusDropdown.value,
            purpose: this.purpose.value,
            description: this.description.value,
            doctor: this.doctorDropdown.value,
        }

        if (this.doctorDropdown.value === "therapist") {
            textField(this.age, "Patient’s age", "text", "Enter patient's age", "patientAgeInput", secondaryBlock);
            this.age.value = age;
            body.age = this.age.value;
        } else if (this.doctorDropdown.value === "dentist") {
            textField(this.lastVisit, "Last visit", "date", "dd.mm.yyyy", "lastVisitInput", secondaryBlock);
            this.lastVisit.value = lastVisit;
            body.lastVisit = this.lastVisit.value;
        } else if (this.doctorDropdown.value === "cardiologist") {
            textField(this.diseases, "Diseases", "text", "Enter patient's diseases", "patientDiseasesInput", secondaryBlock);
            textField(this.pressure, "Normal pressure", "text", "Enter patient's normal pressure", "patientPressureInput", secondaryBlock);
            textField(this.age, "Patient’s age", "text", "Enter patient's age", "patientAgeInput", secondaryBlock);
            textField(this.bmi, "BMI", "text", "Enter patient's BMI", "patientBmiInput", secondaryBlock);
            this.diseases.value = diseases;
            this.pressure.value = pressure;
            this.age.value = age;
            this.bmi.value = bmi;

            body.diseases = this.diseases.value;
            body.pressure = this.pressure.value;
            body.age = this.age.value;
            body.bmi = this.bmi.value;
        }



        this.buttonBlue.addEventListener("click", async () => {
            try {
                if (this.buttonBlue.classList.contains("modal-container__buttons-container__button-blue")) {
                    const body = {
                        fullName: this.fullName.value,
                        urgency: this.urgencyDropdown.value,
                        status: this.statusDropdown.value,
                        purpose: this.purpose.value,
                        description: this.description.value,
                        doctor: this.doctorDropdown.value,
                    }

                    if (this.doctorDropdown.value === "therapist") {
                        body.age = this.age.value;
                    } else if (this.doctorDropdown.value === "dentist") {
                        body.lastVisit = this.lastVisit.value;
                    } else if (this.doctorDropdown.value === "cardiologist") {
                        body.diseases = this.diseases.value;
                        body.pressure = this.pressure.value;
                        body.age = this.age.value;
                        body.bmi = this.bmi.value;
                    }

                    const res = await putVisit(id, body);
                    console.log(res);
                    this.modalContainer.remove();
                    this.darkBackground.remove();
                    document.body.style.overflow = "";
                    location.reload();
                }
            } catch (err) {
                console.log(err)
            }
        })
    }

}

export default ModalAppointment;