// Overall Winner

import { readFileSync } from "fs";

abstract class Reader {
  private static iter = readFileSync(0).toString().split("\n").values();
  public static line(): string {
    return this.iter.next().value;
  }
}

function main(){
    let inputs = []
    let total = 0
    for (let i = 0; i < 3; i++){
    const input = Reader.line();  // 1行読む
    inputs.push(input)
    }

    const strs = inputs[1]
    let t_count = 0
    let s_count = 0
    for (let i = 0; i < parseInt(inputs[0]); i++){
        console.log(strs[i])
        if (strs[i] == "A"){
            s_count += 1
        }

        if (strs[i] == "T"){
            t_count += 1
        }

        if (t_count >= parseInt(inputs[0]) / 2){
            console.log("T")
            return
        }
        if (s_count >= parseInt(inputs[0]) / 2){
            console.log("A")
            return
        }
    }
}

main()
