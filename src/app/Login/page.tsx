import LoginForm from "./LoginForm";

const LoginPage = () => {
  return (
    <div style={pageStyles.page}>
      <LoginForm />
    </div>
  );
};

const pageStyles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#F4E2CC",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
};

export default LoginPage;
