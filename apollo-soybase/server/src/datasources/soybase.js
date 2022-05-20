const { SQLDataSource } = require("datasource-sql");

const MINUTE = 60;

class SoyBaseAPI extends SQLDataSource {

    async getGWASExperiment(id) {
        return this.knex
            .select("*")
            .from("gwas_experiment")
            .where({ experiment_id: id })
            .then(data => this.gwasExperimentResultReducer(data[0]));
    }

    async getGWASExperiments() {
        return this.knex
            .select("*")
            .from("gwas_experiment")
            .then(data => data.map(result => this.gwasExperimentResultReducer(result)));
    }

    // GWASExperiment
    gwasExperimentResultReducer(result) {
        return {
            id: result.experiment_id,
            type: result.experiment_type,
            soyBaseID: result.SoyBase_ID,
            platformName: result.platform_name ? result.platform_name : null,
            platformDetails: result.platform_details ? result.platform_details : null,
            numberLociTested: result.number_loci_tested,
            numberGermplasmTested: result.number_germplasm_tested,
            geneticCoordinateSystem: result.genetic_coordinate_system ?  result.genetic_coordinate_system : null,
            sequenceCoordinateSystem: result.sequence_coordinate_system ? result.sequence_coordinate_system : null,
            comments: result.comments ? result.comments : null,
            dateEntered: result.date_entered,
            enteredBy: result.entered_by,
        }
    }

    async getQTL(id) {
        return this.knex
            .select("*")
            .from("gwas_qtl")
            .where({ gwas_id: id })
            .then(data => this.qtlResultReducer(data[0]));
    }

    async getQTLs(experimentId) {
        return this.knex
            .select("*")
            .from("gwas_qtl")
            .where({ experiment_id: experimentId })
            .then(data => data.map(result => this.qtlResultReducer(result)));
    }

    // GWASQTL
    qtlResultReducer(result) {
        return {
            id: result.gwas_id,
            name: result.gwas_name,
            otherName: result.other_name ? result.other_name : null,
            family: result.gwas_family,
            class: result.gwas_class,
            experimentId: result.experiment_id,
            traitSOYNumber: result.trait_SOY_number,
            type: result.QTL_type,
            category: result.QTL_category,
            snpId: result.snp_id,
            snpName: result.snp_name,
            pValue: result.p_value,
            LOD: result.LOD ? result.LOD : null,
            R2: result.R2 ? result.R2 : null,
            comments: result.comments,
        }
    }

}

module.exports = SoyBaseAPI;
