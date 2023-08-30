<script lang="ts">
    import { onMount } from "svelte";
    import type { Book, Review } from "../types";
    import { pb } from "../pocketbase";

    export let id: string = "";

    let book: Book;
    let reviews: Review[];

    let current_level = 1

    let textSpoken1 = "Text Spoken: "
    let textSpoken2 = "Text Spoken: "
    let textSpoken3 = "Text Spoken: "

    let statusText1 = "Status: "
    let statusText2 = "Status: "
    let statusText3 = "Status: "

    let review_name = ""
    let review_markup = ""

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition();


    const addReview = async () => {
        await pb.collection("reviews").create({
            "name": review_name,
            "review": review_markup,
            "book": id
        })
    }

    recognition.onresult = (e) => {
        if (current_level === 1) {
            let transcript = e.results[e.resultIndex][0].transcript
            let text = "Text Spoken: " + transcript
            textSpoken1 = text
            if (transcript === book.easy_level_text.toLocaleLowerCase()) {
                statusText1 = "Status: Excellent"
            } else {
                statusText1 = "Status: Work For Improvement"
            }
        }
        if (current_level === 2) {
            let transcript = e.results[e.resultIndex][0].transcript
            let text = "Text Spoken: " + transcript
            textSpoken2 = text
            if (transcript === book.easy_level_text.toLocaleLowerCase()) {
                statusText2 = "Status: Excellent"
            } else {
                statusText2 = "Status: Work For Improvement"
            }
        }
        if (current_level === 3) {
            let transcript = e.results[e.resultIndex][0].transcript
            let text = "Text Spoken: " + transcript
            textSpoken3 = text
            if (transcript === book.easy_level_text.toLocaleLowerCase()) {
                statusText3 = "Status: Excellent"
            } else {
                statusText3 = "Status: Work For Improvement"
            }
        }
    }

    const talk1 = () => {
        current_level = 1
        recognition.start()
    }

    const talk2 = () => {
        current_level = 2
        recognition.start()
    }

    const talk3 = () => {
        current_level = 3
        recognition.start()
    }

    onMount(async () => {
        book = await pb.collection("books").getOne<Book>(id);
        reviews = await pb.collection("reviews").getFullList<Review>({ filter: `book = "${id}"` })
    });
</script>

<main>
    {#if book}
        <div class="card mb-4">
            <img
                src={`https://peersangli.pockethost.io/api/files/${book.collectionId}/${book.id}/${book.img}`}
                alt={book.title}
                class="card-img-top"
            />
            <div class="card-body">
                <h2 class="card-title">
                    {book.title}
                </h2>
                <p class="card-text">
                    {@html book.description}
                </p>
                <hr />
                <br />
                <h4>Listen to Story</h4>
                <audio controls class="mb-4">
                    <source
                        src={`https://peersangli.pockethost.io/api/files/${book.collectionId}/${book.id}/${book.audio_file}`}
                        type="audio/mpeg"
                    />
                    Your browser does not support the audio element.
                </audio>
                <h4>Read the Story</h4>
                <div class="accordion" id="accordionExample">
                    <div class="accordion-item">
                        <h3 class="accordion-header" id="headingOne">
                            <button
                                class="accordion-button"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseOne"
                                aria-expanded="true"
                                aria-controls="collapseOne"
                            >
                                Read Story Now
                            </button>
                        </h3>
                        <div
                            id="collapseOne"
                            class="accordion-collapse collapse show"
                            aria-labelledby="headingOne"
                            data-bs-parent="#accordionExample"
                        >
                            <div class="p-2">
                                {book.word_markup}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card mb-4">
            <div class="card-body">
                <h2 class="card-title">Speaking Practise</h2>
                <p class="card-text">
                    A good read is always well praised, but bringing it into
                    action by speaking. Speech is one of the most essential
                    skill a person should have proficiency in and the thus the
                    only way to do that is practise it daily by reading aloud
                    may it be sentences, paragraphes, stories or novels
                </p>
                <hr />
                <br />
                <h4>Easy Level</h4>
                <p><b>Text</b>: <span id="text1">{book.easy_level_text}</span><br>
                <button class="btn btn-primary my-3" id="talk1" on:click={talk1}>Talk</button>
                <p id="content1">{textSpoken1}</p>
                <p id="status1">{statusText1}</p>
                <hr />
                <br />
                <h4>Intermediate Level</h4>
                <p><b>Text</b>: <span id="text2">{book.intermediate_level_text}</span><br>
                <button class="btn btn-primary my-3" id="talk2" on:click={talk2}>Talk</button>
                <p id="content2">{textSpoken2}</p>
                <p id="status2">{statusText2}</p>
                <hr />
                <br />
                <h4>Hard Level</h4>
                <p><b>Text</b>: <span id="text3">{book.hard_level_text}</span><br>
                <button class="btn btn-primary my-3" id="talk3" on:click={talk3}>Talk</button>
                <p id="content3">{textSpoken3}</p>
                <p id="status3">{statusText3}</p>
                <hr />
                <br />
            </div>
        </div>
        <div class="card mb-4">
            <div class="card-body">
                <h2 class="card-title">
                    {book.title} : Reviews
                </h2>
                <p class="card-text">Reviewers help book authors to get feedback, useful for future development, and to know the
                    success or failure of their books (see, for example, Leyshon, 2013). Reviews can also help course teachers
                    to choose one book over another or warn them off certain books. So Do please review the books you read today.</p>
                <hr><br>
                <h3>Add Reviews</h3>
                <form on:submit|preventDefault class="mb-3" method="post">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Name</label>
                        <input type="text" class="form-control" id="exampleFormControlInput1" name="author" bind:value={review_name}>
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Review</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" name="review" bind:value={review_markup}></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary" on:click={addReview}>Submit</button>
                </form>
                <h3>Reviews</h3>
                {#if reviews}
                    {#if reviews.length !== 0}
                        <ul class="list-group">
                            {#each reviews as review}
                                <li class="list-group-item">
                                    <p>{review.review}</p>
                                    <p>{review.name}</p>
                                </li>
                            {/each}
                        </ul>
                    {:else}
                        <p>No Reviews Available! Leave one today.</p>
                    {/if}
                {/if}
            </div>
        </div>

    {:else}
        <p>Loading...</p>
    {/if}
</main>
