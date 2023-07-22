import "./styles.css";

const index = ({ children, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formElement = e.target;
    const isValid = formElement.checkValidity();

    if (isValid) {
      const dataObject = new FormData(formElement);
      // onSubmit props get's return
      onSubmit(dataObject);
      e.target.reset();
    }
  };
  return (
    <form className="form-container" onSubmit={handleSubmit} noValidate>
      {children}
    </form>
  );
};

export default index;
