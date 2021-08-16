import { Ref } from 'vue';
export interface UseTimer {
    seconds: Ref<number>;
    minutes: Ref<number>;
    hours: Ref<number>;
    days: Ref<number>;
    start(): void;
    pause(): void;
    resume(): void;
    restart(newExpiryTimestamp?: number, newAutoStart?: boolean): void;
    isRunning: Ref<boolean>;
    isExpired: Ref<boolean>;
}
export declare const useTimer: (expiry?: number, autoStart?: boolean) => UseTimer;
//# sourceMappingURL=useTimer.d.ts.map