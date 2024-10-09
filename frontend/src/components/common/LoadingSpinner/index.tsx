const LoadingSpinner = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="w-16 h-16 mb-2 border-4 border-t-4 border-transparent border-t-red-500 rounded-full animate-spin"></div>
      <span className="text-white">PDF 분석 중입니다...</span>
    </div>
  );
};

export default LoadingSpinner;
