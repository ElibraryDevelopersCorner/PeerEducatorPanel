<!-- svelte-ignore a11y-label-has-associated-control -->
<script lang="ts">
    import { navigate } from "svelte-navigator";
    import { pb } from "../pocketbase";

    let options = [
        { label: "a. Rarely Or Never", value: 10 },
        { label: "b. Occassionaly", value: 7 },
        { label: "c. Frequently", value: 4 },
        { label: "d. Almost Every Day", value: 1 },
    ];
    let options_inversed = [
        { label: "a. Almost Every Day", value: 10 },
        { label: "b. Frequently", value: 7 },
        { label: "c. Occassionaly", value: 4 },
        { label: "d. Rarely Or Never", value: 1 },
    ];
    let satisfied = [
        { label: "a. Very satisfied", value: 10 },
        { label: "b. Somewhat satisfied", value: 7 },
        { label: "c. Neutral", value: 4 },
        { label: "d. Somewhat dissatisfied", value: 1 },
    ]
    let optimistic = [
        { label: "a. Strongly Optimistic", value: 10 },
        { label: "b. Somewhat Optimistic", value: 7 },
        { label: "c. Somewhat Pessimistic", value: 4 },
        { label: "d. Strongly Pessimistic", value: 1 },
    ]
    let quality = [
        { label: "a. Very Well", value: 10 },
        { label: "b. Somewhat Well", value: 7 },
        { label: "c. Somewhat Poorly", value: 4 },
        { label: "d. Very Poorly", value: 1 },
    ]

    let name: string
    let grade: number
    let divisions = [
        {label: "a. Diamond", value:"diamond"},
        {label: "b. Opal", value:"opal"},
        {label: "c. Ruby", value:"ruby"},
        {label: "d. Topaz", value:"topaz"},
        {label: "e. Perl", value:"perl"},
        {label: "f. Emerald", value:"emerald"},
    ]
    let selected: { label:string, value:string }

    let q1: number = 10;
    let q2 = options_inversed[0];
    let q3 = options[0];
    let q4 = satisfied[0];
    let q5 = options_inversed[0];
    let q6 = optimistic[0];
    let q7 = options_inversed[0];
    let q8 = quality[0];
    let q9 = satisfied[0];
    let q10 = options_inversed[0];

    $: choices = [q2, q3, q4, q5, q6, q7, q8, q9, q10]

    let submitHappinessQuotient = async () => {
        let total = q1
        for (const choice of choices) {
            total += choice.value
        }
        let depressed = total <= 40 ? true : false
        let data = {
            name,
            grade,
            division: selected.value,
            score: total,
            quotient: total,
            depressed
        }
        console.log(data)
        let { id } = await pb.collection("student").create(data)
        navigate("/student/"+id)
    }
</script>

