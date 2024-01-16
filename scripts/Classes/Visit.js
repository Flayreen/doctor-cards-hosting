import ModalAttention from "./ModalAttention.js";
import ModalAppointment from "./ModalAppointment.js";

class Visit {
	constructor(fullName, urgency, status, description, purpose, id) {
		this.fullName = fullName;
		this.urgency = urgency;
		this.status = status;
		this.doctor = "any";
		this.description = description;
		this.purpose = purpose;
		this.id = id;

		this.element = document.createElement("div");
		this.buttonMore = document.createElement("button");
		this.buttonEdit = document.createElement("button");
		this.buttonDelete = document.createElement("button");
	}

	render() {
		// Create card container
		this.element.classList.add("card");
		this.element.dataset.urgency = this.urgency.toLowerCase();
		this.element.dataset.status = this.status.toLowerCase();

		// Create card title (patient's name)
		const cardTitle = document.createElement("p");
		cardTitle.classList.add("card__title");
		cardTitle.textContent = this.fullName;
		// Create card doctor
		const cardDoctor = document.createElement("span");
		cardDoctor.classList.add("card__doctor");
		cardDoctor.textContent = this.doctor;
		// Create button "Delete"
		this.buttonDelete.classList.add("card__button-delete");
		this.buttonDelete.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M18 6L6 18" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
		<path d="M6 6L18 18" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>`
		// Create buttons block
		const buttonsContainer = document.createElement("div");
		buttonsContainer.classList.add("card__buttons-container");
		// Button "Show more"
		this.buttonMore.classList.add("card__buttons-container__button-more");
		this.buttonMore.textContent = "Show more";
		// Button "Edit"
		this.buttonEdit.classList.add("card__buttons-container__button-edit");
		this.buttonEdit.textContent = "Edit";
		buttonsContainer.append(this.buttonMore, this.buttonEdit);
		// Create full card
		this.element.append(cardTitle, cardDoctor, this.buttonDelete, buttonsContainer);
		// Logic of adding cards to columns
		const containerMain = document.querySelector(".container--main");
		containerMain.append(this.element);
	}

	delete() {
		this.buttonDelete.addEventListener("click", () => {
			this.element.style.zIndex = "";
			this.element.style.height = "";
			this.element.style.boxShadow = "";
			this.element.querySelector(".card__hidden").style.display = "none";
			this.buttonMore.textContent = "Show more";

			const modalDelete = new ModalAttention (
				"Are you sure you want to delete the appointment?",
				"Delete"
			);
			modalDelete.createElement();
			modalDelete.remove(this.element, this.id);
		})
	}

	showMore() {
		// Create additional block
		const hideBlock = document.createElement("div");
		hideBlock.classList.add("card__hidden");
		hideBlock.style.display = "none";
		// Create urgency & status block
		const centralInfo = document.createElement("div");
		centralInfo.classList.add("card__hidden__central");
		// Urgency text
		const urgencyText = document.createElement("span");
		urgencyText.classList.add("card__hidden__central__urgency");
		urgencyText.textContent = this.urgency;
		// Status text
		const statusText = document.createElement("span");
		statusText.classList.add("card__hidden__central__status");
		statusText.textContent = this.status;
		centralInfo.append(urgencyText, statusText);
		hideBlock.append(centralInfo);

		// Create additional info
		const hideInfo = (title, value, selector) => {
			const block = document.createElement("div");
			block.classList.add("card__hidden__text-block");
			const blockTitle = document.createElement("span");
			blockTitle.classList.add("card__hidden__text-block__title");
			blockTitle.textContent = title;
			const blockValue = document.createElement("p");
			blockValue.classList.add(selector);
			blockValue.classList.add("card__hidden__text-block__description");
			blockValue.textContent = value;
			block.append(blockTitle, blockValue);
			hideBlock.append(block)
		};
		hideInfo("Purpose:", this.purpose, "js-purpose");
		hideInfo("Description:", this.description, "js-description");

		// Inserting hidden block inside this.element
		this.element.querySelector(".card__doctor").after(hideBlock);

		this.buttonMore.addEventListener("click", () => {
			if (this.buttonMore.textContent === "Show more") {
				this.element.style.height = "fit-content";
				this.element.style.boxShadow = "4px 4px 10px 0px rgba(0, 0, 0, 0.20)";
				this.element.style.zIndex = this.id;
				hideBlock.style.display = "flex";
				this.buttonMore.textContent = "Show less"
			} else {
				this.element.style.zIndex = "";
				this.element.style.height = "";
				this.element.style.boxShadow = "";
				hideBlock.style.display = "none";
				this.buttonMore.textContent = "Show more";
			}
		})

		document.addEventListener("click", (event) => {
			if (!this.element.contains(event.target) && this.element.contains(this.buttonEdit) && this.buttonMore.textContent === "Show less") {
				this.element.style.zIndex = "";
				this.element.style.height = "";
				this.element.style.boxShadow = "";
				hideBlock.style.display = "none";
				this.buttonMore.textContent = "Show more";
			}
		})
	}

	edit() {
		this.buttonEdit.addEventListener("click", () => {
			this.element.style.zIndex = "";
			this.element.style.height = "";
			this.element.style.boxShadow = "";
			this.element.querySelector(".card__hidden").style.display = "none";
			this.buttonMore.textContent = "Show more";

			const modalEdit = new ModalAppointment("Edit appointment", "Save");
			modalEdit.render();
			modalEdit.edit(this.doctor, this.urgency, this.status, this.fullName, this.purpose, this.description, this.age, this.lastVisit, this.disease, this.pressure, this.bmi, this.id);
		})
	}
}

export default Visit;