// Overall Winner 

import { readFileSync } from "fs";

abstract class Reader {
  private static iter = readFileSync(0).toString().split("\n").values();
  public static line(): string {
    return this.iter.next().value;
  }
}

function main(){

    const inputs = []
    for (let i = 0; i < 3; i++){
    const input = Reader.line();  // 1行読む
    inputs.push(input)
    }

    const strs = inputs[1]
    let map = new Map<string, number>([
        ["T", 0],
        ["A", 0]
    ]);
    for (let i = 0; i < parseInt(inputs[0]); i++){
        console.log(strs[i])
        map.set(strs[i], map.get(strs[i]) +1)


        if (map.get("T") >= parseInt(inputs[0]) / 2){
            console.log("T")
            return
        }
        if (map.get("A") >= parseInt(inputs[0]) / 2){
            console.log("A")
            return
        }
    }
}

main()
