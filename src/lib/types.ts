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

interface WeatherInfo {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface SharedForecastInfo {
  dt: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  clouds: number;
  uvi: number;
  wind_speed: number;
  wind_gust?: number;
  wind_deg: number;
  Info: WeatherInfo[],
}

interface CurrentForecast extends SharedForecastInfo {
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  visibility: number;
  rain?: {
    "1h": number;
  };
  snow?: {
    "1h": number;
  };
}

interface MinutelyForecast {
  dt: number;
  precipitation: number;
}

interface HourlyForecast extends SharedForecastInfo {
  temp: number;
  feels_like: number;
  visibility: number;
  pop: number;
  rain?: {
    "1h": number;
  };
  snow?: {
    "1h": number;
  };
}

interface DailyForecast extends SharedForecastInfo {
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  summary: string;
  temp: {
    morn: number;
    day: number;
    eve: number;
    night: number;
    min: number;
    max: number;
  };
  feels_like: {
    morn: number;
    day: number;
    eve: number;
    night: number;
  };
  pop: number;
  rain?: number;
  snow?: number;
}

interface Alert {
  sender_name: string;
  event: string;
  start: number;
  end: number;
  description: string;
  tags: string[];
}

interface WeatherApiResponse {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current?: CurrentForecast,
  minutely?: MinutelyForecast[],
  hourly?: HourlyForecast[],
  daily?: DailyForecast[],
  alerts?: Alert[]
}

export type TGeocodingApiResponse = GeocodingApiResponse;
export type TWeatherApiResponse = WeatherApiResponse;
