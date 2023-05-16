
// Job Interview

import { readFileSync } from "fs";

abstract class Reader {
  private static iter = readFileSync(0).toString().split("\n").values();
  public static line(): string {
    return this.iter.next().value;
  }
}


function main(){

    const N: number = parseInt(Reader.line())
    const S: string[] = Reader.line().split("")
    let map = new Map<string, number>([
        ["o", 0],
        ["-", 0],
        ["x", 0]
    ]);
    for (let i = 0; i < N; i++){
        if (S[i] === "x"){
                    console.log("No")
                    return
        }
        map.set(S[i], map.get(S[i]) +1)
    }
   
    if ( map.get("o") > 0){
        console.log("Yes")
    }
    else
    {
        console.log("No")
    }
}

main()
