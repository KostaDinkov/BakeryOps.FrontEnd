
import createClient from "openapi-fetch";
import {paths} from "./apiSchema"
const baseUrl = import.meta.env.VITE_API_SERVER_URL;

export const apiClient = createClient<paths>({baseUrl,headers:{
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
}});





