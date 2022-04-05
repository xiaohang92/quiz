import './App.css';
import React from "react";

function App() {
  const [isFetching, setIsFecting] = React.useState(false)
  const [data, setData] = React.useState([]);
  const [score, setScore] = React.useState(0)

  React.useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch(`https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple`)
      response = await response.json()
      setData(response.results.map((question, index) => {
        const answer = decodeHTML(question.correct_answer)
        const options = [...question.incorrect_answers.map(a => decodeHTML(a)), answer]
        return {
          id: index,
          questions: decodeHTML(question.question),
          answer: answer,
          options: options.sort(() => Math.random() - .5)
        }
      }))
      setIsFecting(true)
    }
    fetchMyAPI()

  }, [])

  const decodeHTML = function (html) {
    const txt = document.createElement('textarea')
    txt.innerHTML = html
    return txt.value
  }


  const handleListItemClick = (event) => {

    if (event.target.innerHTML === data[event.target.dataset.index].answer) {
      setScore(score + 1)
      event.target.classList = `correct`;
      event.target.disabled = true;
    }
    if (event.target.innerHTML !== data[event.target.dataset.index].answer) {
      event.target.classList = `selected`;
      alert('Try Again')
    }
  }

  return (

    <div className="App">
      {!isFetching ? <h1>Loading</h1> : <h1>Quiz App</h1>}
      {data.map((question) => {

        return (
          <div className="div-question" key={question.id}>
            <h3 >{question.id + 1}. {question.questions}</h3>
            {question.options.map((option, index) => {
              return <button className={question.id} disabled={false} onClick={handleListItemClick} data-index={question.id} key={index}>{option}</button>
            })}
          </div>
        )
      })}

      {!isFetching ? null :
        <div className="div-score">
          Score: {score} / {data.length}
        </div>}

    </div>
  );
}

export default App;
