const showFinishes = (score) => {
  if (score > 170 || score <= 1) {
    return 'No outs possible'
  } else {

    const outs = []
    const scoreAmountArray = [...new Array(score + 1)]
    scoreAmountArray.forEach((s, i) => outs.push(i))

    const combinations = getCombinations(outs, 3)

    const ascArr = []
    const possibleOuts = []

    combinations.forEach((combi, i) => {
      const strArr = combi.split(' ')
      const tempArr = strArr.map(item => Number(item) >= 0 ? Number(item) : item);

      tempArr[2] = tempArr[2] * 2

      const trimmedCombi = combi.trim()
      const ascValue = getAsciiValue(trimmedCombi)

      const bogeyNumbers = [41,43,44,46,47,49,52,53,55,56,58,59]

      if (
        !(tempArr.some(el =>
           (el > 20 && (el % 2 !== 0 && el % 3 !== 0 && el !== 25)) ||
           el > 60
            // || el === 59 || el === 58 || el === 56 || el === 55 || el === 53 || el === 52 || el === 49 || el === 47 || el === 46
            || bogeyNumbers.includes(el)
        )) &&
        ((tempArr[2] <= 40 && tempArr[2] % 2 === 0) || tempArr[2] === 50) &&
        tempArr.reduce((a, b) => a + b, 0) === score && !ascArr.includes(ascValue)
      ) {

        possibleOuts.push(combi)
      }
    })

    let bestFinish

    const oneDart = possibleOuts.find(out =>
      out[0] === '0' && out[2] === '0'
    )

    const twoDarts = possibleOuts.filter(out =>
      out[0] === '0'
    )

    if (oneDart) {
      bestFinish = oneDart
    } else if (twoDarts && twoDarts.length > 0) {
      const twoArray = twoDarts.map(x => x.split(' '))
      const hasUnderBull = twoArray.find(x => x[2] < 25)

      if (hasUnderBull) {
        bestFinish = hasUnderBull.join(' ')
      } else {
        bestFinish = twoArray[0].join(' ')
      }
    } else if (possibleOuts && possibleOuts.length > 0) {
      const finish =  possibleOuts[0].split(' ')
      const sorted = finish[1] >= finish[0] ? move(finish) : finish
      bestFinish = sorted.join(' ')
    } else {
      bestFinish = undefined
    }

    return formatFinish(bestFinish)

  }
}

const formatFinish = (finish) => {
  if (!finish) return 'No finish possible'
  const finishArr = finish.split(' ')

  const formatted = finishArr.map((score, i) => {
    if (score === '0') return ''
    if (score > 40 && score !== '50') return `T${score / 3}`
    if (i === 2 && score === '25') return 'B'
    if (i === 2) return `D${score}`
    if (score > 20) return `D${score / 2}`
    return score
  })

  return formatted.join(' ')
}

const move = (array) => {
  const turnTwo = array[1]
  array.splice(1, 1)
  array.unshift(turnTwo)
  return array
};

const getCombinations = (outs, n) => {
  let res = []

  outs.forEach(out => {
    if (n === 1) {
      res.push(out)
    } else {
      const perms = getCombinations(outs, n - 1)
      perms.forEach((p, i) => {
        res.push(`${out} ${p}`)
      });
    }
  })

  return res
}

const getAsciiValue = (string) => {
  let ascii = 0

  for (var i = 0; i < string.length; i++) {
    ascii += string.charCodeAt(i)
  }

  return ascii
}


export default showFinishes
