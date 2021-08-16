/// <reference types="node" />
export interface Interval {
    remove: () => void;
    start: (_ms?: number | undefined) => NodeJS.Timeout | undefined;
}
export declare function useInterval(callback: () => void, ms?: number | boolean | null): Interval;
//# sourceMappingURL=useInterval.d.ts.map