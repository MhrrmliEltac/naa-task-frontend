const Circle = ({ color }: { color: string }) => {
  return (
    <div
      style={{
        backgroundColor: color,
      }}
      className={`w-[5px] h-[5px] rounded-full`}
    ></div>
  );
};

export default Circle;
