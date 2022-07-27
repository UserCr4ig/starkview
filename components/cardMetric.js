export default function CardMetric(props) {
  return (
    <div className="bg-gray-700 p-6 rounded-lg text-center">
      <p className="text-2xl">{props.value}</p>
      <p>{props.label}</p>
    </div>
  );
}
