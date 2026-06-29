export default function TreeMotif({ className }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none select-none ${className ?? 'absolute bottom-0 left-1/2 -translate-x-1/2 h-[88vh] w-auto opacity-[0.09]'}`}
      viewBox="0 -90 800 1090"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* ── Branches ── */}
      <g stroke="#BB0000" fill="none">
        {/* Trunk */}
        <path d="M400 1090 C402 880 396 750 392 640" strokeWidth="15"/>

        {/* Level 1 */}
        <path d="M392 640 C315 568 220 492 162 400" strokeWidth="9.5"/>
        <path d="M392 640 C474 568 572 492 630 400" strokeWidth="9.5"/>

        {/* Level 2 — left */}
        <path d="M162 400 C132 322 100 260 78 180" strokeWidth="6.5"/>
        <path d="M162 400 C186 318 218 252 244 172" strokeWidth="6.5"/>

        {/* Level 2 — right */}
        <path d="M630 400 C594 318 562 252 538 172" strokeWidth="6.5"/>
        <path d="M630 400 C660 322 698 260 720 180" strokeWidth="6.5"/>

        {/* Level 2 — extra middle branches for fullness */}
        <path d="M162 400 C166 322 170 252 172 176" strokeWidth="5"/>
        <path d="M630 400 C628 322 622 252 620 176" strokeWidth="5"/>

        {/* Level 3 — from 78,180 */}
        <path d="M78 180 C58 118 40 66 26 12"   strokeWidth="4"/>
        <path d="M78 180 C86 116 106 62 118 8"  strokeWidth="4"/>

        {/* Level 3 — from 244,172 */}
        <path d="M244 172 C226 110 212 56 206 2" strokeWidth="4"/>
        <path d="M244 172 C252 108 268 54 276 0" strokeWidth="4"/>

        {/* Level 3 — from 172,176 (middle left) */}
        <path d="M172 176 C156 114 140 60 130 4"  strokeWidth="3.5"/>
        <path d="M172 176 C182 114 196 60 202 4"  strokeWidth="3.5"/>

        {/* Level 3 — from 620,176 (middle right) */}
        <path d="M620 176 C608 114 596 60 592 4"  strokeWidth="3.5"/>
        <path d="M620 176 C630 114 644 60 648 4"  strokeWidth="3.5"/>

        {/* Level 3 — from 538,172 */}
        <path d="M538 172 C520 108 508 54 500 0"  strokeWidth="4"/>
        <path d="M538 172 C550 110 566 56 576 2"  strokeWidth="4"/>

        {/* Level 3 — from 720,180 */}
        <path d="M720 180 C694 116 668 62 650 8"  strokeWidth="4"/>
        <path d="M720 180 C730 118 754 66 770 12" strokeWidth="4"/>

        {/* Level 4 — from 26,12 */}
        <path d="M26 12 C14 -16 2 -46 -6 -68"  strokeWidth="2.5"/>
        <path d="M26 12 C36 -14 50 -44 58 -66"  strokeWidth="2.5"/>

        {/* Level 4 — from 118,8 */}
        <path d="M118 8 C104 -18 90 -46 80 -68"  strokeWidth="2.5"/>
        <path d="M118 8 C128 -16 142 -44 148 -66" strokeWidth="2.5"/>

        {/* Level 4 — from 130,4 */}
        <path d="M130 4 C118 -22 106 -50 98 -72"  strokeWidth="2"/>
        <path d="M130 4 C138 -20 150 -48 156 -70" strokeWidth="2"/>

        {/* Level 4 — from 202,4 */}
        <path d="M202 4 C190 -22 178 -50 172 -72" strokeWidth="2"/>
        <path d="M202 4 C210 -20 222 -48 228 -70" strokeWidth="2"/>

        {/* Level 4 — from 206,2 */}
        <path d="M206 2 C194 -24 182 -52 176 -74" strokeWidth="2.5"/>
        <path d="M206 2 C214 -22 226 -50 232 -72" strokeWidth="2.5"/>

        {/* Level 4 — from 276,0 */}
        <path d="M276 0 C264 -26 252 -54 246 -74" strokeWidth="2.5"/>
        <path d="M276 0 C284 -24 298 -52 304 -72" strokeWidth="2.5"/>

        {/* Level 4 — from 500,0 */}
        <path d="M500 0 C488 -24 476 -52 470 -74" strokeWidth="2.5"/>
        <path d="M500 0 C510 -26 524 -54 530 -74" strokeWidth="2.5"/>

        {/* Level 4 — from 576,2 */}
        <path d="M576 2 C564 -22 552 -50 546 -72" strokeWidth="2.5"/>
        <path d="M576 2 C584 -24 598 -52 604 -72" strokeWidth="2.5"/>

        {/* Level 4 — from 592,4 */}
        <path d="M592 4 C580 -20 568 -48 562 -70" strokeWidth="2"/>
        <path d="M592 4 C600 -22 614 -50 620 -70" strokeWidth="2"/>

        {/* Level 4 — from 648,4 */}
        <path d="M648 4 C636 -20 622 -48 616 -70" strokeWidth="2"/>
        <path d="M648 4 C658 -22 672 -50 678 -70" strokeWidth="2"/>

        {/* Level 4 — from 650,8 */}
        <path d="M650 8 C636 -18 622 -46 614 -66" strokeWidth="2.5"/>
        <path d="M650 8 C660 -16 676 -44 684 -64" strokeWidth="2.5"/>

        {/* Level 4 — from 770,12 */}
        <path d="M770 12 C756 -16 742 -44 732 -64" strokeWidth="2.5"/>
        <path d="M770 12 C780 -14 796 -44 806 -66" strokeWidth="2.5"/>
      </g>

      {/* ── Foliage clusters ── */}
      {/* Clusters are pushed into the extended negative-y space so they sit at the top of the visible area */}
      <g fill="#BB0000" stroke="none">

        {/* Far-left outer cluster (tips ~-67) */}
        <circle cx="2"   cy="-44" r="28"/>
        <circle cx="28"  cy="-60" r="30"/>
        <circle cx="54"  cy="-46" r="28"/>
        <circle cx="14"  cy="-24" r="22"/>
        <circle cx="44"  cy="-26" r="23"/>
        <circle cx="-12" cy="-26" r="20"/>
        <circle cx="66"  cy="-26" r="20"/>
        <circle cx="26"  cy="-78" r="20"/>
        <circle cx="52"  cy="-78" r="18"/>

        {/* Far-left inner cluster (tips ~-67) */}
        <circle cx="84"  cy="-44" r="26"/>
        <circle cx="110" cy="-60" r="30"/>
        <circle cx="138" cy="-46" r="28"/>
        <circle cx="94"  cy="-24" r="22"/>
        <circle cx="124" cy="-26" r="23"/>
        <circle cx="72"  cy="-26" r="20"/>
        <circle cx="152" cy="-26" r="20"/>
        <circle cx="106" cy="-78" r="20"/>
        <circle cx="132" cy="-78" r="18"/>

        {/* Left-middle cluster (tips ~-71) */}
        <circle cx="100" cy="-48" r="24"/>
        <circle cx="126" cy="-64" r="27"/>
        <circle cx="152" cy="-50" r="24"/>
        <circle cx="112" cy="-30" r="20"/>
        <circle cx="140" cy="-30" r="21"/>
        <circle cx="114" cy="-80" r="18"/>
        <circle cx="140" cy="-82" r="16"/>

        {/* Center-left cluster A (tips ~-73) */}
        <circle cx="174" cy="-48" r="25"/>
        <circle cx="200" cy="-64" r="28"/>
        <circle cx="226" cy="-50" r="25"/>
        <circle cx="184" cy="-28" r="21"/>
        <circle cx="214" cy="-30" r="22"/>
        <circle cx="162" cy="-28" r="19"/>
        <circle cx="238" cy="-28" r="19"/>
        <circle cx="198" cy="-80" r="20"/>
        <circle cx="224" cy="-80" r="17"/>

        {/* Center-left cluster B (tips ~-73) */}
        <circle cx="246" cy="-50" r="25"/>
        <circle cx="272" cy="-64" r="28"/>
        <circle cx="300" cy="-50" r="25"/>
        <circle cx="256" cy="-30" r="21"/>
        <circle cx="286" cy="-30" r="22"/>
        <circle cx="234" cy="-28" r="19"/>
        <circle cx="312" cy="-28" r="19"/>
        <circle cx="270" cy="-80" r="20"/>
        <circle cx="298" cy="-80" r="17"/>

        {/* Center-right cluster A (tips ~-73) */}
        <circle cx="470" cy="-50" r="25"/>
        <circle cx="496" cy="-64" r="28"/>
        <circle cx="524" cy="-50" r="25"/>
        <circle cx="480" cy="-30" r="21"/>
        <circle cx="510" cy="-30" r="22"/>
        <circle cx="458" cy="-28" r="19"/>
        <circle cx="536" cy="-28" r="19"/>
        <circle cx="494" cy="-80" r="20"/>
        <circle cx="520" cy="-80" r="17"/>

        {/* Center-right cluster B (tips ~-72) */}
        <circle cx="548" cy="-48" r="25"/>
        <circle cx="574" cy="-64" r="28"/>
        <circle cx="602" cy="-50" r="25"/>
        <circle cx="558" cy="-28" r="21"/>
        <circle cx="588" cy="-30" r="22"/>
        <circle cx="536" cy="-28" r="19"/>
        <circle cx="614" cy="-28" r="19"/>
        <circle cx="572" cy="-80" r="20"/>
        <circle cx="598" cy="-80" r="17"/>

        {/* Right-middle cluster (tips ~-70) */}
        <circle cx="560" cy="-46" r="24"/>
        <circle cx="616" cy="-64" r="27"/>
        <circle cx="620" cy="-46" r="24"/>
        <circle cx="614" cy="-30" r="20"/>
        <circle cx="640" cy="-30" r="21"/>
        <circle cx="614" cy="-80" r="18"/>
        <circle cx="640" cy="-82" r="16"/>

        {/* Far-right inner cluster (tips ~-65) */}
        <circle cx="616" cy="-42" r="26"/>
        <circle cx="642" cy="-58" r="30"/>
        <circle cx="668" cy="-44" r="28"/>
        <circle cx="626" cy="-22" r="22"/>
        <circle cx="656" cy="-24" r="23"/>
        <circle cx="604" cy="-22" r="20"/>
        <circle cx="680" cy="-24" r="20"/>
        <circle cx="640" cy="-76" r="20"/>
        <circle cx="666" cy="-76" r="18"/>

        {/* Far-right outer cluster (tips ~-65) */}
        <circle cx="730" cy="-42" r="28"/>
        <circle cx="758" cy="-58" r="30"/>
        <circle cx="784" cy="-44" r="28"/>
        <circle cx="742" cy="-22" r="22"/>
        <circle cx="772" cy="-24" r="23"/>
        <circle cx="716" cy="-24" r="20"/>
        <circle cx="796" cy="-22" r="20"/>
        <circle cx="756" cy="-76" r="20"/>
        <circle cx="782" cy="-78" r="18"/>
      </g>
    </svg>
  )
}
