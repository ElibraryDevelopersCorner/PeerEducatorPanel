<script>

    import { currentUser } from "../pocketbase";

</script>
<img src="Untitled (2).png"
    alt="banner" class="img-fluid" style="width: 100%;">
<div class="mb-4 p-4 d-flex justify-content-center align-items-center bg-info">
    <a class="btn btn-primary mx-2" href="/elib">E-Library</a>
    <a class="btn btn-primary mx-2" href="/quotient">Happiness Quotient</a>
    {#if $currentUser}
    <a class="btn btn-primary mx-2" href="/students">Students</a>
    <a class="btn btn-primary mx-2" href="/results">Bullying</a>
        
    {/if}

</div>
<section class="mb-4 p-4">
    <div class="d-flex justify-content-center">
        <div class="card m-3" style="max-width: 50%; min-width: 25%;">
            <img src="WhatsApp Image 2022-07-26 at 7.43.14 PM.jpeg"
                class="card-img-top" alt="...">
            <div class="card-body d-flex justify-content-center align-items-center flex-column">
                <div style="font-weight: bolder;" class="text-center">
                    <p class="card-text">Mr. G.B. Patil</p>
                    <p class="card-text">Principal</p>
                    <p class="card-text">Podar International School Sangli</p>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="mb-4 p-4">
    <h1 class="text-center"><u>Head Of Panel</u></h1>
    <ul class="list-group">
        <li class="list-group-item">
            <div class="d-flex 
            justify-content-between">
                <span>Mr. G.B. Patil</span>
                <span>Principal of Podar International School Sangli</span>
            </div>
        </li>
    </ul>
</section>

<section class="mb-4 p-4">
    <h1 class="text-center"><u>Mentors</u></h1>
    <ul class="list-group">
        <li class="list-group-item">
            <div class="d-flex 
    justify-content-between ">
                <span>Dr. Kshitija Bhate</span>
                <span><b>Mentor of Peer Educator Program and School Counseller of Podar International School Sangli</b></span>
            </div>
        </li>
    </ul>
</section>

<section class="mb-4 p-4">
    <h1 class="text-center"><u>Student Members</u></h1>
    <ul class="list-group">
        <li class="list-group-item">
            <div class="d-flex 
            justify-content-between">
                <span>Onkar Jadhav</span>
                <span>Studying in Grade 8th</span>
            </div>
        </li>
        <li class="list-group-item">
            <div class="d-flex 
        justify-content-between">
                <span>Omkar Kumbhar</span>
                <span>Studying in Grade 8th</span>
            </div>
        </li>
        <li class="list-group-item">
            <div class="d-flex 
    justify-content-between">
                <span>Goda Ladda</span>
                <span>Studying in Grade 8th</span>
            </div>
        </li>
        <li class="list-group-item">
            <div class="d-flex 
    justify-content-between">
                <span>Akanksha Mali</span>
                <span>Studying in Grade 8th</span>
            </div>
        </li>
        <li class="list-group-item">
            <div class="d-flex 
    justify-content-between">
                <span> Param Shah</span>
                <span>Studying in Grade 9th</span>
            </div>
        </li>
        <li class="list-group-item">
            <div class="d-flex 
    justify-content-between">
                <span>Muskan Malu</span>
                <span>Studying in Grade 10th</span>
            </div>
        </li>
        <li class="list-group-item">
            <div class="d-flex 
    justify-content-between">
                <span>Shambhavi Kulkarni</span>
                <span>Studying in Grade 10th</span>
            </div>
        </li>
        <li class="list-group-item">
            <div class="d-flex 
            justify-content-between">
                <span>Gaurav Jagdale</span>
                <span>Studying in Grade 10th</span>
            </div>
        </li>
        <li class="list-group-item">
            <div class="d-flex 
        justify-content-between">
                <span>Afain Shaikh</span>
                <span>Studying in Grade 10th</span>
            </div>
        </li>
        <li class="list-group-item">
            <div class="d-flex 
    justify-content-between">
                <span>Riya Kulkarni</span>
                <span>Studying in Grade 12th</span>
            </div>
        </li>
        <li class="list-group-item">
            <div class="d-flex 
    justify-content-between">
                <span>Gayatri Vaidya</span>
                <span>Studying in Grade 12th</span>
            </div>
        </li>
    </ul>
</section>

<section class="mb-4 p-4">
    <h1 class="text-center"><u>Sessions Conducted</u></h1>
    <div class="d-flex justify-content-center align-items-center flex-column">
        <div class="d-flex justify-content-center align-items-center">
            <div class="card m-3">
                <img src="IMG20220602083641.jpg"
                    class="card-img-top" alt="...">
                <div class="card-body">
                    <p class="card-text">Omkar Kumbhar taking a special session on acting to develope one's character
                    </p>
                </div>
            </div>
            <div class="card m-3">
                <img src="IMG20220603083118.jpg"
                    class="card-img-top" alt="...">
                <div class="card-body">
                    <p class="card-text">Gaurav Jagdale taking time from his life as 10h grader to contribute to the
                        initiative</p>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-center align-items-center">
            <div class="card m-3">
                <img src="https://github.com/ElibraryDevelopersCorner/E-Library-Audio-Sources/blob/main/IMG20220604081416.jpg?raw=true"
                    class="card-img-top" alt="...">
                <div class="card-body">
                    <p class="card-text">Muskan Malu and Shambhavi Kulkarni taking their students outside for hands on
                        learning</p>
                </div>
            </div>
            <div class="card m-3">
                <img src="https://github.com/ElibraryDevelopersCorner/E-Library-Audio-Sources/blob/main/IMG20220604083803.jpg?raw=true"
                    class="card-img-top" alt="...">
                <div class="card-body">
                    <p class="card-text">Onkar Jadhav taking a session on outdoor painting by having them paint the
                        scenery.</p>
                </div>
            </div>
        </div>
    </div>
</section>