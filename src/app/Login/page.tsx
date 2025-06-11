import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #F0E6F6 0%, #FFF7E9 100%)", // chuyển từ tím pastel sang vàng pastel nhẹ nhàng
        padding: "40px 20px",
      }}
    >
       <LoginForm />
    </main>
  );
}