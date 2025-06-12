export type TrendModel = "linear" | "logarithmic" | "exponential"

function r2Score(yTrue: number[], yPred: number[]): number {
  const meanY = yTrue.reduce((sum, val) => sum + val, 0) / yTrue.length
  const ssTot = yTrue.reduce((sum, val) => sum + Math.pow(val - meanY, 2), 0)
  const ssRes = yTrue.reduce((sum, val, i) => sum + Math.pow(val - yPred[i], 2), 0)
  return 1 - ssRes / ssTot
}

export function fitTrendline(
  x: number[],
  y: number[]
): { yPred: number[]; model: TrendModel; r2: number } {
  const n = x.length

  const fitLinear = (): number[] => {
    const xMean = x.reduce((a, b) => a + b) / n
    const yMean = y.reduce((a, b) => a + b) / n
    const num = x.reduce((acc, xi, i) => acc + (xi - xMean) * (y[i] - yMean), 0)
    const den = x.reduce((acc, xi) => acc + Math.pow(xi - xMean, 2), 0)
    const slope = num / den
    const intercept = yMean - slope * xMean
    return x.map((xi) => intercept + slope * xi)
  }

  const fitLog = (): number[] => {
    const logX = x.map((xi) => Math.log(xi))
    const xMean = logX.reduce((a, b) => a + b) / n
    const yMean = y.reduce((a, b) => a + b) / n
    const num = logX.reduce((acc, xi, i) => acc + (xi - xMean) * (y[i] - yMean), 0)
    const den = logX.reduce((acc, xi) => acc + Math.pow(xi - xMean, 2), 0)
    const slope = num / den
    const intercept = yMean - slope * xMean
    return logX.map((xi) => intercept + slope * xi)
  }

  const fitExp = (): number[] => {
    const logY = y.map((yi) => Math.log(yi))
    const xMean = x.reduce((a, b) => a + b) / n
    const yMean = logY.reduce((a, b) => a + b) / n
    const num = x.reduce((acc, xi, i) => acc + (xi - xMean) * (logY[i] - yMean), 0)
    const den = x.reduce((acc, xi) => acc + Math.pow(xi - xMean, 2), 0)
    const slope = num / den
    const intercept = yMean - slope * xMean
    return x.map((xi) => Math.exp(intercept + slope * xi))
  }

  const linear = fitLinear()
  const logar = fitLog()
  const expon = fitExp()

  const scores = {
    linear: r2Score(y, linear),
    logarithmic: r2Score(y, logar),
    exponential: r2Score(y, expon),
  }

  const bestModelEntry = Object.entries(scores).sort((a, b) => b[1] - a[1])[0]
  const bestModel = bestModelEntry[0] as TrendModel
  const bestR2 = bestModelEntry[1]

  return {
    yPred:
      bestModel === "linear" ? linear :
      bestModel === "logarithmic" ? logar :
      expon,
    model: bestModel,
    r2: bestR2,
  }
}
