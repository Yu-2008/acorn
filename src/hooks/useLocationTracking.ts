import { useEffect, useRef, useState } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { usePubNub } from 'pubnub-react';
import { reverseGeocode } from '../services/reverseGeocode';
import { useLocationPermission } from './useLocationPermission';
import { Alert } from 'react-native';

// PubNub channel for location updates
const CHANNEL = 'location-channel';

export const useLocationTracking = () => {
  const pubnub = usePubNub();
  const [location, setLocation] = useState('Not showing location.');
  const [loading, setLoading] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const watchId = useRef<number | null>(null);
  const { granted, requestPermission } = useLocationPermission();

  // simulation of client device get location then publish to pubnub 
  const startWatchingLocation = () => {
    // first get a high accuracy location
    Geolocation.getCurrentPosition(
      async position => {
        const formatted = `Lat:${position.coords.latitude.toFixed(4)},Lon:${position.coords.longitude.toFixed(4)}`;
        try {
          await pubnub.publish({ channel: CHANNEL, message: { locationName: formatted } });
          console.log('Published initial location:', formatted);
        } catch (err) {
          console.log('Initial publish error:', err);
        }
      },
      err => console.warn('Initial position error', err),
      { enableHighAccuracy: true, timeout: 5000 }
    );

    // continuous watch
    watchId.current = Geolocation.watchPosition(
      async ({ coords }) => {
        const formatted = `Lat:${coords.latitude.toFixed(4)},Lon:${coords.longitude.toFixed(4)}`;
        try {
          await pubnub.publish({ channel: CHANNEL, message: { locationName: formatted } });
          console.log('Published location:', formatted);
        } catch (err) {
          console.log('PubNub publish error:', err);
        }
      },
      error => {
        console.error('Geolocation error:', error);
        setLoading(false);
      },
      { enableHighAccuracy: true, distanceFilter: 10, interval: 5000 }
    );
  };

  const stopWatchingLocation = () => {
    if (watchId.current !== null) {
      Geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }
  };

  // Handle received location data from PubNub
  const handlePubNubMessage = async (message: string) => {
    try {
      const match = message.match(/Lat:([\d.-]+),Lon:([\d.-]+)/);
      if (!match) {
        setLocation('Unknown location');
        return;
      }
      const lat = parseFloat(match[1]);
      const lon = parseFloat(match[2]);
      const name = await reverseGeocode(lat, lon);
      setLocation(name || 'Unknown location');
    } catch (error) {
      console.error('Error in PubNub message handler:', error);
      setLocation('Unknown location');
    } finally {
      setLoading(false);
    }
  };

  //if toggle on or off
  const toggleLocation = async (enabled: boolean) => {
    setLocationEnabled(enabled);
    if (!enabled) {
      stopWatchingLocation();
      setLocation('Not showing location.');
      return;
    }

    const permission = await requestPermission();
    if (!permission) {
      Alert.alert("Permission required", "Location permission not granted.");
      setLocationEnabled(false);
      setLocation('Permission denied.');
      return;
    }

    setLoading(true);
    startWatchingLocation();
  };

  // Subscribe to location updates via PubNub
  useEffect(() => {
    pubnub.subscribe({ channels: [CHANNEL] });

    const listener = {
      message: (m: any) => {
        const raw = m?.message?.locationName ?? 'Unknown location';
        console.log('Received from PubNub:', raw);
        handlePubNubMessage(raw);
      },
    };

    pubnub.addListener(listener);
    return () => {
      pubnub.removeListener(listener);
      pubnub.unsubscribe({ channels: [CHANNEL] });
      stopWatchingLocation();
    };
  }, [pubnub]);

  return {
    location,
    loading,
    locationEnabled,
    toggleLocation,
  };
};
