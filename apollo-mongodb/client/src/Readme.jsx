import { useQuery } from "@apollo/client";

import { GET_README } from './queries';

import { Publication } from './Publication';

export function Readme({ readme }) {
    const { loading, error, data } = useQuery(GET_README, {
        variables: { identifier: readme.identifier },
    });
    if (loading) return <p>Loading { readme.identifier } ...</p>;
    if (error) return <p>{error.message}</p>;
    return (
        <div>
            {data.readmesByIdentifier.map(readme => (
                <div className="readme">
                    <div className="description">{readme.description}</div>
                    <ul>
                        <li>{readme.provenance}</li>
                        <li>{readme.source}</li>
                        <li>{readme.related_to}</li>
                        <li>{readme.scientific_name}</li>
                        <li>{readme.taxid}</li>
                        <li>{readme.scientific_name_abbrev}</li>
                        <li>{readme.genotype}</li>
                        <li>{readme.bioproject}</li>
                        <li>{readme.sraproject}</li>
                        <li>{readme.dataset_doi}</li>
                        <li>{readme.genbank_accession}</li>
                        <li>{readme.original_file_creation_date}</li>
                        <li>{readme.local_file_creation_date}</li>
                        <li>{readme.dataset_release_date}</li>
                        <li>{readme.data_curators}</li>
                        <li>{readme.public_access_level}</li>
                        <li>{readme.license}</li>
                        <li>{readme.keywords}</li>
                        <li>{readme.genotyping_platform}</li>
                        <li>{readme.genotyping_method}</li>
                        <li>{readme.expression_unit}</li>
                        <li>{readme.geoseries}</li>
                    </ul>
                    <Publication readme={readme} />
                </div>
            ))}
        </div>
    );
}
