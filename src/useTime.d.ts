import { Ref } from 'vue';
export interface TimeOption {
    format: '12-hour' | '24-hour';
}
export interface ResUseTime {
    seconds: Ref<number>;
    minutes: Ref<number>;
    hours: Ref<number>;
    ampm: Ref<string>;
}
export declare const useTime: (format?: '12-hour' | '24-hour') => ResUseTime;
//# sourceMappingURL=useTime.d.ts.map