export function getErrorInfo(error: any):string{
    if(error instanceof Error){
        return error.message;
    }
    else if(typeof error === "object"){
        if(error.errors){
            let errorString = "";
            errorString = errorString.concat(error.title+"\n");
            errorString = errorString.concat(`Status code: ${error.status}\n`);
            errorString = errorString.concat(error.errors["$"].map((e:any)=>e).join("\n"));
            return errorString;
        }

    }
    return "Грешка при react-query заявка";
    
}