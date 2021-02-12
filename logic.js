export const buttonPressHandler = (key, input, setInput) => {
    const lastCharacterIndex = input.length - 1
    const lastCharacter = input[lastCharacterIndex]
    const lastCharacterIsOperatorCondition = lastCharacter === '-' || lastCharacter === '+' || lastCharacter === '*' || lastCharacter === '/'
    switch (key) {
        case 'AC':
            setInput('0')
            break
        case 'Dell':
            setInput(input === '0' || input.length === 1 ? '0' : input.substring(0, lastCharacterIndex))
            break
        case '00':
        case '0':
            setInput(
                input === '0' ? input : (lastCharacterIsOperatorCondition) ? input : (input + key))
            break
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            setInput(input === '0' ? key : input + key)
            break
        case '+':
        case '-':
        case '*':
        case '/':
            setInput(lastCharacterIsOperatorCondition || lastCharacter === '.' ? input.substring(0, lastCharacterIndex) + key : input + key)
            break;
        case '.':
            let plus = input.split("+")
            let minus = plus[plus.length - 1].split("-")
            let multiple = minus[minus.length - 1].split("/")
            let divide = multiple[multiple.length - 1].split("*")
            let dotSearch = (divide[divide.length - 1].search(/[^\w\s]/g))
            setInput(lastCharacterIsOperatorCondition || lastCharacter === '.' || dotSearch >= 0 ? input : input + key)
            break
        case '=':
            let result
            if (lastCharacterIsOperatorCondition || lastCharacter === '.') {
                result = input
            } else if (eval(input) % 1 === 0) {
                result = eval(input).toString()
            } else {
                let res = eval(input).toFixed(7).toString()
                let lastCharacterIsZero = true
                while (lastCharacterIsZero) {
                    if (res[res.length - 1] === '0') {
                        res = res.substring(0, res.length - 2)
                    } else {
                        lastCharacterIsZero = false
                        result = res
                    }
                }
            }
            setInput(result)
            break
    }
}