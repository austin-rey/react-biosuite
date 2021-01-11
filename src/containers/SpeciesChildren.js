import {useGetSpecies} from '../hooks/useGetSpecies'

const SpeciesChildren = (id) => {
    const { data, loading, error } = useGetSpecies(
        `/species/${id}/children?limit=100`,
        []
    );
    return data;
}

export default SpeciesChildren
