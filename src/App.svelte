<script lang="ts">
    import { Router, Link, Route, navigate } from "svelte-navigator"
    import Home from "./pages/Home.svelte";
    import About from "./pages/About.svelte";
    import Elib from "./pages/Elib.svelte";
    import Book from "./pages/Book.svelte";
    import { currentUser, pb } from "./pocketbase";
    import Quotient from "./pages/Quotient.svelte";
    import Student from "./pages/Student.svelte";
    import Students from "./pages/Students.svelte";
    import Chat from "./pages/Chat.svelte";
    import Survey from "./pages/Survey.svelte";
    import Results from "./pages/Results.svelte";

    const signInWithGoogle = async () => {
        await pb.collection("users").authWithOAuth2({ provider:"google" })
    }

    const logout = async () => {
        pb.authStore.clear()
        navigate("/")
    }
</script>

<Router>
    <main>
        <div class="container p-2">
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
              <div class="container-fluid">
                  <Link class="navbar-brand" to="/">Peer Educator Panel Dashboard</Link>
                  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor03"
                      aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                      <span class="navbar-toggler-icon"></span>
                  </button>
      
                  <div class="collapse navbar-collapse" id="navbarColor03">
                      <ul class="navbar-nav me-auto">
                          <li class="nav-item">
                              <Link class="nav-link active" to="/">Home
                                  <span class="visually-hidden">(current)</span>
                              </Link>
                          </li>
                          <li class="nav-item">
                              <Link class="nav-link active" to="/about">About
                                  <span class="visually-hidden">(current)</span>
                              </Link>
                          </li>
                          <li class="nav-item dropdown">
                              <span class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown"
                                  aria-expanded="false">
                                  Services
                          </span>
                              <ul class="dropdown-menu">
                                  <li><Link class="dropdown-item" to="/elib">E-Library</Link></li>
                                  <li><Link class="dropdown-item" to="/quotient">Happiness Quotient</Link></li>
                                  <li>
                                      <hr class="dropdown-divider">
                                  </li>
                                  <li><Link class="dropdown-item" to="#">All Apps</Link></li>
                              </ul>
                          </li>
                          {#if $currentUser}
                          <li class="nav-item">
                            <Link to="/students" class="nav-link">Students
                                <span class="visually-hidden">(current)</span>
                            </Link>
                          </li>
                          <li class="nav-item">
                            <Link to="/results" class="nav-link">Bullying
                                <span class="visually-hidden">(current)</span>
                            </Link>
                          </li>
                          {/if}
                      </ul>
                      <div class="ms-auto d-flex align-items-center">
                        {#if $currentUser}
                            <button class="btn btn-danger" on:click={logout}>Log Out</button>
                        {:else}
                            <button class="btn btn-primary" on:click={signInWithGoogle}>Sign In With Google</button>
                        {/if}
                      </div>
                  </div>
              </div>
          </nav>
          <section class="my-4">
            <Route path="/"><Home/></Route>
            <Route path="/about" component={About}/>
            <Route path="/elib" component={Elib}/>
            <Route path="/elib/book/:id" let:params>
                <Book id={params.id} />
            </Route>
            <Route path="/quotient"><Quotient/></Route>
            <Route path="/student/:student" let:params>
                <Student student={params.student}/>
            </Route>
            <Route path="/bullying/:student" let:params>
                <Survey student={params.student} />
            </Route>
            {#if $currentUser}
                <Route path="/students"><Students/></Route>
                <Route path="/chat/:chat" let:params>
                    <Chat chat={params.chat}/>
                </Route>
                <Route path="/results"><Results/></Route>
            {/if}
          </section>
      </div>
      </main>
</Router>