import { parse } from "node:path";
import { off, stdin, stdout } from "node:process";
import { createInterface } from "node:readline/promises";
import chalk from "chalk";


const ALPHABETS = [...Array(26)].map((a, b) => String.fromCharCode(65 + b));

let ROWS = new Map<string, number>([
    ["A", 0], ["B", 1], ["C", 2], ["D", 3], ["E", 4]
])
let COLS = [1, 2, 3, 4, 5]
const LIGHTCELL = "0"
const DARKCELL = "."

const MAX_BOARD_SIZE = 10;
const MIN_BOARD_SIZE = 1;


const range =
  (start: number, end: number) => Array.from({length: (end - start + 1)}, (v, k) =>  k + start);

function generate_board(board_size: number): string[][] {
    const board = []
    for (let i = 0; i < board_size; i++) {
        const row_cells = []
        for (let j = 0; j < board_size; j++) {
            const cell = Math.random() > 0.5 ? LIGHTCELL : DARKCELL;
            row_cells.push(cell)
        }
        board.push(row_cells)
    }
    return board
}

function display_info(board: string[][], turn: number, time: number): void {

    let info = "turn: " + turn + "\n"
    info += "time: " + time + "(s)" + "\n"
    

    // add board info
    const board_size = board.length;
    info += "+" + "-" +  "+" + "-".repeat(board_size) + "+" + "\n"
    info += "| |" + COLS.join("") + "|\n"
    info += "+" + "-" +  "+" + "-".repeat(board_size) + "+" + "\n"
    for (let i = 0; i < board_size; i++) {
        info += "|" + [ ...ROWS.keys() ][i] + "|" 
        for (let j = 0; j < board_size; j++) {
            info += board[i][j];
        }
        info += "|\n"
    }
    info += "+" + "-" +  "+" + "-".repeat(board_size) + "+" + "\n"
    console.log(info)
}
function light_out(board: string[][], row: number, col: number): void {
    const offsets: number[][] = [[0, 1], [1, 0], [0, -1], [-1, 0], [0, 0]]
    const board_size = board.length
    for (let offset_i = 0; offset_i < offsets.length; offset_i++){
        const offset_row = offsets[offset_i][0];
        const offset_col = offsets[offset_i][1];
        const new_row: number = row + offset_row;
        const new_col: number = col + offset_col;
        const row_condition = (0 <= new_row) && (new_row < board_size-1);
        const col_condition = (0 <= new_col) && (new_col < board_size-1);
        if (row_condition && col_condition) {
            board[new_row][new_col] = LIGHTCELL ? DARKCELL : LIGHTCELL;
        }
    }
}

function judge_board(board: string[][]): boolean{
    const board_size = board.length
    for (let i = 0; i < board_size; i++) {
        for (let j = 0; j < board_size; j++) {
            if (board[i][j] === LIGHTCELL){
                return false;
            }
        }
    }
    return true;
}

async function main(){

    const readline = createInterface({ input: stdin, output: stdout });

    // receive the board size from a user
    let board_size: string = await readline.question(chalk.blue("Please input the size of the board. > "));
    while(board_size.match(/\d+/g) === null || !( MIN_BOARD_SIZE <= parseInt(board_size) && parseInt(board_size)  <= MAX_BOARD_SIZE) );
    {
        board_size = await readline.question("Please input the size of the board again. > ");
    }
    console.log(`Board size is ${board_size} X ${board_size}`);

    // update ROWS and COLS (TODO: convert ROWS and COLS into local variables)
    ROWS = new Map<string, number>(
        Array.from({length: (parseInt(board_size)+1 - 0 + 1)}, (v, k) =>  [ALPHABETS[k], k + 0])
    );
    COLS = range(1, parseInt(board_size));
    
    // generate the cells of the board randomly
    const board = generate_board(parseInt(board_size));
    

    let turn = 0;
    const start = Date.now();
    while (true){
        turn += 1;
        const time_seconds = (Date.now() - start)/1000;
        display_info(board, turn, time_seconds);

        // receive an input
        let row: string = await readline.question(chalk.blue(`Please input a row from ${[...ROWS.keys()]}. > `));
        while (!ROWS.has(row)){
            console.log(chalk.red(`Your input row(=${row}) is not contained in ${[...ROWS.keys()]}.`));
            row = await readline.question(chalk.blue(`Please input a row from ${[...ROWS.keys()]} again. > `));
        }

        let col: string = await readline.question(chalk.blue(`Please input a column from ${COLS}. > `));
        while (!COLS.includes(parseInt(col))){
            console.log(chalk.red(`Your input col(=${col}) is not contained in ${COLS}.`));
            col = await readline.question(chalk.blue(`Please input a column from ${COLS} again. > `));
        }
        console.log(`Your choice is ${row+col}`)
        const row_num = ROWS.get(row);
        if (row_num === undefined){break;}
        
        
        // light out cells in the board
        light_out(board, row_num, parseInt(col)-1)
        

        // judge whether a user lights out all the cells in the board
        if ( judge_board(board) ){
            console.log("You succeeded in lighting out all the cells in the board!! Congrats!")
            const time_seconds = (Date.now() - start)/1000;
            console.log(`Your time record: ${time_seconds}(s), Your total turn is ${turn}.`)
            break;
        }
        
    }

    readline.close();
}



main()