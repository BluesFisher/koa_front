export interface IMta {
    sid: string;
    cid: string;
    autoReport: string;
    senseHash: string;
    senseQuery: string;
    performanceMonitor: string;
    ignoreParams: any[];
}

export interface IData {
    mta: IMta;
}

export interface ITrconf {
    proj: string;
    url: string;
    [extra: string]: any;
}

export interface IConfigRes {
    data: IData;
    timeReport: ITrconf;
}
