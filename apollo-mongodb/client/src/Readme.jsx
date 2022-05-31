import { Publication } from './Publication';

export function Readme({ readme }) {
    return (
        <div>
            <div>{readme.description}</div>
            <div>{readme.provenance}</div>
            <div>{readme.source}</div>
            <div>{readme.related_to}</div>
            <div>{readme.scientific_name}</div>
            <div>{readme.taxid}</div>
            <div>{readme.scientific_name_abbrev}</div>
            <div>{readme.genotype}</div>
            <div>{readme.bioproject}</div>
            <div>{readme.sraproject}</div>
            <div>{readme.dataset_doi}</div>
            <div>{readme.genbank_accession}</div>
            <div>{readme.original_file_creation_date}</div>
            <div>{readme.local_file_creation_date}</div>
            <div>{readme.dataset_release_date}</div>
            <div>{readme.data_curators}</div>
            <div>{readme.public_access_level}</div>
            <div>{readme.license}</div>
            <div>{readme.keywords}</div>
            <div>{readme.genotyping_platform}</div>
            <div>{readme.genotyping_method}</div>
            <div>{readme.expression_unit}</div>
            <div>{readme.geoseries}</div>
            <Publication readme={readme} />
        </div>
    );
}
