const AnimatedBackgroundTouch = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
    <div className="absolute inset-0 bg-surface-base" />
    <div className="absolute inset-0 bg-grid opacity-20 bg-[length:48px_48px]" />
    <div className="absolute inset-0 noise-overlay opacity-[0.02]" />
    <div className="absolute -top-[20%] -left-[10%] rounded-full bg-accent/10 w-[80vw] h-[80vw] blur-[60px]" />
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-surface-base/80" />
  </div>
)

export default AnimatedBackgroundTouch