<main>
    <div class="card my-4 p-2">
        <h1 class="text-center">Happiness Quotient Form</h1>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat
            soluta corrupti voluptatum earum ad esse eaque, unde voluptas minima
            tempora culpa quidem dignissimos tenetur in? Officia corrupti quidem
            a earum?
        </p>
        <hr />
        <form class="p-2" on:submit|preventDefault>
            <div class="mb-3">
                <label class="form-label"
                    >What's Your Name?</label
                >
                <input type="Text" class="form-control" bind:value={name} placeholder="John Doe" />
            </div>
            <div class="mb-3">
                <label class="form-label"
                    >What's Your Grade?</label
                >
                <input type="number" class="form-control" bind:value={grade} />
            </div>
            <div class="mb-3">
                <label class="form-label"
                    >What's Your Division
                </label>
                {#each divisions as division}
                    <div class="form-check">
                        <input
                            class="form-check-input"
                            type="radio"
                            value={division}
                            bind:group={selected}
                        />
                        <label class="form-check-label">{division.label}</label>
                    </div>
                {/each}
            </div>
            <hr>
            <div class="mb-3">
                <label class="form-label"
                    >1. On a scale of 1 to 10, how satisfied are you with your
                    life overall? (1 = Extremely dissatisfied, 10 = Extremely
                    satisfied)</label
                >
                <input type="number" class="form-control" bind:value={q1} />
            </div>
            <div class="mb-3">
                <label class="form-label"
                    >2. How often do you experience positive emotions (e.g.,
                    joy, excitement, contentment) in our School?
                </label>
                {#each options_inversed as option}
                    <div class="form-check">
                        <input
                            class="form-check-input"
                            type="radio"
                            value={option}
                            bind:group={q2}
                        />
                        <label class="form-check-label">{option.label}</label>
                    </div>
                {/each}
                
            </div>
            <div class="mb-3">
                <label class="form-label"
                    >3. How often do you experience negative emotions (e.g.,
                    sadness, anxiety, anger) in our School?
                </label>
                {#each options as option}
                    <div class="form-check">
                        <input
                            class="form-check-input"
                            type="radio"
                            value={option}
                            bind:group={q3}
                        />
                        <label class="form-check-label">{option.label}</label>
                    </div>
                {/each}
            </div>
            <div class="mb-3">
                <label class="form-label"
                    >4.	How satisfied are you with your teachers and peers?
                </label>
                {#each satisfied as satisfy}
                    <div class="form-check">
                        <input
                            class="form-check-input"
                            type="radio"
                            value={satisfy}
                            bind:group={q4}
                        />
                        <label class="form-check-label">{satisfy.label}</label>
                    </div>
                {/each}
            </div>
            <div class="mb-3">
                <label class="form-label"
                    >5.	How often do you engage in activities or hobbies that bring you joy and fulfillment? 
                </label>
                {#each options_inversed as option}
                    <div class="form-check">
                        <input
                            class="form-check-input"
                            type="radio"
                            value={option}
                            bind:group={q5}
                        />
                        <label class="form-check-label">{option.label}</label>
                    </div>
                {/each}
            </div>
            <div class="mb-3">
                <label class="form-label"
                    >6.	Are you generally optimistic about school group or do you feel secluded? 
                </label>
                {#each optimistic as satisfy}
                    <div class="form-check">
                        <input
                            class="form-check-input"
                            type="radio"
                            value={satisfy}
                            bind:group={q6}
                        />
                        <label class="form-check-label">{satisfy.label}</label>
                    </div>
                {/each}
            </div>
            <div class="mb-3">
                <label class="form-label"
                    >7.	How often do you feel a sense of purpose or meaning in your school life? 
                </label>
                {#each options_inversed as satisfy}
                    <div class="form-check">
                        <input
                            class="form-check-input"
                            type="radio"
                            value={satisfy}
                            bind:group={q7}
                        />
                        <label class="form-check-label">{satisfy.label}</label>
                    </div>
                {/each}
            </div>
            <div class="mb-3">
                <label class="form-label"
                    >8.	How well do you cope with stress and difficult situations in school? 
                </label>
                {#each quality as satisfy}
                    <div class="form-check">
                        <input
                            class="form-check-input"
                            type="radio"
                            value={satisfy}
                            bind:group={q8}
                        />
                        <label class="form-check-label">{satisfy.label}</label>
                    </div>
                {/each}
            </div>
            <div class="mb-3">
                <label class="form-label"
                    >9.	How satisfied are you with your emotional health and well-being among your peers?
                </label>
                {#each satisfied as satisfy}
                    <div class="form-check">
                        <input
                            class="form-check-input"
                            type="radio"
                            value={satisfy}
                            bind:group={q9}
                        />
                        <label class="form-check-label">{satisfy.label}</label>
                    </div>
                {/each}
            </div>
            <div class="mb-3">
                <label class="form-label"
                    >10. How often do you practice gratitude and express appreciation for the positive aspects of your school life? 
                </label>
                {#each options_inversed as satisfy}
                    <div class="form-check">
                        <input
                            class="form-check-input"
                            type="radio"
                            value={satisfy}
                            bind:group={q10}
                        />
                        <label class="form-check-label">{satisfy.label}</label>
                    </div>
                {/each}
            </div>
            <button type="submit" class="btn btn-primary" on:click={submitHappinessQuotient}>Submit</button>
        </form>
    </div>
</main>
