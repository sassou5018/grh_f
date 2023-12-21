import { isDevMode } from "@angular/core"
import { environment } from "src/environment/environment"
import { environment as prodEnv } from "src/environment/environment.prod"

const getEnv = ()=>{
    if(isDevMode()){
        return environment;
    }else{
        return prodEnv;
    }
}

export default getEnv;