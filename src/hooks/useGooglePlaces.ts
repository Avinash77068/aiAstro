import { useState, useCallback } from 'react';
import Geocoder from 'react-native-geocoding';

// Initialize Geocoder with your API key
Geocoder.init('AIzaSyAd3dq7HVovnhqQ2a3Ps0ledowncM6ESQ4');

export interface PlaceDetails {
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  formattedAddress: string;
}

export interface PlaceSuggestion {
  description: string;
  placeId: string;
}

export const useGooglePlaces = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getPlaceDetails = useCallback(async (placeId: string): Promise<PlaceDetails | null> => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=AIzaSyAd3dq7HVovnhqQ2a3Ps0ledowncM6ESQ4`,
      );
      const data = await response.json();

      if (data.status === 'OK' && data.result) {
        const place = data.result;
        const addressComponents = place.address_components || [];

        const getComponent = (type: string) => {
          const component = addressComponents.find((comp: any) =>
            comp.types.includes(type)
          );
          return component?.long_name || '';
        };

        const placeDetails: PlaceDetails = {
          address: place.formatted_address || '',
          city: getComponent('locality') || getComponent('administrative_area_level_2'),
          state: getComponent('administrative_area_level_1'),
          country: getComponent('country'),
          postalCode: getComponent('postal_code'),
          latitude: place.geometry?.location?.lat || 0,
          longitude: place.geometry?.location?.lng || 0,
          formattedAddress: place.formatted_address || '',
        };

        return placeDetails;
      }

      throw new Error(data.error_message || 'Failed to fetch place details');
    } catch (err: any) {
      console.error('Error fetching place details:', err);
      setError(err.message || 'Failed to fetch place details');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getAddressFromCoordinates = useCallback(
    async (latitude: number, longitude: number): Promise<PlaceDetails | null> => {
      try {
        setLoading(true);
        setError(null);

        const response = await Geocoder.from(latitude, longitude);
        const address = response.results[0];

        if (address) {
          const addressComponents = address.address_components || [];

          const getComponent = (type: string) => {
            const component = addressComponents.find((comp: any) =>
              comp.types.includes(type)
            );
            return component?.long_name || '';
          };

          const placeDetails: PlaceDetails = {
            address: address.formatted_address || '',
            city: getComponent('locality') || getComponent('administrative_area_level_2'),
            state: getComponent('administrative_area_level_1'),
            country: getComponent('country'),
            postalCode: getComponent('postal_code'),
            latitude: address.geometry.location.lat,
            longitude: address.geometry.location.lng,
            formattedAddress: address.formatted_address || '',
          };

          return placeDetails;
        }

        throw new Error('No address found for coordinates');
      } catch (err: any) {
        console.error('Error fetching address from coordinates:', err);
        setError(err.message || 'Failed to fetch address');
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const searchPlaces = useCallback(async (query: string): Promise<PlaceSuggestion[]> => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
          query,
        )}&key=AIzaSyAd3dq7HVovnhqQ2a3Ps0ledowncM6ESQ4`,
      );
      const data = await response.json();

      if (data.status === 'OK' && data.predictions) {
        return data.predictions.map((prediction: any) => ({
          description: prediction.description,
          placeId: prediction.place_id,
        }));
      }

      return [];
    } catch (err: any) {
      console.error('Error searching places:', err);
      setError(err.message || 'Failed to search places');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    getPlaceDetails,
    getAddressFromCoordinates,
    searchPlaces,
  };
};
