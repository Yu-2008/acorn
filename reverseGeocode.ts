export const reverseGeocode = async (lat: number, lon: number): Promise<string> => {
    const apiKey = '7e1ab20d30954617bb28a1f13804d202';
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return data.results[0].formatted;
      }
      return 'Unknown location';
    } catch (error) {
      console.error('Reverse geocoding failed:', error);
      return 'Location lookup failed';
    }
  };
  