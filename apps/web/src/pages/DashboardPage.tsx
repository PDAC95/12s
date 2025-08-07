const DashboardPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Dashboard</h1>
      <p style={styles.subtitle}>Welcome to your 12s dashboard</p>
      <div style={styles.grid}>
        <div style={styles.card}>
          <h3>Gaming Stats</h3>
          <p>View your victories and achievements</p>
        </div>
        <div style={styles.card}>
          <h3>Social Feed</h3>
          <p>Latest posts from the community</p>
        </div>
        <div style={styles.card}>
          <h3>Challenges</h3>
          <p>Active and upcoming challenges</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: "40px", maxWidth: "1200px", margin: "0 auto" },
  title: { fontSize: "32px", marginBottom: "10px", color: "#333" },
  subtitle: { fontSize: "16px", color: "#666", marginBottom: "40px" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },
  card: {
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  },
};

export default DashboardPage;
