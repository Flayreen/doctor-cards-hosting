// VARIABLES
import {btnLogin, btnCreate, btnOut, headerLogo, headerLogoExit} from "./variables.js";
import {formLogin, mainBlock} from "./variables.js";

//	FUNCTIONS:
import { filterCards, filtersReset } from "./functions/filter.js";
import checkToken from "./functions/checkToken.js";
import logOut from "./functions/logOut.js";
import login from "./functions/login.js";
import isToken from "./functions/isToken.js";

//Classes
import ModalAttention from "./Classes/ModalAttention.js";
import ModalLogin from "./Classes/ModalLogin.js";
import ModalAppointment from "./Classes/ModalAppointment.js";



// Перевірка на те, чи є токен при загрузці сторінки
document.addEventListener("DOMContentLoaded", async () => {
	await isToken();
	new ModalLogin().render();
})


// єдиний слухач для всіх фільтрів:
document.querySelector('.filters__wrapper').addEventListener('input', () => {
	filterCards();
});

// слухач для кнопки очищення фільтрів:
document.querySelector('#filter-reset').addEventListener('click', filtersReset);


btnOut.addEventListener('click',  (e) => {
	e.preventDefault();
	const Attention = new ModalAttention("Are you sure you want out?","Log out");
	Attention.createElement();
	Attention.exit();
});
headerLogoExit.addEventListener('click',  (e) => {
	e.preventDefault();
	const Attention = new ModalAttention("Are you sure you want out?","Log out");
	Attention.createElement();
	Attention.exit();
	
});

btnCreate.addEventListener("click", (e) => {
	const modalCreate = new ModalAppointment("Create appointment", "Create");
	modalCreate.render();
	modalCreate.create();
})


