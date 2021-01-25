import { useState,useCallback } from 'react';

import PropTypes from 'prop-types'

import gbif from '../api/gbif'

export const fetchOccurrence = async ({id}) => {
    const occurrenceResponse = await gbif.get(`/occurrence/${id}`)  
    //const vernacularName = await gbif.get(`/species/${id}/vernacularNames`)  

    return occurrenceResponse.data;
}

fetchOccurrence.propTypes = {
  id: PropTypes.number,
}

export const useFetchOccurrence = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  
  const execute = async (options = {}) => {
    try {
      setIsLoading(true);
      const results = await fetchOccurrence(options);
      setData(results);
      return results;
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    data,
    error,
    execute: useCallback(execute, [])
  };
}