import { IJwtPayload } from "@/types";
import { decodedToken } from "@/utils/jwt";
import Cookies from "js-cookie";

export const useGetUserData = (): IJwtPayload | null => {
    const token = Cookies.get("ekayzone_access_token");

    if (!token) return null;

    try {
        const userData = decodedToken(token) as IJwtPayload;
        return userData;
    } catch (error) {
        console.error("Invalid token", error);
        return null;
    }
};
