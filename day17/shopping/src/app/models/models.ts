export interface QueryCriteria{
    name: string,
    brand: string,
    order: number,
    limit: number,
    offset: number
}

export interface AddCriteria{
    upc12: number,
    name: string,
    brand: string
}