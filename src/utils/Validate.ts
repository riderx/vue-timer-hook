export default class Validate {
  static expiryTimestamp(expiryTimestamp: number): boolean {
    const isValid = new Date(expiryTimestamp).getTime() > 0
    if (!isValid) {
      console.warn(
        'vue-timer-hook: { useTimer } Invalid expiryTimestamp settings',
        expiryTimestamp
      ) // eslint-disable-line
    }
    return isValid
  }

  static onExpire(onExpire: () => void): boolean {
    const isValid = onExpire && typeof onExpire === 'function'
    if (onExpire && !isValid) {
      console.warn(
        'vue-timer-hook: { useTimer } Invalid onExpire settings function',
        onExpire
      ) // eslint-disable-line
    }
    return isValid
  }
}
