import {useGetSpecies} from '../hooks/useGetSpecies'

const SpeciesVernacularNames = (id) => {
    const { data, loading, error } = useGetSpecies(
        `species/${id}/vernacularNames`,
        []
    );
    return data;
}

export default SpeciesVernacularNames
