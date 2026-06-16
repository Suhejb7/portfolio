const isDev = import.meta.env.DEV

export const bootLog = (stage, detail) => {
  if (!isDev) return
  if (detail !== undefined) {
    console.info(`[portfolio:boot] ${stage}`, detail)
  } else {
    console.info(`[portfolio:boot] ${stage}`)
  }
}
