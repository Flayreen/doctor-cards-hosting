
import { btnLogin, btnCreate, btnOut,headerLogoExit,mainBlock} from "../variables.js";

function checkToken({status}) {
    try{
        if (status === 200) {
            btnLogin.style.display = "none";
            btnCreate.style.display = "flex";
            btnOut.style.display = "flex";
            headerLogoExit.style.display = "block";
            mainBlock.style.display = "grid";
        } else {
            localStorage.removeItem("token");
            btnLogin.style.display = "flex";
            btnOut.style.display = "none";
            btnCreate.style.display = "none";
            headerLogoExit.style.display = "none";
            mainBlock.style.display = "none";
        }
    } catch (error){
            console.log(error)}

  }
export default checkToken;