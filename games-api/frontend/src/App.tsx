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

  return (
    <main className="app">
      <header className="page-header">
        <p className="eyebrow">VIDEO GAME SALES DATABASE</p>
        <h1>Games Library</h1>
        <p className="subtitle">
          Browse video game sales records from around the world.
        </p>
      </header>

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
                  </tr>
                </thead>

                <tbody>
                  {games.map((game) => (
                    //.map loops through for each element in the games array, making a table row for each game
                    <tr key={game.Rank}> {/* React needs a stable key to distinguish rows when the list changes */}
                      <td>{game.Rank}</td>
                      <td className="game-name">{game.Name}</td>
                      <td>{game.Platform}</td>
                      <td>{game.Year}</td>
                      <td>{game.Genre}</td>
                      <td>{game.Publisher}</td>
                      <td>{game.Global_Sales}</td>
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
    </main>
  )
}

export default App