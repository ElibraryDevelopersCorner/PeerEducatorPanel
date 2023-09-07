<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import type { Student, Message } from "../types";
    import { pb } from "../pocketbase";
    import type { UnsubscribeFunc } from "pocketbase";
    import { navigate } from "svelte-navigator";

    export let student: string = "";

    let student_bio: Student;
    let messages: Message[];

    let unsubscribe: UnsubscribeFunc;

    let mew_message = "";

    let sendMessage = async () => {
        const data = {
            text: mew_message,
            from: "student",
            student: student,
        };
        await pb.collection("messages").create(data);
        mew_message = "";
    };

    onDestroy(() => {
        unsubscribe?.();
    });

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
            <div class="d-grid gap-2 col-6 mx-auto">
                <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-toggle="modal"
                    data-bs-target="#resultsModal"
                >
                    Show Results
                </button>
                <button
                    type="button"
                    class="btn btn-secondary"
                    on:click={() => navigate(`/bullying/${student_bio.id}`)}
                >
                    Give Bullying Survey
                </button>
            </div><br>
            <small class="text-secondary">*Note all you messages and surveys are end to end encrypted between you and school counsellor.</small>
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
                        on:click={sendMessage}
                        >Send <i class="fas fa-paper-plane" /></button
                    >
                </div>
            </form>
            <ul class="list-group">
                {#if messages}
                    {#if messages.length === 0}
                        <li class="text-center list-group-item">
                            No Messages Yet! Initiate Conversation Now
                        </li>
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
                                        >{message.from === "counsellor"
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
        <div
            class="modal fade"
            id="resultsModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">
                            Happiness Quotient Result
                        </h1>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        />
                    </div>
                    <div class="modal-body">
                        {#if student_bio.quotient <= 40}
                            <video width="320" height="240" loop autoplay>
                                <source src="/digilah-digifun.mp4" type="video/mp4" />
                                <track kind="captions"/>
                                Your browser does not support the video tag.
                            </video>
                        {:else}
                            <video width="320" height="240" loop autoplay>
                                <source src="/emojilaugh-emoji.mp4" type="video/mp4" />
                                <track kind="captions"/>
                                Your browser does not support the video tag.
                            </video>
                        {/if}
                        <p>
                            <b>Score</b>: {student_bio.score} | <b>Quotient</b>: {student_bio.quotient}%
                        </p>
                        {#if student_bio.quotient <= 40}
                            <p>
                                You're feeling pretty low in life. Please take
                                out your time to speak with the school
                                counsellor.
                            </p>
                        {:else}
                            <p>
                                You're feeling amazing in yout life. Do talk to
                                our school counsellor in case you need
                                something.
                            </p>
                        {/if}
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-primary"
                            data-bs-dismiss="modal">Close</button
                        >
                    </div>
                </div>
            </div>
        </div>
    {/if}
</main>
