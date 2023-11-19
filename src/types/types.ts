export interface User {
    id: string;
    name: string;
    height: string;
    mass: string;
    homeworld: string;
    created: Date | string;
    edited: Date | string;
}

export interface Planet {
    name: string;
    diameter: string;
    climate: string;
    population: string;
}
