import { stdin, stdout } from "node:process";
import { createInterface } from "node:readline/promises";
import { Transform } from "node:stream";

const MAX_NUM = 99
const MIN_NUM = 1

// choose a random value
const answer = Math.floor(1 + (Math.random() * MAX_NUM - 1));
//console.log(answer)
let turn = 0

const readline = createInterface({ input: stdin, output: stdout });
while (true){
    turn += 1
    // receive and validate input
    let guess = await readline.question("Please input your guessed number. > ");
    while (guess.match(/\d+/g) == null || !(MIN_NUM <= parseInt(guess) && parseInt(guess)  <= MAX_NUM)){
        console.log(`Your input number is not valid! Try again!`);
        guess = await readline.question("Please input your guessed number. > ");
    }
    console.log(`Your input number is ${guess}!`);
    
    // make a judgement of the correctness of the player's guessed number
    if (parseInt(guess) === answer){
        console.log(`Your guessed number is correct! You won this game!! Your total turn is ${turn}.`)
        break;
    }
    else if (parseInt(guess) > answer)
    {
        console.log("Hint: Your guessed number is more than the answer.")
    }
    else
    {
        console.log("Hint: Your guessed number is less than the answer.")
    }

}
readline.close();