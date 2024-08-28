export default async function MainPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f0f0f0", // Optional: Background color for visibility
        }}
      >
        방문을 환영합니다.
      </div>
      <div
        style={{
          flex: 3, // Adjust the flex values to change the ratio
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            flex: 7, // 70% width
            padding: "10px", // Optional: Padding for spacing
            backgroundColor: "#ffffff", // Optional: Background color for visibility
          }}
        >
          {" "}
          <h1 className="text-2xl font-bold mb-4">대시보드</h1>
          {/* <CryptoChartPage /> */}
        </div>
        <div
          style={{
            flex: 3, // 30% width
            padding: "10px", // Optional: Padding for spacing
            backgroundColor: "#ffffff", // Optional: Background color for visibility
          }}
        >
          {" "}
          <h1 className="text-2xl font-bold mb-4">투자일지</h1>
          {/* <DiaryPage /> */}
        </div>
      </div>
    </div>
  );
}
