<!-- svelte-ignore a11y-label-has-associated-control -->
<script lang="ts">
    export let student: string = "";

    import { pb } from "../pocketbase";
    import { onMount } from "svelte";
    import type { Student } from "../types";
    import { navigate } from "svelte-navigator";

    let student_bio: Student;

    let place_options =
        "The classroom,The corridors,The toilets,The sports field/playground,Behind buildings,I don’t get bullied or see it happening anywhere".split(
            ","
        );
    let time_options =
        "Before school starts in the morning,During school time,At break,After school,On the bus/taxi going to or from school,Walking to and from school,I don’t get bullied,or see it happening anywhere".split(
            ","
        );
    let response_options =
        "Fight back,Get into an argument with that person or group,Cry,Run away,Keep quiet about it,Tell an adult about what has happened,I don’t get bullied".split(
            ","
        );
    let contribution_options =
        "Join in by copying what the bully is doing,Laugh,Not join in but watch what is happening,Walk away and ignore the bully,Try and help the person being bullied,Try and stop the bullying yourself,Report the bullying to a teacher or another adult,I don’t see any bullying taking place".split(
            ","
        );
    let teacher_options =
        "Never do anything about it,Sometimes do something about it,Always do something about it".split(
            ","
        );
    let safe_options =
        "I never feel safe at school,I feel safe at school sometimes,I always feel safe at school".split(
            ","
        );
    let numerical_options = [
        { label: "Never", value: 10 },
        { label: "Occassionaly", value: 7 },
        { label: "More than once a month", value: 4 },
        { label: "More than once a weeky", value: 1 },
    ];

    let q1 = numerical_options[0];
    let q2 = numerical_options[0];
    let q3 = numerical_options[0];
    let q4 = numerical_options[0];
    let q5 = numerical_options[0];
    let q6 = numerical_options[0];
    let q7 = place_options[0];
    let q8 = time_options[0];
    let q9 = response_options[0];
    let q10 = contribution_options[0];
    let q11 = teacher_options[0];
    let q12 = safe_options[0];

    $: numerical_choices = [q1, q2, q3, q4, q5, q6]

    onMount(async () => {
        student_bio = await pb.collection("student").getOne<Student>(student);
    });

    let submitSurvey = async () => {
        let score = 0
        numerical_choices.forEach(choice => score += choice.value)
        const data = {
            score,
            "place": q7,
            "time": q8,
            "response": q9,
            "contribution": q10,
            "teacher":  q11,
            "safe": q12,
            "student_name": student_bio.name
        }
        await pb.collection("survey").create(data)
        window.alert("Thank you for submiting this survey. We'll look into solving the problem, until then discuss you problemw with the school counsellor securely.")
        navigate(`/student/${student}`)
    }
</script>

<main>
    <div class="card my-4 p-2">
        <h1 class="text-center">Bullying Survey Form</h1>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat
            soluta corrupti voluptatum earum ad esse eaque, unde voluptas minima
            tempora culpa quidem dignissimos tenetur in? Officia corrupti quidem
            a earum?
        </p>
        <hr />
        <form class="p-2" on:submit|preventDefault>
            {#if student_bio}
                <p><b>Name</b>: {student_bio.name}</p>
                <p><b>Grade</b>: {student_bio.grade}</p>
                <p><b>Division</b>: {student_bio.division}</p>
            {/if}
            <small class="text-secondary"
                >*Note all you surveys responses are end to end encrypted
                between you and school counsellor.</small
            >
            <hr />
            <div class="mb-3">
                <label class="form-label"
                    >1. I get physically bullied (hit, kicked, punched, pushed
                    around)
                </label>
                {#each numerical_options as option}
                    <div class="form-check">
                        <input
                            class="form-check-input"
                            type="radio"
                            value={option}
                            bind:group={q1}
                        />
                        <label class="form-check-label">{option.label}</label>
                    </div>
                {/each}
            </div>
            <div class="mb-3">
                <label class="form-label"
                    >2. I get called names, laughed at, made fun of or verbally insulted
                </label>
                {#each numerical_options as option}
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
                    >3. My friends talk behind my back, spread rumours about me and/or exclude me from the
                    group
                </label>
                {#each numerical_options as option}
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
                    >4. I get sexually harassed at school
                </label>
                {#each numerical_options as option}
                    <div class="form-check">
                        <input
                            class="form-check-input"
                            type="radio"
                            value={option}
                            bind:group={q4}
                        />
                        <label class="form-check-label">{option.label}</label>
                    </div>
                {/each}
            </div>
            <div class="mb-3">
                <label class="form-label"
                    >5. People use the Internet, chat rooms, social media etc. to say hurtful things about me
                </label>
                {#each numerical_options as option}
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
                    >6. I bully other children
                </label>
                {#each numerical_options as option}
                    <div class="form-check">
                        <input
                            class="form-check-input"
                            type="radio"
                            value={option}
                            bind:group={q6}
                        />
                        <label class="form-check-label">{option.label}</label>
                    </div>
                {/each}
            </div>
            <div class="mb-3">
                <label class="form-label"
                    >7. I get bullied, or see bullying happening most often in
                </label>
                {#each place_options as option}
                    <div class="form-check">
                        <input
                            class="form-check-input"
                            type="radio"
                            value={option}
                            bind:group={q7}
                        />
                        <label class="form-check-label">{option}</label>
                    </div>
                {/each}
            </div>
            <div class="mb-3">
                <label class="form-label"
                    >8. I get bullied, or see it happening
                </label>
                {#each time_options as option}
                    <div class="form-check">
                        <input
                            class="form-check-input"
                            type="radio"
                            value={option}
                            bind:group={q8}
                        />
                        <label class="form-check-label">{option}</label>
                    </div>
                {/each}
            </div>
            <div class="mb-3">
                <label class="form-label"
                    >9. If someone bullies you, do you
                </label>
                {#each response_options as option}
                    <div class="form-check">
                        <input
                            class="form-check-input"
                            type="radio"
                            value={option}
                            bind:group={q9}
                        />
                        <label class="form-check-label">{option}</label>
                    </div>
                {/each}
            </div>
            <div class="mb-3">
                <label class="form-label"
                    >10. When you see somebody else being bullied, do you
                </label>
                {#each contribution_options as option}
                    <div class="form-check">
                        <input
                            class="form-check-input"
                            type="radio"
                            value={option}
                            bind:group={q10}
                        />
                        <label class="form-check-label">{option}</label>
                    </div>
                {/each}
            </div>
            <div class="mb-3">
                <label class="form-label"
                    >11. When bullying is reported, the teachers...
                </label>
                {#each teacher_options as option}
                    <div class="form-check">
                        <input
                            class="form-check-input"
                            type="radio"
                            value={option}
                            bind:group={q11}
                        />
                        <label class="form-check-label">{option}</label>
                    </div>
                {/each}
            </div>
            <div class="mb-3">
                <label class="form-label"
                    >12. How safe do you feel at school?
                </label>
                {#each safe_options as option}
                    <div class="form-check">
                        <input
                            class="form-check-input"
                            type="radio"
                            value={option}
                            bind:group={q12}
                        />
                        <label class="form-check-label">{option}</label>
                    </div>
                {/each}
            </div>
            <button type="submit" class="btn btn-primary" on:click={submitSurvey}>Submit</button>
        </form>
    </div>
</main>
