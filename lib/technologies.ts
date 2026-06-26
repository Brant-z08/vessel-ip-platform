export type Technology = {
  id: string         // URL slug — /technologies/[id]
  name: string       // Short name shown in the list
  fullName: string   // Full expansion of the acronym/name
  patentId: string   // OSU technology ID (TS-XXXXXX)
  industry: string   // Category tag used for filtering
  college: string    // OSU college
  trl: number        // Technology Readiness Level (1–9)
  confidence: number // Displacement confidence score (1–10)
  zone: string       // Vessel thesis zone rating
}

export const technologies: Technology[] = [
  {
    id: 'diamond',
    name: 'DIAMOND',
    fullName: 'Data-Driven Inspection, Alerts, Maintenance, Observable Network Decision',
    patentId: 'TS-074364',
    industry: 'Cybersecurity',
    college: 'College of Engineering',
    trl: 4,
    confidence: 5,
    zone: 'Zone 1 / 2–3 potential',
  },
]
