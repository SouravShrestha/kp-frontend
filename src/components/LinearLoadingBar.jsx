const LinearLoadingBar = ({ isVisible = false, progress = 0 }) => {
  if (!isVisible) return null;

  return (
    <div
      className="h-1 fixed top-0 left-0 gradient-loader select-none z-20"
      style={{ width: `${Math.min(progress, 100)}%` }}
    />
  );
};

export default LinearLoadingBar;
