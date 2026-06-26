export type Database = {
  public: {
    Tables: {
      technologies: {
        Row: {
          id: string             // UUID — Supabase generates this automatically
          created_at: string     // Timestamp — Supabase generates this automatically
          name: string           // Short name, e.g. "DIAMOND"
          full_name: string      // Full expansion of the acronym/name
          patent_id: string      // OSU technology ID, e.g. "TS-074364"
          industry: string       // Category tag, e.g. "Cybersecurity"
          college: string        // OSU college, e.g. "College of Engineering"
          trl: number            // Technology Readiness Level (1–9)
          confidence: number     // Displacement confidence score (1–10)
          zone: string           // Vessel thesis zone rating
          report_markdown: string // The full first-principles report in markdown
        }
        Insert: {
          id?: string            // Optional — Supabase auto-generates if omitted
          created_at?: string    // Optional — Supabase auto-generates if omitted
          name: string
          full_name: string
          patent_id: string
          industry: string
          college: string
          trl: number
          confidence: number
          zone: string
          report_markdown: string
        }
        Update: Partial<Database['public']['Tables']['technologies']['Insert']>
      }
    }
  }
}

// Convenience type — use this when working with a technology row
export type Technology = Database['public']['Tables']['technologies']['Row']
