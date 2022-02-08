<script lang="ts">
  import { each, text } from "svelte/internal";
  import { tzkt } from "../lib";

  import Transaction from "./tzkt/Transaction.svelte";
  import Block from "./tzkt/Block.svelte";

  async function respToText(resp: Response) {
    return await resp.text();
  }

  async function respToJSON(resp: Response) {
    return await resp.json();
  }

  // @ts-ignore
  const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://api.tzkt.io/v1/events")
    .build();

  async function init() {
    await connection.start();
    await connection.invoke("SubscribeToBlocks");
  }

  // auto-reconnect
  connection.onclose(init);

  connection.on("blocks", (msg) => {
    console.log(msg);
    if (msg.data) {
      for (const newBlock of msg.data) {
        // blocks = [...blocks, ...msg.data];
        tzkt(`/blocks/${Number(newBlock.level)}`, { operations: true })
          .then(respToJSON)
          .then((block) => (blocks = [...blocks, block]));
      }
    }
  });

  init();

  let blocks: any[] = [];
  tzkt(`/blocks/count`)
    .then(respToText)
    .then((block) => tzkt(`/blocks/${Number(block) - 1}`, { operations: true }))
    .then(respToJSON)
    .then((block) => (blocks = [block, ...blocks]));

</script>

<main class="container">
  {#each [...blocks].reverse() as block (block.level)}
    <Block {block} />
  {/each}
</main>

<style>
  .anim {
    animation: a 2s;
  }
  @keyframes a {
    from {
      transform: translate(50px, 0);
    }
  }
</style>
