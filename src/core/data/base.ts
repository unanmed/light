export interface DataSetBase {
    post(): Promise<any>;
    sync(): Promise<any>;
    update(data: any): void;
}

export interface UserRight {
    RoleId: number;
    ElementId: string;
}

export interface LoginResponse {
    state: number;
    err?: string;
    data?: LoginResponseData;
}

export interface LoginResponseData {
    RoleType: number;
    SmsEnabled: number;
    roleId: number;
    token: string;
    userId: number;
    userName: string;
    rights: UserRight[];
}

export interface DeviceResponse {
    rFrame: DeviceRFrame;
    err?: string;
}

export interface DeviceRFrame {
    Afn: number;
    Con: number;
    Data: number[];
    Delay: number;
    DevAddr: string;
    Err: number;
    Fin: number;
    Fir: number;
    Fn: number;
    Frame: string;
    IsReport: number;
    Pn: number;
    Rseq: number;
    SendTime: string;
    SerialNumber: number;
    Tpv: number;
}

export interface QueryLightMonitorResponse {
    data: QueryLightMonitorData[];
    state: number;
    total: number;
    totalPower: number;
    yesterdayhour: number;
}

export interface QueryLightMonitorData {
    BoxAddr: string;
    BoxId: number;
    BoxNo: string;
    Bulb1I: number;
    Bulb1P: number;
    Bulb1PF: number;
    Bulb1U: number;
    Bulb2I: number;
    Bulb2P: number;
    Bulb2PF: number;
    Bulb2U: number;
    Bulb3I: number;
    Bulb3P: number;
    Bulb3PF: number;
    Bulb3U: number;
    Bulb4I: number;
    Bulb4P: number;
    Bulb4PF: number;
    Bulb4U: number;
    ChannelMode: number;
    Downloaded: number;
    Ercs: string;
    IsAlarm: number;
    Lamps: number;
    LastUpdateTime: string;
    Location: string;
    Model: string;
    Online: number;
    Operation: number;
    Orientation: number;
    PoleAddr: string;
    PoleId: number;
    PoleNo: string;
    Power: number;
    RunState: number;
    Switch: number;
    TnId: number;
    TnLevel1: number;
    TnLevel2: number;
    TnLevel3: number;
    TnState1: number;
    TnState2: number;
    TnState3: number;
}
