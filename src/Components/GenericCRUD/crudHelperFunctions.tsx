export function getErrorInfo(error: any):string{
    if(error instanceof Error){
        return error.message;
    }
    else if(typeof error === "object"){
        if(error.errors){
            let errorString = "";
            errorString = errorString.concat(error.title+"\n");
            errorString = errorString.concat(`Status code: ${error.status}\n`);

            Object.entries(error.errors).forEach(([key, value]) => {

                errorString = errorString.concat(`-${key}: ${value.map((e:any)=>e).join("\n")}`);
            });
            return errorString;
        }
    }
    return error;
}