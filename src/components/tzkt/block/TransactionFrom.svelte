<script>
  import { walletName } from "../../../lib";
  export let transaction;

  const method = transaction?.parameter?.entrypoint;

  const methodArgs = ({
    "string": value => value.length > 8 ? `${value.slice(0, 5)}...` : value,
    "number": value => value,
    "object": _ => "{...}",
  }[typeof transaction?.parameter?.value] || (() => {}))(transaction?.parameter?.value);
</script>

<div class="transaction-from">
  <span class="transaction-from__status">{{ 'applied': "", "failed": "fail", "skipped": "⏭", "backtracked": "👈" }[transaction.status]}</span>
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
  }

  .transaction-from > * {
    flex-shrink: 0;
  }

  .transaction-from > *:not(:last-child) {
    margin-right: 10px;
  }

  .transaction-from__status {
    width: 30px;
  }


  .transaction-from__number {
    width: 40px;
    text-align: right;
    color: inherit;
  }

  .transaction-from__number:hover {
    text-decoration: underline;
  }

  .transaction-from__wallet {
    width: 400px;
    color: inherit;
    opacity: 0.5;
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