import {useGetSpecies} from '../hooks/useGetSpecies'

const OccurrenceImages = (id) => {
    const { data, loading, error } = useGetSpecies(
        `occurrence/search?limit=8&media_type=stillImage&taxon_key=${id}`,
        []
    );
    return data;
}

export default OccurrenceImages
