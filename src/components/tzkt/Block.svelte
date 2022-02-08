<script>
  import { tzkt, walletName } from "../../lib";
  import BlockHead from "./block/BlockHead.svelte";

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
            <div class="transaction-from">
              <span class="transaction-from__status">{{ 'applied': "😊", "failed": "😡", "skipped": "⏭", "backtracked": "👈" }[transaction.status]}</span>
              <span class="transaction-from__number">#{1 + +transaction.numberInBlock}</span>
              <a class="transaction-from__wallet" class:bold={walletName(transaction.sender).type === "alias"} href={`https://tzkt.io/${transaction.sender.address}`}>{walletName(transaction.sender).value}</a>
              {#if transaction?.parameter?.entrypoint}
              {transaction?.parameter?.entrypoint}();
              {/if}
            </div>
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
    padding-bottom: 5px;
    padding-top: 10px;
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
    font-size: 1.2em;
  }

  .transaction-target-name.bold {
    font-weight: bold;
  }

  .transactions-from {
    margin-left: 25px;
    margin-bottom: 20px;
  }

  .transaction-from {
    display: flex;
  }

  .transaction-from > * {
    flex-shrink: 0;
  }

  .transaction-from > *:not(:last-child) {
    margin-right: 10px;
  }



  .transaction-from__number {
    width: 40px;
    text-align: right;
  }

  .transaction-from__wallet {
  }

  .transaction-from__wallet.bold {
    font-weight: bold;
  }

  @keyframes arise {
    from {
      opacity: 0;
    }
  }

  @keyframes arise2 {
    from {
      opacity: 0;
      transform: translate(0, -100px)
    }
  }
</style>
