import Visit from "./Visit.js";
import ModalAppointment from "./ModalAppointment.js";

class VisitTherapist extends Visit {
	constructor(fullName, urgency, status, description, purpose, id, age){
		super(fullName, urgency, status, description, purpose, id);
		this.fullName = fullName;
		this.urgency = urgency;
		this.status = status;
		this.description = description;
		this.purpose = purpose;
		this.id = id;
		this.age = age;
		this.doctor = "Therapist";
	}

	// Default from parent class Visit
	render() {
		super.render();
		this.delete();
		this.showMore();
		this.edit();
	};

	edit() {
		super.edit();
	}

	// Default from parent class Visit
	delete() {
		super.delete();
	}

	showMore() {
		super.showMore();

		const hideInfo = (title, value) => {
			const block = document.createElement("div");
			block.classList.add("card__hidden__text-block");
			const blockTitle = document.createElement("span");
			blockTitle.classList.add("card__hidden__text-block__title");
			blockTitle.textContent = title;
			const blockValue = document.createElement("p");
			blockValue.classList.add("card__hidden__text-block__description");
			blockValue.textContent = value;
			block.append(blockTitle, blockValue);
			this.element.querySelector(".card__hidden").append(block)
		};
		hideInfo("Age:", `${this.age} years`);
	}
}

export default VisitTherapist;