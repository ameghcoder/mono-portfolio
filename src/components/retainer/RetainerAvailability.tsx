import { RETAINER_DATA } from "@/data/retainer";

export function RetainerAvailability() {
  return (
    <section className="border border-border p-6 flex items-center gap-4 bg-surface">
      <span className="status-indicator">{RETAINER_DATA.availability.replace("// ", "")}</span>
    </section>
  );
}
