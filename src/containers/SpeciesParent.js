// Parents
//Request URL: https://www.gbif.org/api/taxonomy/d7dddbf4-2cf0-4f39-9b2a-bb099caae36c/1/parents?occ=false

import {useGetSpecies} from '../hooks/useGetSpecies'

const SpeciesParent = (id) => {
    const { data, loading, error } = useGetSpecies(
        `/species/${id}/parents`,
        []
    );
    return data;
}

export default SpeciesParent