/**
 * handle each keypad press
 *
 * @param {*} key
 * @param {*} input
 * @param {*} setInput
 */
export const buttonPressHandler = (key, input, setInput) => {
    const lastCharIndex = (input) => input.length - 1
    const lastCharacter = (input) => input[lastCharIndex(input)]

    // checks if last character of string is opeator and returns boolean
    const lastCharIsOperatorCondition = (input) => lastCharacter(input) === '-' || lastCharacter(input) === '+' || lastCharacter(input) === '×' || lastCharacter(input) === '÷'
    // spliting string phrases to check operators  
    const splitAll = (input) => input.split(/[\-|\×|\+|\÷]/g)

    /**
     * the function that handles solving process
     *
     * @param {*} input string
     * @return {*} 
     */
    const resfunction = (input) => {
        // let result

        // nonecalculatable strings for system should be changed to calculatable
        let Calculatable = input.replace(/×/g, '*').replace(/÷/g, '/')
        // split string to check if percentage used 
        let splited = Calculatable.split('%')
        //NOTE eval function cant solve percentage so we shuld write codes to solve it 
        //NOTE 2 this kind of percentage solving Inspired by samsung galaxy phone's claculator app 
        splited.forEach((element, key, array) => {
            //check if this element is used percentage or not (if not used the next will be undefined)
            if (array[key + 1] !== undefined) {
                let i = element.length - 1
                while (i > 0) {
                    //checks if last operator of the phrase is "-" or "+"  
                    if (element[i] === '-' || element[i] === '+') {
                        array[key] = array[key] + '*' + eval(array[key].substring(0, i)).toString() + '/100'
                        break
                    }
                    //checks if last operator of the phrase is "-" or "+"   
                    else if (element[i] === '/' || element[i] === '*') {
                        array[key] = array[key].substring(0, i + 1) + eval(array[key].substring(i + 1, element.length) + '/100').toString()
                        break
                    }
                    i--
                }
                //if the phrase behind of percentage is just number and dont have any operator in it
                if (i === 0) {
                    array[key] = element[i] === '-' || element[i] === '+' && key > 0 ? array[key] + '*' + eval(array[key - 1]).toString() + '/100' : array[key] + '/100'
                }
            }
        })
        // now all percentage calculatation parts converted to main 4 operators and prepared to solve
        // glueing all sections together
        Calculatable = splited.join('')

        // if phrase is not complete yet
        if (lastCharIsOperatorCondition(input) || lastCharacter(input) === '.') {
            result = input
        }
        //check if has decimal part
        else if (eval(Calculatable) % 1 === 0) {
            //TODO setHistory will save the phrase from here
            result = eval(Calculatable).toString()
        } else {
            //TODO setHistory will save the frase here
            //rounding the number to keep only 7 decimals
            let res = eval(Calculatable).toFixed(7).toString()
            //deleteing last decimals if are zero one by one
            let lastCharacterIsZero = true
            while (lastCharacterIsZero) {
                if (res[res.length - 1] === '0') {
                    res = res.substring(0, res.length - 1)
                } else {
                    lastCharacterIsZero = false
                    result = res
                }
            }
        }
        return result
    }
    // handling pressed button starts
    switch (key) {
        // clear all 
        case 'AC':
            setInput('0')
            break
        //remove from end
        case 'Dell':
            setInput(input === '0' || input.length === 1 ? '0' : (lastCharacter(input) === "." && input[lastCharIndex(input) - 1] === '0' && input[lastCharIndex(input) - 2] === '÷') ? input.substring(0, lastCharIndex(input) - 1) : input.substring(0, lastCharIndex(input)))
            break
        // o and double o handling
        case '00': case '0':
            setInput(
                input === '0' || splitAll(input)[splitAll(input).length - 1] === '0' ? input : (lastCharacter(input) === "÷") ? input : (lastCharacter(input) === '%') ? (input + "×" + key) : input + key)
            break
        // 1 - 9 handling
        case '1': case '2': case '3': case '4': case '5': case '6': case '7': case '8': case '9':
            setInput(
                //check if any number enterd yet
                input === '0' ? key :
                    //check if the enterd number after an operator is '0'
                    (splitAll(input)[splitAll(input).length - 1] === '0') ? input.substring(0, lastCharIndex(input)) + key :
                        //check if the last character entered is '%' to add '×' between new number and '%'
                        (lastCharacter(input) === '%') ? input + '×' + key : input + key)
            break
        // handling input whene '%' entered
        case '%':
            setInput(lastCharIsOperatorCondition(input) || lastCharacter(input) === '%' || lastCharacter(input) === '.' ? input.substring(0, lastCharIndex(input)) + key : input + key)
            break
        case '+': case '-': case '×': case '÷':
            setInput(
                //checks if last preveios character is operator or '.'
                //to not allow additional operator
                // and replace new one 
                lastCharIsOperatorCondition(input) || lastCharacter(input) === '.' ? input.substring(0, lastCharIndex(input)) + key : input + key)
            break;
        // dot handler
        case '.':
            let dotsearch = splitAll(input, true)
            dotsearch = dotsearch[dotsearch.length - 1].search(/[^\w\s]/g)
            setInput(
                // check the last entered number to not allow additional dot in one number
                lastCharacter(input) === '.' || dotsearch >= 0 ? input : (lastCharIsOperatorCondition(input)) ? input + '0' + key : input + key)
            break
        //solve process execute from this section after touching '='
        case '=':
            const result = resfunction(input)
            setInput(result)
            break
    }
}


