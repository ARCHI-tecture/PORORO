import { Dayjs } from "dayjs";

export interface CategoryType {
    editIdx:number;
    category: string;
    color: string;
}

export interface PeriodType {
    value:string;
    label:string;
}

export type RoutineType = {
    id:number;
    routineName: string;
    dateRange: [Dayjs | null, Dayjs | null];
    period: string
    category?: number;
    color:string
    index:number
    };


export type RoutineTypeonlyRoutineName = Pick<RoutineType,'routineName'>