import { useState,useCallback } from 'react';

import PropTypes from 'prop-types'

import gbif from '../api/gbif'

export const fetchSpecies = async ({
    id,
    imagePaginationOptions,
    occurrencePaginationOptions,
    imagePage=0,
    occurrencePage=0
  }) => {

  // Define offsets for pagination requests
  const imageOffset = (imagePage*imagePaginationOptions.limit)    
  const occurrenceOffset = (occurrencePage*occurrencePaginationOptions.limit)  

  const resMetadata = await gbif.get(`species/${id}`)
  const resOccurrenceImages = await gbif.get(`occurrence/search?media_type=stillImage&taxon_key=${id}&limit=${imagePaginationOptions.limit}&offset=${imageOffset}`)
  const resSpeciesVernacularNames = await gbif.get(`species/${id}/vernacularNames`)
  const resSpeciesSynonyms = await gbif.get(`/species/${id}/synonyms?limit=10`)
  const resSpeciesChildren = await gbif.get(`/species/${id}/children?limit=100`)
  const resSpeciesParent = await gbif.get(`/species/${id}/parents`)
  const resOccurrences = await gbif.get(`occurrence/search?taxon_key=${id}&limit=${occurrencePaginationOptions.limit}&offset=${occurrenceOffset}`)

  let data = {
      "metadata": resMetadata.data,
      "occurrenceImages": resOccurrenceImages.data,
      "speciesVernacularNames": resSpeciesVernacularNames.data,
      "speciesSynonyms": resSpeciesSynonyms.data,
      "speciesChildren": resSpeciesChildren.data,
      "speciesParent": resSpeciesParent.data,
      "occurrences": resOccurrences.data
  }

  return data;
}

export const useFetchSpecies = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  
  const execute = async (options = {}) => {
    try {
      setIsLoading(true);
      const results = await fetchSpecies(options);
      setData(results);
      return results;
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  console.log(data)
  return {
    isLoading,
    data,
    error,
    execute: useCallback(execute, [])
  };
}