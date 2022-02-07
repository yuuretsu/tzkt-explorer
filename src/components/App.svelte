<script lang="ts">
  import { tzkt } from "../lib";

  import Transaction from "./tzkt/Transaction.svelte";
</script>

<main>
  {#await tzkt(`/operations/transactions/opVHGZccS4HLgfK9Yzo6wryBRcqR11dEHEGaNY6omrgBew7tbxK`)}
    loading...
  {:then transactions}
    {#each JSON.parse(transactions) as transaction}
      <Transaction {transaction} />
    {/each}
  {/await}
</main>

<style>
  /*  */
</style>
