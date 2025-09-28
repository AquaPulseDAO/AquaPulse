export type Vault = {
    id: string;
    name: string;
    location?: string;
    preview: number[];
  };
  
  export async function fetchVaultsDemo(): Promise<Vault[]> {
    // Remplace par ta liste de vaults (on-chain / API)
    return [
      { id: "vault-001", name: "Seine – Left Bank", location: "Paris FR", preview: [7.1, 7.2, 7.0, 7.3, 7.1, 7.25, 7.18] },
      { id: "vault-002", name: "Garonne – Canal",   location: "Toulouse FR", preview: [6.9, 7.0, 6.95, 7.05, 7.02, 7.01, 7.1] },
      { id: "vault-003", name: "Rhône – Delta",     location: "Camargue FR", preview: [7.3, 7.25, 7.28, 7.2, 7.22, 7.27, 7.29] },
    ];
  }
  
  /** DEMO: remplace par un lookup OwnerCap (Move object/table) pour l'address donnée */
  export async function fetchOwnerCapsFor(address?: string | null): Promise<string[]> {
    if (!address) return [];
    // Simule: ce wallet possède seulement vault-002
    return ["vault-002"];
  }
  
  /** ------- Vault detail demo data ------- */
  export type Reading = {
    device?: string;   // ✅ ajouté
    lat: number;
    lon: number;
    ph?: number;
    ec?: number;
    ntu?: number;
    temp?: number;
  };
  
  export async function fetchVaultDataDemo(vaultId: string): Promise<{ name: string; location?: string; readings: Reading[] }> {
    const base = Date.now() - 1000 * 60 * 60 * 24;
    const readings: Reading[] = Array.from({ length: 48 }).map((_, i) => ({
      t: base + i * 60 * 30 * 1000,
      ph: 7 + Math.sin(i / 7) * 0.15,
      ec: 290 + Math.cos(i / 6) * 8,
      ntu: 8 + Math.abs(Math.sin(i / 9)) * 3,
      temp: 18 + Math.cos(i / 10) * 1.5,
    }));
    return {
      name: `Vault ${vaultId.toUpperCase()}`,
      location: "Demo location",
      readings,
    };
  }
  