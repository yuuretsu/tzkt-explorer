<script>
  import { walletName } from "../../../lib";
  import MdErrorOutline from 'svelte-icons/md/MdErrorOutline.svelte';
  import MdArrowBack from 'svelte-icons/md/MdArrowBack.svelte';
  import MdSkipNext from 'svelte-icons/md/MdSkipNext.svelte';
  export let transaction;

  const method = transaction?.parameter?.entrypoint;

  const methodArgs = ({
    "string": value => value.length > 8 ? `${value.slice(0, 5)}...` : value,
    "number": value => value,
    "object": _ => "{...}",
  }[typeof transaction?.parameter?.value] || (() => {}))(transaction?.parameter?.value);

  const statusBlock = {
    "failed": MdErrorOutline,
    "backtracked": MdArrowBack,
    "skipped": MdSkipNext,
  }[transaction.status];

</script>

<div class="transaction-from" class:failed={transaction.status === "failed"}>
  <div class="transaction-from__status">
    {#if statusBlock}
      <svelte:component this={statusBlock}></svelte:component>
    {/if}
  </div>
  <a class="transaction-from__number" href={`https://tzkt.io/${transaction.hash}`} target="_blank">#{1 + +transaction.numberInBlock}</a>
  <a class="transaction-from__wallet" class:bold={walletName(transaction.sender).type === "alias"} href={`https://tzkt.io/${transaction.sender.address}`} target="_blank">{walletName(transaction.sender).value}</a>
  <div>
    {#if method}
      <code class="method">
        {method}({methodArgs})
      </code>
    {/if}
    {#if transaction.amount && method}
      with
    {/if}
    {#if transaction.amount}
      <span class="xtz-amount">
        {transaction.amount / 1000000} ꜩ
      </span>
    {/if}
  </div>
</div>

<style>
  .transaction-from {
    display: flex;
    align-items: center;
  }

  .transaction-from > * {
    flex-shrink: 0;
  }

  .transaction-from > *:not(:last-child) {
    margin-right: 10px;
  }

  .transaction-from__status {
    display: flex;
    align-items: center;
    width: 18px;
  }


  .transaction-from__number {
    width: 40px;
    text-align: right;
    color: inherit;
  }

  .transaction-from.failed .transaction-from__number {
    color: red;
  }

  .transaction-from__number:hover {
    text-decoration: underline;
  }

  .transaction-from__wallet {
    width: 400px;
    color: inherit;
    opacity: 0.5;
  }

  .transaction-from.failed .transaction-from__wallet {
    color: red;
  }

  
  .transaction-from__wallet:hover {
    text-decoration: underline;
  }
  
  .transaction-from__wallet.bold {
    font-weight: bold;
    opacity: 1;
  }

  .method {
    /* font-family: monospace; */
    font-weight: bold;
  }

  .xtz-amount {
    color: rgb(0 150 0);
    font-weight: bold;
  }
</style>