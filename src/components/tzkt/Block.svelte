<script>
  import { tzkt, walletName } from "../../lib";
  import BlockHead from "./block/BlockHead.svelte";
  import TransactionFrom from "./block/TransactionFrom.svelte";

  export let block;
  export let showMore = false;

  function transactionsTo(list) {
    const transactions = {};
    for (const [n, transaction] of Object.entries(list)) {
      const key = transaction.target.address;
      transactions[key] ??= { list: [], to: walletName(transaction.target) };
      transactions[key].list.push({ ...transaction, numberInBlock: n });
    }
    return transactions;
  }

  console.log(block);
  

</script>

<div class="block">
  <BlockHead {block} bind:showMore={showMore} />
  {#if showMore}
    <div class="block-body">
      {#each Object.entries(transactionsTo(block.transactions)) as [to, transactions]}
        <div class="transaction-target">
          to
          <img class="transaction-target-avatar" src={`https://services.tzkt.io/v1/avatars/${to}`} width="40" height="40" alt={transactions.to.value}>
          <a class="transaction-target-name" class:bold={transactions.to.type === 'alias'} href={`https://tzkt.io/${to}`}>
            {transactions.to.value}
          </a>
        </div>
        <div class="transactions-from">
          {#each transactions.list as transaction}
            <TransactionFrom {transaction} />
          {/each}
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .block {
    animation: arise2 1s;
  }

  .block-body {
    padding: 10px;
    animation: arise 1s;
  }

  .transaction-target {
    display: flex;
    align-items: center;
    box-shadow: 0 -25px 20px rgb(0 0 0 / 5%);
    padding-bottom: 10px;
    padding-top: 15px;
    padding-left: 10px;
    padding-right: 10px;
    margin-bottom: 10px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    margin-left: -10px;
    margin-right: -10px;
  }
  
  .transaction-target-avatar {
    margin-right: 10px;
    margin-left: 10px;
    border: 1px solid rgb(0 0 0 / 25%);
    border-radius: 50%;
  }
  
  .transaction-target-name {
    color: inherit;
    font-size: 1.2em;
  }

  .transaction-target-name.bold {
    font-weight: bold;
  }

  .transactions-from {
    margin-left: 25px;
    margin-bottom: 20px;
  }

  @keyframes arise {
    from {
      opacity: 0;
    }
  }

  @keyframes arise2 {
    from {
      opacity: 0;
      margin-bottom: -65px;
      transform: translate(0, -65px)
    }
  }
</style>
