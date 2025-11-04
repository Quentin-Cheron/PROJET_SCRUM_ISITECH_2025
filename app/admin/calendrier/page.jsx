export default function CalendrierPage() {
  return (
    <div className="flex my-10 flex-col bg-secondary">
      <iframe
        src="https://calendar.google.com/calendar/embed?src=quentin.cheron26200%40gmail.com&ctz=Europe%2FParis"
        style={{
          border: 0,
          width: "100%",
          height: "800px",
        }}
        width="800"
        height="800"
      ></iframe>
    </div>
  );
}
