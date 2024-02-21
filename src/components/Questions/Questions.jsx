import React, { useState, useEffect } from "react";
import "./Questions.css";
import { questions } from "../../assets/questions";

function Questions() {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(questions[index]);
  const [lock, setLock] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [seconds, setSeconds] = useState(30);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [userResponses, setUserResponses] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    // 30 saniye sonunda sayaç sıfırlama işlemi
    const interval = setInterval(() => {
      if (seconds === 0) {
        setSeconds(30);
      } else {
        setSeconds((s) => s - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  useEffect(() => {
    // 10 saniye sonra seçenekleri gösterme işlemi
    const timer = setTimeout(() => {
      setShowOptions(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, [index]);

  useEffect(() => {
    // 30 saniye sonra bir sonraki soruya geçme işlemi
    const timer = setTimeout(() => {
      goToNextQuestion();
    }, 30000);

    return () => clearTimeout(timer);
  }, [lock, index]);

  const checkAnswer = (e, ans) => {
    // kullanıcının verdiği cevabı kontrol etme işlemi
    if (!lock) {
      let response = { answer: ans, isCorrect: false };
      if (question.answer === ans) {
        e.target.classList.add("correct");
        response.isCorrect = true;
        setCorrectCount(correctCount + 1);
      } else {
        e.target.classList.add("wrong");
        const correctIndex = question.options.findIndex(
          (option) => option === question.answer
        );
        const correctElement =
          e.currentTarget.parentElement.childNodes[correctIndex];
        correctElement.classList.add("correct");
        setWrongCount(wrongCount + 1);
      }
      setUserResponses([
        ...userResponses,
        { ...response, selectedOption: ans },
      ]);
      setLock(true);
      setTimeout(goToNextQuestion, 1000);
    }
  };

  const goToNextQuestion = () => {
    // bir sonraki soruya geçme işlemi
    if (index + 1 < questions.length) {
      setIndex(index + 1);
      setQuestion(questions[index + 1]);
      setLock(false);
      setShowOptions(false);
      setSeconds(30);
    } else {
      setShowResults(true);
      window.close();
    }
  };

  const showResultsAlert = () => {
    // doğru ve yanlış cevapların kullanıcıya alert olarak gösterilmesi işlemi
    let resultMessage = `Doğru Cevaplar: ${correctCount}\nYanlış Cevaplar: ${wrongCount}\n\nCevaplarınız:\n`;
    userResponses.forEach((response, index) => {
      resultMessage += `Verdiğiniz Cevap: ${response.answer} ${
        response.isCorrect ? "(Doğru)" : "(Yanlış)"
      }\n`;
    });
    alert(resultMessage);
  };

  return (
    <div className="content">
      <h1 className="header-name">Question App</h1>
      <hr />
      <div className="container">
        <img
          src={`pictures/${question.media}`}
          alt="Resim formatı desteklenmiyor."
        />
        <h2 className="ques">
          {index + 1}. {question.question}
        </h2>
        <ul>
          {showOptions &&
            question.options.map((option, idx) => (
              <li
                key={idx}
                onClick={(e) => {
                  checkAnswer(e, option);
                }}
              >
                {option}
              </li>
            ))}
        </ul>
        <div className="index">
          {index + 1} / {questions.length} soru
        </div>
        <div
          className="timer"
          style={{ color: seconds <= 10 ? "red" : "#686868" }}
        >
          Bu soruya cevap vermek için {seconds} saniyeniz kaldı.
        </div>
        <marquee behavior="" direction="">
          by Erdi SALGIN 2024©
        </marquee>
      </div>
      {showResults && showResultsAlert()}
    </div>
  );
}

export default Questions;
