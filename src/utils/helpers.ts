export async function sleep (n: number) {
  // eslint-disable-next-line promise/param-names
  await new Promise(r => setTimeout(r, n * 1000))
}

export async function sleepRandom (n: number) {
  // eslint-disable-next-line promise/param-names
  await new Promise(r => setTimeout(r, Math.random() * n * 1000))
}
