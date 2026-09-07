export default function Footer() {
  return (
    <footer className="relative border-t border-zinc-800/50 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <a href="#hero" className="font-mono text-sm text-violet-400 hover:text-violet-300 transition-colors">
          ~/bborceguis_
        </a>
        <p className="text-xs text-zinc-600">
          &copy; {new Date().getFullYear()} Bruberky Borcegu&iacute;s. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
