const FeedPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Social Feed</h1>
      <p style={styles.subtitle}>Gaming victories and community posts</p>
      <div style={styles.feed}>
        <div style={styles.post}>
          <h4>Victory Post #1</h4>
          <p>User shared an amazing gaming victory!</p>
        </div>
        <div style={styles.post}>
          <h4>Victory Post #2</h4>
          <p>Another incredible achievement unlocked!</p>
        </div>
        <div style={styles.post}>
          <h4>Challenge Completed</h4>
          <p>Community challenge successfully completed!</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: "40px", maxWidth: "800px", margin: "0 auto" },
  title: { fontSize: "32px", marginBottom: "10px", color: "#333" },
  subtitle: { fontSize: "16px", color: "#666", marginBottom: "30px" },
  feed: { display: "flex", flexDirection: "column" as const, gap: "20px" },
  post: {
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#fff",
  },
};

export default FeedPage;
