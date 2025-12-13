import useBooks from "../../hooks/useBook"
import Corner from "../assets/corner.png"

export default function Books() {
  const {
    filteredBooks,
    selectedBook,
    setSelectedBook,
    selectedGenre,
    setSelectedGenre,
    uniqueGenres,
    handleSubmit,
    handleFileChange,
    handleInputChange,
    handleDelete,
    formData,
    picture,
    resetPicture,
    inputRef,
  } = useBooks()

  return (
    <div className="books-container">
      <div className="books-intro">
        <label className="label" htmlFor="genre">
          Filtrer par genre:
        </label>
        <select
          className="select-style"
          // id="genre"
          name="genre"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="">Tous les genres</option>
          {uniqueGenres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      <div>
        <div className="books-container">
          {selectedBook && (
            <div className="modal">
              <div className="modal-content">
                <h2>{selectedBook.title}</h2>
                <p className="Lettrine">{selectedBook.description}</p>
                <p>{selectedBook.pages} pages</p>
                <p>
                  {selectedBook.genre}, {selectedBook.publication_date}{" "}
                </p>
                <div className="mc-button">
                  <button
                    className="modal-close"
                    type="button"
                    onClick={() => {
                      setSelectedBook(null)
                    }}
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          )}

          {filteredBooks.length > 0 ? (
            <div className="books-container">
              {filteredBooks.map((book) => (
                <div key={book.id} className="book">
                  <div className="book-style">
                    <img
                      className="Book-Picture"
                      src={book.url_img}
                      alt={book.title}
                    />
                    <div className="Corner">
                      <img className="CornerT" src={Corner} alt="decoration" />
                      <img className="CornerB" src={Corner} alt="decoration" />
                    </div>
                  </div>

                  <h3>{book.title}</h3>
                  <div className="info">
                    <p>{book.genre}</p>
                    <p>{book.publication_date}</p>
                    {localStorage.getItem("role") === "1" ? (
                      <div className="button-container">
                        <button
                          className="Changebook"
                          type="button"
                          onClick={() => handleDelete(book.id)}
                        >
                          Supprimer
                        </button>
                        <button
                          className="Changebook"
                          type="button"
                          onClick={() => setSelectedBook(book)}
                        >
                          Description
                        </button>
                      </div>
                    ) : (
                      <button
                        className="Changebook"
                        type="button"
                        onClick={() => setSelectedBook(book)}
                      >
                        Description
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="NoBook">
              <p>Désolé, pas de livre trouvé</p>
            </div>
          )}
        </div>
      </div>
      <div className="Add-Book">
        {localStorage.getItem("role") === "1" ? (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Titre"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Date de publication"
              name="publication_date"
              value={formData.publication_date}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Genre"
              name="genre"
              value={formData.genre}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Résumé"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Nombre de pages"
              name="pages"
              value={formData.pages}
              onChange={handleInputChange}
            />
            <div encType="multipart/form-data" onSubmit={handleSubmit}>
              <input
                id="select-picture"
                type="file"
                name="avatar"
                ref={inputRef}
                onChange={handleFileChange}
              />
              {picture && (
                <img className="picture" src={picture} alt="Aperçu" />
              )}
              <input
                id="reset"
                type="reset"
                name="reset"
                onClick={() => resetPicture}
              />
            </div>

            <button className="Changebook" type="submit">
              Nouvelle entrée
            </button>
          </form>
        ) : null}
      </div>
    </div>
  )
}
