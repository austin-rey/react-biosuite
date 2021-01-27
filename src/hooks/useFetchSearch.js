import { useState,useCallback } from 'react';

import PropTypes from 'prop-types'

import gbif from '../api/gbif'

export const fetchSearch = async ({paginationOptions,filterStrings="",searchQuery,page=0}) => {
  const offset = (page*paginationOptions.limit)  

  const response = await gbif.get(`/species/search?advanced=false&dataset_key=d7dddbf4-2cf0-4f39-9b2a-bb099caae36c&facet=rank&facet=highertaxon_key&facet=status&facet=issue&facetMultiselect=true&issue.facetLimit=100&locale=en&name_type.facetLimit=100&rank.facetLimit=100&status.facetLimit=100&limit=${paginationOptions.limit}&offset=${offset}${filterStrings}&q=${searchQuery}`)  

  const higertaxonFacets = Object.values(response.data.facets[3].counts)

  let names = {}

  higertaxonFacets.forEach(async (facet) => {
    const response = await gbif.get(`/species/${facet.name}/name`) 
    names[facet.name] = response.data.scientificName
  })

  let data = {
    "results": response.data,
    "highertaxonData": names,
  }

  return data;
}

fetchSearch.propTypes = {
  paginationOptions: PropTypes.array,
  searchQuery: PropTypes.string,
  filters: PropTypes.array,
  page: PropTypes.number
}

export const useFetchSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  
  const execute = async (options = {}) => {
    try {
      setIsLoading(true);
      const results = await fetchSearch(options);
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