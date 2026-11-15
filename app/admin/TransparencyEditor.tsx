"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  maxTransparencyCount,
  transparencyMetrics,
  type TransparencyReport,
} from "../../lib/transparency";

export default function TransparencyEditor() {
  const [report, setReport] = useState<TransparencyReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [published, setPublished] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        const response = await fetch("/api/admin/transparency", { cache: "no-store", signal: controller.signal });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        setReport(data.report);
      } catch (err) {
        if (controller.signal.aborted) return;
        setError(err instanceof Error ? err.message : "Could not load transparency figures.");
        setLoadFailed(true);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    void load();
    return () => controller.abort();
  }, []);

  async function publish(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const counts = Object.fromEntries(transparencyMetrics.map(({ key }) => [key, Number(form.get(key))]));
    setSaving(true);
    setError("");
    setPublished(false);

    try {
      const response = await fetch("/api/admin/transparency", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(counts),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setReport(data.report);
      setPublished(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not publish transparency figures.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="admin-editor" aria-labelledby="transparency-editor-title">
      <h2 id="transparency-editor-title">Public transparency figures</h2>
      <p>Enter verified totals. These figures appear on the homepage and the public Transparency page.</p>
      {error && <p className="admin-message error" role="alert">{error}</p>}
      {published && <p className="admin-message success" role="status">Figures published. <a href="/transparency" target="_blank" rel="noopener">View Transparency ↗</a></p>}
      {loading && <p role="status">Loading figures…</p>}
      {!loading && !loadFailed && (
        <form onSubmit={publish} onChange={() => setPublished(false)}>
          <div className="admin-fields">
            {transparencyMetrics.map(({ key, label }) => (
              <label key={key}>
                {label}
                <input name={key} type="number" min={0} max={maxTransparencyCount} step={1} required defaultValue={report?.counts[key]} disabled={saving} />
              </label>
            ))}
          </div>
          <div className="admin-form-footer">
            <button type="submit" className="admin-primary" disabled={saving}>{saving ? "Publishing…" : "Publish figures"}</button>
          </div>
        </form>
      )}
    </section>
  );
}
