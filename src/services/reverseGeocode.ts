import { OPEN_CAGE_API_KEY, OPEN_CAGE_BASE_URL } from '../config/openCageConfig';

export const reverseGeocode = async (lat: number, lon: number): Promise<string> => {
  const url = `${OPEN_CAGE_BASE_URL}?q=${lat}+${lon}&key=${OPEN_CAGE_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.results?.length) {
      return data.results[0].formatted;
    }
    return 'Unknown location';
  } catch (error) {
    console.error('Reverse geocoding failed:', error);
    return 'Location lookup failed';
  }
};
