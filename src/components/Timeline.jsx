export default function Timeline({ events }) {
  return (
    <div className="flex gap-8 whitespace-nowrap">
      {events.map((e, i) => (
        <div key={i} className="text-sm">
          <div className="font-bold">{e.year}</div>
          <div>{e.label}</div>
        </div>
      ))}
    </div>
  );
}