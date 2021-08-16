import { Ref } from 'vue';

export declare interface ResUseStopwatch {
    seconds: Ref<number>;
    minutes: Ref<number>;
    hours: Ref<number>;
    days: Ref<number>;
    start(): void;
    pause(): void;
    reset(offset: number, newAutoStart: boolean): void;
    isRunning: Ref<boolean>;
}

export declare interface ResUseTime {
    seconds: Ref<number>;
    minutes: Ref<number>;
    hours: Ref<number>;
    ampm: Ref<string>;
}

export declare interface TimeOption {
    format: '12-hour' | '24-hour';
}

export declare const useStopwatch: (offsetTimestamp?: number, autoStart?: boolean) => ResUseStopwatch;

export declare const useTime: (format?: '12-hour' | '24-hour') => ResUseTime;

export declare interface UseTimer {
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

export { }
