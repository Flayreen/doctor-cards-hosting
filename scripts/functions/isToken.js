import { btnLogin, btnCreate, btnOut,headerLogoExit,mainBlock} from "../variables.js";
import renderVisits from "./renderVisits.js";

async function isToken() {
    const token = localStorage.getItem("token");

    if (token) {
        btnLogin.style.display = "none";
        btnCreate.style.display = "flex";
        btnOut.style.display = "flex";
        headerLogoExit.style.display = "block";
        mainBlock.style.display = "grid";
        await renderVisits(token);
    }
}

export default isToken;