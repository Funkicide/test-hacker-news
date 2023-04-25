const Button = ({ text, onClick }: { text: string; onClick: () => void }) => {
  return (
    <button onClick={onClick} type="button">
      {text}
    </button>
  );
};

export default Button;
