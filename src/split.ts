
interface Option {
  /** insert '\n' in start and end. */
  breakStartEnd?: boolean
  /** insert '\n' before separator */
  breakBeforeSeparator?: boolean
}

/**
 * split input string into lines
 * this method can be able to handle complicated nested cases
 * @export
 * @param origin origin single line string
 * @param [sep=","] separator
 * @param opt option 
 * @returns result string already split into lines by '\n'
 */
export default function splitIntoLines(
  origin: string, 
  sep = ",", 
  opt: Option = {}
): string {
  const str = origin.trim()
  if (!str.length) { return origin }
  const sepIndexes = findValidSeparator(str, sep)
  const strArr = str.split("")

  const addLineBreak = opt.breakBeforeSeparator
    ? (index: number) => { strArr[index] = '\n' + strArr[index]}
    : (index: number) => { strArr[index] += '\n' }

  sepIndexes.forEach(addLineBreak)

  const ret = strArr.join("")
  return opt.breakStartEnd 
    ? '\n' + ret + '\n'
    : ret
}

const startBracketReg = /[\{\[\(]/
const endBracketReg = /[\}\]\)]/
const quoteReg = /['"`]/

/** only find separator which is not inside {} [] () '' "" `` */
function findValidSeparator(str: string, sep: string): number[] {
  let currentQuote = ''
  let inString: boolean = false
  let inBracketCount: number = 0
  let sepIndexArr = []
  for (let i = 0; i < str.length; i++) {
    const c = str[i]
    switch (true) {
      case endBracketReg.test(c):
        if (inString) { break }
        // occurs right single bracket, clear sepIndex
        if (!inBracketCount) { sepIndexArr = [] }
        else { inBracketCount-- }
        break
      case startBracketReg.test(c): 
        // occurs left bracket, change into in-bracket state
        if (!inString) { inBracketCount++ }
        break
      case quoteReg.test(c):
        if (!inString) {
          currentQuote = c
          inString = true
        } else if (c === currentQuote) {
          inString = false
        }
        break
      case c === sep:
        if (!inString && !inBracketCount) { sepIndexArr.push(i) }
        break
      default:
        break
    }
  }
  return sepIndexArr
}
