import { Ref } from 'vue';
interface TimeAmpm {
    seconds: Ref<number>;
    minutes: Ref<number>;
    hours: Ref<number>;
    ampm: Ref<string>;
}
interface TimeNum {
    seconds: Ref<number>;
    minutes: Ref<number>;
    hours: Ref<number>;
    days: Ref<number>;
}
export default class Time {
    static getTimeFromSeconds(secs: Ref<number>): TimeNum;
    static getSecondsFromExpiry(expiry: number, shouldRound?: boolean): Ref<number>;
    static getSecondsFromPrevTime(prevTime: number, shouldRound: boolean): Ref<number>;
    static getSecondsFromTimeNow(): Ref<number>;
    static getFormattedTimeFromSeconds(totalSeconds: Ref<number>, format: '12-hour' | '24-hour'): TimeAmpm;
}
export {};
//# sourceMappingURL=Time.d.ts.map