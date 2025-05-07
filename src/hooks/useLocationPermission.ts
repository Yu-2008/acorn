// src/hooks/useLocationPermission.ts
import { useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';

export function useLocationPermission() {
  const [granted, setGranted] = useState(false);

  // New: request function
  const requestPermission = async (): Promise<boolean> => {
    if (Platform.OS !== 'android') {
      setGranted(true);
      return true;
    }
    try {
      const res = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location to tag expenses.',
          buttonPositive: 'OK',
        }
      );
      const ok = res === PermissionsAndroid.RESULTS.GRANTED;
      setGranted(ok);
      return ok;
    } catch (e) {
      console.warn('Permission error', e);
      setGranted(false);
      return false;
    }
  }

  return { granted, requestPermission };

}

