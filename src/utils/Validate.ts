export default class Validate {
  static expiryTimestamp(expiryTimestamp: number): boolean {
    const isValid = new Date(expiryTimestamp).getTime() > 0
    if (!isValid) {
      console.warn(
        'vue-timer-hook: { useTimer } Invalid expiryTimestamp settings',
        expiryTimestamp,
      )
    }
    return isValid
  }
}
