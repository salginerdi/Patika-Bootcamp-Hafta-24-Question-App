function TestButton({ onClick }) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className="btn-div">
    <button className="btn" onClick={handleClick}>
      Teste Başla!
      <img
        src="https://www.htmlcssbuttongenerator.com/iconExample-notification-filled.svg"
        style={{
          width: "27px",
          marginLeft: "0px",
          marginRight: "17px",
          flexDirection: "row-reverse",
        }}
        alt="notification"
      />
    </button>
    </div>
  );
}

export default TestButton;
