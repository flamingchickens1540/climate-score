export type AddressData = {
    address: string;
    cityName: string;
    state: string;
    street: string;
    kindOfStreet: string;
    cardinal: string;
    zip: string;
};

export type Coords = {
    lat: number,
    long: number
}

export type Response = {
    status: number,
    walkScore?: number,
    walkScoreDescription?: string,
    estimatedGenerationData?: {},
    carbonFootprint?: number,
    error: boolean,
    message?: string
}

export type WattBuyResponse = {
    estimatedGenerationData?: {},
    carbonFootprint?: number
}

export type SpinnerTypes = {
	size: string | number;
	color: string;
	unit: string;
	duration: string;
	pause: boolean;
};