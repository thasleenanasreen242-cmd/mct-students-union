import Link from "next/link";
import { publishedTransparency } from "../../lib/published-transparency";
import { transparencyMetrics } from "../../lib/transparency";
import ActionArrow from "./ActionArrow";
import CourtIcon from "./CourtIcon";
import styles from "./TransparencyFigures.module.css";

const numberFormat = new Intl.NumberFormat("en-IN");
const percentFormat = new Intl.NumberFormat("en-IN", { style: "percent", maximumFractionDigits: 1 });
const dateFormat = new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeZone: "Asia/Kolkata" });

export default async function TransparencyFigures({ full = false }: { full?: boolean }) {
  const report = await publishedTransparency();
  const counts = report?.counts;
  const target = report?.resolutionTarget;
  const rates = counts ? [
    { label: "Resolution rate", count: counts.resolved, total: counts.received, basis: "issues received" },
    { label: "Under review", count: counts.underReview, total: counts.received, basis: "issues received" },
    { label: "Forwarded to authorities", count: counts.forwarded, total: counts.received, basis: "issues received" },
  ] : [];
  if (counts && target) {
    rates.push({
      label: `Resolved within ${numberFormat.format(target.days)} ${target.days === 1 ? "day" : "days"}`,
      count: target.resolvedWithinTarget,
      total: counts.resolved,
      basis: "resolved issues",
    });
  }
  const metrics = full ? transparencyMetrics : transparencyMetrics.slice(0, 3);

  return (
    <div className={styles.panel}>
      <dl className={styles.metrics}>
        {metrics.map(({ key, label, icon }) => (
          <div className={styles.metric} key={key}>
            <CourtIcon name={icon} className={styles.icon} />
            <dt>{label}</dt>
            <dd>{report ? numberFormat.format(report.counts[key]) : <span aria-label="Awaiting verified figures">—</span>}</dd>
          </div>
        ))}
      </dl>
      {full && rates.length > 0 && (
        <section className={styles.performance} aria-labelledby="transparency-performance">
          <div className={styles.performanceHeading}>
            <h2 id="transparency-performance">How issues are progressing</h2>
            <p>An issue can be forwarded and later resolved, so the percentages can overlap.</p>
          </div>
          <ul className={styles.rateGrid}>
            {rates.map(({ label, count, total, basis }) => (
              <li className={styles.rate} key={label}>
                <div className={styles.rateHeading}>
                  <h3>{label}</h3>
                  <strong>{total > 0 ? percentFormat.format(count / total) : "—"}</strong>
                </div>
                {total > 0 ? (
                  <>
                    <meter aria-label={label} min={0} max={total} value={count} />
                    <p>{numberFormat.format(count)} of {numberFormat.format(total)} {basis}</p>
                  </>
                ) : (
                  <p>Awaiting {basis}</p>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
      <div className={styles.footer}>
        {report ? (
          <p>Updated <time dateTime={report.updatedAt}>{dateFormat.format(new Date(report.updatedAt))}</time></p>
        ) : (
          <p>Awaiting the first verified figures.</p>
        )}
        {!full && (
          <Link href="/transparency" className={styles.browse}>
            View transparency dashboard <ActionArrow direction="right" />
          </Link>
        )}
      </div>
    </div>
  );
}
