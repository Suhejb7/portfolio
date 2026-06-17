const HamburgerIcon = ({ isOpen }) => (
  <div className="relative w-6 h-5 flex flex-col justify-center items-center" aria-hidden="true">
    <span
      className={`absolute block h-[2px] w-6 bg-current rounded-full origin-center transition-transform duration-300 ${
        isOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5 rotate-0'
      }`}
    />
    <span
      className={`absolute block h-[2px] w-6 bg-current rounded-full transition-opacity duration-200 ${
        isOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
      }`}
    />
    <span
      className={`absolute block h-[2px] w-6 bg-current rounded-full origin-center transition-transform duration-300 ${
        isOpen ? '-rotate-45 translate-y-0' : 'translate-y-1.5 rotate-0'
      }`}
    />
  </div>
)

export default HamburgerIcon
