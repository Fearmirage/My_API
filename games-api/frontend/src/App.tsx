import { useEffect, useState } from 'react'
import './App.css'

type Game = { //This is what it expects a game to look like
  Rank: string
  Name: string
  Platform: string
  Year: string
  Genre: string
  Publisher: string
  Global_Sales: string
}

type GamesResponse = { // Response format
  data: Game[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

function App() {
  //const [value, setValue] = useState(initialValue)//useState notifies React, allowing it to change accordingly
  const [games, setGames] = useState<Game[]>([])    // What is shown on the page. Init as an empty array of type Games
  const [page, setPage] = useState(1)               // The page it is at.
  const [totalPages, setTotalPages] = useState(1)   // The total pages
  const [loading, setLoading] = useState(true)      // Bool of 'Are we loading?'. Init as true
  const [error, setError] = useState('')            // String detailing an error if it occurs.

  const [selectedRank, setSelectedRank] = useState<string|null>(null) // Tracks if a game is selected. Can be string or (|) null
  const [selectedGame, setSelectedGame] = useState<Game | null>(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [detailError, setDetailError] = useState('')

  const [clientId, setClientId] = useState('')
  const [clientSecret, setClientSecret] = useState('')
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)

  function openGame(rank: string) {
    setSelectedRank(rank)
  }

  async function handleLogin() {
    setLoginLoading(true)
    setLoginError('')

    try {
      const response = await fetch('http://localhost:3000/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          grant_type: 'client_credentials',
          client_id: clientId,
          client_secret: clientSecret,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Login failed')
      }

      setAccessToken(result.access_token)
    } catch (error) {
      setLoginError(
        error instanceof Error ? error.message : 'Something went wrong',
      )
    } finally {
      setLoginLoading(false)
    }
  }

  async function handleDelete(rank: string) {
    if (accessToken === null) {
      return
    }

    const confirmed = window.confirm(
      'Are you sure you want to delete this game?',
    )

    if (!confirmed) {
      return
    }

    try {
      const response = await fetch(`http://localhost:3000/sales/${rank}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to delete game')
      }

      // Remove the deleted game from the current list.
      setGames((currentGames) =>
        currentGames.filter((game) => game.Rank !== rank),
      )

      // If the deleted game is currently open, return to the list.
      if (selectedRank === rank) {
        setSelectedRank(null)
      }
    } catch (error) {
      window.alert(
        error instanceof Error ? error.message : 'Something went wrong',
      )
    }
  }

  /**
   * Browse all games
   */
  useEffect(() => {
    //useEffect allows to run code in response to the component lifecycle or changes to values it depends on.
    async function fetchGames() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch( // HTTP GET to the backend
          `http://localhost:3000/sales?page=${page}&limit=20` // template litteral
        )

        if (!response.ok) { // Not a response in the successful range -> backend is encountering a problem
          throw new Error('Could not fetch games')
        }

        const result: GamesResponse = await response.json()
                //": GamesResponse"  is the expected structure.
        setGames(result.data)
        setTotalPages(result.pagination.totalPages)
      } catch (err) {
        setError('Could not load games. Is the backend running?')
      } finally { // 'finally' runs whether 'try' was succesful or not
        setLoading(false)
      }
    }

    fetchGames()
  }, [page]) // [page] is called a Dependency array :
  // It tells React to run this effect when the component first appears and again when it changes.

  /**
   * Details on one game
   */
  useEffect(() => {
    if (selectedRank === null) {
      setSelectedGame(null)
      return
    }

    async function fetchGame() {
      setDetailLoading(true)
      setDetailError('')
      setSelectedGame(null)

      try {
        const response = await fetch(
          `http://localhost:3000/sales/${selectedRank}`
        )

        if (!response.ok) {
          throw new Error('Could not fetch game')
        }

        const result: Game = await response.json()
        setSelectedGame(result)
      } catch {
        setDetailError('Could not load this game.')
      } finally {
        setDetailLoading(false)
      }
    }

    fetchGame()
  }, [selectedRank])

  return (
    <main className="app">
      {selectedRank !== null ? (
      /**
       * Details View
      */
      <section className="games-section detail-section">
        <button
          className="back-button"
          onClick={() => setSelectedRank(null)}
        >
          ← Back to games
        </button>

        {detailLoading && <p>Loading game...</p>}

        {detailError && <p className="error">{detailError}</p>}

        {selectedGame && !detailLoading && (
          <div className="game-details">
            <p className="eyebrow">GAME DETAILS</p>
            <h1>{selectedGame.Name}</h1>

            <dl className="details-grid">
              <dt>Rank</dt>
              <dd>{selectedGame.Rank}</dd>

              <dt>Platform</dt>
              <dd>{selectedGame.Platform}</dd>

              <dt>Year</dt>
              <dd>{selectedGame.Year}</dd>

              <dt>Genre</dt>
              <dd>{selectedGame.Genre}</dd>

              <dt>Publisher</dt>
              <dd>{selectedGame.Publisher}</dd>

              <dt>Global Sales</dt>
              <dd>{selectedGame.Global_Sales} million</dd>
            </dl>
          </div>
        )}
      </section>
    ) : (
      /**
       * List View
      */
      <>
        <header className="page-header">
          <p className="eyebrow">VIDEO GAME SALES DATABASE</p>
          <h1>Games Library</h1>
          <p className="subtitle">
            Browse video game sales records from around the world.
          </p>
        </header>

        <section className="login-section">
          <h2>Admin Login</h2>

          {accessToken === null ? (
            <form
              className="login-form"
              onSubmit={(event) => {
                event.preventDefault()
                handleLogin()
              }}
            >
              <label>
                Client ID
                <input
                  value={clientId}
                  onChange={(event) => setClientId(event.target.value)}
                  placeholder="Enter client ID"
                  required
                />
              </label>

              <label>
                Client Secret
                <input
                  type="password"
                  value={clientSecret}
                  onChange={(event) => setClientSecret(event.target.value)}
                  placeholder="Enter client secret"
                  required
                />
              </label>

              <button type="submit" disabled={loginLoading}>
                {loginLoading ? 'Logging in...' : 'Log in'}
              </button>

              {loginError && <p className="error">{loginError}</p>}
            </form>
          ) : (
            <div>
              <p>You are logged in as an admin.</p>
              <button
                onClick={() => {
                  setAccessToken(null)
                  setClientSecret('')
                }}
              >
                Log out
              </button>
            </div>
          )}
        </section>

        <section className="games-section">
          <div className="section-heading">
            <h2>Games</h2>
            <span>Page {page} of {totalPages}</span>
          </div>

          {loading && <p>Loading games...</p>} {/* If loading, Render the <p> tag */}

          {error && <p className="error">{error}</p>} {/* If error isn't empty, Render the error */}

          {!loading && !error && ( // If not loading and error is an empty string, render the page.)
            <> {/* This is called a Fragment. It allows us to return multiple elements */}
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Name</th>
                      <th>Platform</th>
                      <th>Year</th>
                      <th>Genre</th>
                      <th>Publisher</th>
                      <th>Global Sales (M)</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {games.map((game) => (
                      //.map loops through for each element in the games array, making a table row for each game
                      <tr key={game.Rank} // React needs a stable key to distinguish rows when the list changes
                        className="clickable-row"
                        onClick={() => openGame(game.Rank)}
                      >
                        <td>{game.Rank}</td>
                        <td className="game-name">{game.Name}</td>
                        <td>{game.Platform}</td>
                        <td>{game.Year}</td>
                        <td>{game.Genre}</td>
                        <td>{game.Publisher}</td>
                        <td>{game.Global_Sales}</td>
                        <td>
                          {accessToken !== null && (
                            <button
                              onClick={(event) => {
                                event.stopPropagation()
                                handleDelete(game.Rank)
                              }}
                            >
                              Delete
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="pagination">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page <= 1} // Disabled on the first page one to avoid errors
                >
                  Previous
                </button>

                <span>Page {page} of {totalPages}</span>

                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page >= totalPages} // Disabled on the last page to avoid errors
                >
                  Next
                </button>
              </div>
            </>
          )}
        </section>
      </>
    )}
    </main>
  )
}

export default App