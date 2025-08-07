const RegisterPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Register</h1>
      <p style={styles.subtitle}>Create your 12s account</p>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  },
  title: { fontSize: "32px", color: "#333" },
  subtitle: { fontSize: "16px", color: "#666" },
};

export default RegisterPage;
