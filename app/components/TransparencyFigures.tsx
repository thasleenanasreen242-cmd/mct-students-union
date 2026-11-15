import Link from "next/link";
import { publishedTransparency } from "../../lib/published-transparency";
import { transparencyMetrics } from "../../lib/transparency";
import ActionArrow from "./ActionArrow";
import CourtIcon from "./CourtIcon";
import styles from "./TransparencyFigures.module.css";

const numberFormat = new Intl.NumberFormat("en-IN");
const dateFormat = new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeZone: "Asia/Kolkata" });

export default async function TransparencyFigures({ full = false }: { full?: boolean }) {
  const report = await publishedTransparency();
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
