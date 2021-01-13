import { useState,useEffect,useRef } from 'react';

import gbif from '../api/gbif'

export const useFetchSearch = (url,selectedFilter,initialValue) => {
  const cache = useRef({})
  const [data, setData] = useState(initialValue);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
      (async () => {
          try {
            let req;
            // Caching of endpoints
            if (cache.current[url]) {
              setData(cache.current[url]);
            } else {
              req = await gbif.get(url)
              cache.current[url] = req.data;
              setData(req.data);
            }

            // Manage active filters
            if(filters.length === 0) {
              setFilters(req.data.facets.map((facet) => {
                return {[facet.field]: []}
              }));
            } else {
              let selectedFilterGroup = Object.keys(selectedFilter)[0];
              let selectedFilterValue = Object.values(selectedFilter)[0];

              console.log(selectedFilterGroup);
              console.log(selectedFilterValue);
              setFilters(filters.map(filter => {
                    if(Object.keys(filter)[0] == selectedFilterGroup){
                        if(Object.values(filter)[0].length == 0){
                          console.log('Filter group has no values!')
                            return {
                                ...filter,
                                [selectedFilterGroup]: [selectedFilterValue]
                            }
                        }
                        else if(Object.values(filter)[0].includes(selectedFilterValue)){
                          console.log('Filter group has this value!')
                            return {
                                ...filter,
                                [selectedFilterGroup]: Object.values(filter)[0].filter((value) => selectedFilterValue !== value)
                            }
                        } 
                        else {
                          console.log('Add value to filter group!')
                            return {
                                ...filter,
                                [selectedFilterGroup]: [...Object.values(filter)[0], selectedFilterValue]
                            }
                        }
                    }
                    return filter;
                }))
            }

          } catch (error) {
            setError(error);
          } finally {
            // Construct initial filters object
            setLoading(false);
          }
      })();
  }, [url,selectedFilter])

  return {data, error, loading, filters};
}