import CtaLink from "./CtaLink";
import { publicItems } from "../../lib/union-content";
import CourtIcon from "./CourtIcon";
import styles from "./WeekAhead.module.css";

// The admin's date fields store the entered wall-clock time as UTC.
const dayFormat = new Intl.DateTimeFormat("en-IN", { day: "2-digit", timeZone: "UTC" });
const monthFormat = new Intl.DateTimeFormat("en-IN", { month: "short", year: "numeric", timeZone: "UTC" });
const timeFormat = new Intl.DateTimeFormat("en-IN", { timeStyle: "short", timeZone: "UTC" });

export default async function WeekAhead() {
  const events = (await publicItems("event")).slice(0, 3);

  return (
    <div className={styles.panel}>
      {events.length > 0 ? (
        <ul className={styles.events}>
          {events.map((event) => {
            const start = event.starts_at ? new Date(event.starts_at) : null;
            const showDate = start && Number.isFinite(start.getTime());
            const summary = event.summary.trim();
            const body = event.body.trim();
            const imageUrl = event.media_type?.startsWith("image/") ? event.media_url : null;

            return (
              <li key={event.id}>
                <article className={styles.card}>
                  {showDate ? (
                    <time className={styles.date} dateTime={start.toISOString()}>
                      <span className={styles.day}>{dayFormat.format(start)}</span>
                      <span className={styles.month}>{monthFormat.format(start)}</span>
                      <span className={styles.hour}>{timeFormat.format(start)}</span>
                    </time>
                  ) : (
                    <div className={styles.date}>
                      <CourtIcon name="calendar" />
                      <span className={styles.month}>Date to be announced</span>
                    </div>
                  )}
                  <div className={styles.copy}>
                    {(event.category || event.pinned) && (
                      <div className={styles.meta}>
                        {event.category && <span>{event.category}</span>}
                        {event.pinned && <span className={styles.pinned}>Pinned</span>}
                      </div>
                    )}
                    <h3>{event.title}</h3>
                    {(summary || body) && <p>{summary || body}</p>}
                    {summary && body && body !== summary && (
                      <details className={styles.details}>
                        <summary>Event details</summary>
                        <p>{body}</p>
                      </details>
                    )}
                    {event.media_url && (
                      <CtaLink className={styles.attachment} variant="secondary" direction="up-right" href={event.media_url} target="_blank" rel="noopener noreferrer">
                        {imageUrl ? "View image" : event.media_type === "application/pdf" ? "Open PDF" : "View attachment"}
                      </CtaLink>
                    )}
                  </div>
                  {imageUrl && <img className={styles.image} src={imageUrl} alt="" loading="lazy" />}
                </article>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className={styles.empty}>No events to display right now.</p>
      )}
      <div className={styles.footer}>
        <CtaLink href="/events">Browse events</CtaLink>
      </div>
    </div>
  );
}
