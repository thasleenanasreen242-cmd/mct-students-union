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
    const days = String(form.get("targetDays") ?? "");
    const withinTarget = String(form.get("resolvedWithinTarget") ?? "");
    if (Boolean(days) !== Boolean(withinTarget)) {
      setPublished(false);
      setError("Enter both target fields, or leave both blank.");
      return;
    }
    const resolutionTarget = days ? { days: Number(days), resolvedWithinTarget: Number(withinTarget) } : null;
    setSaving(true);
    setError("");
    setPublished(false);

    try {
      const response = await fetch("/api/admin/transparency", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ counts, resolutionTarget }),
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
          <fieldset style={{ border: 0, borderTop: "1px solid #e3e8f0", margin: "28px 0 0", padding: "15px 0 0", minWidth: 0 }}>
            <legend>Resolution target (optional)</legend>
            <p id="resolution-target-help">Count how many of the issues in the Resolved total were closed within this many days of being received.</p>
            <div className="admin-fields">
              <label>
                Target in days
                <input name="targetDays" type="number" min={1} max={365} step={1} defaultValue={report?.resolutionTarget?.days} aria-describedby="resolution-target-help" disabled={saving} />
              </label>
              <label>
                Resolved within target
                <input name="resolvedWithinTarget" type="number" min={0} max={maxTransparencyCount} step={1} defaultValue={report?.resolutionTarget?.resolvedWithinTarget} aria-describedby="resolution-target-help" disabled={saving} />
              </label>
            </div>
          </fieldset>
          <div className="admin-form-footer">
            <button type="submit" className="admin-primary" disabled={saving}>{saving ? "Publishing…" : "Publish figures"}</button>
          </div>
        </form>
      )}
    </section>
  );
}
