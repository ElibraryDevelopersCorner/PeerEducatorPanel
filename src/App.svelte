<script lang="ts">
    import { Router, Link, Route } from "svelte-navigator"
    import Home from "./pages/Home.svelte";
    import About from "./pages/About.svelte";
    import Elib from "./pages/Elib.svelte";
    import Book from "./pages/Book.svelte";
    import { currentUser, pb } from "./pocketbase";

    const signInWithGoogle = async () => {
        await pb.collection("users").authWithOAuth2({ provider:"google" })
    }

    const logout = async () => {
        pb.authStore.clear()
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
                                  <li><Link class="dropdown-item" to="/dictionary">Happiness Quotient</Link></li>
                                  <li>
                                      <hr class="dropdown-divider">
                                  </li>
                                  <li><Link class="dropdown-item" to="#">All Apps</Link></li>
                              </ul>
                          </li>
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
          </section>
      </div>
      </main>
</Router>