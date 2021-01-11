import {useGetSpecies} from '../hooks/useGetSpecies'

const SpeciesSynonyms = (id) => {
    const { data, loading, error } = useGetSpecies(
        `/species/${id}/synonyms?limit=10`,
        []
    );
    return data;
}

export default SpeciesSynonyms