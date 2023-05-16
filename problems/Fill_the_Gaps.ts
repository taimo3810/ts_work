
// Fill the Gaps
import { readFileSync } from "fs";

abstract class Reader {
  private static iter = readFileSync(0).toString().split("\n").values();
  public static line(): string {
    return this.iter.next().value;
  }
}

const range =
  (start: number, end: number) => Array.from({length: (end - start + 1)}, (v, k) =>  String(k + start));

const reverse_range =
  (start: number, end: number) => Array.from({length: (start - end + 1)}, (v, k) =>  String(start - k));


  
function general_range(num1: number, num2: number): string[] {

    if (num1 > num2){
      	console.log(reverse_range(num1-1, num2+1))
        return reverse_range(num1-1, num2+1);
    }
    else
    {
        return range(num1+1, num2-1);
    }
}


function main(){

    const N = Reader.line()
    const A: string[] = Reader.line().split(" ")
    let new_array: string[] = []
    
    for (let i = 0; i < A.length-1; i++){
        new_array.push(A[i])

        if ( Math.abs(parseInt(A[i]) - parseInt(A[i+1])) > 1){
            const start = Math.min(parseInt(A[i]), parseInt(A[i+1]))
            const end = Math.max(parseInt(A[i]), parseInt(A[i+1]))

            const range_array = general_range(parseInt(A[i]), parseInt(A[i+1]))
            new_array = new_array.concat(range_array)
            
        }
    }
	new_array.push(A[A.length-1])
    console.log(new_array.join(" "))
   
}

main()