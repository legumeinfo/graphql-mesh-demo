import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';


type Gene = {name: string; organism: {genus: string; species: string}; geneFamily: {name: string}}


@customElement('gene-list-element')
export class GeneListElement extends LitElement {

  // disable shadow DOM to inherit global styles
  override createRenderRoot() {
    return this;
  }

  @property({type: Array})
  genes: Gene[] = [];

  override render() {
    // show whatever the user put inside the tags if there aren't any genes
    if (!this.genes.length) {
      return html`<slot></slot>`;
    }

    // what a table row will look like
    const tableRows = this.genes.map(gene => {
        return html`
          <tr>
            <td>${gene.name}</td>
            <td>${gene.organism.genus}</td>
            <td>${gene.organism.species}</td>
            <td>${gene.geneFamily.name}</td>
          </tr>
        `;
      });

    // draw a table containing the genes
    return html`
      <slot hidden></slot>
      <table class="uk-table uk-table-hover uk-table-divider uk-table-small">
        <caption>Gene List</caption>
        <thead>
          <tr>
            <th>Name</th>
            <th>Genus</th>
            <th>Species</th>
            <th>Family</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    `;
  }

}


declare global {
  interface HTMLElementTagNameMap {
    'gene-list-element': GeneListElement;
  }
}
