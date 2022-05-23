<script>
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

export default {
    setup() {
        const { result, loading, error } = useQuery(gql`
      query getGenes {
        genes {
          identifier
          name
          description
        }
      }
    `)

        return {
            result,
            loading,
            error,
        }
    },
}
</script>

<template>
  <h1>Here be some genes</h1>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">Error: {{ error.message }}</div>
  <ul v-if="result && result.genes">
    <li v-for="gene of result.genes" :key="gene.identifier">
      <b>{{ gene.name }}</b>
      <br/>
      {{ gene.description }}
    </li>
  </ul>
</template>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
