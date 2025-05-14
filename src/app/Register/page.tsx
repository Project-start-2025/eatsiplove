import RegisterForm from "./RegisterForm";
export default function RegisterPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF7E9",
        padding: "40px 20px",
      }}
    >
      <RegisterForm />
    </main>
  );
}