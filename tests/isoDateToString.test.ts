import { expect, test } from "vitest";
import {isoDateToString} from "../src/system/utils";    
test("isoDateToString should return 'undefined date'", async () => {

    let result = isoDateToString(undefined);
    expect(result).toBe("undefined date");

});
test("isoDateToString should return 'Invalid Date' ", async()=>
{
    let result = isoDateToString("2022-13-12");
    expect(result).toBe("Invalid Date");

    result = isoDateToString("some string");
    expect(result).toBe("Invalid Date");
})
test("isoDateToString should return formatted date string ", async()=>{
    let result = isoDateToString("2011-10-05T14:48:00Z");
    expect(result).toBe("05.10.2011");

    result = isoDateToString("2025-12-31T23:59:59");
    expect(result).toBe("31.12.2025");
})

