<script lang="ts">
    import { onMount } from "svelte";
    import type { Result } from "../types";
    import { pb } from "../pocketbase";
    import Grid from "gridjs-svelte"
    import { Stretch } from 'svelte-loading-spinners';

    let results: Result[]
    let data = {} 

    onMount(async () => {
        results = await pb.collection("survey").getFullList()
        data = results.map(result => ({
            name: result.student_name,
            score: result.score,
            place: result.place,
            response: result.response,
            contribution: result.contribution,
            teacher: result.teacher,
            safe: result.safe,
        }))
    })

</script>

<main>
    <div class="card my-4 p-3">
        <h2 class="text-center">Results Page</h2>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae maiores sapiente ad dignissimos asperiores ex repellat magnam consequatur maxime possimus veniam quis dolor harum corporis laboriosam, sunt quas doloribus suscipit?</p>
    <hr>
    {#if results}
        <Grid data={data} search={true} sort={true} pagination={{limit:10, summary: false}} />
    {:else}
        <div class="d-flex align-items-center justify-content-center"><Stretch size="60" color="#524529" unit="px" duration="1s"/></div>
    {/if}
    </div>
</main>


<style global>
    @import "https://cdn.jsdelivr.net/npm/gridjs/dist/theme/mermaid.min.css";
  </style>