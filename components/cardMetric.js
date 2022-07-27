export default function CardMetric(props) {
  return (
    <div className="bg-slate-800 p-6 rounded-lg text-center">
      <p className="text-2xl">{props.value}</p>
      <p>{props.label}</p>
    </div>
  );
}
