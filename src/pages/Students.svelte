<script lang="ts">
    import { onMount } from "svelte";
    import type { Student } from "../types";
    import { pb } from "../pocketbase";

    let students: Student[];

    let banStudent = async (sid: string) => {
        await pb.collection("student").delete(sid)
        students = students.filter(student => student.id !== sid)
    }

    onMount(async () => {
        students = await pb.collection("student").getFullList<Student>({ sort: "-created" });
    });
</script>

<main>
    <h3>All Students</h3>
    {#if students}
        {#if students.length === 0}
            <p>No Students submitted the survey yet.</p>
        {:else}
            {#each students as student}
            <div class="card mb-4">
                <div class="card-body">
                  <h5 class="card-title">Name: {student.name}</h5>
                  <p class="card-text">
                    Grade: {student.grade} |
                    Happiness Quotient: {student.quotient} <br>
                    {#if student.depressed}
                        The Student is feeling quite low in his life and seems to be quite unhappy.
                    {:else}
                        The Student is feeling perfectly fine and quite happy and content with his life
                    {/if}
                </p>
            </div>
                <div class="card-body">
                  <a href={`/chat/${student.id}`} class="card-link text-info">Chat with Student</a>
                  <!-- svelte-ignore a11y-missing-attribute -->
                  <!-- svelte-ignore a11y-click-events-have-key-events -->
                  <a class="card-link text-danger" on:click={async () => await banStudent(student.id)}>Ban Student</a>
                </div>
              </div>
            {/each}
        {/if}
    {:else}
        <p>Loading...</p>
    {/if}
</main>
