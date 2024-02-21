import { useState } from "react";
import "./Info.css";
import Questions from "../Questions/Questions";
import TestButton from "./TestButton";

function Info() {
  const [showInfo, setShowInfo] = useState(true);
  const [showQuestions, setShowQuestions] = useState(false);

  const handleStartClick = () => {
    setShowInfo(false);
    setShowQuestions(true);
  };

  return (
    <>
      {showInfo && (
        <div className="wrapper">
          <svg viewBox="0 0 150 200">
            <text x="10" y="100">
              QA
            </text>
          </svg>
          <hr />
          <h3>KURALLAR</h3>
          <ul className="list-type">
            <li>Uygulama 10 sorudan oluşmaktadır.</li>
            <li>Her soru ekranda 30 saniye kalacaktır.</li>
            <li>İlk 10 saniye cevap şıkları ekranda görünmeyecektir.</li>
            <li>
              Cevap şıklarından biri tıklandıktan ya da 30 saniye tamamlandıktan
              sonra yeni soruya geçilecektir.
            </li>
            <li>Geçmiş sorulara dönülemeyecektir.</li>
            <li>
              Test bitiminde her soruya verilen yanıt ile doğru ve yanlış
              sayılarınızı görebilirsiniz.
            </li>
          </ul>
          <h3>BAŞARILAR!</h3>
          <TestButton id="start" onClick={handleStartClick} />
        </div>
      )}
      {showQuestions && <Questions />}
    </>
  );
}

export default Info;
