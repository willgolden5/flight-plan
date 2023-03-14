export type Avionics = {
    type: "glass" | "steam" | "hydraulic" | "electronic" | "mechanical";
};

export type AircraftCategory = {
    type: "airplane" | "rotocraft" | "powered lift" | "glider" | "lighter than air";
}

export type AircraftClass = {
    type: 'single-engine land' | 'multi-engine land' | 'single-engine sea' | 'multi-engline sea' | 'helicopter'
};

export type PilotsLicense = {
    type: 'private pilot' | 'commercial pilot' | 'airline transport pilot' | 'flight instructor'
};

export interface PlanMetadata {
    takeoff: string;
    landing: string;
    hours: number;
    price: string;
}

export interface PlanAuthor {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    license: PilotsLicense;
    ratings: string[];
    certNumber: string;
}

export interface PlanAircraft {
    access: boolean;
    avionics: Avionics;
    category: AircraftCategory;
    class: AircraftClass;
}

export interface FlightPlan {
    metadata: PlanMetadata;
    author: PlanAuthor;
    aircraft: PlanAircraft;
}

