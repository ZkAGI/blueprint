export default function ContactBooking() {
  return (
    <div className="absolute right-4 bottom-32 bg-black/80 p-4 rounded-md text-white pointer-events-auto">
      <h3 className="font-bold mb-2">Book a Blueprint Call</h3>
      <p className="text-sm mb-2">$100/hr – Strategic, Technical, or Fundraising Guidance</p>
      <button
        onClick={() => window.open('https://cal.com/atenventures/blueprint-call')}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Book Now
      </button>
    </div>
  );
}