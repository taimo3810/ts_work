
// 	Welcome to AtCoder

import { readFileSync } from "fs";

abstract class Reader {
  private static iter = readFileSync(0).toString().split("\n").values();
  public static line(): string {
    return this.iter.next().value;
  }
}

let inputs = []
let total = 0
for (let i = 0; i < 3; i++){
  const input = Reader.line();  // 1行読む
  let splitted_inputs = input.split(" ")
  for (let input of splitted_inputs){
    let exp = /[0-9]/g;
    let extracted_input = input.match(exp)
    if (extracted_input != null){
      
      total += parseInt(extracted_input.join(""))
    }
    else {
      console.log(total + " " + input)
    }
  }
}

