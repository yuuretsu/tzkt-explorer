<script>
  import { walletName } from "../../../lib";
  export let block;
  export let showMore;

  const time = new Date(block.timestamp);
</script>

<button class="block-head" class:opened={showMore} on:click={() => (showMore = !showMore)}>
  <div class="block-lvl">
    #{block.level}
  </div>
  <div class="block-baker-avatar">
    <div class="block-baker-avatar-wrapper">
      <img
        src={`https://services.tzkt.io/v1/avatars/${block.baker.address}`}
        width="25"
        alt={`${walletName(block.baker).value} avatar`}
      />
    </div>
  </div>
  <div class="block-baker-name">
    {walletName(block.baker).value}
  </div>
  <div>
    [{block.transactions.length}]
  </div>
  <div class="block-time">
    {time.getHours()}:{time.getMinutes()}
  </div>
</button>

<style>
  .block-head {
    display: flex;
    align-items: center;
    padding: 20px;
    white-space: nowrap;
    overflow: hidden;
    width: calc(100% + 40px);
    margin: 0;
    cursor: pointer;
    background: linear-gradient(rgb(240 240 240), rgb(255 255 255));
    border: none;
    margin-left: -20px;
    margin-right: -20px;
    transition-duration: 0.2s;
  }

  .block-head.opened {
    padding: 40px 20px;
  }

  .block-head:hover {
    background-color: rgb(0 0 0 / 5%);
  }

  .block-head > *:not(:last-child) {
    margin-right: 10px;
  }

  .block-baker-avatar-wrapper {
    display: flex;
    /* padding: 5px; */
    border-radius: 50%;
    overflow: hidden;
  }

  .block-baker-avatar-wrapper img {
    transition-duration: 0.2s;
  } 

  .block-head.opened .block-baker-avatar-wrapper img {
    width: 50px;
  }

  .block-baker-name {
    font-weight: bold;
    margin-top: 0;
    margin-bottom: 0;
    max-width: 360px;
  }

  .block-time {
    margin-left: auto;
  }
</style>
