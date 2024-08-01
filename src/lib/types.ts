interface LocalNames {
  [key: string]: string;
}

interface GeocodingApiResponse {
  name: string;
  local_names: LocalNames;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export type TGeocodingApiResponse = GeocodingApiResponse;
