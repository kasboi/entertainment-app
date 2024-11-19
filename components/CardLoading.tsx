import "./CardLoading.css";

const CardLoading = () => {
  return (
    <div className="card-loading">
      <div className="shimmer-wrapper">
        <div className="shimmer"></div>
      </div>
      <div className="loading-content">
        <div className="loading-title"></div>
        <div className="loading-text"></div>
        <div className="loading-text short"></div>
      </div>
    </div>
  );
};

export default CardLoading;
