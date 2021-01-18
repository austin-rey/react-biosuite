import { useState,useCallback } from 'react';

import PropTypes from 'prop-types'

import gbif from '../api/gbif'

export const fetchSearch = async ({paginationOptions,filters,searchQuery}) => {
  const offset = (paginationOptions.page*paginationOptions.limit)
console.log(searchQuery);
  // Convert filters selected into string of parameters that match API specifications
  let filterStrings = filters.map((filter) => {
    if(Object.values(filter)[0].length != 0) {
      return Object.values(filter)[0].map((option) => {
        return `&${Object.keys(filter)[0]}=${option}`
      })
    }
  }).flat().filter(item => item!=null).join('')

  console.log(`species/search?advanced=true&facet=rank&facet=dataset_key&facet=constituent_key&facet=highertaxon_key&facet=name_type&facet=status&facet=issue&facet=origin&facetMultiselect=true&issue.facetLimit=100&locale=en&name_type.facetLimit=100&rank.facetLimit=100&status.facetLimit=100&limit=${paginationOptions.limit}&offset=${offset}&q=${searchQuery}${filterStrings}`)

  const response = await gbif.get(`species/search?advanced=true&facet=rank&facet=dataset_key&facet=constituent_key&facet=highertaxon_key&facet=name_type&facet=status&facet=issue&facet=origin&facetMultiselect=true&issue.facetLimit=100&locale=en&name_type.facetLimit=100&rank.facetLimit=100&status.facetLimit=100&limit=${paginationOptions.limit}&offset=${offset}&q=${searchQuery}${filterStrings}`)  
  
  // console.log(response.data)
  return response.data;
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