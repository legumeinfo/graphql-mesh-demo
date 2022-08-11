
      // GraphQL
      const uri = 'http://dev.lis.ncgr.org:50054/server';
      const query = `
        query ExampleQuery($keyword: String!, $start: Int, $size: Int) {
	   geneSearch(keyword: $keyword, start: $start, size: $size) {
             name
             description
	   }
        }
      `;

      // Web Components
      const geneListElement = document.getElementById('gene-list');
      const paginationElement = document.getElementById('pagination');
      
      // Search
      const searchSubmit = document.getElementById('submit-search');
      const searchTerm = document.getElementById('search-term');

      // GraphQL query
      function getGenes() {
        // clear the gene list element
        geneListElement.genes = [];
        geneListElement.searchTerm = searchTerm.value;
        // request new genes
        const start = paginationElement.page-1;
        console.log(start, geneListElement.searchTerm);
        const variables = {keyword: geneListElement.searchTerm, start, size: 10};
//        const variables = {keyword: "NB-ARC", start, size: 10};
        graphqlQuery(uri, query, variables)
          .then(({data}) => {
            console.log(data);
            geneListElement.genes = data.geneSearch;
          });
      }

      // pagination event
      paginationElement.addEventListener('pageChange', getGenes);
      // search event
      searchSubmit.addEventListener('click', getGenes);

      // load initial gene list when DOM is ready
//      document.addEventListener('DOMContentLoaded', (event) => {
//        getGenes();
//      });
