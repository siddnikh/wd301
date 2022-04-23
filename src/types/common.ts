export type Pagination<T> = {
    count: number;
    next?: string;
    previous?: string;
    results: T[]
}

export type PaginationParams = {
    limit? : number;
    offset? : number
}