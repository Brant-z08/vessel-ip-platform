export default function TreeMotif({ className }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none select-none ${className ?? 'absolute bottom-0 left-1/2 -translate-x-1/2 h-[108vh] w-auto opacity-[0.09]'}`}
      viewBox="0 0 800 1000"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* ── Branches ── */}
      <g stroke="#BB0000" fill="none">
        {/* Trunk */}
        <path d="M400 1000 C402 850 396 740 393 640" strokeWidth="14"/>

        {/* Level 1 */}
        <path d="M393 640 C318 572 228 500 170 408" strokeWidth="9"/>
        <path d="M393 640 C472 572 562 500 622 408" strokeWidth="9"/>

        {/* Level 2 — left subtree */}
        <path d="M170 408 C140 332 108 270 82 190" strokeWidth="6"/>
        <path d="M170 408 C190 328 218 260 242 182" strokeWidth="6"/>

        {/* Level 2 — right subtree */}
        <path d="M622 408 C588 328 558 260 534 182" strokeWidth="6"/>
        <path d="M622 408 C656 332 690 270 714 190" strokeWidth="6"/>

        {/* Level 3 — from 82,190 */}
        <path d="M82 190 C62 128 44 78 30 18" strokeWidth="3.5"/>
        <path d="M82 190 C88 125 108 72 120 14" strokeWidth="3.5"/>

        {/* Level 3 — from 242,182 */}
        <path d="M242 182 C224 118 210 66 204 8" strokeWidth="3.5"/>
        <path d="M242 182 C252 116 266 64 274 6" strokeWidth="3.5"/>

        {/* Level 3 — from 534,182 */}
        <path d="M534 182 C518 116 506 64 496 6" strokeWidth="3.5"/>
        <path d="M534 182 C548 118 562 66 574 8" strokeWidth="3.5"/>

        {/* Level 3 — from 714,190 */}
        <path d="M714 190 C686 125 660 72 648 14" strokeWidth="3.5"/>
        <path d="M714 190 C726 128 752 78 768 18" strokeWidth="3.5"/>
      </g>

      {/* ── Foliage clusters ── */}
      <g fill="#BB0000" stroke="none">

        {/* Cluster — far left outer (tip: 30,18) */}
        <circle cx="14"  cy="42" r="22"/>
        <circle cx="36"  cy="28" r="24"/>
        <circle cx="56"  cy="42" r="22"/>
        <circle cx="26"  cy="14" r="18"/>
        <circle cx="50"  cy="16" r="19"/>
        <circle cx="6"   cy="28" r="17"/>

        {/* Cluster — far left inner (tip: 120,14) */}
        <circle cx="102" cy="40" r="22"/>
        <circle cx="124" cy="24" r="24"/>
        <circle cx="144" cy="40" r="22"/>
        <circle cx="114" cy="10" r="18"/>
        <circle cx="138" cy="12" r="19"/>
        <circle cx="96"  cy="26" r="17"/>

        {/* Cluster — center-left outer (tip: 204,8) */}
        <circle cx="188" cy="34" r="22"/>
        <circle cx="208" cy="18" r="24"/>
        <circle cx="228" cy="34" r="22"/>
        <circle cx="198" cy="4"  r="18"/>
        <circle cx="220" cy="6"  r="19"/>
        <circle cx="180" cy="20" r="17"/>

        {/* Cluster — center-left inner (tip: 274,6) */}
        <circle cx="258" cy="32" r="22"/>
        <circle cx="278" cy="16" r="24"/>
        <circle cx="298" cy="32" r="22"/>
        <circle cx="268" cy="2"  r="18"/>
        <circle cx="290" cy="4"  r="19"/>
        <circle cx="250" cy="18" r="17"/>

        {/* Cluster — center-right inner (tip: 496,6) */}
        <circle cx="480" cy="32" r="22"/>
        <circle cx="500" cy="16" r="24"/>
        <circle cx="520" cy="32" r="22"/>
        <circle cx="490" cy="2"  r="18"/>
        <circle cx="512" cy="4"  r="19"/>
        <circle cx="472" cy="18" r="17"/>

        {/* Cluster — center-right outer (tip: 574,8) */}
        <circle cx="558" cy="34" r="22"/>
        <circle cx="578" cy="18" r="24"/>
        <circle cx="598" cy="34" r="22"/>
        <circle cx="568" cy="4"  r="18"/>
        <circle cx="590" cy="6"  r="19"/>
        <circle cx="550" cy="20" r="17"/>

        {/* Cluster — far right inner (tip: 648,14) */}
        <circle cx="630" cy="40" r="22"/>
        <circle cx="652" cy="24" r="24"/>
        <circle cx="672" cy="40" r="22"/>
        <circle cx="642" cy="10" r="18"/>
        <circle cx="664" cy="12" r="19"/>
        <circle cx="622" cy="26" r="17"/>

        {/* Cluster — far right outer (tip: 768,18) */}
        <circle cx="750" cy="42" r="22"/>
        <circle cx="772" cy="28" r="24"/>
        <circle cx="790" cy="42" r="22"/>
        <circle cx="762" cy="14" r="18"/>
        <circle cx="784" cy="16" r="19"/>
        <circle cx="742" cy="28" r="17"/>
      </g>
    </svg>
  )
}
