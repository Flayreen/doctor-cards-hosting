
import logOut from "../functions/logOut.js";
import deleteVisit from "../API/deleteVisit.js";
import {filterCards} from "../functions/filter.js";
class ModalAttention {
    constructor(modalText, buttonRed) {
        this.modalText = modalText;
        this.buttonRed = buttonRed;
        
        //black background container
        this.darkBackground = document.createElement("div");
        //заг контейнер
        this.modalContainer = document.createElement("div");
        //заголовок
        this.modalTextELement = document.createElement("span");
        //контейнер для кнопок
        this.buttonsContainer = document.createElement("div");
        //кнопки
        this.buttonCancel = document.createElement("button");
        this.buttonRedElement = document.createElement("button");
    }
    
    createElement() {
        this.body = document.querySelector("body");
        // Stop scrolling background
        this.body.style.overflow = "hidden";
        // Create dark background
        this.darkBackground.style.top = window.scrollY + "px";
        this.darkBackground.classList.add("dark-background");
        // Create modal window
        this.modalContainer.classList.add("modal-attention");
        // Text
        this.modalTextELement.classList.add("modal-attention__text");
        this.modalTextELement.innerText = this.modalText;
        // Buttons container
        this.buttonsContainer.classList.add("modal-attention__buttons-container");
        // Button "Cancel"
        this.buttonCancel.classList.add("modal-attention__buttons-container__button-cancel");
        this.buttonCancel.textContent = "Cancel";
        // Button "Log out"
        this.buttonRedElement.classList.add("modal-attention__buttons-container__button-out");
        this.buttonRedElement.innerText = this.buttonRed;
        this.buttonsContainer.append(this.buttonCancel, this.buttonRedElement);
        this.modalContainer.append(this.modalTextELement, this.buttonsContainer);
        this.body.append(this.darkBackground, this.modalContainer);
    
        // Event of darkBackground
        this.darkBackground.addEventListener("click", (e) => {
            document.body.style.overflow = ""; // фікс пропадаючого скрола
            e.stopPropagation();
            this.body.style.overflow = "";
            this.darkBackground.remove();
            this.modalContainer.remove();
        })
        // Event of cancel log out
        this.buttonCancel.addEventListener("click", (e) => {
            e.stopPropagation();
            this.body.style.overflow = "";
            this.darkBackground.remove();
            this.modalContainer.remove();
        })
    }
    
    exit() {
        this.buttonRedElement.addEventListener("click", (e) => {
            e.stopPropagation();
            this.body.style.overflow = "";
            this.darkBackground.remove();
            this.modalContainer.remove();
            logOut();
        })
    }

    remove(element, id) {
        this.buttonRedElement.addEventListener("click", async () => {
            try {
                const response = await deleteVisit(id);
                if (response.status === 200) {
                    element.remove()
                    this.body.style.overflow = "";
                    this.darkBackground.remove();
                    this.modalContainer.remove();
                    filterCards(); // Бо після видалення картки треба оновити кількість карток (Eddy).
                }
            } catch (err) {
                console.log(err)
            }
        });
    }

}
export default ModalAttention
