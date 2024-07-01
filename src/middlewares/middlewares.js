import userMiddleware from "./userIsLoggedInMiddleware";
import adminMiddleware from "./adminIsLoggedInMiddleware";
import redirectMiddleware from "./redirectIfLoggedMiddleware";
import managerMiddleware from "./managerIsLoggedInMiddleware";
import verifyIfIsLogged from "./generalIsLogged";

export const userIsLoggedInMiddleware = userMiddleware;
export const adminIsLoggedInMiddleware = adminMiddleware;
export const redirectIfLoggedMiddleware = redirectMiddleware;
export const managerIsLoggedInMiddleware = managerMiddleware;
export const generalIsLogged = verifyIfIsLogged;