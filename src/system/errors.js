export class UnauthorizedError extends Error{
    constructor(message){
        super();
        if(message !== null && typeof message === undefined && message !==""){
            super.message = message;
        }
        else{
            super.message =  errorMessage.unauthorized;
        }
        this.name = "UnauthorizedError";
    }
}




const errorMessage={
    unauthorized: "Нямате достъп до търсеният ресурс. Моля, влезте в системата с вашето потребителско име и парола."
}