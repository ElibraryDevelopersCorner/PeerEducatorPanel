<script lang="ts">
    import { onMount } from "svelte";
    import type { Student, Message } from "../types";
    import { pb } from "../pocketbase";
    import type { UnsubscribeFunc } from "pocketbase";

    export let student: string = "";

    let student_bio: Student;
    let messages: Message[];

    let unsubscribe: UnsubscribeFunc;

    let mew_message = "";

    onMount(async () => {
        student_bio = await pb.collection("student").getOne<Student>(student);
        messages = await pb
            .collection("messages")
            .getFullList<Message>({ filter: `student = "${student}"` });
        messages = messages.reverse();
        unsubscribe = await pb
            .collection("messages")
            .subscribe(
                "*",
                async ({
                    action,
                    record,
                }: {
                    action: string;
                    record: Message;
                }) => {
                    if (action === "create") {
                        messages = [record, ...messages];
                    }
                    if (action === "delete") {
                        messages = messages.filter((m) => m.id !== record.id);
                    }
                }
            );
    });
</script>

<main>
    {#if student_bio}
        <div class="card my-4 p-3">
            <h3 class="text-center">
                {student_bio.name}'s Happiness Quotient Result
            </h3>
            <p><b>Name</b>: {student_bio.name}</p>
            <p><b>Grade</b>: {student_bio.grade}</p>
            <p><b>Division</b>: {student_bio.division}</p>
            <p><b>Score</b>: {student_bio.score}</p>
            <p><b>Quotient</b>: {student_bio.quotient}%</p>
            <hr />
            <h3 class="text-center">Chat with School Counseller</h3>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam,
                quibusdam aliquid. Rerum voluptas provident porro est sunt
                molestiae quam? Sit nulla voluptas debitis consectetur quas
                ipsum officiis fugiat quaerat itaque?
            </p>
            <form on:submit|preventDefault class="mb-3">
                <div class="input-group mb-3">
                    <div class="form-floating">
                        <input
                            type="text"
                            class="form-control"
                            id="floatingInput"
                            placeholder="Chat Message"
                            bind:value={mew_message}
                        />
                        <label for="floatingInput">Chat Message</label>
                    </div>
                    <button
                        class="btn btn-primary px-3"
                        type="submit"
                        id="button-addon2"
                        name="chat"
                        >Send <i class="fas fa-paper-plane" /></button
                    >
                </div>
            </form>
            <ul class="list-group">
                {#if messages}
                    {#if messages.length === 0}
                        <p class="text-center list-group-item">
                            No Messages Yet! Initiate Conversation Now
                        </p>
                    {:else}
                        {#each messages as message}
                            <li
                                class="list-group-item"
                                style="text-align: {message.from ===
                                'counsellor'
                                    ? 'left'
                                    : 'right'};"
                            >
                                <div class="d-flex flex-column">
                                    <span>{message.text}</span>
                                    <small class="text-wrap"
                                        >{message.from === "consollor"
                                            ? "School Counsellor"
                                            : student_bio.name}
                                        {new Date(
                                            message.created
                                        ).toLocaleDateString()}</small
                                    >
                                </div>
                            </li>
                        {/each}
                    {/if}
                {/if}
            </ul>
        </div>
    {/if}
</main>
