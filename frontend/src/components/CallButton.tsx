export default function CallButton() {
  const phone = '+573142533524'

  return (
    <a
      href={`tel:${phone}`}
      className="fixed bottom-6 left-6 z-50 w-16 h-16 bg-blue-500 rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 hover:scale-110 transition-all duration-300 animate-bounce"
      aria-label="Llamar por teléfono"
    >
      <svg
        viewBox="0 0 24 24"
        className="w-9 h-9 fill-white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.36 11.36 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.58 1 1 0 01-.25 1.01l-2.2 2.2z" />
      </svg>
    </a>
  )
}
