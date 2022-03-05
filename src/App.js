import './App.css';
import React from "react";

function App() {
  const [data, setData] = React.useState([]);
  const [answerSelected, setAnswerSelected] = React.useState(false)
  const [selectedAnswer, setSelectedAnswer] = React.useState(null)
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

    }
    fetchMyAPI()

  }, [])

  const decodeHTML = function (html) {
    const txt = document.createElement('textarea')
    txt.innerHTML = html
    return txt.value
  }


  const handleListItemClick = (event) => {
    console.log(data)
    setAnswerSelected(true)
    setSelectedAnswer(event.target.innerHTML)
    for (let i = 0; i < data.length; i++) {
      if (event.target.innerHTML === data[i].answer) {
        setScore(score + 1)
      }
    }
  }

  const getClass = (option) => {
    if (!answerSelected) {
      return ``;
    }
    if (option === data.answer) {
      return `correct`
    }
    if (option === selectedAnswer) {
      return `selected`
    }
  }

  return (
    <div className="App">

      {data.map((question) => {

        return (
          <div key={question.id}>
            <h3 >{question.id}. {question.questions}</h3>
            {question.options.map((option, index) => {
              return <button onClick={handleListItemClick} className={getClass(option)} key={index}>{option}</button>
            })}
          </div>
        )
      })}

      <div>
        Score: {score} / {data.length}
      </div>
    </div>
  );
}

export default App;