// export const buttonPressHandler = (key, input, setInput) => {
//     const lastCharacterIndex = input.length - 1
//     const lastCharacter = input[lastCharacterIndex]
//     const lastCharacterIsOperatorCondition = lastCharacter === '-' || lastCharacter === '+' || lastCharacter === '*' || lastCharacter === '/'
//     switch (key) {
//         case 'AC':
//             setInput('0')
//             break
//         case 'Dell':
//             setInput(input === '0' || input.length === 1 ? '0' : input.substring(0, lastCharacterIndex))
//             break
//         case '00':
//         case '0':
//             setInput(
//                 input === '0' ? input : (lastCharacterIsOperatorCondition) ? input : (input + key))
//             break
//         case '1':
//         case '2':
//         case '3':
//         case '4':
//         case '5':
//         case '6':
//         case '7':
//         case '8':
//         case '9':
//             setInput(input === '0' ? key : input + key)
//             break
//         case '+':
//         case '-':
//         case '*':
//         case '/':
//             setInput(lastCharacterIsOperatorCondition || lastCharacter === '.' ? input.substring(0, lastCharacterIndex) + key : input + key)
//             break;
//         case '.':
//             let plus = input.split("+")
//             let minus = plus[plus.length - 1].split("-")
//             let multiple = minus[minus.length - 1].split("/")
//             let divide = multiple[multiple.length - 1].split("*")
//             let dotSearch = (divide[divide.length - 1].search(/[^\w\s]/g))
//             setInput(lastCharacterIsOperatorCondition || lastCharacter === '.' || dotSearch >= 0 ? input : input + key)
//             break
//         case '=':
//             let result
//             if (lastCharacterIsOperatorCondition || lastCharacter === '.') {
//                 result = input
//             } else if (eval(input) % 1 === 0) {
//                 result = eval(input).toString()
//             } else {
//                 let res = eval(input).toFixed(7).toString()
//                 let lastCharacterIsZero = true
//                 while (lastCharacterIsZero) {
//                     if (res[res.length - 1] === '0') {
//                         res = res.substring(0, res.length - 2)
//                     } else {
//                         lastCharacterIsZero = false
//                         result = res
//                     }
//                 }
//             }
//             setInput(result)
//             break
//     }
// }