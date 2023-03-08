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

export class NotFoundError extends Error{
    constructor(message){
        super();
        if(message !== null && typeof message === undefined && message !==""){
            super.message = message;
        }
        else{
            super.message =  errorMessage.notFound;
        }
        this.name = "NotFoundError";
    }
}




const errorMessage={
    unauthorized: "Нямате достъп до търсеният ресурс. Моля, влезте в системата с вашето потребителско име и парола.",
    notFound:"Ресурсът не може да бъде намерен"
}