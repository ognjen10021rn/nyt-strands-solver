const MATRIX_ROWS = 8;
const MATRIX_COLS = 6;
const AMOUNT_OF_WORDS = 8;
const MINIMUM_LENGTH_WORD = 4;
const MAXIMUM_LENGTH_WORD = MATRIX_ROWS*MATRIX_COLS - MINIMUM_LENGTH_WORD*(AMOUNT_OF_WORDS-1)

function initMatrix(){
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let matrix = []

    for(let i = 0; i < MATRIX_ROWS; i++){
        let row = [];
        for(let j = 0; j < MATRIX_COLS; j++){
            const randLetter = alphabet[Math.floor(Math.random() * alphabet.length)]
            row[j] = randLetter;
        }
        matrix[i]= row
    }
    return matrix
}


function inputStrands(str){
    str = 'YKURLYNSDPEDACXREVREOEOEDRISVWCDERSOYMUKTUPRGYHC'
    matrix = []
    for(let i = 0; i < MATRIX_ROWS; i++){
        let row = []
        for(let j = 0; j < MATRIX_COLS; j++){
            const letter = str[i*MATRIX_COLS+j]
            row[j] = letter;
        }
        matrix[i] = row
    }
    return matrix
}

async function getPossibleWords(matrix){
    let listOfStrings = [] 
    let count = 0
    for(let i = 0; i < MATRIX_ROWS; i++){
        for(let j = 0; j < MATRIX_COLS; j++){
            let word = '';
            if(count + MINIMUM_LENGTH_WORD > MAXIMUM_LENGTH_WORD)
                return
            let currentNode = {
                col: i,
                row: j
            }
            dfs(count+MINIMUM_LENGTH_WORD, i, j, word, new Set(), currentNode, matrix, listOfStrings);
        }
        count++;
    }
    

    //TODO: find a way to chech if it's a valid word

    finalList = listOfStrings.filter(wrd => wrd.length >= 4)
    let setList = [...new Set(finalList)]
    // someList.forEach(async word => {
    //     let response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    //     let res = response.json()
    //     console.log(res.body)
    // });
    console.log(setList)

}

function dfs(length, ii, jj, path, visited, currentNode, matrix, listOfStrings){
    if(Math.abs((ii+jj)-(currentNode.col+currentNode.row)) === length){
        return;
    }
    const directions = [
        [-1, 0], [0, -1], [1, 0], [0, 1]
    ];
    listOfStrings.push(path);
    
    for(let i = ii; i < MATRIX_ROWS; i++){
        for(let j = jj; j < MATRIX_COLS; j++){
            for (let [dx, dy] of directions) {
                let rw = i+dx
                let cl = j+dy
                if(rw >= 0 && rw < MATRIX_ROWS && cl >= 0 && cl < MATRIX_COLS){
                    if (visited.has(`${i+dx},${j+dy}`)) return;
                    visited.add(`${i+dx},${j+dy}`);
                    let wrd = path.concat(matrix[i+dx][j+dy]);
                    dfs(length, i + dx, j + dy, wrd, new Set(visited), currentNode, matrix, listOfStrings);
                }
            }
        }
    }
}


const mat = inputStrands()
let ans = 0

console.log(mat)
getPossibleWords(mat)


