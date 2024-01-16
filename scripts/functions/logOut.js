
import { btnLogin, btnOut, btnCreate, headerLogoExit, mainBlock } from "../variables.js";
import {filterCards, showHideSectionFilters} from "./filter.js";

function logOut() {
	try {
		localStorage.removeItem("token");
		btnLogin.style.display = "flex";
		btnOut.style.display = "none";
		btnCreate.style.display = "none";
		headerLogoExit.style.display = "none";
		mainBlock.innerHTML = "";
		filterCards(); // Бо після виходу треба перерахувати картки.
		showHideSectionFilters(); // Чи ховати фільтри від аноніма.
	}
	catch (error) {
		console.log(error)
	}
}

export default logOut;