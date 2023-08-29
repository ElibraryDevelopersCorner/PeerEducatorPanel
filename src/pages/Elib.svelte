<!-- svelte-ignore a11y-label-has-associated-control -->
<script lang="ts">
    import { onMount } from "svelte";
    import { pb } from "../pocketbase";
    import type { Book } from "../types";

    let books: Book[];
    let grade: number = 0;
    let search: string = "";

    let filterGrade = async () => {
        books = await pb.collection("books").getFullList<Book>({ filter: `grade = ${grade}` });
    } 

    let searchTitle = async () => {
        books = await pb.collection("books").getFullList<Book>({ filter: `title ~ "${search}"` });
    } 

    onMount(async () => {
        books = await pb.collection("books").getFullList<Book>();
    });
</script>

<main>
    {#if books}
        <div class="d-flex justify-content-between align-items-center">
            <form on:submit|preventDefault>
                <div class="row g-3 align-items-center mb-4 mx-2">
                    <div class="col-auto">
                        <label class="col-form-label">Grade:</label>
                    </div>
                    <div class="col-auto">
                        <input
                            type="number"
                            class="form-control"
                            name="grade"
                            bind:value={grade}
                        />
                    </div>
                    <div class="col-auto">
                        <button class="btn btn-primary" type="submit" on:click={filterGrade}
                            >Sort</button
                        >
                    </div>
                </div>
            </form>

            <form on:submit|preventDefault>
                <div class="row g-3 align-items-center mb-4 mx-2">
                    <div class="col-auto">
                        <label class="col-form-label">Search:</label>
                    </div>
                    <div class="col-auto">
                        <input
                            class="form-control me-sm-2"
                            type="text"
                            placeholder="Search"
                            name="q"
                            bind:value={search}
                        />
                    </div>
                    <div class="col-auto">
                        <input
                            type="submit"
                            value="Search"
                            class="btn btn-secondary my-2 my-sm-0"
                            on:click={searchTitle}
                        />
                    </div>
                </div>
            </form>
        </div>
        {#each books as book}
            <div class="card mb-4">
                <div class="card-body">
                    <h5 class="card-title">
                        {book.title}
                    </h5>
                    <p class="card-text">
                        {@html book.description}
                    </p>
                    <p>for Grade: {book.grade}
                    </p>
                    <a href="{`/elib/book/${book.id}`}" class="btn btn-primary">Read Now</a>
                </div>
            </div>
        {/each}
    {:else}
        <p>Loading...</p>
    {/if}
</main>
