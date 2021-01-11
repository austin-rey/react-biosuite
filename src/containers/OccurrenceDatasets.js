import {useGetSpecies} from '../hooks/useGetSpecies'

const OccurrenceDatasets = (id) => {
    const { data, loading, error } = useGetSpecies(
        `/occurrence/search?limit=8&taxon_key=${id}`,
        []
    );
    return data;
}

export default OccurrenceDatasets
