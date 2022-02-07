<script lang="ts">
  import { tzkt } from "../../lib";

  export let transaction;
  console.log(transaction);

  // tzkt(`/accounts/${transaction.sender.address}/metadata`).then(console.log);
</script>

<div class="transaction">
  <div class="sender-avatar-wraper">
    <!-- https://services.tzkt.io/v1/avatars/{transaction.sender.address} -->
    <img
      src={`https://services.tzkt.io/v1/avatars/${transaction.sender.address}`}
      alt=""
    />
  </div>
  <div>
    <h3>{transaction.hash}</h3>
    <p>{transaction.type}</p>
    <p>
      {transaction.sender.alias || transaction.sender.address} -> {transaction
        .target.alias || transaction.target.address}
    </p>
    {#if transaction.amount > 0}
      <p class="amount-xtz">{transaction.amount / 1000000} ꜩ</p>
    {/if}
  </div>
</div>

<style>
  h3 {
    margin: 0;
  }
  p {
    margin: 0;
  }
  .transaction {
    padding: 20px;
    background-color: antiquewhite;
    display: flex;
  }
  .sender-avatar-wraper {
    flex-shrink: 0;
    flex-grow: 0;
    width: 50px;
    margin-right: 10px;
  }
  .sender-avatar-wraper img {
    width: 100%;
    border-radius: 50%;
  }
  .amount-xtz {
    color: rgb(0 150 0);
    font-weight: bold;
  }
  * {
    outline: 1px solid rgb(0 0 0 / 10%);
  }
</style>
