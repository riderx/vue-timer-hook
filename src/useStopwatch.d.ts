import { Ref } from 'vue';
export interface ResUseStopwatch {
    seconds: Ref<number>;
    minutes: Ref<number>;
    hours: Ref<number>;
    days: Ref<number>;
    start(): void;
    pause(): void;
    reset(offset: number, newAutoStart: boolean): void;
    isRunning: Ref<boolean>;
}
export declare const useStopwatch: (offsetTimestamp?: number, autoStart?: boolean) => ResUseStopwatch;
//# sourceMappingURL=useStopwatch.d.ts.map