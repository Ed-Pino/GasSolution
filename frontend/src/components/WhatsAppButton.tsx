export default function WhatsAppButton() {
  const phone = '573142533524'
  const message = 'Hola, quiero información sobre sus productos y servicios'
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-green-500 rounded-full shadow-lg flex items-center justify-center hover:bg-green-600 hover:scale-110 transition-all duration-300 animate-bounce"
      aria-label="Chatear por WhatsApp"
    >
      <svg
        viewBox="0 0 32 32"
        className="w-9 h-9 fill-white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M16.004 0h-.008C7.163 0 0 7.163 0 16c0 3.523 1.136 6.756 3.035 9.344L2.1 31.026l5.902-2.925A15.92 15.92 0 0 0 16.004 32C24.837 32 32 24.837 32 16S24.837 0 16.004 0zm9.22 22.63c-.39 1.1-1.93 2.02-3.157 2.288-.84.184-1.94.265-3.135-.198-1.73-.673-3.558-2.07-5.222-3.736-1.663-1.666-3.06-3.493-3.733-5.223-.463-1.195-.382-2.295-.198-3.134.268-1.226 1.188-2.767 2.288-3.156.572-.204 1.252-.102 1.697.35.482.49 1.282 1.665 1.57 2.232.21.42.28.903.08 1.337-.163.354-.524.777-.84 1.09a.67.67 0 0 0-.17.804c.483.934 1.602 2.153 2.547 3.098.945.945 2.164 2.064 3.098 2.547.219.113.474.125.69.06.322-.098.496-.227.802-.378.42-.2.904-.13 1.324.08.568.288 1.742 1.088 2.232 1.57.452.445.554 1.125.35 1.697z" />
      </svg>
    </a>
  )
}
